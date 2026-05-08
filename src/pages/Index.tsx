import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BossHPBar } from "@/components/BossHPBar";
import { Navigation } from "@/components/Navigation";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { AbilitySection } from "@/components/sections/AbilitySection";
import { RaidArchives } from "@/components/sections/RaidArchives";
import { LegacySection } from "@/components/sections/LegacySection";
import { ContactTerminal } from "@/components/sections/ContactTerminal";
import { useEnragedMode } from "@/hooks/useEnragedMode";

const Index = () => {
  const [isLoading, setIsLoading] = useState(
    typeof window !== "undefined" && !sessionStorage.getItem("booted")
  );
  useEnragedMode();

  useEffect(() => {
    if (!isLoading) sessionStorage.setItem("booted", "true");
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E0E0E0]">
      <NoiseOverlay />
      <BossHPBar />
      <Navigation />

      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main style={{ paddingTop: 0 }}>
        <HeroSection />
        <AboutSection />
        <AbilitySection />
        <RaidArchives />
        <LegacySection />
        <ContactTerminal />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
