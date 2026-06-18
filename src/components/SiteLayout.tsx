import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, X, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
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
        className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-border/80 bg-background/95 shadow-[0_2px_20px_-4px_rgb(15_23_42/0.12)] backdrop-blur-xl"
            : "border-transparent bg-transparent backdrop-blur-none"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset} alt="DIGIT & TALENT"   className={`h-28 w-auto transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`} />
          </Link>
          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => {
              const active = location.pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative text-base font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    active
                      ? "text-accent after:scale-x-100"
                      : scrolled ? "text-foreground/65 hover:text-foreground" : "text-white/80 hover:text-white"
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
              className={`rounded-md p-2 transition-colors ${scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white"}`}
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

      <main className="flex-1">
        {children}
      </main>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/22891982023"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_-4px_rgba(37,211,102,0.6)] transition duration-300 hover:scale-110 hover:shadow-[0_6px_28px_-4px_rgba(37,211,102,0.7)]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.121 1.527 5.847L0 24l6.335-1.527A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.006-1.366l-.36-.214-3.727.977.996-3.638-.235-.374A9.816 9.816 0 0 1 2.182 12c0-5.418 4.4-9.818 9.818-9.818 5.418 0 9.818 4.4 9.818 9.818 0 5.418-4.4 9.818-9.818 9.818z" />
        </svg>
      </a>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
        className={`fixed bottom-24 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-all duration-300 hover:border-accent hover:text-accent ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </button>

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
