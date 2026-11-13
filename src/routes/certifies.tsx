import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Award, Linkedin, Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { imagery } from "@/assets/imagery";
import { useT } from "@/i18n/LanguageProvider";
import { CERTIFIED, type Certification } from "@/data/certified";

export const Route = createFileRoute("/certifies")({
  head: () => ({
    meta: [
      { title: "Our certified professionals | DIGIT & TALENT" },
      {
        name: "description",
        content: "Professionals who earned their PMP®, CAPM® or Prosci® certification after training with DIGIT & TALENT in Lomé.",
      },
      { property: "og:title", content: "Our certified professionals | DIGIT & TALENT" },
    ],
  }),
  component: CertifiedPage,
});

const BADGES: Partial<Record<Certification, string>> = {
  PMP: imagery.pmpBadge,
  CAPM: imagery.capmBadge,
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function CertifiedPage() {
  const { t } = useT();
  const [filter, setFilter] = useState<Certification | "all">("all");
  const [search, setSearch] = useState("");

  // Certifications présentes dans la liste, avec leur effectif
  const counts = useMemo(() => {
    const map = new Map<Certification, number>();
    CERTIFIED.forEach((p) => map.set(p.certification, (map.get(p.certification) ?? 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  const posters = CERTIFIED.filter((p) => p.poster);

  const people = CERTIFIED.filter((p) => {
    const term = search.trim().toLowerCase();
    const matchesFilter = filter === "all" || p.certification === filter;
    const matchesSearch =
      !term || p.name.toLowerCase().includes(term) || (p.organization ?? "").toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  }).sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.name.localeCompare(b.name));

  return (
    <SiteLayout>
      <PageHero
        image={imagery.leaderPitch}
        imageAlt="Session de certification"
        title={t("certified.hero.title")}
        description={t("certified.hero.desc")}
        crumbs={[{ label: t("nav.training"), to: "/formation" }, { label: t("certified.hero.title") }]}
      />

      <section className="container-site section-y">
        {CERTIFIED.length === 0 ? (
          <Reveal className="mx-auto max-w-xl py-10 text-center">
            <img src={imagery.authorizedTrainingPartner} alt="PMI Authorized Training Partner" className="mx-auto h-28 w-28 object-contain" />
            <h2 className="mt-8 text-2xl font-bold text-navy">{t("certified.empty.title")}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t("certified.empty.desc")}</p>
            <Link to="/formation" search={{ course: "" }} className="btn btn-primary mt-8">
              {t("certified.cta.btn")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        ) : (
          <>
            {/* Visuels de félicitations */}
            {posters.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-navy">{t("certified.posters.title")}</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {posters.map((p, i) => (
                    <Reveal key={p.name} delay={(i % 3) * 120}>
                      <a href={p.poster} target="_blank" rel="noreferrer" className="img-zoom block overflow-hidden rounded-2xl shadow-[0_24px_50px_-24px_rgb(10_37_64/0.55)]">
                        <img src={p.poster} alt={`${p.name}, ${p.certification}`} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* Chiffres par certification */}
            <Reveal as="dl" className="grid grid-cols-2 border-y border-border sm:grid-cols-4">
              <div className="py-6 pr-6">
                <dt className="font-display text-4xl font-bold text-navy">{CERTIFIED.length}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{t("certified.count")}</dd>
              </div>
              {counts.slice(0, 3).map(([cert, n]) => (
                <div key={cert} className="py-6 pr-6">
                  <dt className="font-display text-4xl font-bold text-navy">{n}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{cert}</dd>
                </div>
              ))}
            </Reveal>

            {/* Filtres et recherche */}
            <div className="mt-12 flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div className="flex flex-wrap gap-2">
                {(["all", ...counts.map(([c]) => c)] as (Certification | "all")[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFilter(c)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      filter === c ? "bg-navy text-white" : "border border-border text-navy/75 hover:border-navy/40"
                    }`}
                  >
                    {c === "all" ? t("certified.filter.all") : c}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-80">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("certified.search")}
                  className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
            </div>

            {/* Liste */}
            {people.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">{t("certified.noResults")}</p>
            ) : (
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((p, idx) => (
                  <Reveal key={`${p.name}-${idx}`} as="li" delay={(idx % 6) * 60} className="card-surface card-interactive flex items-center gap-4 p-5">
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} loading="lazy" className="h-16 w-16 shrink-0 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy text-lg font-bold text-white">
                        {initials(p.name)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-navy">{p.name}</p>
                      {(p.role || p.organization) && (
                        <p className="truncate text-sm text-muted-foreground">{[p.role, p.organization].filter(Boolean).join(" · ")}</p>
                      )}
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent">
                        <Award className="h-3.5 w-3.5" />
                        {p.certification}
                        {p.year && <span className="text-muted-foreground">· {p.year}</span>}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-2">
                      {BADGES[p.certification] && (
                        <img src={BADGES[p.certification]} alt={p.certification} className="h-10 w-10 object-contain" loading="lazy" />
                      )}
                      {p.linkedin && (
                        <a href={p.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn, ${p.name}`} className="text-navy/60 transition hover:text-accent">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </Reveal>
                ))}
              </ul>
            )}
          </>
        )}
      </section>

      <CtaBand title={t("certified.cta.title")} description={t("certified.cta.desc")} />
    </SiteLayout>
  );
}
