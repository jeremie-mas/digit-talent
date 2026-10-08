import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { ImageUploadInput } from "@/components/ImageUploadInput";
import { Plus, Pencil, Trash2, Users, Linkedin, X } from "lucide-react";
import {
  getAdminTeam,
  saveAdminTeamMember,
  deleteAdminTeamMember,
} from "@/lib/api/admin.data.functions";

export const Route = createFileRoute("/admin/team")({
  head: () => ({
    meta: [
      { title: "Gestion de l'Équipe — Admin DIGIT & TALENT" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminTeam,
});

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo_url?: string;
  linkedin_url?: string;
  sort_order: number;
}

function AdminTeam() {
  const [members, setMembers] = React.useState<TeamMember[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingMember, setEditingMember] = React.useState<Partial<TeamMember> | null>(null);
  const [saving, setSaving] = React.useState(false);

  const loadData = React.useCallback(async () => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      const res = await getAdminTeam({ data: { token } });
      setMembers(res.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenCreate = () => {
    setEditingMember({
      name: "",
      role: "",
      bio: "",
      photo_url: "",
      linkedin_url: "",
      sort_order: members.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember({ ...member });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer ${name} de l'équipe ?`)) return;
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      await deleteAdminTeamMember({ data: { token, id } });
      loadData();
    } catch (err: any) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember?.name || !editingMember?.role) return;
    setSaving(true);
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;

    try {
      await saveAdminTeamMember({
        data: {
          token,
          member: {
            id: editingMember.id,
            name: editingMember.name,
            role: editingMember.role,
            bio: editingMember.bio || "",
            photo_url: editingMember.photo_url || "",
            linkedin_url: editingMember.linkedin_url || "",
            sort_order: Number(editingMember.sort_order) || 0,
          },
        },
      });
      setModalOpen(false);
      setEditingMember(null);
      loadData();
    } catch (err: any) {
      alert("Erreur lors de l'enregistrement : " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const panelStyle = {
    backgroundColor: "var(--admin-card-bg)",
    border: "1px solid var(--admin-border)",
    borderRadius: "1rem",
    overflow: "hidden" as const,
  };

  return (
    <AdminLayout
      title="Membres de l'Équipe"
      description="Gérez les consultants, experts et dirigeants affichés sur le site"
      actions={
        <button
          onClick={handleOpenCreate}
          className="btn btn-primary text-xs cursor-pointer"
          style={{ borderRadius: "0.75rem", padding: "0.6rem 1.2rem" }}
        >
          <Plus className="h-4 w-4" />
          Ajouter un Membre
        </button>
      }
    >
      <div style={panelStyle} className="shadow-sm">
        {loading ? (
          <div className="py-20 text-center text-sm" style={{ color: "var(--admin-text-muted)" }}>
            Chargement de l'équipe...
          </div>
        ) : members.length === 0 ? (
          <div className="py-20 text-center">
            <Users className="mx-auto h-12 w-12 mb-3 opacity-30" />
            <p className="text-base font-semibold" style={{ color: "var(--admin-text)" }}>
              Aucun membre d'équipe enregistré.
            </p>
            <button
              onClick={handleOpenCreate}
              className="mt-3 text-xs font-semibold cursor-pointer hover:underline"
              style={{ color: "var(--orange)" }}
            >
              Ajouter votre premier membre
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead
                className="border-b text-[11px] font-semibold uppercase tracking-wider"
                style={{
                  borderColor: "var(--admin-row-border)",
                  backgroundColor: "var(--admin-table-head-bg)",
                  color: "var(--admin-table-head-text)",
                }}
              >
                <tr>
                  <th className="px-6 py-4">Membre</th>
                  <th className="px-6 py-4">Rôle / Poste</th>
                  <th className="px-6 py-4">LinkedIn</th>
                  <th className="px-6 py-4">Ordre</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b transition"
                    style={{ borderColor: "var(--admin-row-border)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {member.photo_url ? (
                          <img
                            src={member.photo_url}
                            alt={member.name}
                            className="h-10 w-10 rounded-full object-cover border"
                            style={{ borderColor: "var(--admin-border)" }}
                          />
                        ) : (
                          <div
                            className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs"
                            style={{
                              backgroundColor: "rgba(242,106,33,0.15)",
                              color: "var(--orange)",
                              border: "1px solid rgba(242,106,33,0.3)",
                            }}
                          >
                            {member.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold" style={{ color: "var(--admin-text)" }}>
                            {member.name}
                          </div>
                          {member.bio && (
                            <p className="text-xs line-clamp-1 max-w-xs mt-0.5" style={{ color: "var(--admin-text-muted)" }}>
                              {member.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold" style={{ color: "var(--orange)" }}>
                      {member.role}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {member.linkedin_url ? (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline inline-flex items-center gap-1 font-medium"
                          style={{ color: "var(--blue)" }}
                        >
                          <Linkedin className="h-3 w-3" /> Profil
                        </a>
                      ) : (
                        <span style={{ color: "var(--admin-text-subtle)" }}>—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono" style={{ color: "var(--admin-text-muted)" }}>
                      #{member.sort_order}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(member)}
                        className="rounded-lg p-1.5 transition cursor-pointer"
                        style={{ color: "var(--admin-text-muted)" }}
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id, member.name)}
                        className="rounded-lg p-1.5 transition cursor-pointer"
                        style={{ color: "var(--admin-text-subtle)" }}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: "var(--admin-modal-overlay)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-fade-up"
            style={{
              backgroundColor: "var(--admin-card-bg)",
              border: "1px solid var(--admin-border)",
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b mb-5" style={{ borderColor: "var(--admin-border)" }}>
              <div>
                <span className="eyebrow" style={{ fontSize: "0.65rem" }}>Équipe</span>
                <h2 className="text-lg font-bold mt-1" style={{ color: "var(--admin-text)" }}>
                  {editingMember?.id ? "Modifier le membre" : "Ajouter un membre"}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 transition cursor-pointer"
                style={{ color: "var(--admin-text-subtle)" }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember?.name || ""}
                  onChange={(e) =>
                    setEditingMember((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ex : Koffi Mensah"
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition"
                  style={{
                    backgroundColor: "var(--admin-input-bg)",
                    border: "1px solid var(--admin-input-border)",
                    color: "var(--admin-text)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--orange)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--admin-input-border)";
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
                  Rôle / Titre *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember?.role || ""}
                  onChange={(e) =>
                    setEditingMember((prev) => ({ ...prev, role: e.target.value }))
                  }
                  placeholder="Ex : Directeur Conseil & Transformation Digitale"
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition"
                  style={{
                    backgroundColor: "var(--admin-input-bg)",
                    border: "1px solid var(--admin-input-border)",
                    color: "var(--admin-text)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--orange)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--admin-input-border)";
                  }}
                />
              </div>

              <ImageUploadInput
                label="Photo de profil"
                value={editingMember?.photo_url || ""}
                onChange={(url) => setEditingMember((prev) => ({ ...prev, photo_url: url }))}
                folder="team"
                recommendation="Format portrait ou carré recommandé (ex : 400×400px en JPG ou WebP)."
              />

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
                  Lien profil LinkedIn
                </label>
                <input
                  type="url"
                  value={editingMember?.linkedin_url || ""}
                  onChange={(e) =>
                    setEditingMember((prev) => ({ ...prev, linkedin_url: e.target.value }))
                  }
                  placeholder="https://linkedin.com/in/..."
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition"
                  style={{
                    backgroundColor: "var(--admin-input-bg)",
                    border: "1px solid var(--admin-input-border)",
                    color: "var(--admin-text)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--orange)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--admin-input-border)";
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    value={editingMember?.sort_order ?? 1}
                    onChange={(e) =>
                      setEditingMember((prev) => ({ ...prev, sort_order: Number(e.target.value) }))
                    }
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition"
                    style={{
                      backgroundColor: "var(--admin-input-bg)",
                      border: "1px solid var(--admin-input-border)",
                      color: "var(--admin-text)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--orange)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--admin-input-border)";
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
                  Biographie courte
                </label>
                <textarea
                  rows={3}
                  value={editingMember?.bio || ""}
                  onChange={(e) =>
                    setEditingMember((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Parcours et spécialités du consultant..."
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition"
                  style={{
                    backgroundColor: "var(--admin-input-bg)",
                    border: "1px solid var(--admin-input-border)",
                    color: "var(--admin-text)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--orange)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--admin-input-border)";
                  }}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: "var(--admin-border)" }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer"
                  style={{
                    border: "1px solid var(--admin-border)",
                    color: "var(--admin-text-muted)",
                    backgroundColor: "var(--admin-card-subtle)",
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary text-xs cursor-pointer disabled:opacity-50"
                  style={{ borderRadius: "0.75rem", padding: "0.5rem 1.25rem" }}
                >
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
