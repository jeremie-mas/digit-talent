/** Texte révélé mot par mot (chaque mot monte depuis un masque). */
export function AnimatedWords({
  text,
  delay = 0,
  step = 70,
  className = "",
}: {
  text: string;
  /** Délai avant le premier mot (ms) */
  delay?: number;
  /** Écart entre deux mots (ms) */
  step?: number;
  className?: string;
}) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="word-mask">
            <span className={className} style={{ animationDelay: `${delay + i * step}ms` }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}
