import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(50),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(10).max(5_000),
  // Honeypot: legitimate visitors leave this field empty.
  website: z.string().max(0),
});

export const submitContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    // Configuration Brevo (API Key v3)
    const brevoApiKey = process.env.BREVO_API_KEY || process.env.SENDINBLUE_API_KEY;
    const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER || "contact@digit-talent.com";
    const brevoSenderName = process.env.BREVO_SENDER_NAME || "DIGIT & TALENT";


    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || "contact@digit-talent.com";

    // Configuration Resend (Alternative)
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM_EMAIL;

    if (data.website) {
      // Honeypot anti-spam : réagir positivement aux bots sans envoyer de mail.
      return { success: true as const };
    }

    const subjectLine = `[Contact Site Web] ${data.subject}`;
    const textBody = [
      `Nouveau message reçu depuis le formulaire de contact DIGIT & TALENT :`,
      `----------------------------------------------------`,
      `Nom complet : ${data.name}`,
      `Entreprise  : ${data.company || "Non renseignée"}`,
      `E-mail      : ${data.email}`,
      `Téléphone   : ${data.phone || "Non renseigné"}`,
      `Sujet       : ${data.subject}`,
      `----------------------------------------------------`,
      `Message :`,
      data.message,
    ].join("\n");

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0b1329; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px; color: #38bdf8;">DIGIT &amp; TALENT</h2>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Nouveau message du formulaire de contact</p>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #64748b;">Nom :</td>
              <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Entreprise :</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(data.company || "Non renseignée")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">E-mail :</td>
              <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb;">${escapeHtml(data.email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Téléphone :</td>
              <td style="padding: 8px 0; color: #0f172a;">${escapeHtml(data.phone || "Non renseigné")}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Sujet :</td>
              <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${escapeHtml(data.subject)}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-weight: bold; color: #64748b; margin-bottom: 8px;">Message :</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #38bdf8; white-space: pre-wrap; font-size: 14px; color: #334155;">
            ${escapeHtml(data.message)}
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 12px 24px; text-align: center; font-size: 12px; color: #94a3b8;">
          Message envoyé depuis digit-talent.com — Réponse directe disponible via votre messagerie.
        </div>
      </div>
    `;

    // 1. Mode BREVO API (Recommandé : ultra-rapide, aucun paquet lourd requis)
    if (brevoApiKey) {
      try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": brevoApiKey,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            sender: { name: brevoSenderName, email: brevoSenderEmail },
            to: [{ email: recipient, name: "DIGIT & TALENT Contact" }],
            replyTo: { email: data.email, name: data.name },
            subject: subjectLine,
            htmlContent: htmlBody,
            textContent: textBody,
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error("L'API Brevo a rejeté l'envoi de l'e-mail :", response.status, errText);
          return { success: false as const };
        }

        return { success: true as const };
      } catch (err) {
        console.error("Erreur lors de l'envoi via l'API Brevo :", err);
        return { success: false as const };
      }
    }


    // 3. Mode secours via Resend API
    if (resendApiKey && resendFrom) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: resendFrom,
            to: [recipient],
            reply_to: data.email,
            subject: subjectLine,
            text: textBody,
            html: htmlBody,
          }),
        });

        if (!response.ok) {
          console.error("Resend rejection status:", response.status);
          return { success: false as const };
        }

        return { success: true as const };
      } catch (err) {
        console.error("Erreur d'envoi via Resend API :", err);
        return { success: false as const };
      }
    }

    console.error("Formulaire de contact : Aucune configuration de messagerie (BREVO_API_KEY, SMTP_HOST ou RESEND_API_KEY) n'est définie.");
    return { success: false as const };
  });

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
