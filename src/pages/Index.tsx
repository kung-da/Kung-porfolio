import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BossHPBar } from "@/components/BossHPBar";
import { Navigation } from "@/components/Navigation";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import SakuraBackground from "@/components/SakuraBackground";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AbilitySection } from "@/components/sections/AbilitySection";
import { RaidArchives } from "@/components/sections/RaidArchives";
import { HunterProfile } from "@/components/sections/HunterProfile";
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
    <div className="relative min-h-screen bg-washi">
      <NoiseOverlay />
      <BossHPBar />
      <Navigation />

      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main style={{ paddingTop: 0 }}>
        <HeroSection />
        <AbilitySection />
        <RaidArchives />
        <HunterProfile />
        <ContactTerminal />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
