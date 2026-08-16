"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Lang } from "@/lib/dict";
import { dict } from "@/lib/dict";

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pi-lang");
      if (saved === "en" || saved === "hi") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("pi-lang", l);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.style.setProperty("--lang", lang);
  }, [lang]);

  const t = useCallback((k: string) => dict[k]?.[lang] ?? k, [lang]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}