import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  const { t } = useT();
  const all: Crumb[] = [{ label: t("nav.home"), to: "/" }, ...crumbs];

  return (
    <nav aria-label="Breadcrumb" className="absolute bottom-6 left-0 right-0">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-white/50">
          {all.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3 shrink-0 text-white/30" />}
              {c.to && i < all.length - 1 ? (
                <Link to={c.to} className="transition hover:text-white/80">
                  {c.label}
                </Link>
              ) : (
                <span className={i === all.length - 1 ? "font-semibold text-white/80" : ""}>
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
