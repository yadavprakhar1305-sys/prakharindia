"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLang } from "@/app/LanguageProvider";

type WorkerType = "labour" | "mistri";
type SiteSize = "s" | "m" | "l";

const RATES: Record<WorkerType, number> = { labour: 500, mistri: 700 };
const SIZE_EXTRA: Record<SiteSize, number> = { s: 5000, m: 12000, l: 25000 };

function WorkerBlocks({ count, size }: { count: number; size: SiteSize }) {
  const group = useRef<THREE.Group>(null!);
  const frames = useRef({ c: 0, s: size });

  const cols = useMemo(() => {
    const dim = Math.ceil(Math.sqrt(count * 0.8));
    return Math.min(dim, 16);
  }, [count]);

  useFrame(() => {
    frames.current.c += (Math.min(count, 144) - frames.current.c) * 0.08;
    if (frames.current.s !== size) frames.current.s = size;
    const scale: Record<SiteSize, number> = { s: 1, m: 1.45, l: 1.9 };
    group.current.scale.lerp(new THREE.Vector3(scale[size], 1, scale[size]), 0.1);
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const visible = i < Math.floor(frames.current.c);
      mesh.visible = visible;
    });
  });

  const rows = Math.ceil(Math.min(count, 144) / cols);
  const blocks = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      blocks.push([c - cols / 2, r, r * 0.2]);
    }
  }

  return (
    <group ref={group}>
      {blocks.map(([x, z, y], i) => (
        <mesh key={i} position={[x * 0.34, y + 0.16, z * 0.34]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color={i % 5 === 0 ? "#ff6a1a" : "#4a9eff"} roughness={0.45} metalness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function EstimatorSection() {
  const { t } = useLang();
  const [workers, setWorkers] = useState(120);
  const [type, setType] = useState<WorkerType>("labour");
  const [days, setDays] = useState(30);
  const [size, setSize] = useState<SiteSize>("m");

  const estimate = workers * RATES[type] * days + SIZE_EXTRA[size];
  const total = estimate.toLocaleString("en-IN");

  const msg = encodeURIComponent(
    `Prakhar India requirement: ${workers} ${type === "labour" ? "General Labour" : "Mistri"} workers · ${days} days · ${size.toUpperCase()} site`
  );
  const waHref = `https://wa.me/919044499111?text=${msg}`;
  const mailHref = `mailto:yadavprakhar1305@gmail.com?subject=${encodeURIComponent("Project Enquiry — Prakhar India")}&body=${msg}`;

  return (
    <section id="estimator" className="section">
      <div className="container">
        <div className="sec-head">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="chip">{t("sec.estimator")}</span>
            <h2 className="h2-xl" style={{ marginTop: 18 }}>
              {t("sec.estimator.title")}
            </h2>
            <p>{t("sec.estimator.sub")}</p>
          </motion.div>
        </div>

        <div className="est-shell">
          <motion.div
            className="est-3d"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
          >
            <EstSceneBlocks workers={workers} size={size} />
          </motion.div>

          <div className="est-panel">
            <div className="est-row">
              <div className="er-top">
                <span>{t("est.workers")}</span>
                <b>{workers}</b>
              </div>
              <input
                className="est-range"
                type="range"
                min={20}
                max={500}
                step={5}
                value={workers}
                onChange={(e) => setWorkers(+e.target.value)}
                aria-label={t("est.workers")}
              />
            </div>

            <div className="est-row">
              <div className="er-top">
                <span>{t("est.workers.type")}</span>
              </div>
              <div className="seg">
                <button className={type === "labour" ? "on" : ""} onClick={() => setType("labour")}>
                  {t("est.type.labour")} · ₹500
                </button>
                <button className={type === "mistri" ? "on" : ""} onClick={() => setType("mistri")}>
                  {t("est.type.mistri")} · ₹700
                </button>
              </div>
            </div>

            <div className="est-row">
              <div className="er-top">
                <span>{t("est.days")}</span>
                <b>{days}</b>
              </div>
              <input
                className="est-range"
                type="range"
                min={1}
                max={180}
                step={1}
                value={days}
                onChange={(e) => setDays(+e.target.value)}
                aria-label={t("est.days")}
              />
            </div>

            <div className="est-row">
              <div className="er-top">
                <span>{t("est.size")}</span>
              </div>
              <div className="seg">
                <button className={size === "s" ? "on" : ""} onClick={() => setSize("s")}>
                  {t("est.size.s")}
                </button>
                <button className={size === "m" ? "on" : ""} onClick={() => setSize("m")}>
                  {t("est.size.m")}
                </button>
                <button className={size === "l" ? "on" : ""} onClick={() => setSize("l")}>
                  {t("est.size.l")}
                </button>
              </div>
            </div>

            <div className="est-total">
              <div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", color: "var(--steel-300)", fontFamily: "var(--mono)" }}>
                  {t("est.estimate")}
                </div>
                <div className="est-note">{t("est.note")}</div>
              </div>
              <div className="amount">₹{total}</div>
            </div>

            <div className="seg" style={{ marginTop: 4 }}>
              <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1 }}>
                {t("est.cta")} · WhatsApp
              </a>
              <a href={mailHref} className="btn btn-outline">
                ✉️
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EstSceneBlocks({ workers, size }: { workers: number; size: SiteSize }) {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [5.2, 4.6, 6.8], fov: 42 }} gl={{ antialias: true }}>
      <color attach="background" args={["#10141b"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 10, 4]} intensity={2} />
      <pointLight position={[-4, 3, -2]} intensity={18} color="#ff6a1a" distance={12} />
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <gridHelper args={[9, 18, "#4a9eff", "#242c38"]} />
      </group>
      <WorkerBlocks count={workers} size={size} />
    </Canvas>
  );
}