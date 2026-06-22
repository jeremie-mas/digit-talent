import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { Menu, X, Mail, Phone, MapPin, ArrowUp, ChevronDown } from "lucide-react";
import logoAsset from "@/assets/digit-talent-logo.png";
import { useT } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [talentOpen, setTalentOpen] = useState(false);
  const [talentMobileOpen, setTalentMobileOpen] = useState(false);
  const talentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openTalent = () => {
    if (talentTimer.current) clearTimeout(talentTimer.current);
    setTalentOpen(true);
  };
  const closeTalent = () => {
    talentTimer.current = setTimeout(() => setTalentOpen(false), 180);
  };

  const { location } = useRouterState();
  const { t } = useT();
  const talentItems = [
    { to: "/talent/recrutement", label: t("nav.talent.recrutement") },
    { to: "/talent/externalisation-rh", label: t("nav.talent.externalisation") },
    { to: "/talent/placements", label: t("nav.talent.placements") },
    { to: "/talent/gestion-paie", label: t("nav.talent.paie") },
    { to: "/talent/digitalisation-rh", label: t("nav.talent.digitalisation") },
  ];

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
          <Link to="/" className="flex flex-col items-center">
            <img src={logoAsset} alt="DIGIT & TALENT" className={`h-25 w-auto transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`} />
            <span className={`w-full text-center text-[9px] italic tracking-wide transition-colors duration-300 ${scrolled ? "text-foreground/50" : "text-white/70"}`}>
              Fueling Dreams, Forging Success.
            </span>
          </Link>
          <nav className="hidden items-center gap-9 lg:flex">
            {nav.slice(0, 2).map((n) => {
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

            {/* Talent dropdown */}
            <div
              className="relative"
              onMouseEnter={openTalent}
              onMouseLeave={closeTalent}
            >
              <button
                className={`flex items-center gap-1 text-base font-medium transition-colors ${
                  location.pathname.startsWith("/talent")
                    ? "text-accent"
                    : scrolled ? "text-foreground/65 hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {t("nav.talent")}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${talentOpen ? "rotate-180" : ""}`} />
              </button>
              {talentOpen && (
                <div className="absolute left-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-border/60 bg-background py-1.5 shadow-[0_8px_30px_-8px_rgb(15_23_42/0.18)]">
                  {talentItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setTalentOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors hover:bg-secondary hover:text-foreground ${
                        location.pathname === item.to ? "bg-accent/8 font-semibold text-accent" : "text-foreground/70"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {nav.slice(2).map((n) => {
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
              {nav.slice(0, 2).map((n) => (
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

              {/* Talent mobile section */}
              <div>
                <button
                  onClick={() => setTalentMobileOpen((v) => !v)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    location.pathname.startsWith("/talent")
                      ? "bg-accent/10 text-accent"
                      : "text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  Talent
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${talentMobileOpen ? "rotate-180" : ""}`} />
                </button>
                {talentMobileOpen && (
                  <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-accent/20 pl-3">
                    {talentItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-sm transition ${
                          location.pathname === item.to
                            ? "font-semibold text-accent"
                            : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {nav.slice(2).map((n) => (
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
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
              {t("footer.tagline")}
            </p>
            <div className="mt-5 flex gap-4">
              <a href="https://www.linkedin.com/company/digit-talent" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/45 transition hover:text-accent">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.facebook.com/digittalent" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/45 transition hover:text-accent">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://twitter.com/digittalent" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-white/45 transition hover:text-accent">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://www.instagram.com/digittalent" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/45 transition hover:text-accent">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
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
