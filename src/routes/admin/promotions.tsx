import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { ImageUploadInput } from "@/components/ImageUploadInput";
import {
  Plus,
  Pencil,
  Trash2,
  ImageIcon,
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Eye,
  EyeOff,
  X,
  Check,
  Megaphone,
  GraduationCap,
} from "lucide-react";

import {
  getAdminBanners,
  upsertAdminBanner,
  deleteAdminBanner,
  getAdminSessions,
  upsertAdminSession,
  deleteAdminSession,
} from "@/lib/api/admin.data.functions";

export const Route = createFileRoute("/admin/promotions")({
  head: () => ({
    meta: [
      { title: "Promotions & Sessions — Admin DIGIT & TALENT" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPromotions,
});

// ──────────────────────────── TYPES ────────────────────────────
interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image_url?: string;
  cta_label?: string;
  cta_url?: string;
  sort_order: number;
  active: boolean;
  created_at?: string;
}

interface TrainingSession {
  id: string;
  course_title: string;
  session_date: string;
  location?: string;
  seats_available?: number;
  active: boolean;
  created_at?: string;
}

const FLAGSHIP_COURSES = [
  "Certification PMP® (Project Management Professional)",
  "Certification CAPM® (Certified Associate in Project Management)",
  "Conduite du Changement Organisationnel (Prosci & ADKAR)",
  "Transformation Digitale & IA Générative pour Managers",
  "Formation Sur Mesure / Intra-Entreprise",
];

// ──────────────────────────── STYLES utilitaires ────────────────────────────
const inputCls =
  "w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2";
const labelCls = "block text-xs font-semibold uppercase tracking-wider mb-1.5";

// ──────────────────────────── MAIN COMPONENT ────────────────────────────
function AdminPromotions() {
  const [activeTab, setActiveTab] = React.useState<"banners" | "sessions">("banners");

  return (
    <AdminLayout
      title="Promotions & Sessions"
      description="Gérez les visuels publicitaires et les sessions de formation avec compte à rebours sur la page d'accueil."
    >
      {/* Onglets */}
      <div
        className="flex gap-2 mb-6 p-1 rounded-xl w-fit"
        style={{ backgroundColor: "var(--admin-card-subtle)", border: "1px solid var(--admin-border)" }}
      >
        {([
          { id: "banners", label: "Bannières & Visuels", icon: Megaphone },
          { id: "sessions", label: "Sessions planifiées", icon: Calendar },
        ] as const).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
            style={{
              backgroundColor: activeTab === id ? "var(--orange)" : "transparent",
              color: activeTab === id ? "white" : "var(--admin-text-subtle)",
            }}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === "banners" ? <BannersTab /> : <SessionsTab />}
    </AdminLayout>
  );
}

// ══════════════════════════════════════════════════════════════════
// ONGLET BANNIÈRES
// ══════════════════════════════════════════════════════════════════
function BannersTab() {
  const [banners, setBanners] = React.useState<Banner[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Partial<Banner> | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      const res = await getAdminBanners({ data: { token } });
      setBanners((res.banners as Banner[]) || []);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing({
      title: "",
      subtitle: "",
      image_url: "",
      cta_label: "En savoir plus",
      cta_url: "/formation",
      sort_order: banners.length,
      active: true,
    });
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (b: Banner) => {
    setEditing({ ...b });
    setError(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer la bannière "${title}" ?`)) return;
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      await deleteAdminBanner({ data: { token, id } });
      await load();
    } catch (e: any) {
      alert("Erreur : " + e.message);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      await upsertAdminBanner({
        data: {
          token,
          banner: {
            ...(editing.id ? { id: editing.id } : {}),
            title: editing.title || "",
            subtitle: editing.subtitle,
            image_url: editing.image_url,
            cta_label: editing.cta_label,
            cta_url: editing.cta_url,
            sort_order: editing.sort_order ?? 0,
            active: editing.active ?? true,
          },
        },
      });
      setModalOpen(false);
      await load();
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold" style={{ color: "var(--admin-text)" }}>
            Bannières publicitaires
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--admin-text-subtle)" }}>
            Visibles en carousel sur la page d'accueil. Minimum 3 recommandées.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer transition hover:opacity-90"
          style={{ backgroundColor: "var(--orange)" }}
        >
          <Plus className="h-4 w-4" />
          Ajouter une bannière
        </button>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: "var(--orange)", borderTopColor: "transparent" }} />
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border" style={{ borderColor: "var(--admin-border)", backgroundColor: "var(--admin-card-subtle)" }}>
          <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" style={{ color: "var(--admin-text-subtle)" }} />
          <p className="text-sm font-medium" style={{ color: "var(--admin-text-subtle)" }}>
            Aucune bannière. Les 3 visuels de repli sont affichés.
          </p>
          <button type="button" onClick={openCreate} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer" style={{ backgroundColor: "var(--orange)" }}>
            <Plus className="h-4 w-4" /> Ajouter
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {banners.map((b) => (
            <div
              key={b.id}
              className="flex items-center gap-4 p-4 rounded-xl border transition"
              style={{ backgroundColor: "var(--admin-card)", borderColor: "var(--admin-border)" }}
            >
              {/* Aperçu image ou gradient */}
              <div className="shrink-0 h-16 w-28 rounded-lg overflow-hidden border" style={{ borderColor: "var(--admin-border)" }}>
                {b.image_url ? (
                  <img src={b.image_url} alt={b.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0A2540, #1a4a8a)" }}>
                    <Megaphone className="h-6 w-6 text-white/40" />
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm truncate" style={{ color: "var(--admin-text)" }}>{b.title}</p>
                  <span
                    className="shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ backgroundColor: b.active ? "rgba(16,185,129,0.15)" : "rgba(100,116,139,0.15)", color: b.active ? "#10b981" : "#64748b" }}
                  >
                    {b.active ? <Eye className="h-2.5 w-2.5" /> : <EyeOff className="h-2.5 w-2.5" />}
                    {b.active ? "Active" : "Inactive"}
                  </span>
                </div>
                {b.subtitle && <p className="text-xs mt-0.5 truncate" style={{ color: "var(--admin-text-subtle)" }}>{b.subtitle}</p>}
                {b.cta_url && (
                  <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "var(--admin-text-subtle)" }}>
                    <ArrowRight className="h-3 w-3" /> {b.cta_url}
                  </p>
                )}
                <p className="text-[10px] mt-1" style={{ color: "var(--admin-text-subtle)" }}>Ordre : {b.sort_order}</p>
              </div>

              {/* Actions */}
              <div className="shrink-0 flex items-center gap-2">
                <button type="button" onClick={() => openEdit(b)} title="Modifier" className="p-2 rounded-lg border transition cursor-pointer hover:opacity-80" style={{ backgroundColor: "var(--admin-card-subtle)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}>
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => handleDelete(b.id, b.title)} title="Supprimer" className="p-2 rounded-lg border transition cursor-pointer hover:opacity-80" style={{ backgroundColor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden" style={{ backgroundColor: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
            {/* En-tête modal */}
            <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: "var(--admin-border)" }}>
              <div>
                <h3 className="font-bold text-base" style={{ color: "var(--admin-text)" }}>{editing.id ? "Modifier la bannière" : "Nouvelle bannière"}</h3>
                <p className="text-xs mt-0.5" style={{ color: "var(--admin-text-subtle)" }}>Les champs marqués * sont obligatoires.</p>
              </div>
              <button type="button" onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg transition cursor-pointer" style={{ color: "var(--admin-text-subtle)" }}><X className="h-5 w-5" /></button>
            </div>

            {/* Corps scrollable */}
            <form id="banner-form" onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {error && <div className="rounded-xl border p-3 text-xs" style={{ backgroundColor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>{error}</div>}

              <div>
                <label className={labelCls} style={{ color: "var(--admin-text-subtle)" }}>Titre *</label>
                <input required type="text" value={editing.title || ""} onChange={(e) => setEditing((p) => ({ ...p, title: e.target.value }))}
                  className={inputCls} style={{ backgroundColor: "var(--admin-input)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}
                  placeholder="Ex : PMP® — Inscriptions ouvertes" />
              </div>

              <div>
                <label className={labelCls} style={{ color: "var(--admin-text-subtle)" }}>Sous-titre</label>
                <textarea rows={2} value={editing.subtitle || ""} onChange={(e) => setEditing((p) => ({ ...p, subtitle: e.target.value }))}
                  className={inputCls + " resize-y"} style={{ backgroundColor: "var(--admin-input)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}
                  placeholder="Description courte visible dans la bannière..." />
              </div>

              <ImageUploadInput
                label="Visuel / Image de la bannière (optionnel)"
                value={editing.image_url || ""}
                onChange={(url) => setEditing((p) => ({ ...p, image_url: url }))}
                folder="banners"
                recommendation="Format recommandé : 1920×600px en WebP ou JPG (si vide, un fond dégradé officiel est utilisé)."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} style={{ color: "var(--admin-text-subtle)" }}>Texte du bouton CTA</label>
                  <input type="text" value={editing.cta_label || ""} onChange={(e) => setEditing((p) => ({ ...p, cta_label: e.target.value }))}
                    className={inputCls} style={{ backgroundColor: "var(--admin-input)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}
                    placeholder="Ex : S'inscrire" />
                </div>
                <div>
                  <label className={labelCls} style={{ color: "var(--admin-text-subtle)" }}>Lien du bouton CTA</label>
                  <input type="text" value={editing.cta_url || ""} onChange={(e) => setEditing((p) => ({ ...p, cta_url: e.target.value }))}
                    className={inputCls} style={{ backgroundColor: "var(--admin-input)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}
                    placeholder="Ex : /formation" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} style={{ color: "var(--admin-text-subtle)" }}>Ordre d'affichage</label>
                  <input type="number" min={0} value={editing.sort_order ?? 0} onChange={(e) => setEditing((p) => ({ ...p, sort_order: Number(e.target.value) }))}
                    className={inputCls} style={{ backgroundColor: "var(--admin-input)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }} />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setEditing((p) => ({ ...p, active: !p?.active }))}
                      className="relative h-6 w-11 rounded-full transition-colors cursor-pointer shrink-0"
                      style={{ backgroundColor: editing.active ? "var(--orange)" : "var(--admin-border)" }}
                    >
                      <span
                        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                        style={{ transform: editing.active ? "translateX(20px)" : "translateX(2px)" }}
                      />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>
                      {editing.active ? "Bannière active" : "Bannière inactive"}
                    </span>
                  </label>
                </div>
              </div>
            </form>

            {/* Pied */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t shrink-0" style={{ borderColor: "var(--admin-border)" }}>
              <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium border transition cursor-pointer" style={{ borderColor: "var(--admin-border)", color: "var(--admin-text)", backgroundColor: "var(--admin-card-subtle)" }}>
                Annuler
              </button>
              <button
                type="submit"
                form="banner-form"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition cursor-pointer disabled:opacity-50 hover:opacity-90"
                style={{ backgroundColor: "var(--orange)" }}
              >
                {saving ? (
                  <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /><span>Enregistrement...</span></>
                ) : (
                  <><Check className="h-4 w-4" /><span>Enregistrer</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════════
// ONGLET SESSIONS PLANIFIÉES
// ══════════════════════════════════════════════════════════════════
function SessionsTab() {
  const [sessions, setSessions] = React.useState<TrainingSession[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Partial<TrainingSession> | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      const res = await getAdminSessions({ data: { token } });
      setSessions((res.sessions as TrainingSession[]) || []);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    const next7days = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 16);
    setEditing({
      course_title: FLAGSHIP_COURSES[0],
      session_date: next7days,
      location: "Lomé, Togo",
      seats_available: 20,
      active: true,
    });
    setError(null);
    setModalOpen(true);
  };

  const openEdit = (s: TrainingSession) => {
    setEditing({ ...s, session_date: s.session_date.slice(0, 16) });
    setError(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer la session "${title}" ?`)) return;
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      await deleteAdminSession({ data: { token, id } });
      await load();
    } catch (e: any) {
      alert("Erreur : " + e.message);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    setSaving(true);
    setError(null);
    try {
      await upsertAdminSession({
        data: {
          token,
          session: {
            ...(editing.id ? { id: editing.id } : {}),
            course_title: editing.course_title || "",
            session_date: editing.session_date || "",
            location: editing.location || "Lomé, Togo",
            seats_available: editing.seats_available ?? 20,
            active: editing.active ?? true,
          },
        },
      });
      setModalOpen(false);
      await load();
    } catch (e: any) {
      setError(e.message || "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
    } catch {
      return iso;
    }
  };

  const isFuture = (iso: string) => new Date(iso).getTime() > Date.now();

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold" style={{ color: "var(--admin-text)" }}>
            Sessions de formation planifiées
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--admin-text-subtle)" }}>
            Les sessions futures actives affichent un compte à rebours en temps réel sur la page d'accueil.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer transition hover:opacity-90"
          style={{ backgroundColor: "var(--orange)" }}
        >
          <Plus className="h-4 w-4" />
          Planifier une session
        </button>
      </div>

      {/* Info banner */}
      <div className="mb-5 flex items-start gap-3 p-3.5 rounded-xl border" style={{ backgroundColor: "rgba(242,106,33,0.08)", borderColor: "rgba(242,106,33,0.25)" }}>
        <Clock className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--orange)" }} />
        <p className="text-xs leading-relaxed" style={{ color: "var(--admin-text-subtle)" }}>
          Seules les sessions <strong style={{ color: "var(--admin-text)" }}>actives</strong> et dont la date est dans le <strong style={{ color: "var(--admin-text)" }}>futur</strong> seront visibles sur le site. La plus prochaine est affichée en priorité.
        </p>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" style={{ borderColor: "var(--orange)", borderTopColor: "transparent" }} />
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border" style={{ borderColor: "var(--admin-border)", backgroundColor: "var(--admin-card-subtle)" }}>
          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" style={{ color: "var(--admin-text-subtle)" }} />
          <p className="text-sm font-medium" style={{ color: "var(--admin-text-subtle)" }}>
            Aucune session planifiée. Le compte à rebours n'apparaît pas sur le site.
          </p>
          <button type="button" onClick={openCreate} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer" style={{ backgroundColor: "var(--orange)" }}>
            <Plus className="h-4 w-4" /> Planifier
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((s) => {
            const future = isFuture(s.session_date);
            return (
              <div
                key={s.id}
                className="flex items-start gap-4 p-4 rounded-xl border transition"
                style={{ backgroundColor: "var(--admin-card)", borderColor: s.active && future ? "rgba(242,106,33,0.35)" : "var(--admin-border)" }}
              >
                {/* Icône */}
                <div className="shrink-0 h-12 w-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.active && future ? "rgba(242,106,33,0.15)" : "var(--admin-card-subtle)" }}>
                  <GraduationCap className="h-6 w-6" style={{ color: s.active && future ? "var(--orange)" : "var(--admin-text-subtle)" }} />
                </div>

                {/* Infos */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-sm truncate" style={{ color: "var(--admin-text)" }}>{s.course_title}</p>
                    <span
                      className="shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{
                        backgroundColor: s.active && future ? "rgba(242,106,33,0.15)" : "rgba(100,116,139,0.15)",
                        color: s.active && future ? "var(--orange)" : "#64748b",
                      }}
                    >
                      {s.active && future ? "⏱ En attente" : s.active && !future ? "✓ Passée" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: "var(--admin-text-subtle)" }}>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(s.session_date)}</span>
                    {s.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{s.location}</span>}
                    {(s.seats_available ?? 0) > 0 && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{s.seats_available} places</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0 flex items-center gap-2">
                  <button type="button" onClick={() => openEdit(s)} title="Modifier" className="p-2 rounded-lg border transition cursor-pointer hover:opacity-80" style={{ backgroundColor: "var(--admin-card-subtle)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => handleDelete(s.id, s.course_title)} title="Supprimer" className="p-2 rounded-lg border transition cursor-pointer hover:opacity-80" style={{ backgroundColor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalOpen && editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }} onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden" style={{ backgroundColor: "var(--admin-card)", borderColor: "var(--admin-border)" }}>
            {/* En-tête */}
            <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: "var(--admin-border)" }}>
              <h3 className="font-bold text-base" style={{ color: "var(--admin-text)" }}>{editing.id ? "Modifier la session" : "Planifier une session"}</h3>
              <button type="button" onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg transition cursor-pointer" style={{ color: "var(--admin-text-subtle)" }}><X className="h-5 w-5" /></button>
            </div>

            {/* Corps */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {error && <div className="rounded-xl border p-3 text-xs" style={{ backgroundColor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }}>{error}</div>}

              <div>
                <label className={labelCls} style={{ color: "var(--admin-text-subtle)" }}>Formation *</label>
                <select required value={editing.course_title || ""} onChange={(e) => setEditing((p) => ({ ...p, course_title: e.target.value }))}
                  className={inputCls} style={{ backgroundColor: "var(--admin-input)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}>
                  {FLAGSHIP_COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls} style={{ color: "var(--admin-text-subtle)" }}>Date et heure de début *</label>
                <input required type="datetime-local" value={editing.session_date || ""} onChange={(e) => setEditing((p) => ({ ...p, session_date: e.target.value }))}
                  className={inputCls} style={{ backgroundColor: "var(--admin-input)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls} style={{ color: "var(--admin-text-subtle)" }}>Lieu</label>
                  <input type="text" value={editing.location || "Lomé, Togo"} onChange={(e) => setEditing((p) => ({ ...p, location: e.target.value }))}
                    className={inputCls} style={{ backgroundColor: "var(--admin-input)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }}
                    placeholder="Ex : Lomé, Togo / En ligne" />
                </div>
                <div>
                  <label className={labelCls} style={{ color: "var(--admin-text-subtle)" }}>Places disponibles</label>
                  <input type="number" min={0} max={9999} value={editing.seats_available ?? 20} onChange={(e) => setEditing((p) => ({ ...p, seats_available: Number(e.target.value) }))}
                    className={inputCls} style={{ backgroundColor: "var(--admin-input)", borderColor: "var(--admin-border)", color: "var(--admin-text)" }} />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div
                  onClick={() => setEditing((p) => ({ ...p, active: !p?.active }))}
                  className="relative h-6 w-11 rounded-full transition-colors cursor-pointer shrink-0"
                  style={{ backgroundColor: editing.active ? "var(--orange)" : "var(--admin-border)" }}
                >
                  <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform" style={{ transform: editing.active ? "translateX(20px)" : "translateX(2px)" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>
                  {editing.active ? "Session active (visible sur le site)" : "Session inactive (cachée)"}
                </span>
              </div>
            </form>

            {/* Pied */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t shrink-0" style={{ borderColor: "var(--admin-border)" }}>
              <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium border transition cursor-pointer" style={{ borderColor: "var(--admin-border)", color: "var(--admin-text)", backgroundColor: "var(--admin-card-subtle)" }}>
                Annuler
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={(e) => {
                  const modal = (e.currentTarget.closest(".fixed") as HTMLElement | null);
                  const form = modal?.querySelector("form");
                  form?.requestSubmit();
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white transition cursor-pointer disabled:opacity-50 hover:opacity-90"
                style={{ backgroundColor: "var(--orange)" }}
              >
                {saving ? (
                  <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /><span>Enregistrement...</span></>
                ) : (
                  <><Check className="h-4 w-4" /><span>Enregistrer</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
