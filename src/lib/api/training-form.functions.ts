import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServerClient } from "../supabase.server";
import { verifySignedToken } from "./admin.auth.functions";

const fieldSchema = z.object({
  id: z.string().min(1).max(60),
  label: z.string().trim().min(1).max(120),
  placeholder: z.string().trim().max(160).optional().default(""),
  type: z.enum(["text", "email", "tel", "number", "textarea"]).default("text"),
  required: z.boolean().default(false),
  enabled: z.boolean().default(true),
});

const configSchema = z.object({
  title: z.string().trim().min(1).max(160),
  sessionText: z.string().trim().max(300),
  description: z.string().trim().max(500).optional().default(""),
  badge: z.string().trim().max(100).default("Inscription Officielle"),
  courseLabel: z.string().trim().max(120).default("Formation souhaitée"),
  formatLabel: z.string().trim().max(120).default("Format & Modalité de session"),
  submitLabel: z.string().trim().max(120).default("Confirmer ma demande d'inscription"),
  submittingLabel: z.string().trim().max(120).default("Envoi de votre inscription en cours..."),
  privacyText: z.string().trim().max(300).default("Vos données restent strictement confidentielles."),
  successTitle: z.string().trim().max(160).default("Inscription bien reçue !"),
  successText: z.string().trim().max(500).default("Votre demande a bien été transmise à nos conseillers."),
  confirmSubtitle: z.string().trim().max(200).default("Votre demande a bien été transmise à nos conseillers."),
  validationError: z.string().trim().max(240).default("Une erreur est survenue lors de l'enregistrement. Veuillez réessayer."),
  submitError: z.string().trim().max(240).default("Impossible d'envoyer votre inscription pour le moment. Réessayez plus tard."),
  optionalLabel: z.string().trim().max(40).default("optionnel"),
  fullPageLinkText: z.string().trim().max(120).default("Ouvrir le formulaire sur une page dédiée"),
  returnLabel: z.string().trim().max(100).default("Retour aux formations"),
  anotherRegistrationLabel: z.string().trim().max(120).default("Effectuer une autre inscription"),
  closeLabel: z.string().trim().max(80).default("Fermer"),
  nextStepsTitle: z.string().trim().max(120).default("Prochaines étapes :"),
  nextSteps: z.array(z.string().trim().max(240)).max(8).default([]),
  courses: z.array(z.string().trim().min(1).max(160)).max(30).default([]),
  formats: z.array(z.string().trim().min(1).max(160)).max(20).default([]),
  fields: z.array(fieldSchema).max(25),
}).superRefine((config, ctx) => {
  for (const id of ["fullName", "email", "phone"]) {
    if (!config.fields.some((field) => field.id === id && field.enabled && field.required)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Le champ ${id} doit rester actif et obligatoire.`, path: ["fields"] });
    }
  }
  if (!config.courses.length) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ajoutez au moins une formation.", path: ["courses"] });
  if (!config.formats.length) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ajoutez au moins un format ou une session.", path: ["formats"] });
  if (new Set(config.fields.map((field) => field.id)).size !== config.fields.length) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Chaque champ doit avoir un identifiant unique.", path: ["fields"] });
});

export type TrainingFormConfig = z.infer<typeof configSchema>;

export const DEFAULT_TRAINING_FORM_CONFIG: TrainingFormConfig = {
  title: "Formation et Certification PMP",
  sessionText: "Inscrivez-vous pour la session du 21 Novembre",
  description: "Complétez ce formulaire pour recevoir le syllabus officiel et le calendrier.",
  badge: "Inscription Officielle",
  courseLabel: "Formation souhaitée",
  formatLabel: "Format & Modalité de session",
  submitLabel: "Confirmer ma demande d'inscription",
  submittingLabel: "Envoi de votre inscription en cours...",
  privacyText: "Vos données restent strictement confidentielles et utilisées uniquement dans le cadre de votre formation.",
  successTitle: "Inscription bien reçue !",
  successText: "Nous vous contacterons dans un délai de 24 heures pour vous transmettre le calendrier détaillé et les modalités pratiques.",
  confirmSubtitle: "Votre demande a bien été transmise à nos conseillers",
  validationError: "Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.",
  submitError: "Impossible d'envoyer votre inscription pour le moment. Réessayez plus tard.",
  optionalLabel: "optionnel",
  fullPageLinkText: "Ouvrir le formulaire sur une page dédiée",
  returnLabel: "Retour aux formations",
  anotherRegistrationLabel: "Effectuer une autre inscription",
  closeLabel: "Fermer",
  nextStepsTitle: "Prochaines étapes :",
  nextSteps: ["Réception de la brochure pédagogique et du devis officiel.", "Évaluation des prérequis et confirmation de vos dates.", "Envoi des accès aux supports et simulateurs d'examen."],
  courses: ["Certification PMP® (Project Management Professional)", "Certification CAPM® (Certified Associate in Project Management)", "Conduite du Changement Organisationnel (Prosci & ADKAR)", "Transformation Digitale & IA Générative pour Managers", "Formation Sur Mesure / Intra-Entreprise"],
  formats: ["Prochaine session (Présentiel à Lomé)", "Classe virtuelle en direct (Soir / Week-end)", "Formation intra-entreprise (Équipe dédiée)", "Coaching individuel personnalisé"],
  fields: [
    { id: "fullName", label: "Nom complet", placeholder: "Ex : Amina Kodjo", type: "text", required: true, enabled: true },
    { id: "email", label: "Adresse E-mail", placeholder: "amina.kodjo@entreprise.com", type: "email", required: true, enabled: true },
    { id: "phone", label: "Téléphone / WhatsApp", placeholder: "+228 90 00 00 00", type: "tel", required: true, enabled: true },
    { id: "company", label: "Entreprise", placeholder: "Ex : Banque Ouest-Africaine", type: "text", required: false, enabled: true },
    { id: "role", label: "Poste / Fonction actuelle", placeholder: "Ex : Chef de projet, Consultant", type: "text", required: false, enabled: true },
    { id: "project_management_experience", label: "Années d'expérience en gestion de projet", placeholder: "Ex. 3 ans", type: "text", required: false, enabled: true },
    { id: "message", label: "Message ou attentes particulières", placeholder: "Précisez vos disponibilités ou toute question...", type: "textarea", required: false, enabled: true },
  ],
};

export const getPublicTrainingFormConfig = createServerFn({ method: "GET" })
  .handler(async () => {
    const supabase = getSupabaseServerClient();
    if (!supabase) return DEFAULT_TRAINING_FORM_CONFIG;
    const { data, error } = await supabase.from("training_form_config").select("config").eq("id", "default").maybeSingle();
    if (error || !data?.config) return DEFAULT_TRAINING_FORM_CONFIG;
    const parsed = configSchema.safeParse(data.config);
    return parsed.success ? parsed.data : DEFAULT_TRAINING_FORM_CONFIG;
  });

export const getAdminTrainingFormConfig = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string() }))
  .handler(async ({ data }) => {
    if (!verifySignedToken(data.token).valid) throw new Error("Non autorisé. Session expirée ou invalide.");
    const supabase = getSupabaseServerClient();
    if (!supabase) return { configured: false, config: DEFAULT_TRAINING_FORM_CONFIG };
    const { data: row, error } = await supabase.from("training_form_config").select("config").eq("id", "default").maybeSingle();
    if (error) throw new Error(error.message);
    const parsed = configSchema.safeParse(row?.config ?? DEFAULT_TRAINING_FORM_CONFIG);
    return { configured: true, config: parsed.success ? parsed.data : DEFAULT_TRAINING_FORM_CONFIG };
  });

export const saveAdminTrainingFormConfig = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string(), config: configSchema }))
  .handler(async ({ data }) => {
    if (!verifySignedToken(data.token).valid) throw new Error("Non autorisé. Session expirée ou invalide.");
    const supabase = getSupabaseServerClient();
    if (!supabase) return { success: false, error: "Supabase non configuré." };
    const { error } = await supabase.from("training_form_config").upsert({ id: "default", config: data.config, updated_at: new Date().toISOString() });
    if (error) return { success: false, error: error.message };
    return { success: true };
  });
