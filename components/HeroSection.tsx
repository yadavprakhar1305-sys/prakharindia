"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/app/LanguageProvider";

export default function HeroSection() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const titleY = useTransform(lift, [0, 1], [0, -260]);
  const titleOpacity = useTransform(lift, [0, 0.75], [1, 0]);
  const subY = useTransform(lift, [0, 1], [0, 140]);
  const subOpacity = useTransform(lift, [0, 0.5], [1, 0]);
  const hintOpacity = useTransform(lift, [0, 0.4], [1, 0]);

  return (
    <section id="top" ref={ref} className="hero">
      <div className="hero-tools text-mono text-steel" aria-hidden>
        <span style={{ color: "var(--orange)" }}>▲ </span>
        TOWER CRANE TC-170 · LIFT RATE 4.2s · LOAD 100%
      </div>

      <motion.div style={{ opacity: titleOpacity, y: titleY }} className="hero-title">
        <motion.span
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="chip"
          style={{ marginBottom: 28 }}
        >
          <span className="pulse-line" style={{ width: 28 }} />
          {t("hero.badge")}
          <span className="pulse-line" style={{ width: 28 }} />
        </motion.span>
        <h1 className="h1-xl">
          <motion.span
            className="line"
            initial={{ opacity: 0, y: 70, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            style={{ color: "var(--steel-300)" }}
          >
            {t("hero.h1.1")}
          </motion.span>
          <motion.span
            className="line"
            initial={{ opacity: 0, y: 70, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            {t("hero.h1.2")} <span className="text-orange">{t("hero.h1.3")}</span>
          </motion.span>
        </h1>
      </motion.div>

      <motion.div
        style={{ opacity: subOpacity, y: subY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.75 }}
        className="container"
      >
        <p
          style={{
            maxWidth: 720,
            margin: "34px auto 0",
            textAlign: "center",
            color: "var(--steel-300)",
            fontSize: "1.05rem",
          }}
        >
          {t("hero.sub")}
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            marginTop: 38,
            flexWrap: "wrap",
          }}
        >
          <a href="#estimator" className="btn btn-primary">
            {t("hero.cta.manpower")} →
          </a>
          <a href="#capabilities" className="btn btn-outline">
            {t("hero.cta.quote")}
          </a>
        </div>
      </motion.div>

      <motion.div style={{ opacity: hintOpacity }} className="scroll-hint">
        <span>{t("hero.scroll")}</span>
        <div className="chev" />
      </motion.div>
    </section>
  );
}