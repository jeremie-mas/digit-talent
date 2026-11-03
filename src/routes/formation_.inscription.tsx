import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, GraduationCap, Send, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SiteLayout } from "@/components/SiteLayout";
import { useT } from "@/i18n/LanguageProvider";
import { submitTrainingRegistration } from "@/lib/api/formation.functions";
import { DEFAULT_TRAINING_FORM_CONFIG, getPublicTrainingFormConfig, type TrainingFormConfig } from "@/lib/api/training-form.functions";

export const Route = createFileRoute("/formation_/inscription")({
  validateSearch: (search: Record<string, unknown>) => ({
    course: typeof search.course === "string" ? search.course : "",
  }),
  head: () => ({
    meta: [
      { title: "Training registration — DIGIT & TALENT" },
      {
        name: "description",
        content: "Register for DIGIT & TALENT certification training: PMP®, CAPM®, Prosci and digital transformation.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: TrainingRegistrationPage,
});

function TrainingRegistrationPage() {
  const { t } = useT();
  const { course: requestedCourse } = Route.useSearch();
  const [selectedCourse, setSelectedCourse] = useState(DEFAULT_TRAINING_FORM_CONFIG.courses[0]);
  const [sessionPreference, setSessionPreference] = useState("Prochaine session (Présentiel à Lomé)");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formConfig, setFormConfig] = useState<TrainingFormConfig>(DEFAULT_TRAINING_FORM_CONFIG);

  useEffect(() => {
    getPublicTrainingFormConfig().then(setFormConfig).catch((error) => console.error("Erreur chargement formulaire:", error));
  }, []);

  useEffect(() => {
    setSelectedCourse((current) => formConfig.courses.includes(current) ? current : formConfig.courses[0] || "");
    setSessionPreference(formConfig.formats[0] || "");
  }, [formConfig]);

  useEffect(() => {
    if (!requestedCourse) return;
    const matchingCourse = formConfig.courses.find((course) => course === requestedCourse);
    if (matchingCourse) setSelectedCourse(matchingCourse);
  }, [requestedCourse, formConfig]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitTrainingRegistration({
        data: {
          fullName: String(formData.get("field_fullName") || "").trim(),
          email: String(formData.get("field_email") || "").trim(),
          phone: String(formData.get("field_phone") || "").trim(),
          company: String(formData.get("field_company") || "").trim(),
          role: String(formData.get("field_role") || "").trim(),
          projectManagementExperience: String(formData.get("field_project_management_experience") || "").trim(),
          customFields: Object.fromEntries(formConfig.fields.filter((field) => field.enabled).map((field) => [field.id, String(formData.get(`field_${field.id}`) || "").trim()])),
          trainingCourse: selectedCourse,
          sessionPreference,
          message: String(formData.get("field_message") || "").trim(),
          website: String(formData.get("website") || "").trim(),
        },
      });

      if (!result.success) {
        setErrorMessage(formConfig.validationError);
        return;
      }

      form.reset();
      setSent(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : formConfig.submitError,
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatOptions = formConfig.formats;

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-navy-deep py-20 pt-[145px] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-deep to-blue/30" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow">{formConfig.badge}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
            {formConfig.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-semibold text-accent sm:text-base">{formConfig.sessionText}</p>
          {formConfig.description && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{formConfig.description}</p>}
        </div>
        <Breadcrumb
          crumbs={[
            { label: t("nav.training"), to: "/formation" },
            { label: formConfig.title },
          ]}
        />
      </section>

      <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16 lg:px-8">
        {sent ? (
          <section className="rounded-3xl border border-border bg-card p-7 text-center shadow-soft sm:p-10" aria-live="polite">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-foreground">{formConfig.successTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {formConfig.successText} <strong className="text-foreground">{selectedCourse}</strong>.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/formation" className="btn btn-primary inline-flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" /> {formConfig.returnLabel}
              </a>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="btn btn-outline-dark cursor-pointer"
              >
                {formConfig.anotherRegistrationLabel}
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
                <h2 className="font-semibold text-foreground">{formConfig.title}</h2>
                <p className="mt-0.5 text-xs font-medium text-accent">{formConfig.sessionText}</p>
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
                  {formConfig.courseLabel} *
                </label>
                <select
                  id="registration-course"
                  value={selectedCourse}
                  onChange={(event) => setSelectedCourse(event.target.value)}
                  required
                  className="w-full rounded-xl border border-input bg-card px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  {formConfig.courses.map((course) => <option key={course} value={course}>{course}</option>)}
                </select>
              </div>

              <fieldset>
                <legend className="mb-2 block text-xs font-semibold uppercase tracking-wider text-foreground">
                  {formConfig.formatLabel} *
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
                {formConfig.fields.filter((field) => field.enabled).map((field) => <FormField key={field.id} id={`registration-${field.id}`} name={`field_${field.id}`} label={field.label} placeholder={field.placeholder} type={field.type} required={field.required} optionalLabel={formConfig.optionalLabel} />)}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary flex w-full cursor-pointer items-center justify-center gap-2 !py-3.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />{formConfig.submittingLabel}</> : <>{formConfig.submitLabel}<Send className="h-4 w-4" /></>}
              </button>

              <p className="flex items-center justify-center gap-1.5 pb-1 text-center text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> {formConfig.privacyText}
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
  optionalLabel = "",
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: "text" | "email" | "tel" | "number" | "textarea";
  required?: boolean;
  optionalLabel?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground">
        {label}{required ? " *" : optionalLabel ? ` (${optionalLabel})` : ""}
      </label>
      {type === "textarea" ? (
        <textarea id={id} name={name} placeholder={placeholder} required={required} rows={3} className="w-full rounded-xl border border-input bg-card px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
      ) : (
        <input id={id} name={name} type={type} placeholder={placeholder} required={required} className="w-full rounded-xl border border-input bg-card px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
      )}
    </div>
  );
}
