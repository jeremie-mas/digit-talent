import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { AdminLayout } from "@/components/AdminLayout";
import {
  GraduationCap,
  Mail,
  Trash2,
  Search,
  Eye,
  MessageSquare,
  ExternalLink,
  X,
} from "lucide-react";
import {
  getAdminTrainingRegistrations,
  updateTrainingRegistrationStatus,
  deleteTrainingRegistration,
} from "@/lib/api/admin.data.functions";

export const Route = createFileRoute("/admin/formations")({
  head: () => ({
    meta: [
      { title: "Inscriptions aux Formations — Admin DIGIT & TALENT" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminFormations,
});

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company?: string;
  role?: string;
  training_course: string;
  session_preference?: string;
  message?: string;
  status: "nouveau" | "contacte" | "confirme" | "annule";
  created_at: string;
}

const STATUS_CONFIG: Record<string, { bg: string; color: string; border: string; label: string }> = {
  nouveau: {
    bg: "rgba(242,106,33,0.12)",
    color: "var(--orange)",
    border: "rgba(242,106,33,0.35)",
    label: "Nouveau",
  },
  contacte: {
    bg: "rgba(245,158,11,0.12)",
    color: "#d97706",
    border: "rgba(245,158,11,0.35)",
    label: "Contacté",
  },
  confirme: {
    bg: "rgba(16,185,129,0.12)",
    color: "#059669",
    border: "rgba(16,185,129,0.35)",
    label: "Confirmé",
  },
  annule: {
    bg: "rgba(100,116,139,0.12)",
    color: "#64748b",
    border: "rgba(100,116,139,0.35)",
    label: "Annulé",
  },
};

function AdminFormations() {
  const [items, setItems] = React.useState<Registration[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedItem, setSelectedItem] = React.useState<Registration | null>(null);

  const loadData = React.useCallback(async () => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      const res = await getAdminTrainingRegistrations({ data: { token } });
      setItems((res.items as Registration[]) || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStatusChange = async (id: string, newStatus: Registration["status"]) => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      await updateTrainingRegistrationStatus({ data: { token, id, status: newStatus } });
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, status: newStatus } : it)));
      if (selectedItem?.id === id) {
        setSelectedItem((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      alert("Erreur lors de la mise à jour du statut : " + err.message);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer définitivement l'inscription de "${name}" ?`)) return;
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      await deleteTrainingRegistration({ data: { token, id } });
      setItems((prev) => prev.filter((it) => it.id !== id));
      if (selectedItem?.id === id) setSelectedItem(null);
    } catch (err: any) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  const cleanPhoneForWhatsApp = (rawPhone: string) => {
    const digits = rawPhone.replace(/[^\d+]/g, "").replace(/^00/, "+");
    return digits.startsWith("+") ? digits.slice(1) : digits;
  };

  const filteredItems = items.filter((item) => {
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const term = search.toLowerCase();
    const matchesSearch =
      item.full_name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.training_course.toLowerCase().includes(term) ||
      (item.company && item.company.toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });

  const countByStatus = {
    all: items.length,
    nouveau: items.filter((it) => it.status === "nouveau").length,
    contacte: items.filter((it) => it.status === "contacte").length,
    confirme: items.filter((it) => it.status === "confirme").length,
    annule: items.filter((it) => it.status === "annule").length,
  };

  const panelStyle = {
    backgroundColor: "var(--admin-card-bg)",
    border: "1px solid var(--admin-border)",
    borderRadius: "1rem",
    overflow: "hidden" as const,
  };

  const tabs = [
    { id: "all", label: "Tous", count: countByStatus.all },
    { id: "nouveau", label: "Nouveaux", count: countByStatus.nouveau },
    { id: "contacte", label: "Contactés", count: countByStatus.contacte },
    { id: "confirme", label: "Confirmés", count: countByStatus.confirme },
    { id: "annule", label: "Annulés", count: countByStatus.annule },
  ];

  return (
    <AdminLayout
      title="Inscriptions aux Formations"
      description="Suivez et gérez les demandes d'inscription aux certifications PMP®, CAPM® et formations sur mesure"
      actions={
        <a
          href="/formation"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition"
          style={{
            backgroundColor: "rgba(242,106,33,0.12)",
            border: "1px solid rgba(242,106,33,0.3)",
            color: "var(--orange)",
          }}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>Voir le formulaire public</span>
        </a>
      }
    >
      <div className="space-y-6">
        {/* Status Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {tabs.map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className="flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer shrink-0"
                  style={
                    isActive
                      ? {
                          backgroundColor: "rgba(242,106,33,0.15)",
                          color: "var(--orange)",
                          border: "1px solid rgba(242,106,33,0.4)",
                        }
                      : {
                          backgroundColor: "var(--admin-card-bg)",
                          color: "var(--admin-text-muted)",
                          border: "1px solid var(--admin-border)",
                        }
                  }
                >
                  <span>{tab.label}</span>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-mono"
                    style={
                      isActive
                        ? { backgroundColor: "rgba(242,106,33,0.2)", color: "var(--orange)" }
                        : { backgroundColor: "var(--admin-card-subtle)", color: "var(--admin-text-subtle)" }
                    }
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "var(--admin-text-subtle)" }}
            />
            <input
              type="text"
              placeholder="Rechercher candidat, cours..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl pl-9 pr-4 py-2 text-sm outline-none transition"
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

        {/* Table */}
        <div style={panelStyle} className="shadow-sm">
          {loading ? (
            <div className="py-20 text-center text-sm" style={{ color: "var(--admin-text-muted)" }}>
              Chargement des inscriptions...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center">
              <GraduationCap className="mx-auto h-12 w-12 mb-3 opacity-30" />
              <p className="text-base font-semibold" style={{ color: "var(--admin-text)" }}>
                Aucune inscription trouvée
              </p>
              <p className="text-xs mt-1 max-w-sm mx-auto" style={{ color: "var(--admin-text-muted)" }}>
                Les candidatures soumises depuis{" "}
                <code style={{ color: "var(--orange)" }}>/formation</code> apparaîtront ici automatiquement.
              </p>
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
                    <th className="px-5 py-4">Candidat</th>
                    <th className="px-5 py-4">Formation &amp; Format</th>
                    <th className="px-5 py-4">Contact direct</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Statut</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((reg) => {
                    const waNumber = cleanPhoneForWhatsApp(reg.phone);
                    return (
                      <tr
                        key={reg.id}
                        className="border-b transition"
                        style={{ borderColor: "var(--admin-row-border)" }}
                      >
                        <td className="px-5 py-4">
                          <div className="font-semibold text-sm" style={{ color: "var(--admin-text)" }}>
                            {reg.full_name}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: "var(--admin-text-muted)" }}>
                            {reg.company ? (
                              <span>{reg.company}</span>
                            ) : (
                              <span className="italic opacity-60">Particulier</span>
                            )}
                            {reg.role && <span> · {reg.role}</span>}
                          </div>
                        </td>

                        <td className="px-5 py-4 max-w-xs">
                          <div className="font-medium text-xs" style={{ color: "var(--orange)" }}>
                            {reg.training_course}
                          </div>
                          {reg.session_preference && (
                            <div className="text-[11px] mt-0.5" style={{ color: "var(--admin-text-muted)" }}>
                              {reg.session_preference}
                            </div>
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-xs">
                            <a
                              href={`https://wa.me/${waNumber}?text=Bonjour%20${encodeURIComponent(reg.full_name)},%20concernant%20votre%20inscription%20à%20la%20formation%20DIGIT%20%26%20TALENT...`}
                              target="_blank"
                              rel="noreferrer"
                              title="Contacter sur WhatsApp"
                              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold transition"
                              style={{
                                backgroundColor: "rgba(16,185,129,0.12)",
                                border: "1px solid rgba(16,185,129,0.3)",
                                color: "#059669",
                              }}
                            >
                              WhatsApp
                            </a>
                            <a
                              href={`mailto:${reg.email}?subject=DIGIT%20%26%20TALENT%20-%20Votre%20inscription%20formation`}
                              title="Envoyer un e-mail"
                              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium transition"
                              style={{
                                backgroundColor: "var(--admin-card-subtle)",
                                border: "1px solid var(--admin-border)",
                                color: "var(--admin-text-muted)",
                              }}
                            >
                              <Mail className="h-3 w-3" />
                            </a>
                          </div>
                          <div className="text-[11px] mt-1 font-mono" style={{ color: "var(--admin-text-subtle)" }}>
                            {reg.phone}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-xs whitespace-nowrap" style={{ color: "var(--admin-text-muted)" }}>
                          {new Date(reg.created_at).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        <td className="px-5 py-4">
                          <select
                            value={reg.status}
                            onChange={(e) =>
                              handleStatusChange(reg.id, e.target.value as Registration["status"])
                            }
                            className="rounded-lg px-2.5 py-1 text-xs font-semibold outline-none border transition cursor-pointer"
                            style={(() => {
                              const s = STATUS_CONFIG[reg.status] ?? STATUS_CONFIG.annule;
                              return {
                                backgroundColor: s.bg,
                                color: s.color,
                                border: `1px solid ${s.border}`,
                              };
                            })()}
                          >
                            <option value="nouveau">Nouveau</option>
                            <option value="contacte">Contacté</option>
                            <option value="confirme">Confirmé</option>
                            <option value="annule">Annulé</option>
                          </select>
                        </td>

                        <td className="px-5 py-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedItem(reg)}
                            className="rounded-lg p-1.5 transition cursor-pointer"
                            style={{ color: "var(--admin-text-muted)" }}
                            title="Voir le détail"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(reg.id, reg.full_name)}
                            className="rounded-lg p-1.5 transition cursor-pointer"
                            style={{ color: "var(--admin-text-subtle)" }}
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "var(--admin-modal-overlay)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-5 animate-fade-up"
            style={{
              backgroundColor: "var(--admin-card-bg)",
              border: "1px solid var(--admin-border)",
            }}
          >
            <div className="flex items-start justify-between border-b pb-4" style={{ borderColor: "var(--admin-border)" }}>
              <div>
                <span className="eyebrow" style={{ fontSize: "0.65rem" }}>Détail de la candidature</span>
                <h3 className="text-lg font-bold mt-1" style={{ color: "var(--admin-text)" }}>
                  {selectedItem.full_name}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--admin-text-muted)" }}>
                  Reçue le {new Date(selectedItem.created_at).toLocaleString("fr-FR")}
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-lg p-1.5 transition cursor-pointer"
                style={{ color: "var(--admin-text-subtle)" }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div
                className="rounded-xl p-3.5 space-y-1"
                style={{
                  backgroundColor: "rgba(242,106,33,0.08)",
                  border: "1px solid rgba(242,106,33,0.2)",
                }}
              >
                <p className="font-semibold text-sm" style={{ color: "var(--orange)" }}>
                  {selectedItem.training_course}
                </p>
                <p style={{ color: "var(--admin-text-muted)" }}>
                  Format : {selectedItem.session_preference || "Non précisé"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 py-2 border-y" style={{ borderColor: "var(--admin-border)" }}>
                <div>
                  <p className="font-semibold uppercase text-[10px] mb-0.5" style={{ color: "var(--admin-text-subtle)" }}>
                    E-mail
                  </p>
                  <a
                    href={`mailto:${selectedItem.email}`}
                    className="hover:underline font-medium"
                    style={{ color: "var(--orange)" }}
                  >
                    {selectedItem.email}
                  </a>
                </div>
                <div>
                  <p className="font-semibold uppercase text-[10px] mb-0.5" style={{ color: "var(--admin-text-subtle)" }}>
                    Téléphone / WhatsApp
                  </p>
                  <p style={{ color: "var(--admin-text)" }}>{selectedItem.phone}</p>
                </div>
                <div>
                  <p className="font-semibold uppercase text-[10px] mb-0.5" style={{ color: "var(--admin-text-subtle)" }}>
                    Entreprise
                  </p>
                  <p style={{ color: "var(--admin-text)" }}>{selectedItem.company || "Non renseignée"}</p>
                </div>
                <div>
                  <p className="font-semibold uppercase text-[10px] mb-0.5" style={{ color: "var(--admin-text-subtle)" }}>
                    Poste / Fonction
                  </p>
                  <p style={{ color: "var(--admin-text)" }}>{selectedItem.role || "Non renseigné"}</p>
                </div>
              </div>

              {selectedItem.message ? (
                <div>
                  <p className="font-semibold mb-1 flex items-center gap-1.5" style={{ color: "var(--admin-text-muted)" }}>
                    <MessageSquare className="h-3.5 w-3.5" style={{ color: "var(--orange)" }} />
                    Message du candidat :
                  </p>
                  <div
                    className="rounded-xl p-3 whitespace-pre-wrap leading-relaxed"
                    style={{
                      backgroundColor: "var(--admin-card-subtle)",
                      border: "1px solid var(--admin-border)",
                      color: "var(--admin-text)",
                    }}
                  >
                    {selectedItem.message}
                  </div>
                </div>
              ) : (
                <p className="italic" style={{ color: "var(--admin-text-subtle)" }}>
                  Aucun message particulier laissé par le candidat.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--admin-border)" }}>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                  Statut :
                </span>
                <select
                  value={selectedItem.status}
                  onChange={(e) =>
                    handleStatusChange(selectedItem.id, e.target.value as Registration["status"])
                  }
                  className="rounded-lg px-2.5 py-1 text-xs outline-none border cursor-pointer"
                  style={{
                    backgroundColor: "var(--admin-input-bg)",
                    border: "1px solid var(--admin-input-border)",
                    color: "var(--admin-text)",
                  }}
                >
                  <option value="nouveau">Nouveau</option>
                  <option value="contacte">Contacté</option>
                  <option value="confirme">Confirmé</option>
                  <option value="annule">Annulé</option>
                </select>
              </div>

              <a
                href={`https://wa.me/${cleanPhoneForWhatsApp(selectedItem.phone)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary text-xs cursor-pointer"
                style={{ borderRadius: "0.625rem", padding: "0.5rem 1rem" }}
              >
                Ouvrir WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
