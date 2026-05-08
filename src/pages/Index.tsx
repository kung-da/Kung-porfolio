import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <div className="relative min-h-screen bg-[#050505] text-[#E0E0E0] overflow-hidden">
      <NoiseOverlay />
      <BossHPBar />
      <Navigation />

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Bao bọc main bằng motion.main để tạo hiệu ứng xuất hiện */}
      {!isLoading && (
        <motion.main 
          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{ paddingTop: 0 }}
        >
          <HeroSection />
          <AboutSection />
          <AbilitySection />
          <RaidArchives />
          <LegacySection />
          <ContactTerminal />
          <Footer />
        </motion.main>
      )}
    </div>
  );
};

export default Index;
