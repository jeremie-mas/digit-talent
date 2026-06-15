import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, X, Mail, Phone, MapPin } from "lucide-react";
import logoAsset from "@/assets/digit-talent-logo.png";
import { useT } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();
  const { t } = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/a-propos", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-border/80 bg-background/95 shadow-[0_2px_20px_-4px_rgb(15_23_42/0.12)] backdrop-blur-xl"
            : "border-border/40 bg-background/80 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset} alt="DIGIT & TALENT" className="h-10 w-auto" />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => {
              const active = location.pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 ${
                    active ? "text-accent after:scale-x-100" : "text-foreground/65"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <LanguageSwitcher />
            <Link to="/contact" className="btn btn-primary !py-2.5 !px-5">
              {t("nav.cta")}
            </Link>
          </nav>
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              className="rounded-md p-2 text-foreground/70 hover:text-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border/60 bg-background/98">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    location.pathname === n.to
                      ? "bg-accent/10 text-accent"
                      : "text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-2 justify-center"
              >
                {t("nav.cta")}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 bg-navy-deep text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-2">
            <img
              src={logoAsset}
              alt="DIGIT & TALENT"
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              {t("footer.navigation")}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-white/65 transition hover:text-accent"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              {t("footer.contact")}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {t("footer.address")}
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a
                  href="mailto:contact@digit-talent.com"
                  className="transition hover:text-accent"
                >
                  contact@digit-talent.com
                </a>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+22891982023" className="transition hover:text-accent">
                  +228 91 98 20 23
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-white/35 sm:flex-row lg:px-8">
            <p>
              © {new Date().getFullYear()} DIGIT & TALENT. {t("footer.rights")}
            </p>
            <p className="italic">{t("footer.slogan")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
