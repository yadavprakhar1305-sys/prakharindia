"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useLang } from "@/app/LanguageProvider";

const STEPS = [
  { id: "foundation", key: "cap.step.foundation" },
  { id: "structure", key: "cap.step.structure" },
  { id: "roof", key: "cap.step.roof" },
];

const BUILDS = [
  { key: "cap.res", tag: "RES · G+5", range: [0.14, 0.3] as const },
  { key: "cap.com", tag: "COM · G+8", range: [0.3, 0.5] as const },
  { key: "cap.ind", tag: "IND · SHED", range: [0.5, 0.66] as const },
];

export default function CapabilitiesSection() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.35"] });
  const [phase, setPhase] = useState(0);
  const [activeBuild, setActiveBuild] = useState(-1);
  const [buildProgress, setBuildProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const p = Math.min(2, Math.max(0, Math.floor(v * 3)));
    setPhase(p);
    setBuildProgress(v);
    setActiveBuild(BUILDS.findIndex((b) => v >= b.range[0] && v < b.range[1]));
  });

  const step0 = useTransform(scrollYProgress, [0, 0.15], [0.3, 1]);
  const step1 = useTransform(scrollYProgress, [0.34, 0.49], [0.3, 1]);
  const step2 = useTransform(scrollYProgress, [0.67, 0.82], [0.3, 1]);

  return (
    <section id="capabilities" ref={ref} className="section" style={{ minHeight: "300vh", alignItems: "flex-start", paddingTop: 140 }}>
      <div className="container">
        <div className="sec-head">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="chip">{t("sec.cap")}</span>
            <h2 className="h2-xl" style={{ marginTop: 18 }}>
              {t("sec.cap.title")}
            </h2>
            <p>{t("sec.cap.sub")}</p>
          </motion.div>
        </div>

        <div className="units" style={{ marginBottom: 34 }}>
          {STEPS.map((s, i) => (
            <motion.div key={s.id} style={{ opacity: i <= phase ? 1 : 0.3 }} className="unit-chip">
              <span style={{ color: i <= phase ? "var(--orange)" : void 0 }}>
                {String(i + 1).padStart(2, "0")} · {t(s.key)}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="proj-grid"
          style={{
            ["--p0" as string]: step0,
            ["--p1" as string]: step1,
            ["--p2" as string]: step2,
          }}
        >
          {BUILDS.map((b, i) => {
            const buildPerc = [step0, step1, step2][i];
            const isActive = activeBuild === i;
            return (
              <div key={b.key} className="proj-card">
                <div
                  className="proj-card-inner"
                  style={{
                    borderColor: isActive ? "rgba(255,106,26,0.65)" : undefined,
                    boxShadow: isActive ? "0 0 40px rgba(255,106,26,0.15)" : undefined,
                  }}
                >
                  <div className="proj-tags">
                    <span>{b.tag}</span>
                    <span>{i === 0 ? "FOUNDATION → ROOF" : i === 1 ? "FRAME + CLAD" : "STRUCTURE + SHELL"}</span>
                  </div>
                  <div className="proj-name">{t(b.key)}</div>
                  <div className="proj-scale">
                    <motion.i style={{ scaleX: buildPerc, transformOrigin: "left" }} />
                  </div>
                  <div className="proj-meta" style={{ marginTop: 12 }}>
                    {Math.round(
                      Math.min(1, Math.max(0, (buildProgress - b.range[0]) / (b.range[1] - b.range[0]))) * 100
                    )}
                    % ASSEMBLED
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}