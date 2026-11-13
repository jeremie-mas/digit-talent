import { useEffect, useState } from "react";

export interface HeroSlide {
  image: string;
  alt: string;
  /** Légende courte affichée dans les indicateurs */
  label: string;
}

/** Avance automatiquement d'une diapositive toutes les `delay` ms (sauf si l'animation est réduite). */
export function useAutoSlide(count: number, delay = 6000) {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), delay);
    return () => clearTimeout(id);
  }, [index, cycle, count, delay]);

  // Changer de diapositive à la main relance le minuteur
  const goTo = (i: number) => {
    setIndex(i);
    setCycle((c) => c + 1);
  };

  return { index, goTo, cycle };
}

/** Images du hero en fondu enchaîné, avec un zoom lent sur l'image active. */
export function HeroSlideImages({ slides, index }: { slides: HeroSlide[]; index: number }) {
  return (
    <>
      {slides.map((s, i) => (
        <img
          key={s.image}
          src={s.image}
          alt={i === index ? s.alt : ""}
          aria-hidden={i !== index}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-in-out ${
            i === index ? "hero-slide-active opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}

/** Indicateurs : numéro, légende et barre de progression ; cliquables. */
export function HeroSlideIndicators({
  slides,
  index,
  cycle,
  delay = 6000,
  onSelect,
}: {
  slides: HeroSlide[];
  index: number;
  cycle: number;
  delay?: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5">
      {slides.map((s, i) => (
        <button
          key={s.image}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={s.label}
          aria-current={i === index}
          className="group text-left"
        >
          <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/20">
            {i === index && (
              <span
                key={`${index}-${cycle}`}
                className="hero-progress absolute inset-y-0 left-0 bg-accent"
                style={{ animationDuration: `${delay}ms` }}
              />
            )}
            {i < index && <span className="absolute inset-0 bg-white/50" />}
          </span>
          <span className={`mt-3 hidden text-xs font-semibold uppercase tracking-[0.1em] transition-colors sm:block ${i === index ? "text-white" : "text-white/45 group-hover:text-white/75"}`}>
            <span className="text-accent">0{i + 1}</span> {s.label}
          </span>
        </button>
      ))}
    </div>
  );
}
