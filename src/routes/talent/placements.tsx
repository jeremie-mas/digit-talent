import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { useT } from "@/i18n/LanguageProvider";
import { Briefcase, Clock, Award, Globe } from "lucide-react";

export const Route = createFileRoute("/talent/placements")({
  head: () => ({
    meta: [
      { title: "Placements — DIGIT & TALENT" },
      { name: "description", content: "Talent placement on permanent, fixed-term or contract assignments in key sectors of the African economy." },
    ],
  }),
  component: Placements,
});

function Placements() {
  const { t } = useT();

  const features = [
    { icon: Briefcase, title: t("talent.placements.f1.title"), desc: t("talent.placements.f1.desc") },
    { icon: Clock,     title: t("talent.placements.f2.title"), desc: t("talent.placements.f2.desc") },
    { icon: Award,     title: t("talent.placements.f3.title"), desc: t("talent.placements.f3.desc") },
    { icon: Globe,     title: t("talent.placements.f4.title"), desc: t("talent.placements.f4.desc") },
  ];

  return (
    <SiteLayout>
      <PageHero
        image={imagery.leaderPitch}
        imageAlt="Leader en présentation de performance"
        eyebrow={t("talent.placements.eyebrow")}
        title={t("talent.placements.title")}
        description={t("talent.placements.desc")}
        crumbs={[{ label: t("nav.talent") }, { label: t("talent.placements.title") }]}
      />

      <Reveal as="section" className="container-site section-y">
        <p className="eyebrow">{t("talent.placements.section.eyebrow")}</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-navy sm:text-4xl">{t("talent.placements.section.title")}</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("talent.placements.section.desc")}</p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group card-surface card-interactive p-7">
              <div className="icon-tile h-14 w-14 group-hover:icon-tile-accent group-hover:-rotate-6">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <CtaBand title={t("talent.placements.cta.title")} description={t("talent.placements.cta.desc")} />
    </SiteLayout>
  );
}
