"use client";

import { useEffect, useState } from "react";

export default function CraneLoader() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const t0 = performance.now();
    let raf = 0;
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setPct(100);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="loader" aria-hidden>
      <svg viewBox="0 0 220 160" width="170" height="124" style={{ overflow: "visible" }}>
        {/* mast */}
        <rect x="52" y="30" width="5" height="118" fill="#2e3a4e" />
        <rect x="44" y="142" width="21" height="6" fill="#ff6a1a" />
        {/* boom (rotates slightly) */}
        <g style={{ transformOrigin: "54px 30px", animation: "boomSway 3s ease-in-out infinite" }}>
          <rect x="54" y="24" width="150" height="4" fill="#ff6a1a" />
          <rect x="170" y="14" width="4" height="18" fill="#ff6a1a" />
          {/* cable + bucket */}
          <line x1="196" y1="28" x2="196" y2="78" stroke="#9aa6bd" strokeWidth="1.4" />
          <g style={{ transformOrigin: "196px 88px", animation: "bucketSwing 1.1s ease-in-out infinite" }}>
            <path d="M184,84 L208,84 L204,104 L188,104 Z" fill="none" stroke="#b8452f" strokeWidth="3" />
            <path d="M184,84 L208,84 L204,104 L188,104 Z" fill="rgba(184,69,47,0.25)" />
            <line x1="184" y1="84" x2="208" y2="84" stroke="#b8452f" strokeWidth="1" />
          </g>
        </g>
        {/* counterweight */}
        <rect x="30" y="20" width="20" height="12" fill="#4a9eff" opacity="0.8" />
      </svg>
      <div className="text-mono" style={{ letterSpacing: "0.45em", fontSize: "0.78rem", color: "var(--blueprint)" }}>
        PRAKHAR INDIA
      </div>
      <div className="loader-pct text-mono">
        {pct.toString().padStart(3, "0")}%
      </div>
    </div>
  );
}