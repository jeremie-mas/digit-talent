import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { ImageUploadInput } from "@/components/ImageUploadInput";
import { Plus, Pencil, Trash2, Globe, EyeOff, Search, FileText, X } from "lucide-react";
import {
  getAdminArticles,
  saveAdminArticle,
  deleteAdminArticle,
} from "@/lib/api/admin.data.functions";

export const Route = createFileRoute("/admin/articles")({
  head: () => ({
    meta: [
      { title: "Gestion des Articles — Admin DIGIT & TALENT" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminArticles,
});

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category: string;
  cover_url?: string;
  published: boolean;
  created_at: string;
}

function AdminArticles() {
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingArticle, setEditingArticle] = React.useState<Partial<Article> | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const loadData = React.useCallback(async () => {
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      const res = await getAdminArticles({ data: { token } });
      setArticles(res.items || []);
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
    setEditingArticle({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Actualité",
      cover_url: "",
      published: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (article: Article) => {
    setEditingArticle({ ...article });
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Supprimer définitivement l'article "${title}" ?`)) return;
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;
    try {
      await deleteAdminArticle({ data: { token, id } });
      loadData();
    } catch (err: any) {
      alert("Erreur lors de la suppression : " + err.message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle?.title || !editingArticle?.slug) return;
    setSaving(true);
    const token = localStorage.getItem("dt_admin_token");
    if (!token) return;

    try {
      await saveAdminArticle({
        data: {
          token,
          article: {
            id: editingArticle.id,
            title: editingArticle.title,
            slug: editingArticle.slug,
            excerpt: editingArticle.excerpt || "",
            content: editingArticle.content || "",
            category: editingArticle.category || "Actualité",
            cover_url: editingArticle.cover_url || "",
            published: editingArticle.published ?? true,
          },
        },
      });
      setModalOpen(false);
      setEditingArticle(null);
      loadData();
    } catch (err: any) {
      alert("Erreur lors de l'enregistrement : " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  const panelStyle = {
    backgroundColor: "var(--admin-card-bg)",
    border: "1px solid var(--admin-border)",
    borderRadius: "1rem",
    overflow: "hidden" as const,
  };

  return (
    <AdminLayout
      title="Articles & Blog"
      description="Rédigez et publiez des articles d'actualités, études de cas ou guides"
      actions={
        <button
          onClick={handleOpenCreate}
          className="btn btn-primary text-xs cursor-pointer"
          style={{ borderRadius: "0.75rem", padding: "0.6rem 1.2rem" }}
        >
          <Plus className="h-4 w-4" />
          Nouvel Article
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "var(--admin-text-subtle)" }}
            />
            <input
              type="text"
              placeholder="Rechercher par titre ou catégorie..."
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
          <span className="text-xs" style={{ color: "var(--admin-text-subtle)" }}>
            {filteredArticles.length} article(s) trouvé(s)
          </span>
        </div>

        {/* Articles Table */}
        <div style={panelStyle} className="shadow-sm">
          {loading ? (
            <div className="py-20 text-center text-sm" style={{ color: "var(--admin-text-muted)" }}>
              Chargement des articles...
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-20 text-center">
              <FileText className="mx-auto h-12 w-12 mb-3 opacity-30" />
              <p className="text-base font-semibold" style={{ color: "var(--admin-text)" }}>
                Aucun article trouvé.
              </p>
              <button
                onClick={handleOpenCreate}
                className="mt-3 text-xs font-semibold cursor-pointer hover:underline"
                style={{ color: "var(--orange)" }}
              >
                Créer votre premier article
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
                    <th className="px-6 py-4">Catégorie</th>
                    <th className="px-6 py-4">Statut</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b transition"
                      style={{ borderColor: "var(--admin-row-border)" }}
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold" style={{ color: "var(--admin-text)" }}>
                          {article.title}
                        </div>
                        <div className="text-xs font-mono mt-0.5" style={{ color: "var(--admin-text-subtle)" }}>
                          /{article.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                          style={{
                            backgroundColor: "rgba(242,106,33,0.12)",
                            color: "var(--orange)",
                            border: "1px solid rgba(242,106,33,0.3)",
                          }}
                        >
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {article.published ? (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium"
                            style={{
                              backgroundColor: "rgba(16,185,129,0.12)",
                              color: "#059669",
                              border: "1px solid rgba(16,185,129,0.3)",
                            }}
                          >
                            <Globe className="h-3 w-3" /> Publié
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
                            <EyeOff className="h-3 w-3" /> Brouillon
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs" style={{ color: "var(--admin-text-muted)" }}>
                        {new Date(article.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(article)}
                          className="rounded-lg p-1.5 transition cursor-pointer"
                          style={{ color: "var(--admin-text-muted)" }}
                          title="Modifier"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
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
      </div>

      {/* Modal Form */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: "var(--admin-modal-overlay)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-up"
            style={{
              backgroundColor: "var(--admin-card-bg)",
              border: "1px solid var(--admin-border)",
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b mb-5" style={{ borderColor: "var(--admin-border)" }}>
              <div>
                <span className="eyebrow" style={{ fontSize: "0.65rem" }}>Rédaction</span>
                <h2 className="text-lg font-bold mt-1" style={{ color: "var(--admin-text)" }}>
                  {editingArticle?.id ? "Modifier l'article" : "Créer un nouvel article"}
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
                  Titre de l'article *
                </label>
                <input
                  type="text"
                  required
                  value={editingArticle?.title || ""}
                  onChange={(e) => {
                    const title = e.target.value;
                    const autoSlug = title
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "");
                    setEditingArticle((prev) => ({
                      ...prev,
                      title,
                      slug: prev?.id ? prev.slug : autoSlug,
                    }));
                  }}
                  placeholder="Ex : Réussir sa transformation digitale en 2026"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
                    Slug URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingArticle?.slug || ""}
                    onChange={(e) =>
                      setEditingArticle((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="reussir-sa-transformation-digitale"
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
                    Catégorie
                  </label>
                  <select
                    value={editingArticle?.category || "Actualité"}
                    onChange={(e) =>
                      setEditingArticle((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition cursor-pointer"
                    style={{
                      backgroundColor: "var(--admin-input-bg)",
                      border: "1px solid var(--admin-input-border)",
                      color: "var(--admin-text)",
                    }}
                  >
                    <option value="Actualité">Actualité</option>
                    <option value="Transformation Digitale">Transformation Digitale</option>
                    <option value="Management & RH">Management &amp; RH</option>
                    <option value="Formation PMP/CAPM">Formation PMP / CAPM</option>
                    <option value="Cybersécurité">Cybersécurité</option>
                  </select>
                </div>
              </div>

              <ImageUploadInput
                label="Image de couverture de l'article"
                value={editingArticle?.cover_url || ""}
                onChange={(url) => setEditingArticle((prev) => ({ ...prev, cover_url: url }))}
                folder="articles"
                recommendation="Format recommandé : 1200×630px en JPG ou WebP."
              />

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "var(--admin-text-muted)" }}>
                  Extrait (résumé court)
                </label>
                <textarea
                  rows={2}
                  value={editingArticle?.excerpt || ""}
                  onChange={(e) =>
                    setEditingArticle((prev) => ({ ...prev, excerpt: e.target.value }))
                  }
                  placeholder="Bref aperçu affiché sur les cartes d'articles..."
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
                  Contenu complet de l'article
                </label>
                <textarea
                  rows={6}
                  value={editingArticle?.content || ""}
                  onChange={(e) =>
                    setEditingArticle((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Écrivez le contenu ici..."
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
                  id="published"
                  checked={editingArticle?.published ?? true}
                  onChange={(e) =>
                    setEditingArticle((prev) => ({ ...prev, published: e.target.checked }))
                  }
                  className="h-4 w-4 rounded cursor-pointer"
                  style={{ accentColor: "var(--orange)" }}
                />
                <label htmlFor="published" className="text-sm font-medium cursor-pointer" style={{ color: "var(--admin-text)" }}>
                  Publier immédiatement cet article
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
