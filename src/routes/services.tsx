import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Cpu, ShieldCheck, Workflow, Users, GraduationCap, Check, ArrowRight, Quote } from "lucide-react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/PageHero";
import { ClientLogos, DEFAULT_CLIENTS } from "@/components/ClientLogos";
import { CtaBand } from "@/components/CtaBand";
import { SectionHeading } from "@/components/SectionHeading";
import { useState, useEffect } from "react";
import { getPublicProjects, type PublicProject } from "@/lib/api/public.data.functions";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — DIGIT & TALENT" },
      { name: "description", content: "Digitalization, PROSCI ADKAR change management, CAPM/PMP training, organizational transformation and cybersecurity for African organizations." },
      { property: "og:title", content: "Our services — DIGIT & TALENT" },
      { property: "og:description", content: "A full range of services for your digital and organizational transformation." },
    ],
  }),
  component: Services,
});

function Services() {
  const { t } = useT();
  const [customProjects, setCustomProjects] = useState<PublicProject[]>([]);

  useEffect(() => {
    getPublicProjects()
      .then((res) => {
        if (res?.items) {
          setCustomProjects(res.items);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement projets:", err);
      });
  }, []);

  const services = [
    { icon: Cpu, image: imagery.specialistMl, key: "digital", points: ["p1","p2","p3","p4","p5"] },
    { icon: GraduationCap, image: imagery.leaderPitch, key: "training", points: ["p1","p2","p3","p4"] },
    { icon: Workflow, image: imagery.futuristicBusiness, key: "transfo", points: ["p1","p2","p3","p4"] },
    { icon: Users, image: imagery.teamLaughing, key: "change", points: ["p1","p2","p3","p4"] },
    { icon: ShieldCheck, image: imagery.facialRecognition, key: "cyber", points: ["p1","p2","p3","p4"] },
  ] as const;

  // Logos dynamiques (Supabase) ajoutés aux références par défaut
  const dynamicLogos = customProjects
    .filter((p) => p.logo_url)
    .map((p) => ({ img: p.logo_url!, alt: p.client_name }));
  const allClients = [...dynamicLogos, ...DEFAULT_CLIENTS];

  const testimonials = customProjects.filter((p) => p.testimonial);

  return (
    <SiteLayout>
      <PageHero
        image={imagery.aiNeural}
        imageAlt="Consultant analyzing AI systems"
        eyebrow={t("services.hero.eyebrow")}
        title={t("services.hero.title")}
        description={t("services.hero.desc")}
        crumbs={[{ label: t("nav.services") }]}
      />

      {/* Navigation entre les expertises */}
      <nav className="sticky top-[87px] z-30 xl:top-[95px] border-b border-border/70 bg-background/95 backdrop-blur" aria-label={t("nav.services")}>
        <div className="container-site flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((s, i) => (
            <a
              key={s.key}
              href={`#${s.key}`}
              className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-3 py-2 text-sm font-medium text-navy/75 transition hover:border-accent hover:text-navy"
            >
              <span className="font-display text-xs font-semibold text-accent">0{i + 1}</span>
              {t(`svc.${s.key}.title`)}
            </a>
          ))}
        </div>
      </nav>

      <section className="container-site section-y space-y-24 lg:space-y-32">
        {services.map((s, i) => {
          const reverse = i % 2 === 1;
          const title = t(`svc.${s.key}.title`);
          return (
            <article key={s.key} id={s.key} className="grid scroll-mt-40 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={`relative ${reverse ? "lg:order-2" : ""}`}>
                  <Reveal variant="image" className="img-zoom relative rounded-2xl">
                    <img src={s.image} alt={title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent" />
                  </Reveal>
                </div>
                <Reveal variant={reverse ? "left" : "right"} delay={150}>
                  <p className="eyebrow">{t("services.hero.eyebrow")} · 0{i + 1}</p>
                  <h2 className="mt-4 text-3xl font-bold leading-tight text-navy">{title}</h2>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">{t(`svc.${s.key}.subtitle`)}</p>
                  <p className="mt-5 leading-relaxed text-muted-foreground">{t(`svc.${s.key}.intro`)}</p>
                  <ul className="mt-7 grid list-disc gap-x-8 gap-y-2.5 pl-5 text-sm text-foreground/85 marker:text-accent sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p}>{t(`svc.${s.key}.${p}`)}</li>
                    ))}
                  </ul>
                  <div className="mt-8 rounded-2xl bg-mesh px-5 py-4 ring-1 ring-border/60">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{t("services.audience")}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{t(`svc.${s.key}.audience`)}</p>
                  </div>
                  {s.key === "training" && (
                    <div className="mt-8 flex flex-wrap items-center gap-5">
                      <Link to="/formation" className="btn btn-primary">
                        {t("services.registerSessions")} <ArrowRight className="h-4 w-4" />
                      </Link>
                      <div className="flex items-center gap-3">
                        <img src={imagery.capmBadge} alt="CAPM" className="h-12 w-12 object-contain" loading="lazy" />
                        <img src={imagery.pmpBadge} alt="PMP" className="h-12 w-12 object-contain" loading="lazy" />
                      </div>
                    </div>
                  )}
                </Reveal>
              </article>
          );
        })}
      </section>

      <ClientLogos clients={allClients} />

      {/* Témoignages et références (Supabase) */}
      {testimonials.length > 0 && (
        <section className="container-site section-y">
          <SectionHeading align="center" eyebrow={t("services.testimonials.eyebrow")} title={t("services.testimonials.title")} />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testi) => (
              <Reveal key={testi.id}>
                <div className="card-surface flex h-full flex-col justify-between p-7">
                  <div>
                    <Quote className="mb-3 h-8 w-8 text-accent/40" />
                    <p className="mb-4 text-sm leading-relaxed text-foreground/80">"{testi.testimonial}"</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-sm font-bold text-navy">{testi.client_name}</p>
                      {testi.title && <p className="text-xs text-muted-foreground">{testi.title}</p>}
                    </div>
                    {testi.project_type && (
                      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent">{testi.project_type}</span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="pt-24">
        <CtaBand title={t("services.approach.title")} description={t("services.approach.desc")} />
      </div>
    </SiteLayout>
  );
}
