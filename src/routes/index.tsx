import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Cpu, ShieldCheck, Workflow, Users, GraduationCap, Check, MessagesSquare } from "lucide-react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
import { useCountUp } from "@/hooks/useCountUp";
import type { RefObject } from "react";
import { HeroPromoStrip } from "@/components/HeroPromoStrip";
import { SectionHeading } from "@/components/SectionHeading";
import { ClientLogos } from "@/components/ClientLogos";
import { CtaBand } from "@/components/CtaBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DIGIT & TALENT | Digital Transformation, PMP Training & Talent in Lomé, Togo" },
      { name: "description", content: "Consulting firm based in Lomé since 2012: digital transformation, PMP/CAPM certification training, Prosci ADKAR change management and cybersecurity." },
      { property: "og:title", content: "DIGIT & TALENT — Your transformation starts here" },
      { property: "og:description", content: "The convergence of digital and talent at the service of your growth." },
    ],
  }),
  component: Home,
});

function StatItem({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { value, ref } = useCountUp(target);
  return (
    <div ref={ref as RefObject<HTMLDivElement>} className="px-6 py-7 sm:px-8">
      <dt className="font-display text-4xl font-bold tabular-nums sm:text-5xl">
        <span className="gradient-text-navy">{value}</span>
        <span className="gradient-text">{suffix}</span>
      </dt>
      <dd className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</dd>
    </div>
  );
}

function Home() {
  const { t } = useT();
  const expertises = [
    { icon: Cpu, key: "digital", title: t("home.exp.digital.title"), desc: t("home.exp.digital.desc") },
    { icon: GraduationCap, key: "training", title: t("home.exp.training.title"), desc: t("home.exp.training.desc") },
    { icon: Workflow, key: "transfo", title: t("home.exp.transfo.title"), desc: t("home.exp.transfo.desc") },
    { icon: Users, key: "change", title: t("home.exp.change.title"), desc: t("home.exp.change.desc") },
    { icon: ShieldCheck, key: "cyber", title: t("home.exp.cyber.title"), desc: t("home.exp.cyber.desc") },
  ];
  const pillars = [t("home.img.ai"), t("home.img.data"), t("home.img.perf"), t("home.img.talents")];
  const reasons = [t("home.why.r1"), t("home.why.r2"), t("home.why.r3"), t("home.why.r4")];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-deep text-white">
        {/* Image à droite */}
        <div className="absolute inset-x-0 top-0 h-[420px] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[50%]">
          <img
            src={imagery.professionalMan}
            alt="DIGIT & TALENT consultant"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-navy-deep/40 lg:bg-gradient-to-r lg:from-navy-deep lg:via-navy-deep/40 lg:to-transparent" />
        </div>
        {/* Trame discrète */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="animate-blob-1 pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="animate-blob-2 pointer-events-none absolute left-1/4 top-1/2 h-[560px] w-[560px] rounded-full bg-blue/20 blur-[140px]" />

        <div className="container-site relative pb-36 pt-[330px] lg:pb-44 lg:pt-[200px]">
          <div className="max-w-xl">
            <p className="eyebrow animate-fade-in-soft">{t("home.hero.badge")}</p>
            <h1
              className="animate-fade-up mt-6 text-4xl font-bold leading-[1.06] [overflow-wrap:anywhere] min-[400px]:text-5xl sm:text-6xl"
              style={{ animationDelay: "120ms" }}
            >
              {t("home.hero.titleA")} <span className="gradient-text">{t("home.hero.titleB")}</span>
              {t("home.hero.titleC") && <> {t("home.hero.titleC")}</>}
              {t("home.hero.titleD") && <> <span className="gradient-text">{t("home.hero.titleD")}</span></>}
            </h1>
            <p className="animate-fade-up mt-6 text-lg leading-relaxed text-white/75" style={{ animationDelay: "240ms" }}>
              {t("home.hero.desc")}
            </p>
            <div className="animate-fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
              <Link to="/services" className="btn btn-primary">
                {t("home.hero.ctaServices")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn btn-outline-white">
                {t("home.hero.ctaContact")}
              </Link>
            </div>
          </div>
        </div>

        {/* Badge partenaire PMI */}
        <img
          src={imagery.authorizedTrainingPartner}
          alt="PMI Authorized Training Partner"
          className="animate-float-slow absolute right-5 top-[250px] h-28 w-28 drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)] lg:right-[8%] lg:top-auto lg:bottom-40 lg:h-40 lg:w-40"
        />

        {/* Carte flottante (ordinateur) */}
        <div className="glass-dark animate-fade-up absolute bottom-40 left-[53%] hidden items-center gap-4 rounded-2xl px-5 py-4 lg:flex" style={{ animationDelay: "600ms" }}>
          <span className="icon-tile icon-tile-accent h-11 w-11">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">PMP® · CAPM® · Prosci®</p>
            <p className="text-xs text-white/60">{t("home.stats.atp")}</p>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="container-site relative z-10 -mt-20">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white bg-border/60 shadow-[0_30px_60px_-30px_rgb(10_37_64/0.45)] lg:grid-cols-4 [&>*]:bg-white">
            <StatItem target={12} suffix="+" label={t("home.hero.stat1v")} />
            <StatItem target={10} label={t("home.hero.stat2v")} />
            <StatItem target={5} label={t("home.hero.stat3v")} />
            <div className="flex items-center gap-4 px-6 py-7 sm:px-8">
              <img src={imagery.pmpBadge} alt="PMP" className="h-14 w-14 object-contain" loading="lazy" />
              <p className="text-xs font-semibold uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">{t("home.stats.atp")}</p>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* Prochaine session & actualités */}
      <div className="container-site mt-16">
        <div className="overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgb(10_37_64/0.5)]">
          <HeroPromoStrip />
        </div>
      </div>

      {/* Qui sommes-nous */}
      <section className="container-site section-y">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="animate-blob-3 pointer-events-none absolute -left-10 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 right-0 h-64 w-64 rounded-full bg-blue/15 blur-3xl" />
            <div className="relative grid grid-cols-5 gap-4">
              <img
                src={imagery.leaderPitch}
                alt="Trainer leading a professional certification session"
                loading="lazy"
                className="col-span-3 aspect-[3/4] w-full rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgb(10_37_64/0.5)]"
              />
              <div className="col-span-2 flex flex-col gap-4 pt-12">
                <img
                  src={imagery.teamLaughing}
                  alt="Talent development and collaboration"
                  loading="lazy"
                  className="aspect-square w-full rounded-3xl object-cover shadow-[0_20px_40px_-20px_rgb(10_37_64/0.5)]"
                />
                <div className="rounded-3xl bg-deep p-5 text-white shadow-[0_20px_40px_-20px_rgb(10_37_64/0.6)]">
                  <p className="gradient-text font-display text-4xl font-bold">2012</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">{t("home.hero.badge")}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <SectionHeading eyebrow={t("home.value.eyebrow")} title={t("home.value.title")} description={t("home.value.desc")} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {pillars.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-white px-4 py-3.5 text-sm font-medium text-navy shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-accent/30">
                  <span className="icon-tile icon-tile-accent h-7 w-7 shrink-0 rounded-full">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link to="/a-propos" className="btn btn-navy mt-10">
              {t("home.about.more")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Expertises */}
      <section className="section-y bg-mesh">
        <div className="container-site">
          <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow={t("home.expertises.eyebrow")} title={t("home.expertises.title")} />
            <Link to="/services" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy transition hover:text-accent">
              {t("home.expertises.viewAll")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {expertises.map((e, idx) => (
              <Reveal key={e.key} delay={idx * 60}>
                <Link
                  to="/services"
                  hash={e.key}
                  className="group card-surface card-interactive flex h-full flex-col p-7"
                >
                  <div className="flex items-start justify-between">
                    <div className="icon-tile h-14 w-14 group-hover:icon-tile-accent group-hover:-rotate-6">
                      <e.icon className="h-6 w-6" />
                    </div>
                    <span className="font-display text-4xl font-bold text-navy/[0.06] transition-colors duration-500 group-hover:text-accent/25">0{idx + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-snug text-navy">{e.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
                  {e.key === "training" && (
                    <div className="mt-5 flex items-center gap-3">
                      <img src={imagery.capmBadge} alt="CAPM" className="h-11 w-11 object-contain" loading="lazy" />
                      <img src={imagery.pmpBadge} alt="PMP" className="h-11 w-11 object-contain" loading="lazy" />
                    </div>
                  )}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    {t("home.exp.more")}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={expertises.length * 60}>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.25rem] bg-deep p-7 text-white shadow-[0_30px_60px_-30px_rgb(10_37_64/0.6)]">
                <div className="animate-blob-1 pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
                <div className="relative">
                  <div className="icon-tile icon-tile-accent h-14 w-14">
                    <MessagesSquare className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{t("home.exp.custom.title")}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{t("home.exp.custom.desc")}</p>
                </div>
                <Link to="/contact" className="btn btn-primary relative mt-8 self-start">
                  {t("services.approach.talk")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="relative overflow-hidden bg-deep text-white section-y">
        <img src={imagery.management} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/60" />
        <div className="animate-blob-2 pointer-events-none absolute -right-32 top-0 h-[460px] w-[460px] rounded-full bg-accent/15 blur-[120px]" />
        <div className="container-site relative grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <SectionHeading dark eyebrow={t("home.why.eyebrow")} title={t("home.why.title")} description={t("home.why.desc")} />
            <Link to="/contact" className="btn btn-primary mt-10">
              {t("home.hero.ctaContact")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r, idx) => (
              <Reveal key={r} as="li" delay={idx * 70}>
                <div className="glass-dark h-full rounded-2xl p-7 transition duration-500 hover:-translate-y-1.5 hover:border-accent/40">
                  <span className="gradient-text font-display text-4xl font-bold">0{idx + 1}</span>
                  <p className="mt-4 text-[15px] font-medium leading-relaxed text-white/85">{r}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Références */}
      <ClientLogos />

      {/* Témoignages */}
      <section className="container-site section-y">
        <Reveal>
          <SectionHeading align="center" eyebrow={t("home.testimonials.eyebrow")} title={t("home.testimonials.title")} />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            { quote: t("home.testimonials.q1"), name: "Kofi Mensah", role: t("home.testimonials.r1"), org: "Plan International Togo", initials: "KM" },
            { quote: t("home.testimonials.q2"), name: "Aminata Diallo", role: t("home.testimonials.r2"), org: "Banque Mondiale – Projet FSRP", initials: "AD" },
          ].map((item, idx) => (
            <Reveal key={item.name} delay={idx * 100}>
              <figure className="card-surface card-interactive relative flex h-full flex-col overflow-hidden p-8 lg:p-10">
                <svg className="h-10 w-10 shrink-0 text-accent" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.657 1.343-3 3-3V8zm18 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.657 1.343-3 3-3V8z" />
                </svg>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-foreground/80">{item.quote}</blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-border/70 pt-6">
                  <div className="icon-tile h-12 w-12 shrink-0 rounded-full text-sm font-bold">{item.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role} · {item.org}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </SiteLayout>
  );
}
