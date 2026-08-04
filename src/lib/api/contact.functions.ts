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
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const recipient = process.env.CONTACT_RECIPIENT_EMAIL;

    if (!apiKey || !from || !recipient) {
      console.error("Contact form is missing its Resend environment configuration.");
      return { success: false as const };
    }

    if (data.website) {
      // Do not reveal the anti-spam rule to automated clients.
      return { success: true as const };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: data.email,
        subject: `[Site web] ${data.subject}`,
        text: [
          `Nom : ${data.name}`,
          `Entreprise : ${data.company || "Non renseignée"}`,
          `E-mail : ${data.email}`,
          `Téléphone : ${data.phone || "Non renseigné"}`,
          "",
          "Message :",
          data.message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected contact form submission:", response.status);
      return { success: false as const };
    }

    return { success: true as const };
  });
