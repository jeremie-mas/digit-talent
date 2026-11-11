import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { NetworkPattern } from "@/components/NetworkPattern";
import { AnimatedWords } from "@/components/AnimatedWords";

interface Crumb {
  label: string;
  to?: string;
}

/** Hero des pages intérieures (même gabarit sur tout le site, hors accueil). */
export function PageHero({
  image,
  imageAlt = "",
  eyebrow,
  title,
  description,
  crumbs,
  top,
  children,
}: {
  image?: string;
  imageAlt?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  crumbs: Crumb[];
  /** Contenu affiché au-dessus du surtitre (ex. lien retour) */
  top?: ReactNode;
  /** Contenu affiché sous la description (boutons, badges…) */
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-deep pb-16 pt-[150px] text-white">
      {image && (
        <img
          src={image}
          alt={imageAlt}
          fetchPriority="high"
          className="hero-zoom absolute inset-0 h-full w-full object-cover opacity-35"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
      <NetworkPattern animated className="absolute -right-10 bottom-0 hidden h-[85%] text-white/[0.14] lg:block" />
      <div className="container-site relative py-20">
        {top}
        {eyebrow && (typeof eyebrow === "string" ? <p className="eyebrow animate-fade-in-soft">{eyebrow}</p> : eyebrow)}
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl">
          {typeof title === "string" ? <AnimatedWords text={title} delay={120} step={60} /> : title}
        </h1>
        {description && (
          <div
            className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-white/75"
            style={{ animationDelay: "420ms" }}
          >
            {description}
          </div>
        )}
        {children}
      </div>
      <Breadcrumb crumbs={crumbs} />
    </section>
  );
}
