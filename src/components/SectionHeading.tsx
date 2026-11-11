import type { ReactNode } from "react";

/** En-tête de section : surtitre, titre et texte d'introduction. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && <p className={`eyebrow ${centered ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 className={`mt-4 text-3xl font-bold leading-tight sm:text-4xl ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-white/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
