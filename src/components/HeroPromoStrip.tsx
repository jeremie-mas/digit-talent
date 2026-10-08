import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Megaphone,
} from "lucide-react";
import {
  getPublicBanners,
  getPublicTrainingSessions,
  type PublicBanner,
  type PublicTrainingSession,
} from "@/lib/api/public.data.functions";
import { useT } from "@/i18n/LanguageProvider";

// -----------------------------------------------------------------------
// Bannières de repli (visibles si Supabase vide / non configuré)
// -----------------------------------------------------------------------
const FALLBACK_BANNERS_FR: (PublicBanner & { gradient?: string })[] = [
  {
    id: "fb1",
    title: "Certifiez-vous PMP® avec DIGIT & TALENT",
    subtitle:
      "Obtenez la certification internationale et propulsez votre carrière dans la gestion de projet.",
    image_url: "",
    cta_label: "Voir les formations",
    cta_url: "/formation",
    sort_order: 0,
    active: true,
    gradient: "from-[#061829] via-[#0d3060] to-[#1a4a8a]",
  },
  {
    id: "fb2",
    title: "Transformation Digitale & IA pour Managers",
    subtitle:
      "Intégrez l'intelligence artificielle dans vos processus. Sessions disponibles en présentiel et en ligne.",
    image_url: "",
    cta_label: "S'inscrire maintenant",
    cta_url: "/formation",
    sort_order: 1,
    active: true,
    gradient: "from-[#061829] via-[#7c1d06] to-[#c2410c]",
  },
  {
    id: "fb3",
    title: "Conduite du Changement — Prosci® ADKAR",
    subtitle:
      "Accompagnez vos équipes dans chaque transformation avec la méthode reconnue mondialement.",
    image_url: "",
    cta_label: "Découvrir",
    cta_url: "/formation",
    sort_order: 2,
    active: true,
    gradient: "from-[#061829] via-[#134e4a] to-[#0f766e]",
  },
];

const FALLBACK_BANNERS_EN: (PublicBanner & { gradient?: string })[] = [
  {
    id: "fb1",
    title: "Get PMP® Certified with DIGIT & TALENT",
    subtitle:
      "Achieve international certification and boost your project management career.",
    image_url: "",
    cta_label: "View trainings",
    cta_url: "/formation",
    sort_order: 0,
    active: true,
    gradient: "from-[#061829] via-[#0d3060] to-[#1a4a8a]",
  },
  {
    id: "fb2",
    title: "Digital Transformation & AI for Managers",
    subtitle:
      "Integrate artificial intelligence into your workflows. On-site and online sessions available.",
    cta_label: "Register now",
    cta_url: "/formation",
    sort_order: 1,
    active: true,
    gradient: "from-[#061829] via-[#7c1d06] to-[#c2410c]",
  },
  {
    id: "fb3",
    title: "Change Management — Prosci® ADKAR",
    subtitle:
      "Guide your teams through every organizational shift with a globally proven methodology.",
    cta_label: "Discover",
    cta_url: "/formation",
    sort_order: 2,
    active: true,
    gradient: "from-[#061829] via-[#134e4a] to-[#0f766e]",
  },
];

// -----------------------------------------------------------------------
// Hook compte à rebours
// -----------------------------------------------------------------------
function useCountdown(targetDate: string | null) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: true,
  });

  useEffect(() => {
    if (!targetDate) return;
    function update() {
      const diff = new Date(targetDate!).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
        expired: false,
      });
    }
    update();
    const id = setInterval(update, 1_000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// -----------------------------------------------------------------------
// CountdownUnit helper
// -----------------------------------------------------------------------
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-end gap-0.5">
      <span className="tabular-nums font-bold text-white leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-white/60 text-[9px] font-semibold uppercase leading-none mb-px">
        {label}
      </span>
    </span>
  );
}

