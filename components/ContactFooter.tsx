"use client";

import { motion } from "framer-motion";
import { useLang } from "@/app/LanguageProvider";

export function ContactSection() {
  const { t } = useLang();
  const cards = [
    { ic: "📞", label: t("contact.call"), body: <a href="tel:9044499111">9044499111</a> },
    { ic: "✉️", label: t("contact.mail"), body: <a href="mailto:yadavprakhar1305@gmail.com">yadavprakhar1305@gmail.com</a> },
    { ic: "📍", label: "ADDRESS", body: <span>{t("contact.address")}</span> },
  ];
  return (
    <section id="contact" className="section" style={{ minHeight: "70vh", paddingBottom: 90 }}>
      <div className="container">
        <div className="sec-head" style={{ margin: "0 auto 48px", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="chip">{t("contact.title")}</span>
            <h2 className="h2-xl" style={{ marginTop: 18, marginBottom: 16 }}>
              {t("contact.title")}
            </h2>
            <p style={{ maxWidth: 560, margin: "0 auto" }}>{t("contact.sub")}</p>
          </motion.div>
        </div>
        <div className="contact-row">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              className="contact-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="ic">{c.ic}</div>
              <b>{c.label}</b>
              {c.body}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Prakhar India</h4>
            <p>{t("footer.tagline")}</p>
            <p className="text-mono text-steel" style={{ marginTop: 14, fontSize: "0.66rem" }}>
              {t("footer.est")}
            </p>
          </div>
          <div>
            <h4>{t("nav.manpower")}</h4>
            <ul className="footer-links">
              <li><a href="#manpower">{t("nav.manpower")}</a></li>
              <li><a href="#capabilities">{t("nav.capabilities")}</a></li>
              <li><a href="#projects">{t("nav.projects")}</a></li>
              <li><a href="#estimator">{t("nav.estimator")}</a></li>
            </ul>
          </div>
          <div>
            <h4>{t("contact.title")}</h4>
            <ul className="footer-links">
              <li><a href="tel:9044499111">📞 9044499111</a></li>
              <li><a href="mailto:yadavprakhar1305@gmail.com">✉️ yadavprakhar1305@gmail.com</a></li>
              <li><span>📍 {t("contact.address")}</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            © {year} Prakhar India. {t("footer.rights")}
          </div>
          <div>
            <a href="https://yadavprakhar1305-sys.github.io/prakharindia/legacy-site/pages/privacy-policy.html" target="_blank" rel="noreferrer">
              {t("legacy.note")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}