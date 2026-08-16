"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type City = {
  name: string;
  x: number;
  y: number;
  workers: number;
  heat: number;
};

const CITIES: City[] = [
  { name: "Chandigarh", x: 150, y: 52, workers: 490, heat: 0.9 },
  { name: "Dehradun", x: 140, y: 78, workers: 260, heat: 0.5 },
  { name: "Delhi", x: 165, y: 98, workers: 620, heat: 1.0 },
  { name: "Ghaziabad", x: 185, y: 104, workers: 340, heat: 0.7 },
  { name: "Noida", x: 188, y: 116, workers: 560, heat: 0.95 },
  { name: "Gurugram", x: 160, y: 120, workers: 480, heat: 0.85 },
  { name: "Faridabad", x: 172, y: 128, workers: 350, heat: 0.65 },
  { name: "Greater Noida", x: 198, y: 132, workers: 480, heat: 0.9 },
  { name: "Jaipur", x: 118, y: 148, workers: 380, heat: 0.75 },
  { name: "Agra", x: 178, y: 162, workers: 300, heat: 0.6 },
  { name: "Kanpur", x: 226, y: 190, workers: 320, heat: 0.65 },
  { name: "Lucknow", x: 232, y: 172, workers: 420, heat: 0.8 },
];

const HQ = { name: "Mirzapur HQ", x: 236, y: 252 };

function CountUp({ to, start }: { to: number; start: boolean }) {
  const [val, setVal] = useState(0);
  const raf = useRef(0);
  const running = useRef(false);

  if (start && !running.current) {
    running.current = true;
    const t0 = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * e));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }

  return <>{val.toLocaleString("en-IN")}</>;
}

export default function HeatMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [active, setActive] = useState<City | null>(null);

  const lineDelay = (c: City) => {
    const d = Math.hypot(c.x - HQ.x, c.y - HQ.y);
    return (d / 320) * 0.9;
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <svg viewBox="0 0 380 300" width="100%" style={{ display: "block" }}>
        {/* stylized region blobs */}
        <motion.path
          d="M60,30 C110,18 170,22 210,34 C240,44 260,70 262,108 C264,150 250,190 226,214 C202,238 160,246 124,234 C86,222 58,186 52,140 C46,94 40,52 60,30 Z"
          fill="rgba(74,158,255,0.05)"
          stroke="rgba(74,158,255,0.35)"
          strokeWidth="1.2"
          strokeDasharray="4 5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4 }}
        />
        <motion.path
          d="M92,60 C128,52 168,58 190,80 C206,96 208,130 192,158 C176,188 138,202 108,190 C80,178 68,146 72,112 C76,84 82,66 92,60 Z"
          fill="rgba(255,106,26,0.04)"
          stroke="rgba(255,106,26,0.3)"
          strokeWidth="1"
          strokeDasharray="3 6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3 }}
        />

        {/* deployment lines from HQ */}
        {CITIES.map((c) => (
          <motion.path
            key={`l-${c.name}`}
            d={`M${HQ.x},${HQ.y} C${HQ.x + (c.x - HQ.x) * 0.35},${HQ.y} ${c.x - (c.x - HQ.x) * 0.3},${c.y} ${c.x},${c.y}`}
            fill="none"
            stroke={c.heat > 0.85 ? "rgba(255,106,26,0.55)" : "rgba(74,158,255,0.45)"}
            strokeWidth="1.1"
            strokeDasharray="5 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: lineDelay(c) }}
          />
        ))}

        {/* HQ */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 12 }}
        >
          <rect x={HQ.x - 22} y={HQ.y - 10} width="44" height="20" rx="4" fill="#ff6a1a" />
          <text x={HQ.x} y={HQ.y + 4} textAnchor="middle" fontSize="9" fill="#0c0e12" fontWeight="800" fontFamily="monospace">
            HQ
          </text>
        </motion.g>
        <circle cx={HQ.x} cy={HQ.y} r="4" fill="#ff6a1a">
          <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* city dots */}
        {CITIES.map((c, i) => (
          <motion.g
            key={`d-${c.name}`}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 + i * 0.07 }}
            onMouseEnter={() => setActive(c)}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: "pointer" }}
          >
            {/* heat halo */}
            <circle cx={c.x} cy={c.y} r={6 + c.heat * 7} fill="none" stroke={c.heat > 0.85 ? "#ff6a1a" : "#4a9eff"} strokeWidth="0.8" opacity="0.5">
              <animate attributeName="r" values={`${5 + c.heat * 6};${9 + c.heat * 8};${5 + c.heat * 6}`} dur={`${1.8 + (i % 4) * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.05;0.5" dur={`${1.8 + (i % 4) * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={c.x} cy={c.y} r="3.4" fill={c.heat > 0.85 ? "#ff6a1a" : "#4a9eff"}>
              <animate attributeName="opacity" values="1;0.35;1" dur={`${1.3 + (i % 5) * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </motion.g>
        ))}

        {/* total readout */}
        <text x="20" y="286" fontSize="9" fill="#76829a" fontFamily="monospace" letterSpacing="2">
          DEPLOYED WORKFORCE · 12 CITIES
        </text>
        <text x="20" y="276" fontSize="16" fill="#ff6a1a" fontWeight="800" fontFamily="monospace">
          {inView ? <CountUp to={5000} start={inView} /> : "0"}+
        </text>
      </svg>

      {active && (
        <div
          className="heat-tip glass text-mono"
          style={{
            left: `${(active.x / 380) * 100}%`,
            top: `${(active.y / 300) * 100}%`,
          }}
        >
          <b style={{ color: active.heat > 0.85 ? "var(--orange)" : "var(--blueprint)" }}>{active.name}</b>
          <span>
            <CountUp to={active.workers} start={inView} /> workers
          </span>
        </div>
      )}
    </div>
  );
}