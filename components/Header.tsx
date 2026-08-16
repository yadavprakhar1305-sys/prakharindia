"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/app/LanguageProvider";
import type { Lang } from "@/lib/dict";

export function LanguageCube() {
  const { lang, setLang } = useLang();
  const next: Lang = lang === "en" ? "hi" : "en";
  return (
    <div
      className="lang-cube-wrap"
      onClick={() => setLang(next)}
      title={next === "hi" ? "हिंदी" : "English"}
      aria-label="Toggle language"
    >
      <div className={`lang-cube face-${lang}`}>
        <div className="lang-face">EN</div>
        <div className="lang-face back">हि</div>
      </div>
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
        <a href="#top" className="brand">
          <strong>Prakhar India</strong>
          <span>Manpower &amp; Construction</span>
        </a>
        <nav className="header-nav">
          <a href="#manpower">{t("nav.manpower")}</a>
          <a href="#capabilities">{t("nav.capabilities")}</a>
          <a href="#projects">{t("nav.projects")}</a>
          <a href="#estimator">{t("nav.estimator")}</a>
          <a href="#contact">{t("nav.contact")}</a>
          <a href="tel:9044499111" className="tel-link">
            📞 9044499111
          </a>
          <span className="lang-anchor" />
          <LanguageCube />
        </nav>
      </div>
    </header>
  );
}