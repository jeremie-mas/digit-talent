import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionaries, type Lang } from "./dictionaries";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  tList: (key: string) => string[];
};

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Langue par défaut : anglais
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage on the client
  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (stored === "fr" || stored === "en") setLangState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  // Sync <html lang> and persist
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    const dict = dictionaries[lang] || dictionaries.fr;
    const t = (key: string) => {
      const v = dict[key];
      if (typeof v === "string") return v;
      // Repli strict dans la même langue si possible
      const fallbackDict = lang === "en" ? dictionaries.en : dictionaries.fr;
      const fv = fallbackDict[key];
      return typeof fv === "string" ? fv : key;
    };
    const tList = (key: string) => {
      const v = dict[key];
      if (Array.isArray(v)) return v;
      const fallbackDict = lang === "en" ? dictionaries.en : dictionaries.fr;
      const fv = fallbackDict[key];
      return Array.isArray(fv) ? fv : [];
    };
    return { lang, setLang: setLangState, t, tList };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useT() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}