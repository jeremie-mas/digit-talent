import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { getSupabaseServiceRoleClient } from "../supabase.server";

const DEFAULT_ADMIN_EMAIL = "admin@digit-talent.com";
const DEFAULT_SESSION_SECRET = "dt-default-secure-admin-session-secret-2026";

function getSessionSecret(): string {
  return process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET;
}

export function createSignedToken(email: string, role = "owner"): string {
  const secret = getSessionSecret();
  const payload = JSON.stringify({
    email,
    role,
    exp: Date.now() + 8 * 60 * 60 * 1000, // 8 heures
  });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifySignedToken(token: string): { valid: boolean; email?: string; role?: string } {
  try {
    if (!token || !token.includes(".")) {
      return { valid: false };
    }
    const [encodedPayload, signature] = token.split(".");
    const secret = getSessionSecret();
    const expectedSignature = crypto.createHmac("sha256", secret).update(encodedPayload).digest("base64url");

    if (signature !== expectedSignature) {
      return { valid: false };
    }

    const payloadStr = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const payload = JSON.parse(payloadStr) as { email: string; role?: string; exp: number };

    if (!payload.exp || Date.now() > payload.exp) {
      return { valid: false };
    }

    return { valid: true, email: payload.email, role: payload.role || (payload.email.toLowerCase() === (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase() ? "owner" : "admin") };
  } catch {
    return { valid: false };
  }
}

export const loginAdmin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().trim().email(),
      password: z.string().min(1),
    })
  )
  .handler(async ({ data }) => {
    const adminEmail = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase();
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const adminPlainPassword = process.env.ADMIN_PASSWORD;
    const supabase = getSupabaseServiceRoleClient();

    if (supabase) {
      const { data: account, error } = await supabase
        .from("admin_users")
        .select("email, password_hash, role")
        .eq("email", data.email.toLowerCase())
        .maybeSingle();
      if (!error && account) {
        const valid = bcrypt.compareSync(data.password, account.password_hash);
        if (!valid) return { success: false as const, error: "Adresse e-mail ou mot de passe incorrect." };
        return { success: true as const, token: createSignedToken(account.email, account.role), admin: { email: account.email } };
      }
      if (error && error.code !== "42P01") {
        console.error("Erreur de lecture des comptes admin :", error.message);
        return { success: false as const, error: "Connexion temporairement indisponible." };
      }
    }

    if (data.email.toLowerCase() !== adminEmail) {
      return { success: false as const, error: "Adresse e-mail ou mot de passe incorrect." };
    }

    let isPasswordCorrect = false;

    if (adminPasswordHash) {
      isPasswordCorrect = bcrypt.compareSync(data.password, adminPasswordHash);
    } else if (adminPlainPassword) {
      isPasswordCorrect = data.password === adminPlainPassword;
    } else {
      // Mot de passe temporaire par défaut si rien n'est encore configuré dans .env
      isPasswordCorrect = data.password === "admin123";
    }

    if (!isPasswordCorrect) {
      return { success: false as const, error: "Adresse e-mail ou mot de passe incorrect." };
    }

    const normalizedEmail = data.email.toLowerCase();
    const token = createSignedToken(normalizedEmail, "owner");

    // Migration transparente du compte historique vers la table des comptes admin.
    if (supabase) {
      const passwordHash = adminPasswordHash || bcrypt.hashSync(adminPlainPassword || data.password, 12);
      const { error } = await supabase.from("admin_users").upsert({
        email: normalizedEmail,
        password_hash: passwordHash,
        role: "owner",
      }, { onConflict: "email", ignoreDuplicates: true });
      if (error && error.code !== "42P01") console.error("Impossible de migrer le compte admin historique :", error.message);
    }

    return {
      success: true as const,
      token,
      admin: { email: data.email },
    };
  });

export const verifyAdmin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const result = verifySignedToken(data.token);
    return result;
  });
