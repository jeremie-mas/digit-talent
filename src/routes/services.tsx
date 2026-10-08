import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Cpu, ShieldCheck, Workflow, Users, GraduationCap, Check, ArrowRight, Quote } from "lucide-react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useState, useEffect } from "react";
import { getPublicProjects, type PublicProject } from "@/lib/api/public.data.functions";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — DIGIT & TALENT" },
      { name: "description", content: "Digital, PROSCI ADKAR change management and CAPM/PMP training, organizational transformation, cybersecurity." },
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

  const defaultClients = [
    { img: imagery.worldBank, alt: "The World Bank – Projet FSRP" },
    { img: imagery.sitelso, alt: "SITELSO" },
    { img: imagery.ministereAgriculture, alt: "Ministère de l'Agriculture" },
    { img: imagery.ueWbPage, alt: "UE-WB – Projet PAGE" },
    { img: imagery.planInternational, alt: "Plan International" },
  ];

  // Merge dynamic logos from Supabase if available
  const dynamicLogos = customProjects
    .filter((p) => p.logo_url)
    .map((p) => ({ img: p.logo_url!, alt: p.client_name }));

  const allClients = dynamicLogos.length > 0 ? [...dynamicLogos, ...defaultClients] : defaultClients;
  // Repeat to ensure marquee continuity
  const marqueeClients = [...allClients, ...allClients];

  const testimonials = customProjects.filter((p) => p.testimonial);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-navy-deep py-24 pb-16 text-white pt-[150px]">
        <img
          src={imagery.aiNeural}
          alt="Consultant analyzing AI systems"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow animate-fade-in-soft">{t("services.hero.eyebrow")}</p>
          <h1 className="animate-fade-up mt-5 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl" style={{ animationDelay: "120ms" }}>{t("services.hero.title")}</h1>
          <p className="animate-fade-up mt-6 max-w-3xl text-lg leading-relaxed text-white/75" style={{ animationDelay: "240ms" }}>{t("services.hero.desc")}</p>
        </div>
        <Breadcrumb crumbs={[{ label: t("nav.services") }]} />
      </section>

      <section className="mx-auto max-w-7xl space-y-14 px-5 py-24 lg:px-8">
        {services.map((s, i) => {
          const reverse = i % 2 === 1;
          const title = t(`svc.${s.key}.title`);
          return (
            <Reveal key={s.key}>
              <article className="group card-surface grid gap-0 overflow-hidden lg:grid-cols-2">
                <div className={`relative min-h-[280px] overflow-hidden lg:min-h-[460px] ${reverse ? "lg:order-2" : ""}`}>
                  <img src={s.image} alt={title} className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
                  <span className="absolute left-6 top-6 rounded-full bg-white/95 px-3.5 py-1 font-mono text-xs font-semibold text-navy shadow-sm">0{i + 1}</span>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent transition duration-300 group-hover:bg-accent group-hover:text-white">
                      <s.icon className="h-6 w-6" />
                    </div>
                    {s.key === "training" && (
                      <div className="flex items-center gap-6">
                        <img src={imagery.capmBadge} alt="CAPM" className="h-16 w-14 object-contain" />
                        <img src={imagery.pmpBadge} alt="PMP" className="h-16 w-14 object-contain" />
                      </div>
                    )}
                  </div>
                  <h2 className="mt-6 text-2xl font-bold tracking-tight">{title}</h2>
                  <p className="mt-1.5 text-sm font-medium text-muted-foreground">{t(`svc.${s.key}.subtitle`)}</p>
                  <p className="mt-5 leading-relaxed text-muted-foreground">{t(`svc.${s.key}.intro`)}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{t(`svc.${s.key}.${p}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 rounded-xl bg-secondary p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{t("services.audience")}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{t(`svc.${s.key}.audience`)}</p>
                  </div>
                  {s.key === "training" && (
                    <div className="mt-6">
                      <Link
                        to="/formation"
                        className="btn btn-primary inline-flex items-center gap-2"
                      >
                        <span>{t("services.registerSessions")}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>

      {/* Clients Marquee */}
      <section className="border-y border-border/60 bg-secondary/30 py-16 overflow-hidden">
        <div className="mb-10 text-center">
          <p className="eyebrow justify-center">{t("home.clients.eyebrow")}</p>
          <h2 className="mt-3 text-2xl font-bold">{t("home.clients.title")}</h2>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary/30 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary/30 to-transparent" />
          <div className="flex animate-marquee gap-16 w-max">
            {marqueeClients.map((c, i) => (
              <div key={i} className="flex h-20 w-40 shrink-0 items-center justify-center">
                <img src={c.img} alt={c.alt} className="max-h-16 w-auto max-w-[140px] object-contain opacity-90" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials / Client Cases from Supabase */}
      {testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="mb-12 text-center">
            <p className="eyebrow justify-center">{t("services.testimonials.eyebrow")}</p>
            <h2 className="mt-3 text-3xl font-bold">{t("services.testimonials.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testi) => (
              <Reveal key={testi.id}>
                <div className="card-surface p-7 rounded-2xl flex flex-col justify-between h-full border border-border">
                  <div>
                    <Quote className="h-8 w-8 text-accent/40 mb-3" />
                    <p className="text-sm italic text-foreground/80 leading-relaxed mb-4">
                      "{testi.testimonial}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-foreground">{testi.client_name}</p>
                      {testi.title && (
                        <p className="text-xs text-muted-foreground">{testi.title}</p>
                      )}
                    </div>
                    {testi.project_type && (
                      <span className="rounded-full bg-accent/10 text-accent text-[10px] font-semibold px-2.5 py-0.5">
                        {testi.project_type}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Reveal as="section" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-3xl bg-secondary p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">{t("services.approach.eyebrow")}</p>
              <h2 className="mt-4 text-3xl font-bold">{t("services.approach.title")}</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{t("services.approach.desc")}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/contact" className="btn btn-primary">
                {t("services.approach.quote")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn btn-outline-dark">
                {t("services.approach.talk")}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </SiteLayout>
  );
}
