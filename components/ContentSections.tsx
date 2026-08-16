"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useLang } from "@/app/LanguageProvider";
import { locations } from "@/lib/dict";

function CountUp({ value, display }: { value: string; display: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const [text, setText] = useState("0");

  useEffect(() => {
    if (inView) mv.set(parseFloat(value.replace(/[^\d.]/g, "")));
  }, [inView, value, mv]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        const n = Math.round(v);
        setText(display.includes("+") ? `${n}+` : `${n}%`);
      }),
    [spring, display]
  );

  return (
    <div ref={ref} className="n">
      {text}
    </div>
  );
}

export function StatsSection() {
  const { t } = useLang();
  const stats = [
    { v: "10", d: "stats.years.n", l: "stats.years.l", plus: true },
    { v: "5000", d: "stats.workers.n", l: "stats.workers.l", plus: true },
    { v: "10", d: "stats.states.n", l: "stats.states.l", plus: true },
    { v: "100", d: "stats.projects.n", l: "stats.projects.l", plus: true },
    { v: "100", d: "stats.compliance.n", l: "stats.compliance.l", plus: false },
  ];
  return (
    <section className="section" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <div className="container">
        <div className="sec-head">
          <span className="chip">{t("sec.stats")}</span>
        </div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.d}
              className="stat-cell"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {s.plus ? (
                <CountUp value={s.v} display="+" />
              ) : (
                <div className="n">100%</div>
              )}
              <div className="l">{t(s.l)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const { t } = useLang();
  const projects = [
    { tags: t("proj.1.tags"), name: t("proj.1.name"), meta: t("proj.1.meta"), desc: t("proj.1.desc"), scale: 92 },
    { tags: t("proj.2.tags"), name: t("proj.2.name"), meta: t("proj.2.meta"), desc: t("proj.2.desc"), scale: 78 },
    { tags: t("proj.3.tags"), name: t("proj.3.name"), meta: t("proj.3.meta"), desc: t("proj.3.desc"), scale: 88 },
  ];
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="sec-head">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="chip">{t("sec.projects")}</span>
            <h2 className="h2-xl" style={{ marginTop: 18 }}>
              {t("sec.projects.title")}
            </h2>
          </motion.div>
        </div>
        <div className="proj-grid">
          {projects.map((p, i) => (
            <TiltCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ tags, name, meta, desc, scale }: { tags: string; name: string; meta: string; desc: string; scale: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });

  return (
    <div className="proj-card">
      <motion.div
        ref={ref}
        className="proj-card-inner"
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 40 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry.set(px * 14);
          rx.set(-py * 10);
        }}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
      >
        <div className="proj-tags">
          {tags.split("·").map((s) => (
            <span key={s}>{s.trim()}</span>
          ))}
        </div>
        <div className="proj-name">{name}</div>
        <div className="proj-meta">{meta}</div>
        <div className="proj-desc">{desc}</div>
        <div className="proj-scale">
          <i style={{ width: `${scale}%` }} />
        </div>
      </motion.div>
    </div>
  );
}

export function LocationsSection() {
  const { t } = useLang();
  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="container">
        <div className="sec-head">
          <span className="chip">{t("sec.locations")}</span>
        </div>
        <div className="loc-grid">
          {locations.map((l, i) => (
            <motion.div
              key={l.city}
              className="loc-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
            >
              <span>{l.city}</span>
              <small>{l.state}</small>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ComplianceSection() {
  const { t } = useLang();
  const items = ["comp.1", "comp.2", "comp.3", "comp.4", "comp.5", "comp.6"];
  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="container">
        <div className="sec-head">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="chip">{t("sec.trust")}</span>
            <h2 className="h2-xl" style={{ marginTop: 18, fontSize: "clamp(1.5rem, 3.4vw, 2.4rem)" }}>
              {t("sec.trust.title")}
            </h2>
          </motion.div>
        </div>
        <div className="comp-list">
          {items.map((k, i) => (
            <motion.div
              key={k}
              className="comp-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <span className="badge" />
              {t(k)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const { t } = useLang();
  const items = [t("t.1.q"), t("t.2.q"), t("t.3.q")];
  const authors = [t("t.1.a"), t("t.2.a"), t("t.3.a")];
  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="container">
        <div className="sec-head">
          <span className="chip">{t("sec.testi")}</span>
        </div>
        <div className="testi-grid">
          {items.map((q, i) => (
            <motion.div
              key={i}
              className="testi-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="q">“{q}”</div>
              <div className="a">— {authors[i]}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}