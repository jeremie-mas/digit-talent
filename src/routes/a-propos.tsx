import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  Award,
  Sparkles,
  Shield,
  Network,
  Heart,
  Lightbulb,
  Target,
  Eye,
  Linkedin,
  Users,
} from "lucide-react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useState, useEffect } from "react";
import {
  getPublicTeam,
  type PublicTeamMember,
  FALLBACK_TEAM,
} from "@/lib/api/public.data.functions";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "About us — DIGIT & TALENT" },
      {
        name: "description",
        content:
          "Founded in 2012 in Lomé, DIGIT & TALENT brings together certified consultants serving the convergence of digital and talent in Africa.",
      },
      { property: "og:title", content: "About DIGIT & TALENT" },
      { property: "og:description", content: "Our vision, mission, values and team." },
    ],
  }),
  component: About,
});

const certs = ["CAPM", "PMP", "PMI-ACP", "PMI-PMOCP", "PROSCI ADKAR"];

function About() {
  const { t } = useT();
  const [team, setTeam] = useState<PublicTeamMember[]>(FALLBACK_TEAM);

  useEffect(() => {
    getPublicTeam()
      .then((res) => {
        if (res?.items && res.items.length > 0) {
          setTeam(res.items);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement équipe:", err);
      });
  }, []);

  const values = [
    { icon: Award, key: "excellence" },
    { icon: Lightbulb, key: "innovation" },
    { icon: Shield, key: "integrity" },
    { icon: Network, key: "synergy" },
    { icon: Heart, key: "proximity" },
    { icon: Sparkles, key: "talents" },
  ] as const;

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-navy-deep py-24 pb-16 text-white pt-[150px]">
        <img
          src={imagery.technicianServer}
          alt="Supervision de serveurs et d'infrastructures informatiques"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow animate-fade-in-soft">{t("about.hero.eyebrow")}</p>
          <h1
            className="animate-fade-up mt-5 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl"
            style={{ animationDelay: "120ms" }}
          >
            {t("about.hero.title")}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-3xl text-lg leading-relaxed text-white/80"
            style={{ animationDelay: "240ms" }}
          >
            {t("about.hero.desc1")}
          </p>
          <p
            className="animate-fade-up mt-4 max-w-3xl leading-relaxed text-white/70"
            style={{ animationDelay: "340ms" }}
          >
            {t("about.hero.desc2")}
          </p>
        </div>
        <Breadcrumb crumbs={[{ label: t("nav.about") }]} />
      </section>

      {/* Team imagery */}
      <section className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { src: imagery.teamLaughing, alt: "Collaboration d'équipe" },
            { src: imagery.coworkersAi, alt: "Consultants travaillant sur des projets d'innovation" },
            { src: imagery.leaderPitch, alt: "Présentation de performance" },
          ].map((img, idx) => (
            <Reveal key={img.alt} delay={idx * 120}>
              <div className="group overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="aspect-[4/3] w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Eye, title: t("about.vision.title"), text: t("about.vision.desc") },
            { icon: Target, title: t("about.mission.title"), text: t("about.mission.desc") },
          ].map((b, idx) => (
            <Reveal key={b.title} delay={idx * 120}>
              <div className="card-surface card-interactive group h-full p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent transition duration-300 group-hover:bg-accent group-hover:text-white">
                  <b.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-2xl font-bold tracking-tight">{b.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow">{t("about.values.eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t("about.values.title")}</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, idx) => (
              <Reveal key={v.key} delay={idx * 70}>
                <div className="card-surface card-interactive group h-full p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent transition duration-300 group-hover:bg-accent group-hover:text-white">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{t(`about.val.${v.key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`about.val.${v.key}.desc`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <Reveal as="section" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="relative grid gap-10 overflow-hidden rounded-3xl bg-navy-deep p-10 text-white lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16 lg:p-16">
          <div className="animate-float-slow absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
          <div className="animate-float-slow absolute -bottom-20 left-40 h-48 w-48 rounded-full bg-accent/8 blur-3xl" style={{ animationDelay: "1.8s" }} />
          <div className="relative shrink-0">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-accent via-orange-soft to-accent/70 text-5xl font-bold text-white shadow-[0_0_60px_-10px_var(--orange)]">
              CY
            </div>
            <span className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent shadow-lg">
              <Award className="h-5 w-5 text-white" />
            </span>
          </div>
          <div className="relative">
            <p className="eyebrow">{t("about.founder.eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">{t("about.founder.title")}</h2>
            <p className="mt-5 leading-relaxed text-white/70">{t("about.founder.desc")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["PMP", "PMI-PMOCP"].map((cert) => (
                <span
                  key={cert}
                  className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Dynamic Team Section (from Supabase or Fallback) */}
      {team.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
          <Reveal>
            <div className="mb-12">
              <p className="eyebrow">{t("about.team.eyebrow")}</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl text-foreground">
                {t("about.team.title")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                {t("about.team.desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, idx) => (
              <Reveal key={member.id} delay={idx * 100}>
                <div className="card-surface card-interactive group h-full p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="h-16 w-16 rounded-full object-cover border-2 border-accent/30 shadow-md"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-navy text-accent flex items-center justify-center font-bold text-xl border-2 border-accent/20">
                          {member.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-accent mt-0.5">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {member.bio && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  {member.linkedin_url && (
                    <div className="mt-5 pt-3 border-t border-border">
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                        <span>Profil LinkedIn</span>
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      <Reveal as="section" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="card-surface p-10 lg:p-14">
          <p className="eyebrow">{t("about.certs.eyebrow")}</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight">{t("about.certs.title")}</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {certs.map((c) => (
              <span key={c} className="tag">
                {c}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </SiteLayout>
  );
}
