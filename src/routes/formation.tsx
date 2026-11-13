import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Users,
  Send,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { useState, type FormEvent, useEffect } from "react";
import { imagery } from "@/assets/imagery";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { CohortSlider } from "@/components/CohortSlider";
import { COHORTS } from "@/data/cohorts";
import { submitTrainingRegistration } from "@/lib/api/formation.functions";
import { DEFAULT_TRAINING_FORM_CONFIG, getPublicTrainingFormConfig, type TrainingFormConfig } from "@/lib/api/training-form.functions";
import { getPublicServices } from "@/lib/api/public.data.functions";
import { useT } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/formation")({
  validateSearch: (search: Record<string, unknown>) => ({
    course: typeof search.course === "string" ? search.course : "",
  }),
  head: () => ({
    meta: [
      { title: "Certification Training Catalog | DIGIT & TALENT" },
      {
        name: "description",
        content:
          "Explore the DIGIT & TALENT certification training catalog: globally recognized PMP®, CAPM®, Prosci change management and digital transformation.",
      },
      { property: "og:title", content: "Professional Training & Certifications | DIGIT & TALENT" },
      {
        property: "og:description",
        content: "Build your skills and earn internationally recognized PMI and Prosci certifications.",
      },
    ],
  }),
  component: FormationPage,
});

interface CourseItem {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  category: "project" | "change" | "digital" | "custom";
  hours: string;
  target: string;
  logoBadge?: string;
  highlights: string[];
}

const COURSES: CourseItem[] = [
  {
    id: "pmp",
    title: "Certification PMP® (Project Management Professional)",
    shortTitle: "Certification PMP®",
    badge: "Standard mondial PMI®",
    category: "project",
    hours: "35 heures de contact obligatoires",
    target: "Chefs de projets expérimentés, directeurs de programmes, consultants",
    logoBadge: imagery.pmpBadge,
    highlights: [
      "Conforme à la dernière version du PMBOK® & Exam Content Outline",
      "Simulateur d'examen blanc et questions types inclus",
      "Accompagnement personnalisé au dossier d'éligibilité PMI",
      "Attestation officielle de 35 PDU / Contact Hours",
    ],
  },
  {
    id: "capm",
    title: "Certification CAPM® (Certified Associate in Project Management)",
    shortTitle: "Certification CAPM®",
    badge: "Tremplin de carrière PMI®",
    category: "project",
    hours: "23 heures de formation",
    target: "Débutants en gestion de projet, diplômés, membres d'équipes projet",
    logoBadge: imagery.capmBadge,
    highlights: [
      "Maîtrise des fondamentaux prédictifs, agiles et hybrides",
      "Tremplin vers les postes de coordination et de gestion de projet",
      "Préparation intensive à l'examen de certification",
      "Support de cours complet et exercices pratiques",
    ],
  },
  {
    id: "change",
    title: "Conduite du Changement Organisationnel (Prosci & ADKAR)",
    shortTitle: "Conduite du Changement (Prosci)",
    badge: "Méthodologie Prosci®",
    category: "change",
    hours: "24 heures d'ateliers pratiques",
    target: "Directeurs de la transformation, DRH, managers, chefs de projets",
    highlights: [
      "Modèle ADKAR appliqué à vos projets réels d'entreprise",
      "Stratégies d'adhésion et gestion active des résistances",
      "Plans de communication, de formation et de parrainage exécutif",
      "Boîte à outils opérationnelle prête à l'emploi",
    ],
  },
  {
    id: "digital",
    title: "Transformation Digitale & IA Générative pour Managers",
    shortTitle: "Transformation Digitale & IA",
    badge: "Stratégie & Innovation IA",
    category: "digital",
    hours: "18 heures de formation & cas pratiques",
    target: "Cadres dirigeants, responsables d'équipes, chefs d'entreprise",
    highlights: [
      "Diagnostic de maturité digitale et feuille de route technologique",
      "Intégration opérationnelle de l'IA dans les processus métiers",
      "Automatisation des flux de travail sans code",
      "Gouvernance des données et cybersécurité",
    ],
  },
];

