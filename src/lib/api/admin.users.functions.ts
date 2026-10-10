import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { verifySignedToken } from "./admin.auth.functions";
import { getSupabaseServiceRoleClient } from "../supabase.server";

function getAccount(token: string) {
  const session = verifySignedToken(token);
  if (!session.valid || !session.email) throw new Error("Session expirée. Reconnectez-vous.");
  return session;
}

function getDatabase() {
  const supabase = getSupabaseServiceRoleClient();
  if (!supabase) throw new Error("Configurez SUPABASE_SERVICE_ROLE_KEY pour gérer les comptes admin.");
  return supabase;
}

export const listAdminUsers = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    const session = getAccount(data.token);
    if (session.role !== "owner") throw new Error("Seul le propriétaire peut gérer les utilisateurs.");
    const { data: users, error } = await getDatabase().from("admin_users")
      .select("email, role, created_at").order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return users ?? [];
  });

export const createAdminUser = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), email: z.string().trim().email().max(254), password: z.string().min(8).max(128) }))
  .handler(async ({ data }) => {
    const session = getAccount(data.token);
    if (session.role !== "owner") throw new Error("Seul le propriétaire peut créer des utilisateurs.");
    const { error } = await getDatabase().from("admin_users").insert({
      email: data.email.toLowerCase(), password_hash: bcrypt.hashSync(data.password, 12), role: "admin",
    });
    if (error?.code === "23505") throw new Error("Un compte existe déjà avec cette adresse e-mail.");
    if (error) throw new Error(error.message);
    return { success: true as const };
  });

export const deleteAdminUser = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), email: z.string().trim().email() }))
  .handler(async ({ data }) => {
    const session = getAccount(data.token);
    if (session.role !== "owner") throw new Error("Seul le propriétaire peut supprimer des utilisateurs.");
    const targetEmail = data.email.toLowerCase();
    if (targetEmail === session.email.toLowerCase() || targetEmail === (process.env.ADMIN_EMAIL || "admin@digit-talent.com").toLowerCase()) {
      throw new Error("Le compte propriétaire ne peut pas être supprimé ici.");
    }
    const { error } = await getDatabase().from("admin_users").delete().eq("email", targetEmail).eq("role", "admin");
    if (error) throw new Error(error.message);
    return { success: true as const };
  });

export const changeAdminPassword = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), currentPassword: z.string().min(1), newPassword: z.string().min(8).max(128) }))
  .handler(async ({ data }) => {
    const session = getAccount(data.token);
    const supabase = getDatabase();
    const { data: account, error } = await supabase.from("admin_users")
      .select("password_hash").eq("email", session.email!).maybeSingle();
    if (error) throw new Error(error.message);
    if (!account) throw new Error("Compte non initialisé. Déconnectez-vous puis reconnectez-vous pour activer sa migration.");
    if (!bcrypt.compareSync(data.currentPassword, account.password_hash)) throw new Error("Le mot de passe actuel est incorrect.");
    const { error: updateError } = await supabase.from("admin_users").update({
      password_hash: bcrypt.hashSync(data.newPassword, 12),
    }).eq("email", session.email!);
    if (updateError) throw new Error(updateError.message);
    return { success: true as const };
  });
