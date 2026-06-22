import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Cpu, ShieldCheck, Workflow, Users, GraduationCap, Check, ArrowRight } from "lucide-react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
import { Breadcrumb } from "@/components/Breadcrumb";

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
  const services = [
    { icon: Cpu, image: imagery.coworkersAi, key: "digital", points: ["p1","p2","p3","p4","p5"] },
    { icon: GraduationCap, image: imagery.leaderPitch, key: "training", points: ["p1","p2","p3","p4"] },
    { icon: Workflow, image: imagery.futuristicBusiness, key: "transfo", points: ["p1","p2","p3","p4"] },
    { icon: Users, image: imagery.teamLaughing, key: "change", points: ["p1","p2","p3","p4"] },
    { icon: ShieldCheck, image: imagery.facialRecognition, key: "cyber", points: ["p1","p2","p3","p4"] },

  ] as const;

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
                  <div className="flex items-center gap-50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent transition duration-300 group-hover:bg-accent group-hover:text-white">
                      <s.icon className="h-6 w-6" />
                    </div>
                    {s.key === "training" && (
                      <div className="flex items-center gap-6">
                        <img src={imagery.capmBadge} alt="CAPM" className="h-20 w-15 object-contain" />
                        <img src={imagery.pmpBadge} alt="PMP" className="h-20 w-15 object-contain" />
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
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>


      {/* Clients */}
      <section className="border-y border-border/60 bg-secondary/30 py-16 overflow-hidden">
        <div className="mb-10 text-center">
          <p className="eyebrow justify-center">{t("home.clients.eyebrow")}</p>
          <h2 className="mt-3 text-2xl font-bold">{t("home.clients.title")}</h2>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary/30 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary/30 to-transparent" />
          <div className="flex animate-marquee gap-16 w-max">
            {[
              { img: imagery.worldBank, alt: "The World Bank – Projet FSRP" },
              { img: imagery.sitelso, alt: "SITELSO" },
              { img: imagery.ministereAgriculture, alt: "Ministère de l'Agriculture" },
              { img: imagery.ueWbPage, alt: "UE-WB – Projet PAGE" },
              { img: imagery.planInternational, alt: "Plan International" },
              { img: imagery.worldBank, alt: "The World Bank – Projet FSRP" },
              { img: imagery.sitelso, alt: "SITELSO" },
              { img: imagery.ministereAgriculture, alt: "Ministère de l'Agriculture" },
              { img: imagery.ueWbPage, alt: "UE-WB – Projet PAGE" },
              { img: imagery.planInternational, alt: "Plan International" },
            ].map((c, i) => (
              <div key={i} className="flex h-20 w-40 shrink-0 items-center justify-center">
                <img src={c.img} alt={c.alt} className="max-h-16 w-auto max-w-[140px] object-contain opacity-90" />
              </div>
            ))}
          </div>
        </div>
      </section>

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
