import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/Reveal";

/** Bandeau d'appel à l'action affiché en bas des pages. */
export function CtaBand({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const { t } = useT();
  return (
    <Reveal as="section" className="container-site pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-deep px-8 py-14 text-white shadow-[0_30px_60px_-30px_rgb(10_37_64/0.6)] sm:px-14 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="animate-blob-1 pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
        <div className="animate-blob-2 pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-blue/25 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title ?? t("home.cta.title")}</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/70">{description ?? t("home.cta.desc")}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link to="/contact" className="btn btn-primary">
              {t("home.cta.btn")} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+22891982023" className="btn btn-outline-white">
              <Phone className="h-4 w-4" /> +228 91 98 20 23
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
