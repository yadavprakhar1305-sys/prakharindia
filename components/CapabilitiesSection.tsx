"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/app/LanguageProvider";
import InteractiveBuilding, { type Mode } from "@/components/building/InteractiveBuilding";

const STEPS = [
  { id: "foundation", key: "cap.step.foundation", color: "#8f959f" },
  { id: "structure", key: "cap.step.structure", color: "#b07a4f" },
  { id: "roof", key: "cap.step.roof", color: "#b8452f" },
];

const MODES: { id: Mode; key: string; label: string }[] = [
  { id: "auto", key: "", label: "AUTO · SCROLL" },
  { id: "foundation", key: "cap.step.foundation", label: "" },
  { id: "structure", key: "cap.step.structure", label: "" },
  { id: "roof", key: "cap.step.roof", label: "" },
];

export default function CapabilitiesSection() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("auto");
  const [hoverPhase, setHoverPhase] = useState(0);
  const [stepHover, setStepHover] = useState(false);

  return (
    <section
      id="capabilities"
      ref={ref}
      className="section"
      style={{ minHeight: "auto", alignItems: "flex-start", paddingTop: 110 }}
    >
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

        <div className="units" style={{ marginBottom: 20 }}>
          {STEPS.map((s, i) => (
            <div key={s.id} className={`unit-chip${i <= hoverPhase ? " on" : ""}`}>
              <span
                onMouseEnter={() => {
                  setStepHover(true);
                  setHoverPhase(i);
                }}
                onMouseLeave={() => setStepHover(false)}
                onClick={() => setMode(s.id as Mode)}
                style={{ cursor: "pointer", color: i <= hoverPhase && stepHover ? "var(--orange)" : void 0 }}
              >
                {String(i + 1).padStart(2, "0")} · {t(s.key)}
              </span>
            </div>
          ))}
          <div className="unit-chip" style={{ borderColor: "rgba(255,106,26,0.6)" }}>
            <span style={{ color: "var(--orange)", cursor: "pointer" }} onClick={() => setMode("auto")}>
              ⟳ {t("cap.step.auto") ?? "AUTO · SCROLL"}
            </span>
          </div>
        </div>

        <div className="cap-layout">
          <motion.div
            className="cap-viewer"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <InteractiveBuilding mode={mode} />
            <div className="cap-hint text-mono">
              ⟲ DRAG ROTATE · SCROLL ZOOM — {t("cap.interact")}
            </div>
            <div className="cap-mode text-mono">
              {mode === "auto" ? "SYNC · SCROLL" : `MANUAL · ${mode.toUpperCase()}`}
            </div>
          </motion.div>

          <div className="cap-side">
            <div className="phase-set">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  className={`phase-btn${mode === m.id ? " on" : ""}`}
                  onClick={() => setMode(m.id)}
                >
                  {m.id === "auto" ? m.label : `${m.id === "foundation" ? "01" : m.id === "structure" ? "02" : "03"} · ${t(m.key)}`}
                </button>
              ))}
            </div>
            <div className="cap-readout glass">
              <div className="cap-readout-row text-mono">
                <span>{t("cap.step.foundation")}</span>
                <i style={{ background: STEPS[0].color }} />
                <b>{mode === "foundation" ? "100%" : "—"}</b>
              </div>
              <div className="cap-readout-row text-mono">
                <span>{t("cap.step.structure")}</span>
                <i style={{ background: STEPS[1].color }} />
                <b>{mode === "structure" ? "100%" : "—"}</b>
              </div>
              <div className="cap-readout-row text-mono">
                <span>{t("cap.step.roof")}</span>
                <i style={{ background: STEPS[2].color }} />
                <b>{mode === "roof" ? "100%" : "—"}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}