import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { useT } from "@/i18n/LanguageProvider";
import { Calculator, FileSpreadsheet, CheckCircle, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/talent/gestion-paie")({
  head: () => ({
    meta: [
      { title: "Payroll Management — DIGIT & TALENT" },
      { name: "description", content: "Reliable, compliant and secure payroll processing for your employees, including social security filings." },
    ],
  }),
  component: GestionPaie,
});

function GestionPaie() {
  const { t } = useT();

  const features = [
    { icon: Calculator,     title: t("talent.paie.f1.title"), desc: t("talent.paie.f1.desc") },
    { icon: FileSpreadsheet,title: t("talent.paie.f2.title"), desc: t("talent.paie.f2.desc") },
    { icon: CheckCircle,    title: t("talent.paie.f3.title"), desc: t("talent.paie.f3.desc") },
    { icon: TrendingUp,     title: t("talent.paie.f4.title"), desc: t("talent.paie.f4.desc") },
  ];

  return (
    <SiteLayout>
      <PageHero
        image={imagery.futuristicBusiness}
        imageAlt="Environnement professionnel moderne"
        eyebrow={t("talent.paie.eyebrow")}
        title={t("talent.paie.title")}
        description={t("talent.paie.desc")}
        crumbs={[{ label: t("nav.talent") }, { label: t("talent.paie.title") }]}
      />

      <Reveal as="section" className="container-site section-y">
        <p className="eyebrow">{t("talent.paie.section.eyebrow")}</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-navy sm:text-4xl">{t("talent.paie.section.title")}</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("talent.paie.section.desc")}</p>
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

      <CtaBand title={t("talent.paie.cta.title")} description={t("talent.paie.cta.desc")} />
    </SiteLayout>
  );
}
