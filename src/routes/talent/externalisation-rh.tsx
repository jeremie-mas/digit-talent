import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { useT } from "@/i18n/LanguageProvider";
import { FileText, Shield, Settings, BarChart2 } from "lucide-react";

export const Route = createFileRoute("/talent/externalisation-rh")({
  head: () => ({
    meta: [
      { title: "HR Outsourcing | DIGIT & TALENT" },
      { name: "description", content: "Delegate your human resources management to our experts and focus on your core business." },
    ],
  }),
  component: ExternalisationRH,
});

function ExternalisationRH() {
  const { t } = useT();

  const features = [
    { icon: FileText,  title: t("talent.externalisation.f1.title"), desc: t("talent.externalisation.f1.desc") },
    { icon: Shield,    title: t("talent.externalisation.f2.title"), desc: t("talent.externalisation.f2.desc") },
    { icon: Settings,  title: t("talent.externalisation.f3.title"), desc: t("talent.externalisation.f3.desc") },
    { icon: BarChart2, title: t("talent.externalisation.f4.title"), desc: t("talent.externalisation.f4.desc") },
  ];

  return (
    <SiteLayout>
      <PageHero
        image={imagery.teamLaughing}
        imageAlt="Équipe RH en collaboration"
        title={t("talent.externalisation.title")}
        description={t("talent.externalisation.desc")}
        crumbs={[{ label: t("nav.talent") }, { label: t("talent.externalisation.title") }]}
      />

      <Reveal as="section" className="container-site section-y">
        <h2 className="max-w-2xl text-3xl font-bold leading-tight text-navy sm:text-4xl">{t("talent.externalisation.section.title")}</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("talent.externalisation.section.desc")}</p>
        <Reveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={f.title} className="card-surface card-interactive p-7">
              <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </Reveal>
      </Reveal>

      <CtaBand title={t("talent.externalisation.cta.title")} description={t("talent.externalisation.cta.desc")} />
    </SiteLayout>
  );
}
