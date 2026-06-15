import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { useT } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DIGIT & TALENT" },
      { name: "description", content: "Contact DIGIT & TALENT in Lomé for your digitalization, organizational transformation and training projects." },
      { property: "og:title", content: "Contact — DIGIT & TALENT" },
      { property: "og:description", content: "Let's discuss your digital or organizational transformation project." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t, tList } = useT();
  const [sent, setSent] = useState(false);
  const subjects = tList("contact.subjects");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-navy-deep py-24 text-white">
        <img
          src={imagery.futuristicBusiness}
          alt="Professional exchange in a digital environment"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow animate-fade-in-soft">{t("contact.hero.eyebrow")}</p>
          <h1 className="animate-fade-up mt-5 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl" style={{ animationDelay: "120ms" }}>{t("contact.hero.title")}</h1>
          <p className="animate-fade-up mt-6 max-w-3xl text-lg leading-relaxed text-white/80" style={{ animationDelay: "240ms" }}>{t("contact.hero.desc")}</p>
        </div>
      </section>


      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        {/* Info */}
        <div className="space-y-4">
          {([
            { icon: MapPin, title: t("contact.info.address"), value: t("contact.info.addressV") },
            { icon: Mail, title: t("contact.info.email"), value: "contact@digit-talent.com", href: "mailto:contact@digit-talent.com" },
            { icon: Phone, title: t("contact.info.phone"), value: "+228 91 98 20 23 — +228 99 90 08 21", href: "tel:+22891982023" },
            { icon: Clock, title: t("contact.info.hours"), value: t("contact.info.hoursV") },
          ] as { icon: typeof MapPin; title: string; value: string; href?: string }[]).map((c, idx) => (
            <Reveal key={c.title} delay={idx * 80}>
              <div className="card-surface card-interactive group flex gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-accent transition duration-300 group-hover:bg-accent group-hover:text-white">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{c.title}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-1 block text-sm font-medium text-foreground hover:text-accent">{c.value}</a>
                  ) : (
                    <p className="mt-1 text-sm font-medium">{c.value}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Form */}
        <Reveal>
        <form onSubmit={onSubmit} className="card-surface p-8 lg:p-12">
          {sent ? (
            <div className="animate-fade-up flex h-full min-h-[400px] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Send className="h-7 w-7" />
              </div>
              <h2 className="mt-5 text-2xl font-bold tracking-tight">{t("contact.form.sentTitle")}</h2>
              <p className="mt-2 max-w-sm text-muted-foreground">{t("contact.form.sentDesc")}</p>
              <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-accent hover:underline">
                {t("contact.form.again")}
              </button>
            </div>
          ) : (
            <>
              <p className="eyebrow">{t("contact.form.eyebrow")}</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight">{t("contact.form.title")}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{t("contact.form.hint")}</p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label={t("contact.form.name")} optionalLabel={t("contact.form.optional")} name="name" required />
                <Field label={t("contact.form.company")} optionalLabel={t("contact.form.optional")} name="company" />
                <Field label={t("contact.form.email")} optionalLabel={t("contact.form.optional")} name="email" type="email" required />
                <Field label={t("contact.form.phone")} optionalLabel={t("contact.form.optional")} name="phone" type="tel" />
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">{t("contact.form.subject")}</label>
                  <select required className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition outline-none focus:border-accent focus:ring-2 focus:ring-accent/20">
                    <option value="">{t("contact.form.subjectPh")}</option>
                    {subjects.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium">{t("contact.form.message")}</label>
                  <textarea required rows={5} className="w-full resize-y rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-7">
                {t("contact.form.submit")} <Send className="h-4 w-4" />
              </button>
            </>
          )}
        </form>
        </Reveal>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required = false, optionalLabel = "(optional)" }: { label: string; name: string; type?: string; required?: boolean; optionalLabel?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}{!required && <span className="text-muted-foreground"> {optionalLabel}</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm transition outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
