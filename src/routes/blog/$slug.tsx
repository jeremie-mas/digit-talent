import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getPublicArticleBySlug,
  type PublicArticle,
  FALLBACK_ARTICLES,
} from "@/lib/api/public.data.functions";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<PublicArticle | null>(() => {
    return FALLBACK_ARTICLES.find((a) => a.slug === slug) || null;
  });
  const [loading, setLoading] = useState(!article);

  useEffect(() => {
    getPublicArticleBySlug({ data: { slug } })
      .then((res) => {
        if (res.article) {
          setArticle(res.article);
        }
      })
      .catch((err) => {
        console.error("Erreur article:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <SiteLayout>
        <div className="py-40 text-center text-muted-foreground">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent mb-4" />
          <p className="text-sm">Chargement de l'article...</p>
        </div>
      </SiteLayout>
    );
  }

  if (!article) {
    return (
      <SiteLayout>
        <div className="py-40 text-center px-4 max-w-lg mx-auto">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
          <h1 className="text-2xl font-bold text-foreground">Article non trouvé</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            L'article que vous cherchez n'existe pas ou n'est plus publié.
          </p>
          <Link to={"/blog" as any} className="btn btn-primary mt-6 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Retour aux articles
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Article Header */}
      <PageHero
        image={article.cover_url || undefined}
        top={
          <Link
            to={"/blog" as any}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour à la liste des articles
          </Link>
        }
        eyebrow={
          <span className="inline-block rounded-md border border-accent/40 bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
            {article.category}
          </span>
        }
        title={article.title}
        description={
          <div className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              Publié le{" "}
              {new Date(article.created_at).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span>DIGIT &amp; TALENT Insights</span>
          </div>
        }
        crumbs={[
          { label: "Blog", to: "/blog" },
          { label: article.title },
        ]}
      />

      {/* Article Body */}
      <article className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        {article.cover_url && (
          <div className="mb-12 overflow-hidden rounded-xl shadow-elevated">
            <img
              src={article.cover_url}
              alt={article.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        {article.excerpt && (
          <p className="text-lg leading-relaxed text-foreground/90 font-medium italic mb-10 pb-6 border-b border-border">
            {article.excerpt}
          </p>
        )}

        <div className="prose max-w-none text-foreground/80 leading-relaxed space-y-6 text-base">
          {article.content ? (
            article.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-3">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="text-xl font-bold text-foreground mt-6 mb-2">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <ul key={index} className="space-y-2 my-4 pl-4">
                    {paragraph.split("\n").map((li, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{li.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "$1")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith("1. ")) {
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 my-4 pl-2 text-sm">
                    {paragraph.split("\n").map((li, i) => (
                      <li key={i} className="text-foreground/80">
                        {li.replace(/^\d+\.\s+/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={index} className="text-sm sm:text-base leading-relaxed">
                  {paragraph}
                </p>
              );
            })
          ) : (
            <p className="text-muted-foreground italic">Contenu en cours de rédaction.</p>
          )}
        </div>

        {/* CTA Card Footer */}
        <div className="mt-16 rounded-xl bg-navy-deep text-white p-8 sm:p-10 shadow-elevated relative overflow-hidden">
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-white">
              Besoin d'un accompagnement sur mesure ?
            </h3>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              Consultez nos programmes de formation certifiants ou échangez directement avec nos consultants pour accélérer vos projets.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/formation" className="btn btn-primary text-xs sm:text-sm">
                Découvrir les formations <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn btn-outline-white text-xs sm:text-sm">
                Contacter un expert
              </Link>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
