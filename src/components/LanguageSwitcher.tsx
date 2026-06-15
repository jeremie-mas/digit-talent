import { useT } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/dictionaries";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useT();
  const langs: Lang[] = ["en", "fr"];
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full border border-border bg-background/60 p-0.5 text-xs font-semibold backdrop-blur ${className}`}
    >
      {langs.map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`min-w-[2.25rem] rounded-full px-2.5 py-1 uppercase tracking-wider transition ${
              active ? "bg-navy text-white shadow-sm" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}