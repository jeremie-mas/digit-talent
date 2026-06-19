import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Cpu, ShieldCheck, Workflow, Users, GraduationCap, CheckCircle2 } from "lucide-react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
import { useCountUp } from "@/hooks/useCountUp";
import type { RefObject } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DIGIT & TALENT — Digital & talent consulting in Africa" },
      { name: "description", content: "Consulting firm based in Lomé. Digital transformation, cybersecurity, change management and PMP training since 2012." },
      { property: "og:title", content: "DIGIT & TALENT — Fueling Dreams, Forging Success" },
      { property: "og:description", content: "The convergence of digital and talent at the service of your growth." },
    ],
  }),
  component: Home,
});

function StatItem({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref as RefObject<HTMLDivElement>}>
      <dt className="text-4xl font-bold text-accent sm:text-5xl tabular-nums">
        {value}{suffix}
      </dt>
      <dd className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
        {label}
      </dd>
    </div>
  );
}

function Home() {
  const { t } = useT();
  const expertises = [
    { icon: Cpu, title: t("home.exp.digital.title"), desc: t("home.exp.digital.desc") },
    { icon: GraduationCap, title: t("home.exp.training.title"), desc: t("home.exp.training.desc") },
    { icon: Workflow, title: t("home.exp.transfo.title"), desc: t("home.exp.transfo.desc") },
    { icon: Users, title: t("home.exp.change.title"), desc: t("home.exp.change.desc") },
    { icon: ShieldCheck, title: t("home.exp.cyber.title"), desc: t("home.exp.cyber.desc") },

  ];
  const reasons = [t("home.why.r1"), t("home.why.r2"), t("home.why.r3"), t("home.why.r4")];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep text-primary-foreground pt-[80px]">
        <img
          src={imagery.technicianServer}
          alt="IT specialist supervising a data center infrastructure"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/95 via-navy-deep/70 to-navy/30" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-orange/10" />
        <div className="animate-float-slow pointer-events-none absolute -right-20 top-0 h-[600px] w-[600px] rounded-full bg-accent/25 blur-[120px]" />
        <div className="animate-float-slow pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]" style={{ animationDelay: "2s" }} />
        <div className="animate-float-slow pointer-events-none absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-orange-soft/10 blur-[80px]" style={{ animationDelay: "1s" }} />

        <div className="relative mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-40">
          <div className="max-w-3xl">
            <span className="animate-fade-in-soft inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {t("home.hero.badge")}
            </span>
            <h1
              className="animate-fade-up mt-7 text-5xl font-bold leading-[1.04] text-white sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              {t("home.hero.titleA")}{" "}
              <span className="gradient-text">{t("home.hero.titleB")}</span>{" "}
              {t("home.hero.titleC")}{" "}
              <span className="gradient-text">{t("home.hero.titleD")}</span>.
            </h1>

            
            <p
              className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
              style={{ animationDelay: "260ms" }}
            >
              <strong className="font-semibold text-white/95">{t("home.hero.tagline")}</strong>{" "}<br/><br/>
              {t("home.hero.desc")}
            </p>
            <div className="animate-fade-up mt-10 flex flex-wrap gap-4" style={{ animationDelay: "380ms" }}>
              <Link to="/services" className="btn btn-primary">
                {t("home.hero.ctaServices")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn btn-outline-light">
                {t("home.hero.ctaContact")}
              </Link>
            </div>
            <dl
              className="animate-fade-up mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/20 pt-10"
              style={{ animationDelay: "500ms" }}
            >
              <StatItem target={12} suffix="+" label={t("home.hero.stat1v")} />
              <StatItem target={10} label={t("home.hero.stat2v")} />
              <StatItem target={5} label={t("home.hero.stat3v")} />
            </dl>
          </div>
        </div>
      </section>

      {/* Value prop */}
      <Reveal as="section" className="mx-auto max-w-4xl px-5 py-24 text-center lg:px-8">
        <p className="eyebrow justify-center">{t("home.value.eyebrow")}</p>
        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t("home.value.title")}</h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {t("home.value.desc")}
        </p>
      </Reveal>

      {/* Imagery showcase */}
      <section className="mx-auto max-w-7xl px-5 pb-4 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {([
            { src: imagery.aiNeural, label: t("home.img.ai"), alt: "Consultant analyzing a neural network" },
            { src: imagery.leaderPitch, label: t("home.img.perf"), alt: "Leader presenting performance metrics" },
            { src: imagery.specialistMl, label: t("home.img.data"), alt: "Data center specialist" },
            { src: imagery.teamLaughing, label: t("home.img.talents"), alt: "Team collaborating in open space" },
          ]).map((i, idx) => (
            <Reveal key={i.label} delay={idx * 80}>
              <figure className="group relative overflow-hidden rounded-2xl">
                <img
                  src={i.src}
                  alt={i.alt}
                  className="aspect-[4/5] w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                    0{idx + 1}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{i.label}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Expertises */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">{t("home.expertises.eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t("home.expertises.title")}</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {expertises.map((e, idx) => (
              <Reveal key={e.title} delay={idx * 70}>
                <div className="group card-surface card-interactive h-full p-7">
                  <div className="flex items-center gap-22">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy/90 text-accent shadow-sm transition duration-300 group-hover:scale-105 group-hover:bg-accent group-hover:text-white">
                      <e.icon className="h-6 w-6" />
                    </div>
                    {e.icon === GraduationCap && (
                      <div className="flex items-center gap-6">
                        <img src={imagery.capmBadge} alt="CAPM" className="h-15 w-12 object-contain" />
                        <img src={imagery.pmpBadge} alt="PMP" className="h-15 w-12 object-contain" />
                      </div>
                    )}
                  </div>
                  <h3 className="mt-6 text-base font-semibold tracking-tight">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition hover:text-accent"
            >
              {t("home.expertises.viewAll")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{t("home.why.eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t("home.why.title")}</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t("home.why.desc")}</p>
          </Reveal>
          <ul className="space-y-3">
            {reasons.map((r, idx) => (
              <Reveal key={r} as="li" delay={idx * 70}>
                <div className="card-surface card-interactive flex items-start gap-4 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm font-medium leading-relaxed">{r}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <Reveal as="section" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-navy-deep px-8 py-20 text-center text-white sm:px-16">
          <div className="animate-float-slow absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="animate-float-slow absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" style={{ animationDelay: "1.5s" }} />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">{t("home.cta.title")}</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/70">{t("home.cta.desc")}</p>
            <Link to="/contact" className="btn btn-primary mt-10">
              {t("home.cta.btn")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </SiteLayout>
  );
}
