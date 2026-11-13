import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { ImageUploadInput } from "@/components/ImageUploadInput";
import { Plus, Pencil, Trash2, Briefcase, Globe, EyeOff, X } from "lucide-react";
import {
  getAdminProjects,
  saveAdminProject,
  deleteAdminProject,
} from "@/lib/api/admin.data.functions";

export const Route = createFileRoute("/admin/projects")({
  head: () => ({
    meta: [
      { title: "Gestion des Projets & Références | Admin DIGIT & TALENT" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminProjects,
});

interface ProjectItem {
  id: string;
  client_name: string;
  title?: string;
  testimonial?: string;
  logo_url?: string;
  project_type?: string;
  published: boolean;
  sort_order: number;
}

function AdminProjects() {
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<Partial<ProjectItem> | null>(null);
  const [saving, setSaving] = React.useState(false);

  const loadData = React.useCallback(async () => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      const res = await getAdminProjects({ data: { token } });
      setProjects(res.items || []);
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
    setEditingProject({
      client_name: "",
      title: "",
      testimonial: "",
      logo_url: "",
      project_type: "Transformation Digitale",
      published: true,
      sort_order: projects.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject({ ...project });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer la référence "${name}" ?`)) return;
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      await deleteAdminProject({ data: { token, id } });
      loadData();
    } catch (err: any) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.client_name) return;
    setSaving(true);
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;

    try {
      await saveAdminProject({
        data: {
          token,
          project: {
            id: editingProject.id,
            client_name: editingProject.client_name,
            title: editingProject.title || "",
            testimonial: editingProject.testimonial || "",
            logo_url: editingProject.logo_url || "",
            project_type: editingProject.project_type || "Général",
            sort_order: Number(editingProject.sort_order) || 0,
            published: editingProject.published ?? true,
          },
        },
      });
      setModalOpen(false);
      setEditingProject(null);
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
      title="Projets & Références Clients"
      description="Ajoutez des études de cas, logos partenaires et témoignages de satisfaction"
      actions={
        <button
          onClick={handleOpenCreate}
          className="btn btn-primary text-xs cursor-pointer"
          style={{ borderRadius: "0.75rem", padding: "0.6rem 1.2rem" }}
        >
          <Plus className="h-4 w-4" />
          Ajouter un Projet
        </button>
      }
    >
      <div style={panelStyle} className="shadow-sm">
        {loading ? (
          <div className="py-20 text-center text-sm" style={{ color: "var(--admin-text-muted)" }}>
            Chargement des références...
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center">
            <Briefcase className="mx-auto h-12 w-12 mb-3 opacity-30" />
            <p className="text-base font-semibold" style={{ color: "var(--admin-text)" }}>
              Aucun projet ou référence enregistré.
            </p>
            <button
              onClick={handleOpenCreate}
              className="mt-3 text-xs font-semibold cursor-pointer hover:underline"
              style={{ color: "var(--orange)" }}
            >
              Ajouter votre premier projet
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
                  <th className="px-6 py-4">Client &amp; Mission</th>
                  <th className="px-6 py-4">Secteur / Type</th>
                  <th className="px-6 py-4">Ordre</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b transition"
                    style={{ borderColor: "var(--admin-row-border)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {project.logo_url && (
                          <img
                            src={project.logo_url}
                            alt={project.client_name}
                            className="h-8 w-8 rounded object-contain p-1 border"
                            style={{
                              backgroundColor: "var(--admin-card-subtle)",
                              borderColor: "var(--admin-border)",
                            }}
                          />
                        )}
                        <div>
                          <div className="font-semibold" style={{ color: "var(--admin-text)" }}>
                            {project.client_name}
                          </div>
                          {project.title && (
                            <div className="text-xs mt-0.5" style={{ color: "var(--admin-text-muted)" }}>
                              {project.title}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                        style={{
                          backgroundColor: "rgba(242,106,33,0.12)",
                          color: "var(--orange)",
                          border: "1px solid rgba(242,106,33,0.3)",
                        }}
                      >
                        {project.project_type || "Général"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono" style={{ color: "var(--admin-text-muted)" }}>
                      #{project.sort_order}
                    </td>
                    <td className="px-6 py-4">
                      {project.published ? (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: "rgba(16,185,129,0.12)",
                            color: "#059669",
                            border: "1px solid rgba(16,185,129,0.3)",
                          }}
                        >
                          <Globe className="h-3 w-3" /> Visible
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: "var(--admin-card-subtle)",
                            color: "var(--admin-text-subtle)",
                            border: "1px solid var(--admin-border)",
                          }}
                        >
                          <EyeOff className="h-3 w-3" /> Masqué
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="rounded-lg p-1.5 transition cursor-pointer"
                        style={{ color: "var(--admin-text-muted)" }}
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.client_name)}
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
                <span className="eyebrow" style={{ fontSize: "0.65rem" }}>Références</span>
                <h2 className="text-lg font-bold mt-1" style={{ color: "var(--admin-text)" }}>
                  {editingProject?.id ? "Modifier la référence" : "Ajouter une référence client"}
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
                  Nom du client / organisation *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject?.client_name || ""}
                  onChange={(e) =>
                    setEditingProject((prev) => ({ ...prev, client_name: e.target.value }))
                  }
                  placeholder="Ex : Banque Mondiale ou Ministère de l'Économie"
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
                  Titre ou périmètre de la mission
                </label>
                <input
                  type="text"
                  value={editingProject?.title || ""}
                  onChange={(e) =>
                    setEditingProject((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Ex : Digitalisation des processus & Conduite du changement"
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
                    Type de projet
                  </label>
                  <input
                    type="text"
                    value={editingProject?.project_type || ""}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...prev, project_type: e.target.value }))
                    }
                    placeholder="Secteur Public / Banque / etc."
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
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    value={editingProject?.sort_order ?? 1}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...prev, sort_order: Number(e.target.value) }))
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

              <ImageUploadInput
                label="Logo du client"
                value={editingProject?.logo_url || ""}
                onChange={(url) => setEditingProject((prev) => ({ ...prev, logo_url: url }))}
                folder="projects"
                recommendation="Format PNG ou SVG transparent recommandé (ex : 300×120px)."
              />

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
                  Témoignage / Impact client
                </label>
                <textarea
                  rows={3}
                  value={editingProject?.testimonial || ""}
                  onChange={(e) =>
                    setEditingProject((prev) => ({ ...prev, testimonial: e.target.value }))
                  }
                  placeholder="Citation ou résultat clé du projet..."
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

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="proj-published"
                  checked={editingProject?.published ?? true}
                  onChange={(e) =>
                    setEditingProject((prev) => ({ ...prev, published: e.target.checked }))
                  }
                  className="h-4 w-4 rounded cursor-pointer"
                  style={{ accentColor: "var(--orange)" }}
                />
                <label htmlFor="proj-published" className="text-sm font-medium cursor-pointer" style={{ color: "var(--admin-text)" }}>
                  Afficher cette référence sur le site web
                </label>
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
