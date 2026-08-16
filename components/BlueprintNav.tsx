"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/app/LanguageProvider";

const SECTIONS = [
  { id: "manpower", n: "02" },
  { id: "capabilities", n: "03" },
  { id: "projects", n: "05" },
  { id: "estimator", n: "06" },
  { id: "contact", n: "08" },
];

export default function BlueprintNav() {
  const { t } = useLang();
  const [active, setActive] = useState("");

  useEffect(() => {
    const byId = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    byId.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="minimap glass" aria-label="Blueprint navigation">
      {SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? "active" : ""}>
          <span className="num">{s.n}</span>
          <span>{t(`nav.${s.id}`)}</span>
          <span className="dot" />
        </a>
      ))}
    </nav>
  );
}