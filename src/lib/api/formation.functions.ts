import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const trainingSchema = z.object({
  fullName: z.string().trim().min(2, "Le nom est obligatoire").max(120),
  email: z.string().trim().email("Email invalide").max(254),
  phone: z.string().trim().min(6, "Le numéro de téléphone est obligatoire").max(50),
  company: z.string().trim().max(160).optional().default(""),
  role: z.string().trim().max(120).optional().default(""),
  trainingCourse: z.string().trim().min(1, "Veuillez choisir une formation"),
  sessionPreference: z.string().trim().optional().default("Prochaine session (Présentiel)"),
  message: z.string().trim().max(3000).optional().default(""),
  // Honeypot anti-spam
  website: z.string().max(0).optional().default(""),
});

export const submitTrainingRegistration = createServerFn({ method: "POST" })
  .validator(trainingSchema)
  .handler(async ({ data }) => {
    if (data.website) {
      // Honeypot anti-spam
      return { success: true as const };
    }

    // 1. Sauvegarde dans Supabase si configuré
    try {
      const { getSupabaseServerClient } = await import("../supabase.server");
      const supabase = getSupabaseServerClient();
      if (supabase) {
        const { error: dbError } = await supabase.from("training_registrations").insert([
          {
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            company: data.company || null,
            role: data.role || null,
            training_course: data.trainingCourse,
            session_preference: data.sessionPreference || null,
            message: data.message || null,
            status: "nouveau",
          },
        ]);
        if (dbError) {
          console.error("Erreur insertion Supabase training_registrations :", dbError);
        } else {
          console.log(`[Supabase] Inscription formation enregistrée avec succès pour ${data.fullName}`);
        }
      } else {
        console.warn("[Supabase] Client non initialisé (vérifiez SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env)");
      }
    } catch (err) {
      console.error("Erreur connexion Supabase pour inscription formation :", err);
    }

    // 2. Notification E-mail à l'équipe DIGIT & TALENT
    const brevoApiKey = process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY;
    const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL || "contact@digit-talent.com";
    const brevoSenderName = process.env.BREVO_SENDER_NAME || "DIGIT & TALENT";
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "contact@digit-talent.com";

    const subjectLine = `[Nouvelle Inscription Formation] ${data.trainingCourse} — ${data.fullName}`;
    const textBody = [
      `Nouvelle demande d'inscription à une formation :`,
      `----------------------------------------------------`,
      `Formation : ${data.trainingCourse}`,
      `Format / Session : ${data.sessionPreference}`,
      `Nom complet : ${data.fullName}`,
      `E-mail : ${data.email}`,
      `Téléphone / WhatsApp : ${data.phone}`,
      `Entreprise : ${data.company || "Non renseignée"}`,
      `Poste / Fonction : ${data.role || "Non renseigné"}`,
      `----------------------------------------------------`,
      `Message / Attentes :`,
      data.message || "Aucun message complémentaire.",
    ].join("\n");

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0b1329; color: #ffffff; padding: 22px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; color: #38bdf8;">DIGIT &amp; TALENT</h2>
          <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.85;">Nouvelle demande d'inscription à une formation</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 13px; color: #166534; font-weight: 600;">Formation demandée :</p>
            <p style="margin: 4px 0 0 0; font-size: 16px; color: #15803d; font-weight: bold;">${escapeHtml(data.trainingCourse)}</p>
            <p style="margin: 2px 0 0 0; font-size: 12px; color: #166534;">Préférence : ${escapeHtml(data.sessionPreference)}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #64748b;">Nom complet :</td>
              <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${escapeHtml(data.fullName)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">E-mail :</td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb;">${escapeHtml(data.email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Tél / WhatsApp :</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${escapeHtml(data.phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Entreprise :</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(data.company || "Particulier / Non renseignée")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Poste / Titre :</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(data.role || "Non renseigné")}</td>
            </tr>
          </table>
          ${
            data.message
              ? `
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 18px 0;" />
            <p style="font-weight: bold; color: #64748b; margin-bottom: 6px;">Message / Attentes :</p>
            <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; border-left: 4px solid #38bdf8; white-space: pre-wrap; font-size: 13px; color: #334155;">
              ${escapeHtml(data.message)}
            </div>
          `
              : ""
          }
        </div>
        <div style="background-color: #f1f5f9; padding: 12px 24px; text-align: center; font-size: 12px; color: #94a3b8;">
          Inscription enregistrée sur digit-talent.com — Réponse directe disponible via votre messagerie ou WhatsApp.
        </div>
      </div>
    `;

    if (brevoApiKey) {
      try {
        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": brevoApiKey,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            sender: { name: brevoSenderName, email: brevoSenderEmail },
            to: [{ email: recipient, name: "DIGIT & TALENT Formations" }],
            replyTo: { email: data.email, name: data.fullName },
            subject: subjectLine,
            htmlContent: htmlBody,
            textContent: textBody,
          }),
        });
      } catch (mailErr) {
        console.warn("Échec envoi email notification formation (non bloquant) :", mailErr);
      }
    }

    return { success: true as const };
  });

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
