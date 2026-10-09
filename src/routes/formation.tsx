import { createFileRoute } from "@tanstack/react-router";
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
import { Breadcrumb } from "@/components/Breadcrumb";
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
      { title: "Catalogue des Formations Certifiantes — DIGIT & TALENT" },
      {
        name: "description",
        content:
          "Découvrez le catalogue des formations certifiantes DIGIT & TALENT : Certifications mondiales PMP®, CAPM®, Conduite du Changement Prosci et Transformation Digitale.",
      },
      { property: "og:title", content: "Formations Professionnelles & Certifications — DIGIT & TALENT" },
      {
        property: "og:description",
        content: "Développez vos compétences et décrochez vos certifications internationales PMI et Prosci.",
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
      <section className="relative overflow-hidden bg-navy-deep py-24 pb-16 text-white pt-[150px]">
        <img
          src={imagery.coworkersAi}
          alt="Session de formation professionnelle et certification"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/50" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow animate-fade-in-soft">
            {t("formation.hero.eyebrow")}
          </p>
          <h1
            className="animate-fade-up mt-5 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl text-white"
            style={{ animationDelay: "120ms" }}
          >
            {t("formation.hero.title")}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-3xl text-lg leading-relaxed text-white/80"
            style={{ animationDelay: "240ms" }}
          >
            {t("formation.hero.desc")}
          </p>

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
        </div>
        <Breadcrumb crumbs={[{ label: t("formation.hero.breadcrumb") }]} />
      </section>

      {/* Main Formations Section */}
      <section id="catalogue" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-border/80">
          <div>
            <Reveal>
              <p className="eyebrow">{t("formation.catalogue.eyebrow")}</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
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
              <div className="card-surface p-7 sm:p-8 rounded-2xl border border-border shadow-soft hover:shadow-elevated hover:border-accent/50 transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  {/* Top Header: Badge + Logo/Icon */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                      <Sparkles className="h-3 w-3" />
                      {course.badge}
                    </span>

                    {course.logoBadge ? (
                      <img
                        src={course.logoBadge}
                        alt={course.shortTitle}
                        className="h-14 w-14 object-contain shrink-0 drop-shadow-sm"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent shrink-0 shadow-sm">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
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
          <div className="mt-16 card-surface p-8 sm:p-10 rounded-2xl border border-border bg-gradient-to-br from-secondary/60 via-card to-secondary/30 shadow-soft flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <Users className="h-4 w-4" />
                <span>{t("formation.intra.eyebrow")}</span>
              </div>
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

      {/* POP-UP MODAL: FORMULAIRE D'INSCRIPTION RESPONSIVE */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-navy-deep/80 backdrop-blur-sm animate-fade-in overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className="relative w-full max-w-2xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col bg-card rounded-2xl sm:rounded-3xl border border-border shadow-2xl animate-fade-up overflow-hidden">
            {/* Modal Header (Fixe, toujours visible) */}
            <div className="flex items-start justify-between gap-3 px-4 py-3.5 sm:px-7 sm:py-5 border-b border-border bg-card shrink-0">
              <div className="min-w-0 pr-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-accent/10 text-accent mb-1">
                  <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                  <span>{formConfig.badge}</span>
                </div>
                <h3 id="modal-title" className="text-lg sm:text-2xl font-bold text-foreground leading-snug">
                  {sent ? formConfig.successTitle : formConfig.title}
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                  {sent
                    ? formConfig.confirmSubtitle
                    : formConfig.sessionText}
                </p>
                {!sent && formConfig.description && <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{formConfig.description}</p>}
              </div>

              {/* Close Button X */}
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Fermer la boîte de dialogue"
                className="shrink-0 p-2 -mr-1 -mt-1 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable avec inertie douce) */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-7 sm:py-6">
              {sent ? (
                <div className="py-4 sm:py-6 flex flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-accent/15 text-accent mb-4 shadow-accent">
                    <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{formConfig.successTitle}</h4>
                  <p className="mt-2.5 max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {formConfig.successText} <strong className="text-foreground">{selectedCourse}</strong>.
                  </p>

                  <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-secondary/60 border border-border text-xs max-w-md text-left w-full space-y-1">
                    <p className="font-semibold text-foreground mb-1">{formConfig.nextStepsTitle}</p>
                    {formConfig.nextSteps.map((step, index) => <p key={`${index}-${step}`} className="text-muted-foreground">{index + 1}. {step}</p>)}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="btn btn-primary text-xs sm:text-sm cursor-pointer w-full sm:w-auto !px-6"
                    >
                      {formConfig.closeLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="btn btn-outline-dark text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
                    >
                      {formConfig.anotherRegistrationLabel}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {errorMessage && (
                    <div className="mb-4 sm:mb-5 rounded-xl border border-destructive/30 bg-destructive/10 p-3 sm:p-4 text-xs text-destructive">
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                    {/* Honeypot anti-spam */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="hidden"
                    />

                    {/* Choix de la formation */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                        {formConfig.courseLabel} *
                      </label>
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        required
                        className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-xs sm:text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 cursor-pointer"
                      >
                        {formConfig.courses.map((course) => <option key={course} value={course}>{course}</option>)}
                      </select>
                    </div>

                    {/* Préférence de format / session */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                        {formConfig.formatLabel} *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {[
                          ...formConfig.formats,
                        ].map((format) => (
                          <label
                            key={format}
                            className={`flex items-start gap-2.5 rounded-xl border p-2.5 cursor-pointer transition ${
                              sessionPreference === format
                                ? "border-accent bg-accent/10 text-accent font-semibold ring-1 ring-accent/30"
                                : "border-border text-muted-foreground hover:bg-secondary/60"
                            }`}
                          >
                            <input
                              type="radio"
                              name="sessionPreference"
                              value={format}
                              checked={sessionPreference === format}
                              onChange={(e) => setSessionPreference(e.target.value)}
                              className="mt-0.5 shrink-0 accent-accent"
                            />
                            <span className="leading-tight">{format}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {formConfig.fields.filter((field) => field.enabled).map((field) => (
                        <div key={field.id}>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1">{field.label}{field.required ? " *" : ` (${formConfig.optionalLabel})`}</label>
                          {field.type === "textarea" ? <textarea name={`field_${field.id}`} required={field.required} placeholder={field.placeholder} rows={2} className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-xs sm:text-sm text-foreground" /> : <input type={field.type} name={`field_${field.id}`} required={field.required} placeholder={field.placeholder} className="w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-xs sm:text-sm text-foreground" />}
                        </div>
                      ))}
                    </div>

                    {/* Submit button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary w-full !py-3 sm:!py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-accent text-xs sm:text-sm font-semibold disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>{formConfig.submittingLabel}</span>
                          </>
                        ) : (
                          <>
                            <span>{formConfig.submitLabel}</span>
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-muted-foreground text-center pt-1 pb-2">
                      🔒 {formConfig.privacyText}
                    </p>
                    <p className="text-center text-xs text-muted-foreground">
                      <a
                        href={`/formation/inscription/?course=${encodeURIComponent(selectedCourse)}`}
                        className="font-semibold text-accent underline-offset-4 hover:underline"
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
