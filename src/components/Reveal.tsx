import { useEffect, useRef, useState, type ReactNode, type ElementType, type CSSProperties } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "image" | "stagger";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  /** Type d'apparition : montée (défaut), glissement, zoom, rideau sur image ou enfants en cascade */
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
};

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: "",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  image: "reveal-image",
  stagger: "reveal-stagger",
};

export function Reveal({ children, as: Tag = "div", delay = 0, variant = "up", className = "", style }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    // Sécurité : un bloc déjà à l'écran au chargement s'affiche sans attendre l'observateur
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${VARIANT_CLASS[variant]} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
