import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useT } from "@/i18n/LanguageProvider";
import { Search, UserCheck, Users, ClipboardCheck, ArrowRight } from "lucide-react";

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
      <section className="relative overflow-hidden bg-navy-deep pb-16 pt-[150px] text-white">
        <img
          src={imagery.professionalMan}
          alt="Consultant en recrutement de talents"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <p className="eyebrow animate-fade-in-soft">{t("talent.recrutement.eyebrow")}</p>
          <h1 className="animate-fade-up mt-5 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl" style={{ animationDelay: "120ms" }}>
            {t("talent.recrutement.title")}
          </h1>
          <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-white/75" style={{ animationDelay: "240ms" }}>
            {t("talent.recrutement.desc")}
          </p>
        </div>
        <Breadcrumb crumbs={[{ label: t("nav.talent") }, { label: t("talent.recrutement.title") }]} />
      </section>

      <Reveal as="section" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <p className="eyebrow">{t("talent.recrutement.section.eyebrow")}</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold sm:text-4xl">{t("talent.recrutement.section.title")}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{t("talent.recrutement.section.desc")}</p>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card-surface card-interactive p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <f.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="bg-navy-deep py-20 text-center text-white">
        <div className="mx-auto max-w-xl px-5">
          <h2 className="text-2xl font-bold sm:text-3xl">{t("talent.recrutement.cta.title")}</h2>
          <p className="mt-4 text-white/65">{t("talent.recrutement.cta.desc")}</p>
          <Link to="/contact" className="btn btn-primary mt-8 inline-flex">
            {t("home.hero.ctaContact")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </SiteLayout>
  );
}
