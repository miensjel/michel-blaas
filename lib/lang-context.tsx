"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Lang = "nl" | "en";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({ lang: "nl", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("nl");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("michel-lang");
      if (stored === "nl" || stored === "en") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.lang === "nl" || e.data?.lang === "en") {
        setLangState(e.data.lang);
      }
      if (e.data?.action === "scrollTo") {
        const id: string = e.data.id;
        if (!id || id === "top") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  useEffect(() => {
    document.body.classList.remove("lang-nl", "lang-en");
    document.body.classList.add(`lang-${lang}`);
    document.documentElement.lang = lang;
    try { localStorage.setItem("michel-lang", lang); } catch {}
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
