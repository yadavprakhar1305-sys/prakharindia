"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLang } from "@/app/LanguageProvider";
import { locations } from "@/lib/dict";
import HeatMap from "@/components/HeatMap";

/* ---------------- rAF count-up (hardened) ---------------- */

function CountUp({ target, suffix = "", start }: { target: number; suffix?: string; start: boolean }) {
  const [val, setVal] = useState("");
  const raf = useRef(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * e).toLocaleString("en-IN") + suffix);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [start, target, suffix]);

  return <>{val || "0"}</>;
}

/* ---------------- Stats ---------------- */

export function StatsSection() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { n: 10, s: "+", l: "stats.years.l" },
    { n: 5000, s: "+", l: "stats.workers.l" },
    { n: 10, s: "+", l: "stats.states.l" },
    { n: 100, s: "+", l: "stats.projects.l" },
    { n: 100, s: "%", l: "stats.compliance.l" },
  ];

  return (
    <section className="section" style={{ paddingTop: 60, paddingBottom: 60 }} ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className="sec-head">
          <span className="chip">{t("sec.stats")}</span>
        </div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              className="stat-cell"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="n">
                <CountUp target={s.n} suffix={s.s} start={inView} />
              </div>
              <div className="l">{t(s.l)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects: 3D flip cards with before/after reveal ---------------- */

export function ProjectsSection() {
  const { t } = useLang();
  const projects = [
    { key: "1", tags: t("proj.1.tags").split("·"), name: t("proj.1.name"), meta: t("proj.1.meta"), desc: t("proj.1.desc"), scale: 92, hue: 1 },
    { key: "2", tags: t("proj.2.tags").split("·"), name: t("proj.2.name"), meta: t("proj.2.meta"), desc: t("proj.2.desc"), scale: 78, hue: 2 },
    { key: "3", tags: t("proj.3.tags").split("·"), name: t("proj.3.name"), meta: t("proj.3.meta"), desc: t("proj.3.desc"), scale: 88, hue: 3 },
  ];
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="sec-head" style={{ maxWidth: "none", display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
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
          <div className="text-mono text-steel" style={{ fontSize: "0.66rem", paddingBottom: 8 }}>
            {t("proj.flip")} ⟲
          </div>
        </div>
        <div className="proj-grid">
          {projects.map((p) => (
            <FlipCard key={p.key} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Proj = { tags: string[]; name: string; meta: string; desc: string; scale: number; hue: number };

function FlipCard({ project }: { project: Proj }) {
  const { t } = useLang();
  const [flipped, setFlipped] = useState(false);
  const [reveal, setReveal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  return (
    <div className="proj-card flip-wrap">
      <motion.div
        ref={cardRef}
        className={`flip-inner${flipped ? " flipped" : ""}`}
        style={{ rotateX: rx, rotateY: ry }}
        onMouseMove={(e) => {
          if (flipped) return;
          const r = cardRef.current?.getBoundingClientRect();
          if (!r) return;
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
        }}
        onClick={() => setFlipped((f) => !f)}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        {/* FRONT: blueprint sketch */}
        <div className="flip-face flip-front">
          <div className="proj-tags">
            {project.tags.map((s) => (
              <span key={s}>{s.trim()}</span>
            ))}
          </div>
          <div className="proj-blueprint" style={{ "--hue": String(project.hue) } as React.CSSProperties}>
            <svg viewBox="0 0 200 120" className="bp-svg">
              <line x1="8" y1="8" x2="192" y2="8" stroke="rgba(74,158,255,0.5)" strokeWidth="1" />
              <line x1="8" y1="112" x2="192" y2="112" stroke="rgba(74,158,255,0.5)" strokeWidth="1" />
              <line x1="8" y1="8" x2="8" y2="112" stroke="rgba(74,158,255,0.5)" strokeWidth="1" />
              <line x1="192" y1="8" x2="192" y2="112" stroke="rgba(74,158,255,0.5)" strokeWidth="1" />
              <g stroke="rgba(74,158,255,0.85)" strokeWidth="1.2" fill="none">
                <rect x="60" y="78" width="80" height="26" />
                <rect x="60" y="52" width="80" height="26" />
                <rect x="60" y="26" width="80" height="26" />
                <rect x="55" y="104" width="90" height="4" fill="rgba(74,158,255,0.2)" stroke="none" />
                <line x1="100" y1="26" x2="100" y2="104" />
              </g>
              <circle cx="26" cy="96" r="9" fill="none" stroke="#ff6a1a" strokeWidth="1.4" strokeDasharray="3 3">
                <animateTransform attributeName="transform" type="rotate" from="0 26 96" to="360 26 96" dur="9s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <div className="proj-name" style={{ marginTop: 14 }}>{project.name}</div>
          <div className="proj-meta" style={{ marginBottom: 0 }}>{project.meta}</div>
          <div className="flip-hint text-mono">{t("proj.flip")}</div>
        </div>

        {/* BACK: details + before/after reveal */}
        <div className="flip-face flip-back">
          <div className="before-after">
            <div className="ba-slot">{t("proj.before")}</div>
            <div className="ba-slot ba-built" style={{ clipPath: `circle(${reveal * 100}% at 50% 50%)` }}>
              {t("proj.after")}
              <div className="ba-glow" style={{ "--hue": String(project.hue) } as React.CSSProperties} />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={reveal * 100}
              onChange={(e) => setReveal(+e.target.value / 100)}
              className="ba-slider"
              onClick={(e) => e.stopPropagation()}
              aria-label="before after"
            />
          </div>
          <div className="proj-tags" style={{ marginTop: 12 }}>
            {project.tags.map((s) => (
              <span key={s}>{s.trim()}</span>
            ))}
          </div>
          <div className="proj-desc">{project.desc}</div>
          <div className="proj-scale" style={{ marginTop: 12 }}>
            <i style={{ width: `${project.scale}%` }} />
          </div>
          <div className="flip-hint text-mono" style={{ marginTop: 12 }}>⟳ {t("proj.back")}</div>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------------- Locations: animated heat map ---------------- */

export function LocationsSection() {
  const { t } = useLang();
  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="container">
        <div className="sec-head">
          <span className="chip">{t("sec.locations")}</span>
        </div>
        <div className="loc-heat">
          <motion.div
            className="loc-heat-map"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <HeatMap />
          </motion.div>
          <div className="loc-heat-list">
            {locations.map((l, i) => (
              <motion.div
                key={l.city}
                className="loc-item"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: (i % 6) * 0.05 }}
              >
                <span>{l.city}</span>
                <small>{l.state}</small>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Compliance ---------------- */

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

/* ---------------- Testimonials with parallax ---------------- */

export function TestimonialsSection() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const items = [t("t.1.q"), t("t.2.q"), t("t.3.q")];
  const authors = [t("t.1.a"), t("t.2.a"), t("t.3.a")];
  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }} ref={ref as React.RefObject<HTMLElement>}>
      <motion.div className="container" style={{ y }}>
        <div className="sec-head">
          <span className="chip">{t("sec.testi")}</span>
        </div>
        <div className="testi-grid">
          {items.map((q, i) => (
            <motion.div
              key={i}
              className="testi-card"
              style={{ marginTop: (i % 2) * 26 }}
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
      </motion.div>
    </section>
  );
}