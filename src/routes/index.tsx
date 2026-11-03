import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Cpu, ShieldCheck, Workflow, Users, GraduationCap, CheckCircle2 } from "lucide-react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
import { useCountUp } from "@/hooks/useCountUp";
import type { RefObject } from "react";
import { HeroPromoStrip } from "@/components/HeroPromoStrip";

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
      <section className="relative overflow-hidden bg-navy-deep text-primary-foreground pt-[80px] min-h-[680px]">
        {/* Image fond droite */}
        <div className="absolute inset-x-0 top-0 h-[390px] sm:inset-y-0 sm:left-auto sm:h-auto sm:w-[52%]">
          <img
            src={imagery.professionalMan}
            alt="DIGIT & TALENT consultant"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
          {/* Fondu gauche pour intégration naturelle */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/50 to-transparent" />
          {/* Fondu bas */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
          {/* Badge — bas droite, comme sur woloyem */}
          <div
            className="animate-float-slow absolute bottom-8 right-5 z-10 sm:bottom-50 sm:right-80"
            style={{ animationDelay: "300ms" }}
          >
            <img
              src={imagery.authorizedTrainingPartner}
              alt="Authorized Training Partner"
              className="h-28 w-auto object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)] sm:h-70"
            />
          </div>
        </div>

                {/* Dégradés dynamiques et animés de la charte (Orange #F26A21, Bleu #2563EB, Bleu Nuit #0A2540) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* 1. Halo Orange vif animé (Énergie & Marque) */}
          <div
            className="animate-blob-1 absolute -left-28 -top-16 h-[560px] w-[560px] rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, rgba(242,106,33,0.40) 0%, rgba(242,106,33,0.15) 50%, transparent 75%)",
            }}
          />

          {/* 2. Halo Bleu Technologique en contre-orbite */}
          <div
            className="animate-blob-2 absolute left-1/4 top-1/4 h-[640px] w-[640px] rounded-full blur-[130px]"
            style={{
              background:
                "radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(118,176,234,0.14) 55%, transparent 80%)",
            }}
          />

          {/* 3. Halo Ambre / Orange doux respirant */}
          <div
            className="animate-blob-3 absolute -bottom-24 left-1/3 h-[490px] w-[490px] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,154,102,0.32) 0%, rgba(242,106,33,0.10) 60%, transparent 80%)",
            }}
          />

          {/* 4. Balayage lumineux diagonal fluide */}
          <div className="animate-beam-sweep absolute -inset-full h-[200%] w-[35%] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-3xl pointer-events-none" />

          {/* 5. Subtile matrice géométrique en filigrane */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
        </div>

        {/* Contenu texte — gauche */}
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-[350px] sm:py-24 lg:px-8 lg:py-32">
          <div className="max-w-xl">
            <span className="animate-fade-in-soft inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {t("home.hero.badge")}
            </span>

            <h1
              className="animate-fade-up mt-7 text-4xl font-bold leading-[1.08] text-white [overflow-wrap:anywhere] min-[400px]:text-5xl sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              {t("home.hero.titleA")}{" "}
              {t("home.hero.titleB") && <span className="gradient-text">{t("home.hero.titleB")}</span>}
              {t("home.hero.titleC") && <>{" "}{t("home.hero.titleC")}</>}
              {t("home.hero.titleD") && <>{" "}<span className="gradient-text">{t("home.hero.titleD")}</span></>}
            </h1>

            <p
              className="animate-fade-up mt-6 text-base leading-relaxed text-white/80"
              style={{ animationDelay: "260ms" }}
            >
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
              className="animate-fade-up mt-10 grid grid-cols-3 gap-6 border-t border-white/20 pt-10"
              style={{ animationDelay: "500ms" }}
            >
              <StatItem target={12} suffix="+" label={t("home.hero.stat1v")} />
              <StatItem target={10} label={t("home.hero.stat2v")} />
              <StatItem target={5} label={t("home.hero.stat3v")} />
            </dl>
          </div>
        </div>
      </section>
      <HeroPromoStrip />


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
            { src: imagery.leaderPitch, label: t("home.img.ai"), alt: "Trainer leading a professional certification session" },
            { src: imagery.management, label: t("home.img.data"), alt: "Team managing a complex project" },
            { src: imagery.futuristicBusiness, label: t("home.img.perf"), alt: "Digital transformation strategy" },
            { src: imagery.teamLaughing, label: t("home.img.talents"), alt: "Talent development and collaboration" },
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

      {/* Témoignages */}
      <Reveal as="section" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mb-10 text-center">
          <p className="eyebrow justify-center">{t("home.testimonials.eyebrow")}</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{t("home.testimonials.title")}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              quote: t("home.testimonials.q1"),
              name: "Kofi Mensah",
              role: t("home.testimonials.r1"),
              org: "Plan International Togo",
              initials: "KM",
            },
            {
              quote: t("home.testimonials.q2"),
              name: "Aminata Diallo",
              role: t("home.testimonials.r2"),
              org: "Banque Mondiale – Projet FSRP",
              initials: "AD",
            },
          ].map((t2) => (
            <div key={t2.name} className="card-surface flex flex-col gap-5 p-8">
              <svg className="h-8 w-8 shrink-0 text-accent opacity-60" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.657 1.343-3 3-3V8zm18 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.657 1.343-3 3-3V8z" />
              </svg>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground italic">{t2.quote}</p>
              <div className="flex items-center gap-3 border-t border-border/60 pt-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {t2.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t2.name}</p>
                  <p className="text-xs text-muted-foreground">{t2.role} · {t2.org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

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



