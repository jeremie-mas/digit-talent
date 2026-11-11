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
} from "lucide-react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
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

  const keyFigures = [
    { value: "2012", label: t("home.hero.badge") },
    { value: "10", label: t("home.hero.stat2v") },
    { value: "5", label: t("home.hero.stat3v") },
  ];

  return (
    <SiteLayout>
      <PageHero
        image={imagery.technicianServer}
        imageAlt="Supervision de serveurs et d'infrastructures informatiques"
        eyebrow={t("about.hero.eyebrow")}
        title={t("about.hero.title")}
        description={t("about.hero.desc1")}
        crumbs={[{ label: t("nav.about") }]}
      />

      {/* Présentation */}
      <section className="container-site section-y">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={t("home.value.eyebrow")} title={t("home.value.title")} description={t("about.hero.desc2")} />
            <div className="mt-10 grid grid-cols-3 gap-3">
              {keyFigures.map((k) => (
                <div key={k.value} className="card-surface px-5 py-6">
                  <p className="gradient-text-navy font-display text-3xl font-bold">{k.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase leading-relaxed tracking-[0.12em] text-muted-foreground">{k.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="relative grid grid-cols-2 gap-4">
            <div className="animate-blob-3 pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <img src={imagery.teamLaughing} alt="Collaboration d'équipe" loading="lazy" className="col-span-2 aspect-[16/9] w-full rounded-2xl object-cover" />
            <img src={imagery.coworkersAi} alt="Consultants travaillant sur des projets d'innovation" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <img src={imagery.leaderPitch} alt="Présentation de performance" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-mesh section-y">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {[
            { icon: Eye, title: t("about.vision.title"), text: t("about.vision.desc") },
            { icon: Target, title: t("about.mission.title"), text: t("about.mission.desc") },
          ].map((b, idx) => (
            <Reveal key={b.title} delay={idx * 120}>
              <div className="card-surface card-interactive group h-full p-8 lg:p-10">
                <div className="icon-tile h-14 w-14 group-hover:icon-tile-accent">
                  <b.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-navy">{b.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Valeurs */}
      <section className="container-site section-y">
        <Reveal>
          <SectionHeading eyebrow={t("about.values.eyebrow")} title={t("about.values.title")} />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, idx) => (
            <Reveal key={v.key} delay={idx * 60} className="group card-surface card-interactive p-8">
              <div className="icon-tile icon-tile-accent h-12 w-12 group-hover:-rotate-6">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-navy">{t(`about.val.${v.key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`about.val.${v.key}.desc`)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Direction */}
      <Reveal as="section" className="container-site pb-24">
        <div className="relative grid gap-10 overflow-hidden rounded-3xl bg-deep p-10 text-white lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16 lg:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          />
          <div className="relative w-fit shrink-0">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white/10 bg-gradient-to-br from-accent to-orange-soft text-5xl font-bold text-white">
              CY
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-navy shadow-lg ring-4 ring-navy-deep">
              <Award className="h-5 w-5 text-accent" />
            </span>
          </div>
          <div className="relative">
            <p className="eyebrow">{t("about.founder.eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-bold">{t("about.founder.title")}</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-white/70">{t("about.founder.desc")}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["PMP", "PMI-PMOCP"].map((cert) => (
                <span key={cert} className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/85">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Équipe (Supabase ou repli) */}
      {team.length > 0 && (
        <section className="container-site pb-24">
          <Reveal>
            <SectionHeading eyebrow={t("about.team.eyebrow")} title={t("about.team.title")} description={t("about.team.desc")} />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, idx) => (
              <Reveal key={member.id} delay={idx * 80}>
                <div className="card-surface card-interactive group flex h-full flex-col p-6">
                  <div className="flex items-center gap-4">
                    {member.photo_url ? (
                      <img src={member.photo_url} alt={member.name} className="h-16 w-16 rounded-full border-2 border-accent/30 object-cover" />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-xl font-bold text-accent">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-navy transition-colors group-hover:text-accent">{member.name}</h3>
                      <p className="mt-0.5 text-xs font-semibold text-accent">{member.role}</p>
                    </div>
                  </div>
                  {member.bio && <p className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>}
                  {member.linkedin_url && (
                    <div className="mt-5 border-t border-border pt-3">
                      <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy transition hover:text-accent">
                        <Linkedin className="h-3.5 w-3.5" />
                        <span>LinkedIn</span>
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
      <Reveal as="section" className="container-site pb-24">
        <div className="flex flex-col gap-8 rounded-3xl border border-border/60 bg-mesh p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="flex items-center gap-6">
            <img src={imagery.authorizedTrainingPartner} alt="PMI Authorized Training Partner" className="h-20 w-20 shrink-0 object-contain" loading="lazy" />
            <div>
              <p className="eyebrow">{t("about.certs.eyebrow")}</p>
              <h2 className="mt-3 text-2xl font-bold text-navy">{t("about.certs.title")}</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {certs.map((c) => (
              <span key={c} className="tag">{c}</span>
            ))}
          </div>
        </div>
      </Reveal>

      <CtaBand />
    </SiteLayout>
  );
}
