import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BossHPBar } from "@/components/BossHPBar";
import { Navigation } from "@/components/Navigation";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { useEnragedMode } from "@/hooks/useEnragedMode";

// Lazy load sections below the fold for faster initial load
const AboutSection = lazy(() => import("@/components/sections/AboutSection").then(m => ({ default: m.AboutSection })));
const AbilitySection = lazy(() => import("@/components/sections/AbilitySection").then(m => ({ default: m.AbilitySection })));
const RaidArchives = lazy(() => import("@/components/sections/RaidArchives").then(m => ({ default: m.RaidArchives })));
const LegacySection = lazy(() => import("@/components/sections/LegacySection").then(m => ({ default: m.LegacySection })));
const ContactTerminal = lazy(() => import("@/components/sections/ContactTerminal").then(m => ({ default: m.ContactTerminal })));

// Fallback component for lazy sections
const SectionFallback = () => (
  <div className="relative w-full min-h-screen bg-[#050505]" aria-busy="true" />
);

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<SectionFallback />}>{children}</Suspense>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(
    typeof window !== "undefined" && (import.meta.env.DEV || !sessionStorage.getItem("booted"))
  );
  useEnragedMode();

  useEffect(() => {
    if (!isLoading) sessionStorage.setItem("booted", "true");
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E0E0E0] overflow-hidden">
      <NoiseOverlay />
      <BossHPBar />
      <Navigation />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main content with optimized entrance animation */}
      {!isLoading && (
        <motion.main
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.53, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
          style={{ paddingTop: 0 }}
        >
          <HeroSection />

          <LazySection>
            <AboutSection />
          </LazySection>

          <LazySection>
            <AbilitySection />
          </LazySection>

          <LazySection>
            <RaidArchives />
          </LazySection>

          <LazySection>
            <LegacySection />
          </LazySection>

          <LazySection>
            <ContactTerminal />
          </LazySection>

          <Footer />
        </motion.main>
      )}
    </div>
  );
};

export default Index;
