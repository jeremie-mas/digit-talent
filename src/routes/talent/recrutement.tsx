import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { useT } from "@/i18n/LanguageProvider";
import { Search, UserCheck, Users, ClipboardCheck } from "lucide-react";

export const Route = createFileRoute("/talent/recrutement")({
  head: () => ({
    meta: [
      { title: "Recruitment — DIGIT & TALENT" },
      { name: "description", content: "Identifying, sourcing and selecting qualified profiles that fit your culture and strategic goals." },
    ],
  }),
  component: Recrutement,
});

function Recrutement() {
  const { t } = useT();

  const features = [
    { icon: Search,        title: t("talent.recrutement.f1.title"), desc: t("talent.recrutement.f1.desc") },
    { icon: UserCheck,     title: t("talent.recrutement.f2.title"), desc: t("talent.recrutement.f2.desc") },
    { icon: Users,         title: t("talent.recrutement.f3.title"), desc: t("talent.recrutement.f3.desc") },
    { icon: ClipboardCheck,title: t("talent.recrutement.f4.title"), desc: t("talent.recrutement.f4.desc") },
  ];

  return (
    <SiteLayout>
      <PageHero
        image={imagery.professionalMan}
        imageAlt="Consultant en recrutement de talents"
        eyebrow={t("talent.recrutement.eyebrow")}
        title={t("talent.recrutement.title")}
        description={t("talent.recrutement.desc")}
        crumbs={[{ label: t("nav.talent") }, { label: t("talent.recrutement.title") }]}
      />

      <Reveal as="section" className="container-site section-y">
        <p className="eyebrow">{t("talent.recrutement.section.eyebrow")}</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-navy sm:text-4xl">{t("talent.recrutement.section.title")}</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("talent.recrutement.section.desc")}</p>
        <Reveal variant="stagger" className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group card-surface card-interactive p-7">
              <div className="icon-tile h-14 w-14 group-hover:icon-tile-accent">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </Reveal>
      </Reveal>

      <CtaBand title={t("talent.recrutement.cta.title")} description={t("talent.recrutement.cta.desc")} />
    </SiteLayout>
  );
}
