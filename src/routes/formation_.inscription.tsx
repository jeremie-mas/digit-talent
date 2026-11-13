import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, GraduationCap, Send, ShieldCheck } from "lucide-react";
import { imagery } from "@/assets/imagery";
import { PageHero } from "@/components/PageHero";
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
      { title: "Training registration | DIGIT & TALENT" },
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
      <PageHero
        image={imagery.coworkersAi}
        imageAlt="Session de formation professionnelle et certification"
        title={formConfig.title}
        description={
          <>
            <p className="text-base font-semibold text-accent sm:text-lg">{formConfig.sessionText}</p>
            {formConfig.description && <p className="mt-3">{formConfig.description}</p>}
          </>
        }
        crumbs={[
          { label: t("nav.training"), to: "/formation" },
          { label: formConfig.title },
        ]}
      />

      <div className="mx-auto w-full max-w-3xl px-5 py-12 sm:py-16 lg:px-8">
        {sent ? (
          <section className="rounded-lg border border-border bg-white p-6 sm:p-10" aria-live="polite">
            <h2 className="text-2xl font-bold text-navy">{formConfig.successTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {formConfig.successText} <strong>{selectedCourse}</strong>.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/formation" className="btn btn-primary justify-center">
                {formConfig.returnLabel}
              </a>
              <button type="button" onClick={() => setSent(false)} className="btn btn-outline-dark justify-center">
                {formConfig.anotherRegistrationLabel}
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-lg border border-border bg-white p-6 sm:p-10">
            <h2 className="text-xl font-bold text-navy">{formConfig.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{formConfig.sessionText}</p>
            <hr className="my-6 border-border" />

            {errorMessage && (
              <p role="alert" className="mb-5 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

              <div>
                <label htmlFor="registration-course" className="mb-1.5 block text-sm font-medium text-navy">
                  {formConfig.courseLabel} *
                </label>
                <select
                  id="registration-course"
                  value={selectedCourse}
                  onChange={(event) => setSelectedCourse(event.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-1 focus:ring-navy"
                >
                  {formConfig.courses.map((course) => <option key={course} value={course}>{course}</option>)}
                </select>
              </div>

              <fieldset>
                <legend className="mb-1.5 block text-sm font-medium text-navy">{formConfig.formatLabel} *</legend>
                <div className="mt-1 space-y-2">
                  {formatOptions.map((format, index) => (
                    <label key={format} className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground">
                      <input
                        type="radio"
                        name="sessionPreferenceChoice"
                        value={format}
                        checked={sessionPreference === format}
                        onChange={() => setSessionPreference(format)}
                        required={index === 0}
                        className="mt-0.5 shrink-0 accent-navy"
                      />
                      <span>{format}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                {formConfig.fields.filter((field) => field.enabled).map((field) => <FormField key={field.id} id={`registration-${field.id}`} name={`field_${field.id}`} label={field.label} placeholder={field.placeholder} type={field.type} required={field.required} optionalLabel={formConfig.optionalLabel} />)}
              </div>

              <button type="submit" disabled={submitting} className="btn btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? formConfig.submittingLabel : formConfig.submitLabel}
              </button>

              <p className="text-xs leading-relaxed text-muted-foreground">{formConfig.privacyText}</p>
            </form>
          </section>
        )}
      </div>
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
    <div className={type === "textarea" ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}{required ? " *" : optionalLabel ? ` (${optionalLabel})` : ""}
      </label>
      {type === "textarea" ? (
        <textarea id={id} name={name} placeholder={placeholder} required={required} rows={3} className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-1 focus:ring-navy" />
      ) : (
        <input id={id} name={name} type={type} placeholder={placeholder} required={required} className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-1 focus:ring-navy" />
      )}
    </div>
  );
}