// -----------------------------------------------------------------------
// Component principal
// -----------------------------------------------------------------------
export function HeroPromoStrip() {
  type BannerItem = PublicBanner & { gradient?: string };

  const { t, lang } = useT();
  const fallbackBanners = lang === "en" ? FALLBACK_BANNERS_EN : FALLBACK_BANNERS_FR;

  const [banners, setBanners] = useState<BannerItem[]>(fallbackBanners);
  const [sessions, setSessions] = useState<PublicTrainingSession[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync fallback banners if lang changes and banners are defaults
  useEffect(() => {
    setBanners((prev) => {
      const isDefault = prev.every((b) => b.id?.startsWith("fb"));
      return isDefault ? fallbackBanners : prev;
    });
  }, [lang, fallbackBanners]);

  // Chargement Supabase
  useEffect(() => {
    getPublicBanners()
      .then((res) => {
        if (res.banners && res.banners.length >= 1) {
          setBanners(res.banners as BannerItem[]);
        }
      })
      .catch(() => {});

    getPublicTrainingSessions()
      .then((res) => {
        if (res.sessions) setSessions(res.sessions);
      })
      .catch(() => {});
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, 4_500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, banners.length]);

  const prev = useCallback(() => {
    setIsPaused(true);
    setCurrent((c) => (c - 1 + banners.length) % banners.length);
    setTimeout(() => setIsPaused(false), 6_000);
  }, [banners.length]);

  const next = useCallback(() => {
    setIsPaused(true);
    setCurrent((c) => (c + 1) % banners.length);
    setTimeout(() => setIsPaused(false), 6_000);
  }, [banners.length]);

  // Prochain compte à rebours
  const nextSession = sessions.length > 0 ? sessions[0] : null;
  const countdown = useCountdown(nextSession?.session_date ?? null);

  const activeBanner = banners[current] ?? banners[0];

  return (
    <section className="relative w-full overflow-hidden" aria-label={t("promo.nextSession")}>
      {/* ──────────────────────────── COMPTE À REBOURS ──────────────────────────── */}
      {nextSession && !countdown.expired && (
        <div
          className="relative w-full overflow-hidden"
          style={{ backgroundColor: "var(--navy-deep)" }}
        >
          {/* Fond décoratif */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange/20 via-transparent to-blue/10" />
          <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-accent/15 blur-[80px]" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full bg-blue/10 blur-[60px]" />

          <div className="relative mx-auto max-w-7xl px-5 py-8 sm:py-10 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

              {/* Gauche : titre + infos */}
              <div className="text-center lg:text-left space-y-2">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1.5">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    {t("promo.nextSession")}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug max-w-lg">
                  {nextSession.course_title}
                </h3>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
                  {nextSession.location && (
                    <span className="flex items-center gap-1.5 text-sm text-white/70">
                      <MapPin className="h-4 w-4 text-accent shrink-0" />
                      {nextSession.location}
                    </span>
                  )}
                  {(nextSession.seats_available ?? 0) > 0 && (
                    <span className="flex items-center gap-1.5 text-sm text-white/70">
                      <Users className="h-4 w-4 text-accent shrink-0" />
                      {nextSession.seats_available} {t("promo.seatsAvailable")}
                    </span>
                  )}
                </div>
              </div>

              {/* Centre : unités du décompte */}
              <div className="flex items-center gap-3 sm:gap-4">
                {[
                  { value: countdown.days, label: t("promo.days") },
                  { value: countdown.hours, label: t("promo.hours") },
                  { value: countdown.minutes, label: t("promo.minutes") },
                  { value: countdown.seconds, label: t("promo.seconds") },
                ].map((unit, idx) => (
                  <div key={idx} className="flex items-center gap-3 sm:gap-4">
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm w-16 h-16 sm:w-20 sm:h-20 shadow-lg">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums leading-none">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-widest text-white/55 mt-1">
                        {unit.label}
                      </span>
                    </div>
                    {idx < 3 && (
                      <span className="text-2xl sm:text-3xl font-bold text-white/30 leading-none -mt-4">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Droite : CTA */}
              <a
                href="/formation"
                className="shrink-0 inline-flex items-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: "var(--orange)" }}
              >
                {t("promo.registerNow")}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}


      {/* ──────────────────────────── CAROUSEL ──────────────────────────── */}
      <div
        className="relative h-[200px] sm:h-[260px] md:h-[300px] lg:h-[330px] w-full group overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setTimeout(() => setIsPaused(false), 5_000)}
      >
        {/* Slides */}
        {banners.map((banner, idx) => (
          <div
            key={banner.id ?? idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={idx !== current}
          >
            {/* Fond : image ou gradient */}
            {banner.image_url ? (
              <img
                src={banner.image_url}
                alt={banner.title}
                className="h-full w-full object-cover object-center"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            ) : (
              <div
                className={`h-full w-full bg-gradient-to-br ${
                  (banner as any).gradient ?? "from-[#061829] to-[#0d3060]"
                }`}
              />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-transparent" />

            {/* Texte */}
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
                <div className="max-w-xl">
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                    {banner.title}
                  </h2>

                  {banner.subtitle && (
                    <p className="mt-2 text-xs sm:text-sm text-white/75 leading-relaxed max-w-md line-clamp-2">
                      {banner.subtitle}
                    </p>
                  )}

                  {banner.cta_label && banner.cta_url && (
                    <a
                      href={banner.cta_url}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl text-white px-5 py-2.5 text-xs sm:text-sm font-semibold shadow-lg transition hover:opacity-90"
                      style={{ backgroundColor: "var(--orange)" }}
                    >
                      {banner.cta_label}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Bouton Précédent */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/35 hover:bg-black/55 text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
          aria-label="Bannière précédente"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Bouton Suivant */}
        <button
          type="button"
          onClick={next}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/35 hover:bg-black/55 text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
          aria-label="Bannière suivante"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots de navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setIsPaused(true);
                setCurrent(idx);
                setTimeout(() => setIsPaused(false), 6_000);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current
                  ? "w-6 opacity-100"
                  : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
              style={idx === current ? { backgroundColor: "var(--orange)" } : {}}
              aria-label={`Aller à la bannière ${idx + 1}`}
              aria-current={idx === current ? "true" : undefined}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
