import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Reveal } from "@/components/Reveal";
import { imagery } from "@/assets/imagery";
import {
  Search,
  Calendar,
  ArrowRight,
  BookOpen,
  Sparkles,
  Tag,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getPublicArticles,
  type PublicArticle,
  FALLBACK_ARTICLES,
} from "@/lib/api/public.data.functions";
import { useT } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog & News — DIGIT & TALENT" },
      {
        name: "description",
        content:
          "Articles, analysis and guides on project management (PMP/CAPM), digital transformation and talent management in Africa.",
      },
      { property: "og:title", content: "Blog & News — DIGIT & TALENT" },
      {
        property: "og:description",
        content: "Insights, guides and field experience from DIGIT & TALENT experts.",
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { t, lang } = useT();
  const [articles, setArticles] = useState<PublicArticle[]>(FALLBACK_ARTICLES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    getPublicArticles()
      .then((res) => {
        if (res?.items && res.items.length > 0) {
          setArticles(res.items);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement articles:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categories = [
    "all",
    ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean))),
  ];

  const filteredArticles = articles.filter((a) => {
    const matchesCat =
      selectedCategory === "all" || a.category === selectedCategory;
    const term = search.toLowerCase();
    const matchesSearch =
      a.title.toLowerCase().includes(term) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(term)) ||
      a.category.toLowerCase().includes(term);
    return matchesCat && matchesSearch;
  });

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy-deep py-24 pb-16 text-white pt-[150px]">
        <img
          src={imagery.technicianServer}
          alt={t("blog.hero.eyebrow")}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/50" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow animate-fade-in-soft">{t("blog.hero.eyebrow")}</p>
          <h1
            className="animate-fade-up mt-5 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl text-white"
            style={{ animationDelay: "120ms" }}
          >
            {t("blog.hero.title")}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
            style={{ animationDelay: "240ms" }}
          >
            {t("blog.hero.desc")}
          </p>
        </div>
        <Breadcrumb crumbs={[{ label: t("blog.hero.title") }]} />
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {/* Search & Categories Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-12">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? "bg-accent text-white shadow-sm"
                    : "bg-secondary text-foreground/75 hover:bg-secondary/80"
                }`}
              >
                {cat === "all" ? t("blog.allCategories") : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("blog.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="py-20 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
            <h3 className="text-lg font-bold text-foreground">{t("blog.noResults")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("blog.noResultsDesc")}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article, idx) => (
              <Reveal key={article.id} delay={idx * 80}>
                <article className="card-surface card-interactive group flex flex-col h-full overflow-hidden rounded-2xl border border-border">
                  {/* Cover Image */}
                  <Link
                    to={`/blog/${article.slug}` as any}
                    className="relative aspect-[16/10] overflow-hidden bg-secondary block"
                  >
                    {article.cover_url ? (
                      <img
                        src={article.cover_url}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-navy text-accent">
                        <BookOpen className="h-10 w-10 opacity-40" />
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-navy/90 border border-white/10 px-3 py-1 text-[11px] font-semibold text-accent backdrop-blur-sm">
                      {article.category}
                    </span>
                  </Link>

                  {/* Body */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>
                          {new Date(article.created_at).toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
                        <Link to={`/blog/${article.slug}` as any}>
                          {article.title}
                        </Link>
                      </h2>

                      {article.excerpt && (
                        <p className="mt-2.5 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/60">
                      <Link
                        to={`/blog/${article.slug}` as any}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition group-hover:gap-2.5"
                      >
                        <span>{t("blog.readArticle")}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
