"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { scrollStore } from "@/lib/scroll";
import ConstructionScene from "@/components/scene/ConstructionScene";
import Header from "@/components/Header";
import BlueprintNav from "@/components/BlueprintNav";
import HeroSection from "@/components/HeroSection";
import ManpowerSection from "@/components/ManpowerSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import EstimatorSection from "@/components/EstimatorSection";
import {
  StatsSection,
  ProjectsSection,
  LocationsSection,
  ComplianceSection,
  TestimonialsSection,
} from "@/components/ContentSections";
import { ContactSection, Footer } from "@/components/ContactFooter";
import CraneLoader from "@/components/CraneLoader";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollStore.v = v;
  });

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 1250);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <>
      {loading && <CraneLoader />}

      <Header />
      <BlueprintNav />

      <div className="layer-bg" aria-hidden>
        <ConstructionScene />
      </div>

      <main ref={mainRef} className="content">
        <HeroSection />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <ManpowerSection />
          <CapabilitiesSection />
          <EstimatorSection />
          <ProjectsSection />
          <StatsSection />
          <LocationsSection />
          <ComplianceSection />
          <TestimonialsSection />
          <ContactSection />
        </motion.div>
      </main>

      <Footer />
    </>
  );
}