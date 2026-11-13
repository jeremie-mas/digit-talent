import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { useT } from "@/i18n/LanguageProvider";
import { Database, Zap, BarChart2, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/talent/digitalisation-rh")({
  head: () => ({
    meta: [
      { title: "HR Digitalization | DIGIT & TALENT" },
      { name: "description", content: "Digital transformation of your HR processes: HRIS, automation, analytics and team training." },
    ],
  }),
  component: DigitalisationRH,
});

function DigitalisationRH() {
  const { t } = useT();

  const features = [
    { icon: Database,      title: t("talent.digitalisation.f1.title"), desc: t("talent.digitalisation.f1.desc") },
    { icon: Zap,           title: t("talent.digitalisation.f2.title"), desc: t("talent.digitalisation.f2.desc") },
    { icon: BarChart2,     title: t("talent.digitalisation.f3.title"), desc: t("talent.digitalisation.f3.desc") },
    { icon: GraduationCap, title: t("talent.digitalisation.f4.title"), desc: t("talent.digitalisation.f4.desc") },
  ];

  return (
    <SiteLayout>
      <PageHero
        image={imagery.coworkersAi}
        imageAlt="Consultants travaillant sur des systèmes digitaux RH"
        title={t("talent.digitalisation.title")}
        description={t("talent.digitalisation.desc")}
        crumbs={[{ label: t("nav.talent") }, { label: t("talent.digitalisation.title") }]}
      />

      <Reveal as="section" className="container-site section-y">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight text-navy sm:text-4xl">{t("talent.digitalisation.section.title")}</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("talent.digitalisation.section.desc")}</p>
        <Reveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={f.title} className="card-surface card-interactive p-7">
              <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </Reveal>
      </Reveal>

      <CtaBand title={t("talent.digitalisation.cta.title")} description={t("talent.digitalisation.cta.desc")} />
    </SiteLayout>
  );
}
