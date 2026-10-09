import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, GraduationCap, Send, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SiteLayout } from "@/components/SiteLayout";
import { useT } from "@/i18n/LanguageProvider";
import { getPublicServices } from "@/lib/api/public.data.functions";
import { submitTrainingRegistration } from "@/lib/api/formation.functions";

const DEFAULT_COURSES = [
  { id: "pmp", title: "Certification PMP® (Project Management Professional)" },
  { id: "capm", title: "Certification CAPM® (Certified Associate in Project Management)" },
  { id: "change", title: "Conduite du Changement Organisationnel (Prosci & ADKAR)" },
  { id: "digital", title: "Transformation Digitale & IA Générative pour Managers" },
];

const CUSTOM_COURSE = "Formation Sur Mesure / Intra-Entreprise";

export const Route = createFileRoute("/formation_/inscription")({
  validateSearch: (search: Record<string, unknown>) => ({
    course: typeof search.course === "string" ? search.course : "",
  }),
  head: () => ({
    meta: [
      { title: "Inscription à une formation — DIGIT & TALENT" },
      {
        name: "description",
        content: "Inscrivez-vous aux formations certifiantes PMP®, CAPM®, Prosci et transformation digitale de DIGIT & TALENT.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: TrainingRegistrationPage,
});

function TrainingRegistrationPage() {
  const { t } = useT();
  const { course: requestedCourse } = Route.useSearch();
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [selectedCourse, setSelectedCourse] = useState(DEFAULT_COURSES[0].title);
  const [sessionPreference, setSessionPreference] = useState("Prochaine session (Présentiel à Lomé)");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getPublicServices()
      .then((res) => {
        const trainingServices = (res?.items || []).filter(
          (service) =>
            service.icon === "GraduationCap" ||
            service.title.toLowerCase().includes("formation") ||
            service.title.toLowerCase().includes("certif"),
        );
        const existingTitles = new Set(DEFAULT_COURSES.map((course) => course.title.toLowerCase()));
        const additionalCourses = trainingServices
          .filter((service) => !existingTitles.has(service.title.toLowerCase()))
          .map((service) => ({ id: service.slug, title: service.title }));
        if (additionalCourses.length) setCourses([...DEFAULT_COURSES, ...additionalCourses]);
      })
      .catch((error) => console.error("Erreur chargement formations:", error));
  }, []);

  useEffect(() => {
    if (!requestedCourse) return;
    const matchingCourse = courses.find(
      (course) => course.id === requestedCourse || course.title === requestedCourse,
    );
    if (matchingCourse) setSelectedCourse(matchingCourse.title);
    else if (requestedCourse === CUSTOM_COURSE) setSelectedCourse(CUSTOM_COURSE);
  }, [requestedCourse, courses]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitTrainingRegistration({
        data: {
          fullName: String(formData.get("fullName") || "").trim(),
          email: String(formData.get("email") || "").trim(),
          phone: String(formData.get("phone") || "").trim(),
          company: String(formData.get("company") || "").trim(),
          role: String(formData.get("role") || "").trim(),
          trainingCourse: selectedCourse,
          sessionPreference,
          message: String(formData.get("message") || "").trim(),
          website: String(formData.get("website") || "").trim(),
        },
      });

      if (!result.success) {
        setErrorMessage("Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.");
        return;
      }

      form.reset();
      setSent(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d'envoyer votre inscription pour le moment. Réessayez plus tard.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatOptions = [
    t("formation.form.format1"),
    t("formation.form.format2"),
    t("formation.form.format3"),
    t("formation.form.format4"),
  ];

  useEffect(() => {
    setSessionPreference(t("formation.form.format1"));
  }, [t]);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-navy-deep py-20 pt-[145px] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-deep to-blue/30" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow">{t("formation.hero.eyebrow")}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
            {t("formation.modal.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            {t("formation.modal.subtitle")}
          </p>
        </div>
        <Breadcrumb
          crumbs={[
            { label: t("nav.training"), to: "/formation" },
            { label: t("formation.modal.title") },
          ]}
        />
      </section>

      <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16 lg:px-8">
        {sent ? (
          <section className="rounded-3xl border border-border bg-card p-7 text-center shadow-soft sm:p-10" aria-live="polite">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-foreground">{t("formation.modal.successTitle")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t("formation.modal.successDesc1")} <strong className="text-foreground">{selectedCourse}</strong>. {t("formation.modal.successDesc2")}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/formation" className="btn btn-primary inline-flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" /> {t("nav.training")}
              </a>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="btn btn-outline-dark cursor-pointer"
              >
                {t("formation.modal.anotherRegistration")}
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">{t("formation.modal.title")}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">{t("formation.modal.subtitle")}</p>
              </div>
            </div>

            {errorMessage && (
              <div role="alert" className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              <div>
                <label htmlFor="registration-course" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground">
                  {t("formation.form.course")} *
                </label>
                <select
                  id="registration-course"
                  value={selectedCourse}
                  onChange={(event) => setSelectedCourse(event.target.value)}
                  required
                  className="w-full rounded-xl border border-input bg-card px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  {courses.map((course) => <option key={course.id} value={course.title}>{course.title}</option>)}
                  <option value={CUSTOM_COURSE}>{t("formation.form.customOption")}</option>
                </select>
              </div>

              <fieldset>
                <legend className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">
                  {t("formation.form.format")} *
                </legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {formatOptions.map((format, index) => (
                    <label key={format} className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-sm transition ${sessionPreference === format ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:bg-secondary/60"}`}>
                      <input
                        type="radio"
                        name="sessionPreferenceChoice"
                        value={format}
                        checked={sessionPreference === format}
                        onChange={() => setSessionPreference(format)}
                        required={index === 0}
                        className="mt-0.5 accent-accent"
                      />
                      <span>{format}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField id="registration-name" name="fullName" label={t("formation.form.fullName")} placeholder={t("formation.form.fullNamePlaceholder")} required />
                <FormField id="registration-email" name="email" label={t("formation.form.email")} type="email" placeholder="amina.kodjo@entreprise.com" required />
                <FormField id="registration-phone" name="phone" label={t("formation.form.phone")} type="tel" placeholder="+228 90 00 00 00" required />
                <FormField id="registration-company" name="company" label={t("formation.form.company")} placeholder={t("formation.form.companyPlaceholder")} />
              </div>

              <FormField id="registration-role" name="role" label={t("formation.form.role")} placeholder={t("formation.form.rolePlaceholder")} />

              <div>
                <label htmlFor="registration-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground">
                  {t("formation.form.message")}
                </label>
                <textarea
                  id="registration-message"
                  name="message"
                  rows={4}
                  placeholder={t("formation.form.messagePlaceholder")}
                  className="w-full resize-y rounded-xl border border-input bg-card px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary flex w-full cursor-pointer items-center justify-center gap-2 !py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />{t("formation.form.submitting")}</> : <>{t("formation.form.submit")}<Send className="h-4 w-4" /></>}
              </button>

              <p className="flex items-center justify-center gap-1.5 pb-1 text-center text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> {t("formation.form.privacy")}
              </p>
            </form>
          </section>
        )}
      </main>
    </SiteLayout>
  );
}

function FormField({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground">
        {label}{required ? " *" : ""}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-input bg-card px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
