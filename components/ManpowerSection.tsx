"use client";

import { motion } from "framer-motion";
import { useLang } from "@/app/LanguageProvider";
import { workerCats, type WorkerCatId } from "@/lib/dict";
import { ICONS } from "@/lib/icons";

export default function ManpowerSection() {
  const { t } = useLang();
  const cats = Object.entries(workerCats) as [WorkerCatId, { en: string; hi: string }][];

  return (
    <section id="manpower" className="section">
      <div className="container">
        <div className="sec-head">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="chip">{t("sec.manpower")}</span>
            <h2 className="h2-xl" style={{ marginTop: 18 }}>
              {t("sec.manpower.title")}
            </h2>
            <p>{t("sec.manpower.sub")}</p>
          </motion.div>
        </div>

        <div className="force-grid">
          {cats.map(([id], i) => (
            <ForceNode key={id} id={id} i={i} />
          ))}
        </div>
        <div
          style={{ marginTop: 26, fontSize: "0.72rem", letterSpacing: "0.2em" }}
          className="text-mono text-steel"
        >
          <span>{t("fc.legend")}</span>
        </div>
      </div>
    </section>
  );
}

function ForceNode({ id, i }: { id: WorkerCatId; i: number }) {
  const { lang, t } = useLang();
  const labels = workerCats[id];
  return (
    <motion.div
      className="force-node"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (i % 6) * 0.05 }}
    >
      <span className="fn-id">{String(i + 1).padStart(2, "0")}</span>
      <span className="fn-icon">{ICONS[id]}</span>
      <span className="fn-name">{labels[lang]}</span>
    </motion.div>
  );
}