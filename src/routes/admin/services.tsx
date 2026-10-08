import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Plus, Pencil, Trash2, Cpu, Globe, EyeOff, X } from "lucide-react";
import {
  getAdminServices,
  saveAdminService,
  deleteAdminService,
} from "@/lib/api/admin.data.functions";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [
      { title: "Gestion des Services — Admin DIGIT & TALENT" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminServices,
});

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description?: string;
  icon: string;
  sort_order: number;
  published: boolean;
}

function AdminServices() {
  const [services, setServices] = React.useState<ServiceItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<Partial<ServiceItem> | null>(null);
  const [saving, setSaving] = React.useState(false);

  const loadData = React.useCallback(async () => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      const res = await getAdminServices({ data: { token } });
      setServices(res.items || []);
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
    setEditingService({
      title: "",
      slug: "",
      description: "",
      icon: "Cpu",
      sort_order: services.length + 1,
      published: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService({ ...service });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer le service "${title}" ?`)) return;
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      await deleteAdminService({ data: { token, id } });
      loadData();
    } catch (err: any) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.slug) return;
    setSaving(true);
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;

    try {
      await saveAdminService({
        data: {
          token,
          service: {
            id: editingService.id,
            title: editingService.title,
            slug: editingService.slug,
            description: editingService.description || "",
            icon: editingService.icon || "Cpu",
            sort_order: Number(editingService.sort_order) || 0,
            published: editingService.published ?? true,
          },
        },
      });
      setModalOpen(false);
      setEditingService(null);
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
      title="Services & Offres"
      description="Personnalisez les offres de transformation digitale, formations et conseil"
      actions={
        <button
          onClick={handleOpenCreate}
          className="btn btn-primary text-xs cursor-pointer"
          style={{ borderRadius: "0.75rem", padding: "0.6rem 1.2rem" }}
        >
          <Plus className="h-4 w-4" />
          Ajouter un Service
        </button>
      }
    >
      <div style={panelStyle} className="shadow-sm">
        {loading ? (
          <div className="py-20 text-center text-sm" style={{ color: "var(--admin-text-muted)" }}>
            Chargement des services...
          </div>
        ) : services.length === 0 ? (
          <div className="py-20 text-center">
            <Cpu className="mx-auto h-12 w-12 mb-3 opacity-30" />
            <p className="text-base font-semibold" style={{ color: "var(--admin-text)" }}>
              Aucun service enregistré.
            </p>
            <button
              onClick={handleOpenCreate}
              className="mt-3 text-xs font-semibold cursor-pointer hover:underline"
              style={{ color: "var(--orange)" }}
            >
              Ajouter votre premier service
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
                  <th className="px-6 py-4">Titre &amp; Slug</th>
                  <th className="px-6 py-4">Icône</th>
                  <th className="px-6 py-4">Ordre</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b transition"
                    style={{ borderColor: "var(--admin-row-border)" }}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold" style={{ color: "var(--admin-text)" }}>
                        {service.title}
                      </div>
                      <div className="text-xs font-mono mt-0.5" style={{ color: "var(--admin-text-subtle)" }}>
                        /{service.slug}
                      </div>
                      {service.description && (
                        <p className="text-xs mt-1 line-clamp-1 max-w-md" style={{ color: "var(--admin-text-muted)" }}>
                          {service.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                        style={{
                          backgroundColor: "rgba(242,106,33,0.12)",
                          color: "var(--orange)",
                          border: "1px solid rgba(242,106,33,0.3)",
                        }}
                      >
                        {service.icon}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono" style={{ color: "var(--admin-text-muted)" }}>
                      #{service.sort_order}
                    </td>
                    <td className="px-6 py-4">
                      {service.published ? (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: "rgba(16,185,129,0.12)",
                            color: "#059669",
                            border: "1px solid rgba(16,185,129,0.3)",
                          }}
                        >
                          <Globe className="h-3 w-3" /> Actif
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
                        onClick={() => handleOpenEdit(service)}
                        className="rounded-lg p-1.5 transition cursor-pointer"
                        style={{ color: "var(--admin-text-muted)" }}
                        title="Modifier"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id, service.title)}
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
                <span className="eyebrow" style={{ fontSize: "0.65rem" }}>Services</span>
                <h2 className="text-lg font-bold mt-1" style={{ color: "var(--admin-text)" }}>
                  {editingService?.id ? "Modifier le service" : "Ajouter un service"}
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
                  Titre du service *
                </label>
                <input
                  type="text"
                  required
                  value={editingService?.title || ""}
                  onChange={(e) => {
                    const title = e.target.value;
                    const autoSlug = title
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "");
                    setEditingService((prev) => ({
                      ...prev,
                      title,
                      slug: prev?.id ? prev.slug : autoSlug,
                    }));
                  }}
                  placeholder="Ex : Conseil en Transformation Digitale"
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
                    Slug URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService?.slug || ""}
                    onChange={(e) =>
                      setEditingService((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="transformation-digitale"
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm font-mono outline-none transition"
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
                    Icône
                  </label>
                  <select
                    value={editingService?.icon || "Cpu"}
                    onChange={(e) =>
                      setEditingService((prev) => ({ ...prev, icon: e.target.value }))
                    }
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition cursor-pointer"
                    style={{
                      backgroundColor: "var(--admin-input-bg)",
                      border: "1px solid var(--admin-input-border)",
                      color: "var(--admin-text)",
                    }}
                  >
                    <option value="Cpu">Cpu (Technologie/Digital)</option>
                    <option value="ShieldCheck">ShieldCheck (Cybersécurité)</option>
                    <option value="Workflow">Workflow (Transformation)</option>
                    <option value="Users">Users (RH/Change)</option>
                    <option value="GraduationCap">GraduationCap (Formation PMP)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  value={editingService?.sort_order ?? 1}
                  onChange={(e) =>
                    setEditingService((prev) => ({ ...prev, sort_order: Number(e.target.value) }))
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

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
                  Description détaillée
                </label>
                <textarea
                  rows={4}
                  value={editingService?.description || ""}
                  onChange={(e) =>
                    setEditingService((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Présentation des bénéfices et détails de l'offre..."
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
                  id="service-published"
                  checked={editingService?.published ?? true}
                  onChange={(e) =>
                    setEditingService((prev) => ({ ...prev, published: e.target.checked }))
                  }
                  className="h-4 w-4 rounded cursor-pointer"
                  style={{ accentColor: "var(--orange)" }}
                />
                <label htmlFor="service-published" className="text-sm font-medium cursor-pointer" style={{ color: "var(--admin-text)" }}>
                  Activer et afficher ce service sur le site
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
