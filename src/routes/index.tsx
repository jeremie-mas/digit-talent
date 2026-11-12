import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
import { useCountUp } from "@/hooks/useCountUp";
import type { RefObject } from "react";
import { HeroPromoStrip } from "@/components/HeroPromoStrip";
import { ClientLogos } from "@/components/ClientLogos";
import { CtaBand } from "@/components/CtaBand";
import { NetworkPattern } from "@/components/NetworkPattern";
import { AnimatedWords } from "@/components/AnimatedWords";
import { CERTIFIED } from "@/data/certified";

// Les 3 certifiés les plus récents qui ont un visuel de félicitations
const featuredCertified = CERTIFIED.filter((p) => p.poster).slice(0, 3);

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
    <div ref={ref as RefObject<HTMLDivElement>} className="py-8 lg:px-10 lg:first:pl-0">
      <dt className="font-display text-5xl font-bold tabular-nums tracking-tight text-navy lg:text-6xl">
        {value}
        <span className="text-accent">{suffix}</span>
      </dt>
      <dd className="mt-3 text-sm text-muted-foreground">{label}</dd>
    </div>
  );
}

function Home() {
  const { t } = useT();
  const expertises = [
    { key: "digital", title: t("home.exp.digital.title"), desc: t("home.exp.digital.desc") },
    { key: "training", title: t("home.exp.training.title"), desc: t("home.exp.training.desc") },
    { key: "transfo", title: t("home.exp.transfo.title"), desc: t("home.exp.transfo.desc") },
    { key: "change", title: t("home.exp.change.title"), desc: t("home.exp.change.desc") },
    { key: "cyber", title: t("home.exp.cyber.title"), desc: t("home.exp.cyber.desc") },
  ];
  const pillars = [t("home.img.ai"), t("home.img.data"), t("home.img.perf"), t("home.img.talents")];
  const reasons = [t("home.why.r1"), t("home.why.r2"), t("home.why.r3"), t("home.why.r4")];
  const testimonials = [
    { quote: t("home.testimonials.q1"), name: "Kofi Mensah", role: t("home.testimonials.r1"), org: "Plan International Togo" },
    { quote: t("home.testimonials.q2"), name: "Aminata Diallo", role: t("home.testimonials.r2"), org: "Banque Mondiale – Projet FSRP" },
  ];

  return (
    <SiteLayout>
      {/* Hero : photo pleine largeur sous un voile gris anthracite (teinte du logo), plus léger côté photo */}
      <section className="relative overflow-hidden bg-[#1C232B] text-white">
        <div className="absolute inset-x-0 top-0 h-[460px] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[64%]">
          <img
            src={imagery.professionalMan}
            alt="DIGIT & TALENT consultant"
            fetchPriority="high"
            decoding="async"
            className="hero-zoom h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 -bottom-px bg-gradient-to-t from-[#1C232B] via-[#1C232B]/40 to-[#1C232B]/20 lg:-left-1 lg:bottom-0 lg:bg-gradient-to-r lg:from-[#1C232B] lg:from-2% lg:via-[#1C232B]/45 lg:via-30% lg:to-[#1C232B]/10" />
          {/* Badge partenaire PMI : même emplacement que sur la version en ligne */}
          <div className="animate-float-slow absolute bottom-8 right-5 z-10 lg:bottom-24 lg:right-10 xl:bottom-50 xl:right-80">
            <img
              src={imagery.authorizedTrainingPartner}
              alt="PMI Authorized Training Partner"
              className="animate-fade-up h-32 w-auto object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.45)] lg:h-52 xl:h-72"
              style={{ animationDelay: "900ms" }}
            />
          </div>
        </div>
        <NetworkPattern animated className="absolute -bottom-20 -left-20 h-[460px] text-white/[0.12]" />

        <div className="container-site relative pb-24 pt-[330px] lg:pb-32 lg:pt-[210px]">
          <div className="max-w-xl">
            <p className="eyebrow animate-fade-in-soft">{t("home.hero.badge")}</p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.06] tracking-tight [overflow-wrap:anywhere] min-[400px]:text-5xl sm:text-6xl lg:text-[4.25rem]">
              <AnimatedWords text={t("home.hero.titleA")} delay={150} />{" "}
              <AnimatedWords text={t("home.hero.titleB")} delay={150 + t("home.hero.titleA").split(" ").length * 70} className="text-accent" />
              {t("home.hero.titleC") && <>{" "}<AnimatedWords text={t("home.hero.titleC")} delay={500} /></>}
              {t("home.hero.titleD") && <>{" "}<AnimatedWords text={t("home.hero.titleD")} delay={600} className="text-accent" /></>}
            </h1>
            <p className="animate-fade-up mt-7 text-lg leading-relaxed text-white/80" style={{ animationDelay: "500ms" }}>
              {t("home.hero.desc")}
            </p>
            <div className="animate-fade-up mt-10 flex flex-wrap gap-3" style={{ animationDelay: "650ms" }}>
              <Link to="/services" className="btn btn-primary">
                {t("home.hero.ctaServices")} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn btn-outline-white">
                {t("home.hero.ctaContact")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="border-b border-border">
        <Reveal as="dl" variant="stagger" className="container-site grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x">
          <StatItem target={12} suffix="+" label={t("home.hero.stat1v")} />
          <StatItem target={10} label={t("home.hero.stat2v")} />
          <StatItem target={5} label={t("home.hero.stat3v")} />
          <div className="flex items-center gap-4 py-8 lg:px-10">
            <img src={imagery.pmpBadge} alt="PMP" className="h-16 w-16 object-contain" loading="lazy" />
            <p className="text-sm leading-relaxed text-muted-foreground">{t("home.stats.atp")}</p>
          </div>
        </Reveal>
      </section>

      {/* Nouveaux certifiés : visuels de félicitations les plus récents */}
      {featuredCertified.length > 0 && (
        <section className="bg-mesh section-y">
          <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal variant="left" className="lg:col-span-4">
              <p className="eyebrow">{t("home.certified.eyebrow")}</p>
              <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl">{t("home.certified.title")}</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("home.certified.desc")}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link to="/certifies" className="btn btn-primary">
                  {t("home.certified.btn")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/formation" search={{ course: "" }} className="btn btn-outline-dark">
                  {t("certified.cta.btn")}
                </Link>
              </div>
            </Reveal>
            <div className={`grid gap-6 sm:grid-cols-2 lg:col-span-8 ${featuredCertified.length >= 3 ? "lg:grid-cols-3" : ""}`}>
              {featuredCertified.map((p, i) => (
                <Reveal key={p.name} variant="scale" delay={i * 150}>
                  <Link to="/certifies" className="img-zoom block overflow-hidden rounded-2xl shadow-[0_24px_50px_-24px_rgb(10_37_64/0.55)]">
                    <img
                      src={p.poster}
                      alt={`${t("home.certified.alt")} ${p.name}, ${p.certification}`}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Qui sommes-nous : grande affirmation + photos */}
      <section className="container-site section-y">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="left" className="lg:col-span-7">
            <p className="eyebrow">{t("home.value.eyebrow")}</p>
            <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl">{t("home.value.title")}</h2>
          </Reveal>
          <Reveal variant="right" delay={120} className="lg:col-span-5 lg:pt-14">
            <p className="text-lg leading-relaxed text-muted-foreground">{t("home.value.desc")}</p>
            <ul className="mt-8 space-y-3">
              {pillars.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px] font-medium text-navy">
                  <Check className="h-4 w-4 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
            <Link to="/a-propos" className="group mt-10 inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-sm font-semibold text-navy">
              {t("home.about.more")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          <Reveal variant="image" className="img-zoom rounded-2xl sm:col-span-2">
            <img src={imagery.leaderPitch} alt="Trainer leading a professional certification session" loading="lazy" className="aspect-[4/3] h-full w-full object-cover sm:aspect-[16/9]" />
          </Reveal>
          <div className="flex flex-col gap-4">
            <Reveal variant="image" delay={150} className="img-zoom flex-1 rounded-2xl">
              <img src={imagery.teamLaughing} alt="Talent development and collaboration" loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
            </Reveal>
            <Reveal variant="scale" delay={300} className="rounded-2xl bg-navy-deep p-6 text-white">
              <p className="font-display text-4xl font-bold text-accent">2012</p>
              <p className="mt-1 text-sm text-white/65">{t("home.hero.badge")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prochaine session & actualités */}
      <Reveal variant="scale" className="container-site">
        <div className="overflow-hidden rounded-2xl">
          <HeroPromoStrip />
        </div>
      </Reveal>

      {/* Expertises : liste éditoriale numérotée */}
      <section className="container-site section-y">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">{t("home.expertises.eyebrow")}</p>
            <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-navy sm:text-5xl">{t("home.expertises.title")}</h2>
          </div>
          <Link to="/services" className="btn btn-outline-dark shrink-0 self-start lg:self-auto">
            {t("home.expertises.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <ol className="mt-14 border-t border-navy/15">
          {expertises.map((e, idx) => (
            <Reveal key={e.key} as="li" delay={idx * 50}>
              <Link
                to="/services"
                hash={e.key}
                className="group grid gap-4 border-b border-navy/15 py-8 transition-colors hover:bg-[#F4F6F9] md:grid-cols-12 md:items-start md:gap-8 md:px-4"
              >
                <span className="font-display text-sm font-semibold text-accent md:col-span-1 md:pt-1.5">0{idx + 1}</span>
                <h3 className="text-xl font-semibold leading-snug text-navy transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent md:col-span-4 lg:text-2xl">{e.title}</h3>
                <div className="md:col-span-6">
                  <p className="leading-relaxed text-muted-foreground">{e.desc}</p>
                  {e.key === "training" && (
                    <div className="mt-4 flex items-center gap-3">
                      <img src={imagery.capmBadge} alt="CAPM" className="h-11 w-11 object-contain" loading="lazy" />
                      <img src={imagery.pmpBadge} alt="PMP" className="h-11 w-11 object-contain" loading="lazy" />
                    </div>
                  )}
                </div>
                <span className="hidden justify-end md:col-span-1 md:flex">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-lg text-navy">
            <span className="font-semibold">{t("home.exp.custom.title")}</span>{" "}
            <span className="text-muted-foreground">{t("home.exp.custom.desc")}</span>
          </p>
          <Link to="/contact" className="btn btn-primary shrink-0">
            {t("services.approach.talk")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="relative overflow-hidden bg-navy-deep text-white section-y">
        <NetworkPattern animated className="absolute -right-20 top-1/2 hidden h-[110%] -translate-y-1/2 text-white/[0.1] lg:block" />
        <div className="container-site relative grid gap-14 lg:grid-cols-12">
          <Reveal variant="left" className="lg:col-span-5">
            <p className="eyebrow">{t("home.why.eyebrow")}</p>
            <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{t("home.why.title")}</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/65">{t("home.why.desc")}</p>
            <Link to="/contact" className="btn btn-primary mt-10">
              {t("home.hero.ctaContact")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <ol className="lg:col-span-6 lg:col-start-7">
            {reasons.map((r, idx) => (
              <Reveal key={r} as="li" variant="right" delay={idx * 100} className="flex gap-6 border-b border-white/15 py-7 first:pt-0 last:border-0">
                <span className="font-display text-sm font-semibold text-accent">0{idx + 1}</span>
                <p className="text-lg font-medium leading-relaxed text-white/90">{r}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Références */}
      <ClientLogos />

      {/* Témoignages : citations éditoriales */}
      <section className="bg-mesh section-y">
        <div className="container-site">
          <p className="eyebrow">{t("home.testimonials.eyebrow")}</p>
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-navy/15">
            {testimonials.map((item, idx) => (
              <Reveal key={item.name} variant={idx === 0 ? "left" : "right"} delay={idx * 150} className={idx === 0 ? "lg:pr-14" : "lg:pl-14"}>
                <figure>
                  <span className="font-display text-7xl font-bold leading-none text-accent" aria-hidden="true">“</span>
                  <blockquote className="mt-2 text-xl leading-relaxed text-navy lg:text-2xl">{item.quote}</blockquote>
                  <figcaption className="mt-8">
                    <p className="font-semibold text-navy">{item.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.role} · {item.org}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-24">
        <CtaBand />
      </div>
    </SiteLayout>
  );
}