function FormationPage() {
  const [formConfig, setFormConfig] = useState<TrainingFormConfig>(DEFAULT_TRAINING_FORM_CONFIG);
  const { t } = useT();
  const search = Route.useSearch();
  const [dynamicCourses, setDynamicCourses] = useState<CourseItem[]>(COURSES);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>(
    search.course === "capm"
      ? "Certification CAPM® (Certified Associate in Project Management)"
      : search.course === "change"
      ? "Conduite du Changement Organisationnel (Prosci & ADKAR)"
      : search.course === "digital"
      ? "Transformation Digitale & IA Générative pour Managers"
      : "Certification PMP® (Project Management Professional)"
  );
  const [sessionPreference, setSessionPreference] = useState("Prochaine session (Présentiel à Lomé)");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    getPublicTrainingFormConfig().then(setFormConfig).catch((error) => console.error("Erreur chargement formulaire:", error));
  }, []);
  useEffect(() => {
    setSessionPreference(formConfig.formats[0] || "");
    if (!formConfig.courses.includes(selectedCourse)) setSelectedCourse(formConfig.courses[0] || "");
  }, [formConfig]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load public courses from Supabase
  useEffect(() => {
    getPublicServices()
      .then((res) => {
        if (res?.items && res.items.length > 0) {
          const trainingServices = res.items.filter(
            (s) =>
              s.icon === "GraduationCap" ||
              s.title.toLowerCase().includes("formation") ||
              s.title.toLowerCase().includes("certif")
          );
          if (trainingServices.length > 0) {
            const mapped: CourseItem[] = trainingServices.map((s) => ({
              id: s.slug,
              title: s.title,
              shortTitle: s.title,
              badge: "Formation Certifiante",
              category: "custom",
              hours: "Programme sur mesure",
              target: "Professionnels & Équipes",
              logoBadge: undefined,
              highlights: s.description ? [s.description] : ["Programme certifiant DIGIT & TALENT"],
            }));
            const existingTitles = new Set(COURSES.map((c) => c.title.toLowerCase()));
            const newCourses = mapped.filter((c) => !existingTitles.has(c.title.toLowerCase()));
            setDynamicCourses([...COURSES, ...newCourses]);
          }
        }
      })
      .catch((err) => {
        console.error("Erreur chargement formations:", err);
      });
  }, []);

  // Pre-select course from URL query param if present
  useEffect(() => {
    if (search.course) {
      const match = dynamicCourses.find((c) => c.id === search.course);
      if (match) {
        setSelectedCourse(match.title);
        setIsModalOpen(true);
      }
    }
  }, [search.course, dynamicCourses]);

  // Lock body scroll when modal is open & add ESC listener
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsModalOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  const handleOpenRegistration = (courseTitle?: string) => {
    if (courseTitle) {
      setSelectedCourse(courseTitle);
    }
    setSent(false);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    const form = e.currentTarget;
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
    } catch (err: any) {
      setErrorMessage(err?.message || formConfig.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCourses =
    selectedCategory === "all"
      ? dynamicCourses
      : dynamicCourses.filter((c) => c.category === selectedCategory);

  return (
    <SiteLayout>
      {/* Hero Section */}
      <PageHero
        image={imagery.coworkersAi}
        imageAlt="Session de formation professionnelle et certification"
        title={t("formation.hero.title")}
        description={t("formation.hero.desc")}
        crumbs={[{ label: t("formation.hero.breadcrumb") }]}
      >
          {/* Quick CTA to open popup */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => handleOpenRegistration()}
              className="btn btn-primary flex items-center gap-2 cursor-pointer shadow-accent text-sm font-semibold"
            >
              <GraduationCap className="h-4 w-4" />
              <span>{t("formation.hero.cta")}</span>
            </button>
            <a
              href="#catalogue"
              className="btn btn-outline-white text-sm font-medium"
            >
              <span>{t("formation.hero.catalogue")}</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Badges partner */}
          <div className="mt-10 flex flex-wrap items-center gap-6 pt-5 border-t border-white/10">
            <div className="flex items-center gap-2.5 text-xs font-medium text-white/90">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>{t("formation.hero.badge1")}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-medium text-white/90">
              <Award className="h-4 w-4 text-accent" />
              <span>{t("formation.hero.badge2")}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-medium text-white/90">
              <Users className="h-4 w-4 text-accent" />
              <span>{t("formation.hero.badge3")}</span>
            </div>
          </div>
      </PageHero>

      {/* Main Formations Section */}
      <section id="catalogue" className="container-site section-y scroll-mt-28">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-border/80">
          <div>
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy leading-tight">
                {t("formation.catalogue.title")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                {t("formation.catalogue.desc")}
              </p>
            </Reveal>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: t("formation.filter.all") },
              { id: "project", label: t("formation.filter.project") },
              { id: "change", label: t("formation.filter.change") },
              { id: "digital", label: t("formation.filter.digital") },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === tab.id
                    ? "bg-accent text-white shadow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Formation Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {filteredCourses.map((course) => (
            <Reveal key={course.id}>
              <div className="card-surface card-interactive p-7 sm:p-8 flex flex-col justify-between h-full group">
                <div>
                  {/* Top Header: Badge + Logo/Icon */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                      {course.badge}
                    </span>

                    {course.logoBadge && (
                      <img
                        src={course.logoBadge}
                        alt={course.shortTitle}
                        className="h-14 w-14 object-contain shrink-0 drop-shadow-sm"
                      />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-xl sm:text-2xl font-bold text-navy group-hover:text-accent transition-colors leading-snug">
                    {course.title}
                  </h3>

                  {/* Public Cible */}
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <strong className="text-foreground font-semibold">{t("formation.card.target")} :</strong> {course.target}
                  </p>

                  {/* Durée */}
                  <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-semibold text-foreground/85">
                    <Clock className="h-4 w-4 text-accent shrink-0" />
                    <span>{course.hours}</span>
                  </div>

                  {/* Highlights list */}
                  <ul className="mt-5 space-y-2.5 pt-5 border-t border-border/70">
                    {course.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA: Opens the Popup */}
                <div className="mt-8 pt-5 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => handleOpenRegistration(course.title)}
                    className="btn btn-primary w-full flex items-center justify-center gap-2 cursor-pointer shadow-accent text-sm font-semibold !py-3 group-hover:scale-[1.01] transition-transform"
                  >
                    <span>{t("formation.card.register")}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Intra-entreprise / Custom banner */}
        <Reveal>
          <div className="mt-16 rounded-2xl border border-border bg-mesh p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                {t("formation.intra.title")}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("formation.intra.desc")}
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-foreground/80">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <span>WhatsApp / Appel :</span>
                  <a
                    href="https://wa.me/22891982023"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-foreground hover:text-accent transition"
                  >
                    +228 91 98 20 23
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <span>E-mail :</span>
                  <a
                    href="mailto:contact@digit-talent.com"
                    className="font-semibold text-accent hover:underline"
                  >
                    contact@digit-talent.com
                  </a>
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleOpenRegistration("Formation Sur Mesure / Intra-Entreprise")}
                className="btn btn-outline-dark w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold !py-3 !px-6"
              >
                <span>{t("formation.intra.cta")}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Nos cohortes : photos en carrousel */}
      <section className="overflow-hidden bg-mesh section-y">
        <div className="container-site">
          <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold leading-tight text-navy sm:text-4xl">{t("formation.cohorts.title")}</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground sm:text-lg">{t("formation.cohorts.desc")}</p>
            </div>
            <Link to="/certifies" className="btn btn-outline-dark shrink-0 self-start lg:self-auto">
              {t("formation.cohorts.certified")} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal className="mt-12">
            <CohortSlider cohorts={COHORTS} />
          </Reveal>
        </div>
      </section>

      {/* Fenêtre d'inscription */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/70 p-3 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
            {/* En-tête */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-8 sm:py-5">
              <div className="min-w-0">
                <h2 id="modal-title" className="text-xl font-bold leading-snug text-navy sm:text-2xl">
                  {sent ? formConfig.successTitle : formConfig.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {sent ? formConfig.confirmSubtitle : formConfig.sessionText}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Fermer"
                className="shrink-0 rounded-md p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-navy"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contenu */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6">
              {sent ? (
                <div className="py-2">
                  <p className="text-sm leading-relaxed text-foreground">
                    {formConfig.successText} <strong>{selectedCourse}</strong>.
                  </p>
                  <h3 className="mt-6 text-sm font-semibold text-navy">{formConfig.nextStepsTitle}</h3>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                    {formConfig.nextSteps.map((step, index) => <li key={`${index}-${step}`}>{step}</li>)}
                  </ol>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={handleCloseModal} className="btn btn-primary justify-center">
                      {formConfig.closeLabel}
                    </button>
                    <button type="button" onClick={() => setSent(false)} className="btn btn-outline-dark justify-center">
                      {formConfig.anotherRegistrationLabel}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {formConfig.description && <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{formConfig.description}</p>}
                  {errorMessage && (
                    <p role="alert" className="mb-5 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                      {errorMessage}
                    </p>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Champ anti-spam invisible */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                    <div>
                      <label htmlFor="modal-course" className="mb-1.5 block text-sm font-medium text-navy">
                        {formConfig.courseLabel} *
                      </label>
                      <select
                        id="modal-course"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        required
                        className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-1 focus:ring-navy"
                      >
                        {formConfig.courses.map((course) => <option key={course} value={course}>{course}</option>)}
                      </select>
                    </div>

                    <fieldset>
                      <legend className="mb-1.5 block text-sm font-medium text-navy">{formConfig.formatLabel} *</legend>
                      <div className="mt-1 space-y-2">
                        {formConfig.formats.map((format) => (
                          <label key={format} className="flex cursor-pointer items-start gap-2.5 text-sm text-foreground">
                            <input
                              type="radio"
                              name="sessionPreference"
                              value={format}
                              checked={sessionPreference === format}
                              onChange={(e) => setSessionPreference(e.target.value)}
                              className="mt-0.5 shrink-0 accent-navy"
                            />
                            <span>{format}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {formConfig.fields.filter((field) => field.enabled).map((field) => (
                        <div key={field.id} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                          <label htmlFor={`modal-field-${field.id}`} className="mb-1.5 block text-sm font-medium text-navy">
                            {field.label}{field.required ? " *" : ` (${formConfig.optionalLabel})`}
                          </label>
                          {field.type === "textarea" ? (
                            <textarea id={`modal-field-${field.id}`} name={`field_${field.id}`} required={field.required} placeholder={field.placeholder} rows={3} className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-1 focus:ring-navy" />
                          ) : (
                            <input id={`modal-field-${field.id}`} type={field.type} name={`field_${field.id}`} required={field.required} placeholder={field.placeholder} className="w-full rounded-md border border-input bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-navy focus:ring-1 focus:ring-navy" />
                          )}
                        </div>
                      ))}
                    </div>

                    <button type="submit" disabled={submitting} className="btn btn-primary w-full justify-center disabled:opacity-60">
                      {submitting ? formConfig.submittingLabel : formConfig.submitLabel}
                    </button>

                    <p className="text-xs leading-relaxed text-muted-foreground">{formConfig.privacyText}</p>
                    <p className="text-sm">
                      <a
                        href={`/formation/inscription/?course=${encodeURIComponent(selectedCourse)}`}
                        className="font-medium text-navy underline underline-offset-4 hover:text-accent"
                      >
                        {formConfig.fullPageLinkText}
                      </a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
