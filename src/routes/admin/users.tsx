import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { changeAdminPassword, createAdminUser, deleteAdminUser, listAdminUsers } from "@/lib/api/admin.users.functions";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Utilisateurs & sécurité | DIGIT & TALENT" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminUsers,
});

type AdminUser = { email: string; role: "owner" | "admin"; created_at: string };

function AdminUsers() {
  const [users, setUsers] = React.useState<AdminUser[]>([]);
  const [email, setEmail] = React.useState("");
  const [initialPassword, setInitialPassword] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [canManageUsers, setCanManageUsers] = React.useState(false);

  const token = () => localStorage.getItem("dt_admin_token") || "";
  const refreshUsers = React.useCallback(async () => {
    try {
      const result = await listAdminUsers({ data: { token: token() } });
      setUsers(result as AdminUser[]);
      setCanManageUsers(true);
    } catch {
      setCanManageUsers(false);
    }
  }, []);

  React.useEffect(() => { void refreshUsers(); }, [refreshUsers]);

  const createUser = async (event: React.FormEvent) => {
    event.preventDefault(); setError(""); setMessage("");
    try {
      await createAdminUser({ data: { token: token(), email, password: initialPassword } });
      setEmail(""); setInitialPassword(""); setMessage("Compte créé. Transmettez les identifiants provisoires à la personne, qui pourra changer son mot de passe ici.");
      await refreshUsers();
    } catch (err) { setError(err instanceof Error ? err.message : "Création impossible."); }
  };

  const removeUser = async (userEmail: string) => {
    setError(""); setMessage("");
    try {
      await deleteAdminUser({ data: { token: token(), email: userEmail } });
      setMessage(`Le compte ${userEmail} a été supprimé.`); await refreshUsers();
    } catch (err) { setError(err instanceof Error ? err.message : "Suppression impossible."); }
  };

  const updatePassword = async (event: React.FormEvent) => {
    event.preventDefault(); setError(""); setMessage("");
    try {
      await changeAdminPassword({ data: { token: token(), currentPassword, newPassword } });
      setCurrentPassword(""); setNewPassword(""); setMessage("Votre mot de passe a été modifié.");
    } catch (err) { setError(err instanceof Error ? err.message : "Modification impossible."); }
  };

  const card: React.CSSProperties = { background: "var(--admin-card-bg)", border: "1px solid var(--admin-border)", color: "var(--admin-text)" };
  const input: React.CSSProperties = { background: "var(--admin-input-bg)", border: "1px solid var(--admin-input-border)", color: "var(--admin-text)" };

  return <AdminLayout title="Utilisateurs & sécurité" description="Gérez les accès et votre mot de passe.">
    <div className="space-y-6">
      {(message || error) && <p role={error ? "alert" : "status"} className={`rounded-xl border p-3 text-sm ${error ? "border-red-500/40 text-red-400" : "border-green-500/40 text-green-400"}`}>{error || message}</p>}

      <section className="rounded-2xl p-6" style={card}>
        <h2 className="text-lg font-bold">Changer mon mot de passe</h2>
        <p className="mt-1 text-sm" style={{ color: "var(--admin-text-muted)" }}>Utilisez au moins 8 caractères.</p>
        <form onSubmit={updatePassword} className="mt-5 grid max-w-xl gap-4">
          <input required type="password" autoComplete="current-password" minLength={1} placeholder="Mot de passe actuel" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="rounded-lg px-3 py-2 text-sm" style={input} />
          <input required type="password" autoComplete="new-password" minLength={8} maxLength={128} placeholder="Nouveau mot de passe (8 caractères minimum)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="rounded-lg px-3 py-2 text-sm" style={input} />
          <button className="w-fit rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white">Enregistrer le nouveau mot de passe</button>
        </form>
      </section>

      {canManageUsers && <section className="rounded-2xl p-6" style={card}>
        <h2 className="text-lg font-bold">Comptes de l’espace admin</h2>
        <p className="mt-1 text-sm" style={{ color: "var(--admin-text-muted)" }}>Créez un accès individuel pour chaque personne. Seul le propriétaire peut gérer ces comptes.</p>
        <form onSubmit={createUser} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <input required type="email" placeholder="Adresse e-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg px-3 py-2 text-sm" style={input} />
          <input required type="password" minLength={8} maxLength={128} placeholder="Mot de passe provisoire (8 caractères min.)" value={initialPassword} onChange={(e) => setInitialPassword(e.target.value)} className="rounded-lg px-3 py-2 text-sm" style={input} />
          <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white">Créer le compte</button>
        </form>
        <div className="mt-6 divide-y" style={{ borderColor: "var(--admin-border)" }}>
          {users.map((user) => <div key={user.email} className="flex items-center justify-between gap-3 py-3">
            <div><p className="text-sm font-medium">{user.email}</p><p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>{user.role === "owner" ? "Propriétaire" : "Administrateur"}</p></div>
            {user.role !== "owner" && <button type="button" onClick={() => void removeUser(user.email)} className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs text-red-400">Supprimer</button>}
          </div>)}
          {users.length === 0 && <p className="py-3 text-sm" style={{ color: "var(--admin-text-muted)" }}>Aucun compte migré pour le moment. Reconnectez-vous après avoir appliqué la migration Supabase.</p>}
        </div>
      </section>}
    </div>
  </AdminLayout>;
}
