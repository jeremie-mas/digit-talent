import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { AdminLayout } from "@/components/AdminLayout";
import {
  Newspaper,
  Users,
  Cpu,
  Briefcase,
  Mail,
  GraduationCap,
  Plus,
  ArrowRight,
  AlertTriangle,
  Trash2,
  Check,
  Sparkles,
  Megaphone,
  Loader2,
} from "lucide-react";
import {
  getAdminStats,
  markContactSubmissionRead,
  deleteContactSubmission,
  seedDefaultAdminContent,
} from "@/lib/api/admin.data.functions";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — Admin DIGIT & TALENT" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

/** Palette brand pour les KPI cards */
const kpiColors = [
  { bg: "rgba(242,106,33,0.12)", border: "rgba(242,106,33,0.3)", icon: "var(--orange)" },
  { bg: "rgba(37,99,235,0.12)", border: "rgba(37,99,235,0.3)", icon: "var(--blue)" },
  { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)", icon: "#6366f1" },
  { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", icon: "#10b981" },
  { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", icon: "#f59e0b" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    nouveau: { bg: "rgba(242,106,33,0.15)", color: "var(--orange)", label: "Nouveau" },
    contacte: { bg: "rgba(245,158,11,0.15)", color: "#d97706", label: "Contacté" },
    confirme: { bg: "rgba(16,185,129,0.15)", color: "#059669", label: "Confirmé" },
    annule: { bg: "rgba(239,68,68,0.15)", color: "#dc2626", label: "Annulé" },
  };
  const s = map[status] ?? { bg: "rgba(100,116,139,0.15)", color: "#64748b", label: status };
  return (
    <span
      className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
      style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.color}40` }}
    >
      {s.label}
    </span>
  );
}

function AdminDashboard() {
  const [data, setData] = React.useState<{
    configured: boolean;
    stats: {
      articlesCount: number;
      teamCount: number;
      servicesCount: number;
      projectsCount: number;
      contactsCount: number;
      unreadContactsCount: number;
      trainingsCount?: number;
      newTrainingsCount?: number;
      bannersCount?: number;
    };
    recentContacts: any[];
    recentTrainings?: any[];
  } | null>(null);
  const [loading, setLoading] = React.useState(true);

  const loadStats = React.useCallback(async () => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      const res = await getAdminStats({ data: { token } });
      setData(res as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadStats();
  }, [loadStats]);

  const [seeding, setSeeding] = React.useState(false);
  const [seedNotice, setSeedNotice] = React.useState<string | null>(null);

  const handleSeed = async (force = false) => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    setSeeding(true);
    setSeedNotice(null);
    try {
      const res = await seedDefaultAdminContent({ data: { token, force } });
      if (res.success) {
        setSeedNotice("Tous les contenus du site (services, projets, équipe, articles, bannières) ont été synchronisés avec succès !");
        await loadStats();
      }
    } catch (err: any) {
      alert("Erreur lors de la synchronisation : " + (err.message || "Erreur"));
    } finally {
      setSeeding(false);
    }
  };

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    await markContactSubmissionRead({ data: { token, id, read: !currentRead } });
    loadStats();
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce message ?")) return;
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    await deleteContactSubmission({ data: { token, id } });
    loadStats();
  };

  const kpis = [
    {
      label: "Inscriptions Formations",
      count: data?.stats.trainingsCount ?? 0,
      newCount: data?.stats.newTrainingsCount ?? 0,
      icon: GraduationCap,
      href: "/admin/formations",
    },
    {
      label: "Articles de Blog",
      count: data?.stats.articlesCount ?? 0,
      icon: Newspaper,
      href: "/admin/articles",
    },
    {
      label: "Membres d'Équipe",
      count: data?.stats.teamCount ?? 0,
      icon: Users,
      href: "/admin/team",
    },
    {
      label: "Services Offerts",
      count: data?.stats.servicesCount ?? 0,
      icon: Cpu,
      href: "/admin/services",
    },
    {
      label: "Projets & Références",
      count: data?.stats.projectsCount ?? 0,
      icon: Briefcase,
      href: "/admin/projects",
    },
    {
      label: "Bannières & Promos",
      count: data?.stats.bannersCount ?? 0,
      icon: Megaphone,
      href: "/admin/promotions",
    },
  ];

  const panelStyle = {
    backgroundColor: "var(--admin-card-bg)",
    border: "1px solid var(--admin-border)",
    borderRadius: "1rem",
  };

  return (
    <AdminLayout
      title="Tableau de bord"
      description="Vue d'ensemble de vos contenus et des messages reçus sur le site web"
      actions={
        <button
          type="button"
          disabled={seeding}
          onClick={() => handleSeed(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white transition cursor-pointer hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "var(--orange)" }}
          title="Importer tous les contenus du site (services, projets, articles, bannières, équipe)"
        >
          {seeding ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Importation...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Importer les contenus du site</span>
            </>
          )}
        </button>
      }
    >
      <div className="space-y-6">
        {/* Message de succès synchronisation */}
        {seedNotice && (
          <div
            className="rounded-xl p-4 border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium"
            style={{ backgroundColor: "rgba(16,185,129,0.12)", borderColor: "rgba(16,185,129,0.3)", color: "#059669" }}
          >
            <div className="flex items-center gap-2.5">
              <Check className="h-4 w-4 shrink-0" />
              <span>{seedNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setSeedNotice(null)}
              className="text-xs underline cursor-pointer hover:opacity-80"
            >
              Fermer
            </button>
          </div>
        )}


        {/* Supabase Status Banner */}
        {data && !data.configured && (
          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "#b45309",
            }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-500" />
              <div>
                <h3 className="font-semibold text-sm">
                  Base de données Supabase non connectée
                </h3>
                <p className="mt-1 text-xs leading-relaxed opacity-90">
                  Pour activer la persistance réelle des contenus, ajoutez vos identifiants{" "}
                  <code
                    className="px-1.5 py-0.5 rounded font-mono text-[11px]"
                    style={{ backgroundColor: "rgba(245,158,11,0.2)" }}
                  >
                    SUPABASE_URL
                  </code>{" "}
                  et{" "}
                  <code
                    className="px-1.5 py-0.5 rounded font-mono text-[11px]"
                    style={{ backgroundColor: "rgba(245,158,11,0.2)" }}
                  >
                    SUPABASE_SERVICE_ROLE_KEY
                  </code>{" "}
                  dans votre fichier <code className="font-mono">.env</code>, puis exécutez le script SQL dans{" "}
                  <code className="font-mono" style={{ color: "var(--orange)" }}>
                    supabase/schema.sql
                  </code>
                  .
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            const c = kpiColors[i % kpiColors.length];
            return (
              <Link
                key={kpi.label}
                to={kpi.href}
                className="group relative overflow-hidden rounded-xl p-5 transition-all shadow-sm hover:shadow-md"
                style={{
                  backgroundColor: "var(--admin-card-bg)",
                  border: "1px solid var(--admin-border)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: c.icon }} />
                  </div>
                  <span className="text-3xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
                    {loading ? "—" : kpi.count}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: "var(--admin-text-muted)" }}>
                    {kpi.label}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    style={{ color: "var(--orange)" }}
                  />
                </div>
                {(kpi as any).newCount > 0 && (
                  <span
                    className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ backgroundColor: "var(--orange)", color: "white" }}
                  >
                    {(kpi as any).newCount} new
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="p-6 shadow-sm" style={panelStyle}>
          <p className="eyebrow mb-4">Actions Rapides</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { to: "/admin/articles", label: "Ajouter un article", icon: Newspaper },
              { to: "/admin/team", label: "Ajouter un membre", icon: Users },
              { to: "/admin/services", label: "Gérer les services", icon: Cpu },
              { to: "/admin/projects", label: "Ajouter un projet", icon: Briefcase },
            ].map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 rounded-xl p-3.5 text-sm font-medium transition-all"
                style={{
                  backgroundColor: "var(--admin-card-subtle)",
                  border: "1px solid var(--admin-border)",
                  color: "var(--admin-text)",
                }}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
                  style={{ backgroundColor: "rgba(242,106,33,0.12)" }}
                >
                  <Plus className="h-4 w-4" style={{ color: "var(--orange)" }} />
                </div>
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Training registrations */}
        <div className="p-6 shadow-sm" style={panelStyle}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="eyebrow mb-1">Inscriptions aux Formations</p>
              <p className="text-base font-semibold" style={{ color: "var(--admin-text)" }}>
                Dernières demandes reçues
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--admin-text-subtle)" }}>
                {data?.stats.newTrainingsCount ?? 0} nouvelle(s) en attente
              </p>
            </div>
            <Link
              to="/admin/formations"
              className="text-xs font-semibold flex items-center gap-1 transition hover:underline"
              style={{ color: "var(--orange)" }}
            >
              Tout voir <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {!data?.recentTrainings || data.recentTrainings.length === 0 ? (
            <div
              className="rounded-xl py-10 text-center"
              style={{ border: "1px dashed var(--admin-border)" }}
            >
              <GraduationCap className="mx-auto h-8 w-8 mb-2 opacity-30" />
              <p className="text-sm" style={{ color: "var(--admin-text-muted)" }}>
                Aucune inscription aux formations pour le moment.
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--admin-text-subtle)" }}>
                Les candidatures envoyées depuis la page{" "}
                <code style={{ color: "var(--orange)" }}>/formation</code> apparaîtront ici.
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--admin-row-border)" }}>
              {data.recentTrainings.map((tr: any) => (
                <div key={tr.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: "var(--admin-text)" }}>
                        {tr.full_name}
                      </span>
                      <span className="text-xs font-medium" style={{ color: "var(--orange)" }}>
                        ({tr.training_course})
                      </span>
                    </div>
                    <div className="text-xs mt-0.5 flex flex-wrap gap-x-3" style={{ color: "var(--admin-text-muted)" }}>
                      <span>{tr.email}</span>
                      <span>{tr.phone}</span>
                      {tr.company && <span>{tr.company}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={tr.status} />
                    <Link
                      to="/admin/formations"
                      className="text-xs transition hover:underline"
                      style={{ color: "var(--admin-text-subtle)" }}
                    >
                      Détails →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact submissions */}
        <div id="messages" className="p-6 shadow-sm" style={panelStyle}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="eyebrow mb-1">Messages de Contact</p>
              <p className="text-base font-semibold" style={{ color: "var(--admin-text)" }}>
                Formulaire de contact du site
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--admin-text-subtle)" }}>
                {data?.stats.unreadContactsCount ?? 0} message(s) non lu(s)
              </p>
            </div>
            <button
              onClick={loadStats}
              className="text-xs font-semibold transition hover:underline cursor-pointer"
              style={{ color: "var(--orange)" }}
            >
              Actualiser
            </button>
          </div>

          {loading ? (
            <div className="py-10 text-center text-sm" style={{ color: "var(--admin-text-muted)" }}>
              Chargement des messages...
            </div>
          ) : !data?.recentContacts || data.recentContacts.length === 0 ? (
            <div
              className="rounded-xl py-10 text-center"
              style={{ border: "1px dashed var(--admin-border)" }}
            >
              <Mail className="mx-auto h-8 w-8 mb-2 opacity-30" />
              <p className="text-sm" style={{ color: "var(--admin-text-muted)" }}>
                Aucun message de contact enregistré pour le moment.
              </p>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "var(--admin-row-border)" }}>
              {data.recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="py-4 flex flex-col md:flex-row md:items-start justify-between gap-4 transition rounded-xl"
                  style={!contact.read ? { backgroundColor: "rgba(242,106,33,0.06)", padding: "1rem" } : {}}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: "var(--admin-text)" }}>
                        {contact.name}
                      </span>
                      {contact.company && (
                        <span
                          className="rounded px-2 py-0.5 text-[11px]"
                          style={{
                            backgroundColor: "var(--admin-card-subtle)",
                            color: "var(--admin-text-muted)",
                            border: "1px solid var(--admin-border)",
                          }}
                        >
                          {contact.company}
                        </span>
                      )}
                      {!contact.read && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{ backgroundColor: "rgba(242,106,33,0.15)", color: "var(--orange)" }}
                        >
                          Nouveau
                        </span>
                      )}
                    </div>
                    <div className="text-xs flex flex-wrap gap-x-4 gap-y-1" style={{ color: "var(--admin-text-muted)" }}>
                      <span>
                        Email :{" "}
                        <a href={`mailto:${contact.email}`} className="hover:underline" style={{ color: "var(--orange)" }}>
                          {contact.email}
                        </a>
                      </span>
                      {contact.phone && <span>Tél : {contact.phone}</span>}
                      <span>
                        Sujet : <strong style={{ color: "var(--admin-text)" }}>{contact.subject}</strong>
                      </span>
                    </div>
                    <p
                      className="text-xs mt-2 p-2.5 rounded-lg max-w-2xl whitespace-pre-wrap leading-relaxed"
                      style={{
                        backgroundColor: "var(--admin-card-subtle)",
                        border: "1px solid var(--admin-border)",
                        color: "var(--admin-text)",
                      }}
                    >
                      {contact.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleRead(contact.id, contact.read)}
                      title={contact.read ? "Marquer comme non lu" : "Marquer comme lu"}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium border transition flex items-center gap-1.5 cursor-pointer"
                      style={
                        contact.read
                          ? { borderColor: "var(--admin-border)", color: "var(--admin-text-muted)", backgroundColor: "var(--admin-card-subtle)" }
                          : {
                              borderColor: "rgba(242,106,33,0.4)",
                              backgroundColor: "rgba(242,106,33,0.1)",
                              color: "var(--orange)",
                            }
                      }
                    >
                      <Check className="h-3.5 w-3.5" />
                      {contact.read ? "Lu" : "Marquer lu"}
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      title="Supprimer"
                      className="rounded-lg p-2 transition cursor-pointer"
                      style={{ color: "var(--admin-text-subtle)" }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
