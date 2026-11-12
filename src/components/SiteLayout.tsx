import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { Menu, X, Mail, Phone, MapPin, ArrowUp, ArrowRight, ChevronDown, LogIn, Clock } from "lucide-react";
import logoAsset from "@/assets/digit-talent-logo.webp";
import { imagery } from "@/assets/imagery";
import { useT } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Page de connexion de la plateforme LMS (configurable via VITE_LMS_URL)
const LMS_LOGIN_URL = `${(import.meta.env.VITE_LMS_URL || "https://app.digit-talent.com").replace(/\/$/, "")}/login`;

const SOCIALS = [
  {
    href: "https://www.linkedin.com/company/digit-talent",
    label: "LinkedIn",
    icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  },
  {
    href: "https://www.facebook.com/digittalent",
    label: "Facebook",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    href: "https://twitter.com/digittalent",
    label: "Twitter / X",
    icon: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
  },
  {
    href: "https://www.instagram.com/digittalent",
    label: "Instagram",
    icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
  },
];

function SocialIcon({ children }: { children: ReactNode }) {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      {children}
    </svg>
  );
}

export function SiteLayout({ children, lightHero = false }: { children: ReactNode; /** Hero clair : en-tête en couleurs foncées dès le haut de page */ lightHero?: boolean }) {
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

  const expertiseItems = ["digital", "training", "transfo", "change", "cyber"].map((key) => ({
    hash: key,
    label: t(`svc.${key}.title`),
  }));

  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Barre de progression de lecture (mise à jour directe, sans re-rendu)
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/services", label: t("nav.services") },
    { to: "/formation", label: t("nav.training") },
    { to: "/blog", label: t("nav.blog") },
    { to: "/a-propos", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  const onLight = scrolled || lightHero;

  const linkClass = (active: boolean) =>
    `relative whitespace-nowrap py-2 text-[15px] font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 ${
      active
        ? "text-accent after:scale-x-100"
        : onLight ? "text-navy/75 hover:text-navy" : "text-white/85 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/95 shadow-[0_2px_20px_-6px_rgb(15_23_42/0.15)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Barre d'informations (ordinateur) */}
        <div
          className={`hidden overflow-hidden border-b border-border bg-white transition-all duration-300 lg:block ${
            scrolled ? "max-h-0 border-transparent opacity-0" : "max-h-10 opacity-100"
          }`}
        >
          <div className="container-site flex h-9 items-center justify-between text-xs text-navy/70">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-accent" />{t("footer.address")}</span>
              <a href="mailto:contact@digit-talent.com" className="flex items-center gap-1.5 transition hover:text-accent"><Mail className="h-3.5 w-3.5 text-accent" />contact@digit-talent.com</a>
              <a href="tel:+22891982023" className="flex items-center gap-1.5 transition hover:text-accent"><Phone className="h-3.5 w-3.5 text-accent" />+228 91 98 20 23</a>
            </div>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-accent" />{t("contact.info.hoursV")}</span>
              <span className="h-3.5 w-px bg-navy/15" />
              <div className="flex items-center gap-3">
                {SOCIALS.slice(0, 2).map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="transition hover:text-accent">
                    <SocialIcon>{s.icon}</SocialIcon>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`border-b transition-colors duration-300 ${scrolled ? "border-border/80" : "border-transparent"}`}>
          <div className="container-site flex items-center justify-between gap-6 py-3">
            <Link to="/" className="flex shrink-0 flex-col items-center">
              <img src={logoAsset} alt="DIGIT & TALENT" className={`h-12 w-auto transition-all duration-300 xl:h-14 ${onLight ? "" : "brightness-0 invert"}`} />
              <span className={`mt-0.5 w-full text-center text-[8px] italic tracking-wide transition-colors duration-300 ${onLight ? "text-foreground/50" : "text-white/70"}`}>
                Fueling Dreams, Forging Success.
              </span>
            </Link>
            <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
              {nav.slice(0, 3).map((n) => (
                <Link key={n.to} to={n.to} className={linkClass(location.pathname === n.to)}>
                  {n.label}
                </Link>
              ))}

              {/* Menu déroulant Talent */}
              <div className="relative" onMouseEnter={openTalent} onMouseLeave={closeTalent}>
                <button
                  className={`flex items-center gap-1 py-2 ${linkClass(location.pathname.startsWith("/talent"))}`}
                  aria-expanded={talentOpen}
                  onClick={() => setTalentOpen((v) => !v)}
                >
                  {t("nav.talent")}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${talentOpen ? "rotate-180" : ""}`} />
                </button>
                {talentOpen && (
                  <div className="absolute left-1/2 top-full z-30 mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-2 shadow-[0_24px_50px_-16px_rgb(15_23_42/0.35)] backdrop-blur-xl">
                    {talentItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setTalentOpen(false)}
                        className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm transition-colors hover:bg-secondary hover:text-navy ${
                          location.pathname === item.to ? "bg-accent/8 font-semibold text-accent" : "text-foreground/75"
                        }`}
                      >
                        {item.label}
                        <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {nav.slice(3).map((n) => (
                <Link key={n.to} to={n.to} className={linkClass(location.pathname === n.to)}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="hidden items-center gap-3 lg:flex">
              <LanguageSwitcher />
              <Link to="/contact" className="btn btn-primary !py-2.5 !px-5">
                {t("nav.cta")}
              </Link>
              <a
                href={LMS_LOGIN_URL}
                aria-label={t("nav.login")}
                title={t("nav.login")}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                  onLight
                    ? "border-border text-navy/80 hover:border-accent hover:text-accent"
                    : "border-white/30 text-white hover:border-white hover:bg-white/10"
                }`}
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden xl:inline">{t("nav.login")}</span>
              </a>
            </div>
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher />
              <button
                className={`rounded-md p-2 transition-colors ${onLight || open ? "text-navy/80 hover:text-navy" : "text-white/85 hover:text-white"}`}
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="max-h-[calc(100vh-80px)] overflow-y-auto border-t border-border/60 bg-background shadow-lg lg:hidden">
            <nav className="container-site flex flex-col gap-1 py-4">
              {nav.slice(0, 3).map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    location.pathname === n.to ? "bg-accent/10 text-accent" : "text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {n.label}
                </Link>
              ))}

              <div>
                <button
                  onClick={() => setTalentMobileOpen((v) => !v)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    location.pathname.startsWith("/talent") ? "bg-accent/10 text-accent" : "text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {t("nav.talent")}
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
                          location.pathname === item.to ? "font-semibold text-accent" : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {nav.slice(3).map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    location.pathname === n.to ? "bg-accent/10 text-accent" : "text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-3 grid gap-2 border-t border-border/60 pt-4">
                <Link to="/contact" onClick={() => setOpen(false)} className="btn btn-primary justify-center">
                  {t("nav.cta")}
                </Link>
                <a href={LMS_LOGIN_URL} className="btn btn-outline-dark justify-center">
                  <LogIn className="h-4 w-4" />
                  {t("nav.login")}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Bouton WhatsApp */}
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

      {/* Retour en haut */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retour en haut"
        className={`fixed bottom-24 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-all duration-300 hover:border-accent hover:text-accent ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-4 w-4" />
      </button>

      <footer className="relative overflow-hidden bg-deep text-primary-foreground">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          {/* Marque */}
          <div className="lg:col-span-4">
            <img src={logoAsset} alt="DIGIT & TALENT" className="h-14 w-auto brightness-0 invert" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">{t("footer.tagline")}</p>
            <div className="mt-6 flex items-center gap-4">
              <img src={imagery.authorizedTrainingPartner} alt="PMI Authorized Training Partner" className="h-16 w-16 object-contain" loading="lazy" />
              <p className="max-w-[12rem] text-xs leading-relaxed text-white/50">{t("home.stats.atp")}</p>
            </div>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:border-white/40 hover:text-white"
                >
                  <SocialIcon>{s.icon}</SocialIcon>
                </a>
              ))}
            </div>
          </div>

          {/* Expertises */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">{t("footer.expertise")}</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {expertiseItems.map((e) => (
                <li key={e.hash}>
                  <Link to="/services" hash={e.hash} className="text-white/65 transition hover:text-accent">
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Talent + Cabinet */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-1">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">{t("footer.talent")}</h4>
              <ul className="mt-5 space-y-3 text-sm">
                {talentItems.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-white/65 transition hover:text-accent">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">{t("footer.company")}</h4>
              <ul className="mt-5 space-y-3 text-sm">
                {nav.slice(2).map((n) => (
                  <li key={n.to}>
                    <Link to={n.to} className="text-white/65 transition hover:text-accent">{n.label}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/certifies" className="text-white/65 transition hover:text-accent">{t("nav.certified")}</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">{t("footer.contact")}</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {t("footer.address")}
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:contact@digit-talent.com" className="transition hover:text-accent">contact@digit-talent.com</a>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>
                  <a href="tel:+22891982023" className="block transition hover:text-accent">+228 91 98 20 23</a>
                  <a href="tel:+22899900821" className="block transition hover:text-accent">+228 99 90 08 21</a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Accès plateforme */}
        <div className="container-site">
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-white/10 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-white">{t("footer.platform")}</p>
              <p className="mt-0.5 text-sm text-white/55">{t("footer.platformDesc")}</p>
            </div>
            <a href={LMS_LOGIN_URL} className="btn btn-outline-white !py-2.5">
              <LogIn className="h-4 w-4" /> {t("nav.login")}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10">
          <div className="container-site flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/40 sm:flex-row">
            <p>© {new Date().getFullYear()} DIGIT & TALENT. {t("footer.rights")}</p>
            <p className="italic">{t("footer.slogan")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
