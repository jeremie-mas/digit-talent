import crypto from "node:crypto";
import { getSupabaseServiceRoleClient } from "../supabase.server";

type PushSubscription = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

function decodeBase64Url(value: string): Buffer {
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64");
}

function encodeBase64Url(value: Buffer): string {
  return value.toString("base64url");
}

function hmac(key: Buffer, value: Buffer): Buffer {
  return crypto.createHmac("sha256", key).update(value).digest();
}

function hkdfExpand(prk: Buffer, info: Buffer, length: number): Buffer {
  let output = Buffer.alloc(0);
  let previous = Buffer.alloc(0);
  for (let counter = 1; output.length < length; counter += 1) {
    previous = hmac(prk, Buffer.concat([previous, info, Buffer.from([counter])]));
    output = Buffer.concat([output, previous]);
  }
  return output.subarray(0, length);
}

function getVapidKeys() {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!publicKey || !privateKey) return null;
  const publicBytes = decodeBase64Url(publicKey);
  const privateBytes = decodeBase64Url(privateKey);
  if (publicBytes.length !== 65 || publicBytes[0] !== 4 || privateBytes.length !== 32) {
    throw new Error("Les clés VAPID doivent être au format P-256 base64url.");
  }
  return {
    publicKey,
    privateKey: crypto.createPrivateKey({
      key: {
        kty: "EC",
        crv: "P-256",
        x: encodeBase64Url(publicBytes.subarray(1, 33)),
        y: encodeBase64Url(publicBytes.subarray(33, 65)),
        d: encodeBase64Url(privateBytes),
      },
      format: "jwk",
    }),
  };
}

export function getWebPushPublicKey(): string | null {
  return getVapidKeys()?.publicKey ?? null;
}

function createVapidToken(endpoint: string, keys: NonNullable<ReturnType<typeof getVapidKeys>>): string {
  const audience = new URL(endpoint).origin;
  const encodeJson = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = `${encodeJson({ typ: "JWT", alg: "ES256" })}.${encodeJson({ aud: audience, exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, sub: process.env.VAPID_SUBJECT || "mailto:contact@digit-talent.com" })}`;
  const signature = crypto.sign("sha256", Buffer.from(unsigned), { key: keys.privateKey, dsaEncoding: "ieee-p1363" });
  return `${unsigned}.${encodeBase64Url(signature)}`;
}

function encryptPayload(subscription: PushSubscription, payload: string): Buffer {
  const uaPublicKey = decodeBase64Url(subscription.keys.p256dh);
  const authSecret = decodeBase64Url(subscription.keys.auth);
  if (uaPublicKey.length !== 65 || uaPublicKey[0] !== 4 || authSecret.length !== 16) {
    throw new Error("Abonnement Web Push invalide.");
  }

  const ecdh = crypto.createECDH("prime256v1");
  ecdh.generateKeys();
  const asPublicKey = ecdh.getPublicKey();
  const sharedSecret = ecdh.computeSecret(uaPublicKey);
  const keyInfo = Buffer.concat([Buffer.from("WebPush: info\0"), uaPublicKey, asPublicKey]);
  const inputKeyMaterial = hkdfExpand(hmac(authSecret, sharedSecret), keyInfo, 32);
  const salt = crypto.randomBytes(16);
  const prk = hmac(salt, inputKeyMaterial);
  const cek = hkdfExpand(prk, Buffer.from("Content-Encoding: aes128gcm\0"), 16);
  const nonce = hkdfExpand(prk, Buffer.from("Content-Encoding: nonce\0"), 12);
  const plaintext = Buffer.concat([Buffer.from(payload), Buffer.from([2])]);
  const cipher = crypto.createCipheriv("aes-128-gcm", cek, nonce);
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);
  const recordSize = Buffer.alloc(4);
  recordSize.writeUInt32BE(4096);
  return Buffer.concat([salt, recordSize, Buffer.from([asPublicKey.length]), asPublicKey, ciphertext]);
}

export async function sendTrainingPushNotification(payload: { title: string; body: string; url: string }, adminEmail?: string, endpoint?: string) {
  const supabase = getSupabaseServiceRoleClient();
  const keys = getVapidKeys();
  if (!supabase) return { sent: 0, error: "Supabase service role is not configured." };
  if (!keys) return { sent: 0, error: "VAPID keys are not configured." };

  let query = supabase.from("admin_push_subscriptions").select("endpoint, subscription");
  if (adminEmail) query = query.eq("admin_email", adminEmail);
  if (endpoint) query = query.eq("endpoint", endpoint);
  const { data: rows, error } = await query;
  if (error) {
    console.error("Impossible de lire les abonnements Web Push admin :", error.message);
    return { sent: 0, error: "Could not read registered push subscriptions." };
  }

  if (!rows?.length) return { sent: 0, error: "No subscribed phone was found. Enable notifications on this device first." };
  let sent = 0;
  let failed = 0;
  await Promise.all(rows.map(async (row) => {
    const subscription = row.subscription as PushSubscription;
    try {
      const response = await fetch(subscription.endpoint, {
        method: "POST",
        headers: {
          Authorization: `vapid t=${createVapidToken(subscription.endpoint, keys)}, k=${keys.publicKey}`,
          "Content-Encoding": "aes128gcm",
          "Content-Type": "application/octet-stream",
          TTL: "86400",
          Urgency: "high",
        },
        body: encryptPayload(subscription, JSON.stringify(payload)),
        signal: AbortSignal.timeout(5000),
      });
      if (response.ok) sent += 1;
      if (response.status === 404 || response.status === 410) {
        failed += 1;
        await supabase.from("admin_push_subscriptions").delete().eq("endpoint", subscription.endpoint);
      } else if (!response.ok) {
        failed += 1;
        console.warn("Échec envoi push admin :", response.status, await response.text());
      }
    } catch (error) {
      failed += 1;
      console.warn("Échec envoi push admin :", error);
    }
  }));
  return sent > 0
    ? { sent, error: null }
    : { sent: 0, error: failed ? "The push service refused delivery. Check VAPID keys and phone subscription." : "No notification was sent." };
}
