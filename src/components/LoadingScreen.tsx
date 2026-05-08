import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [slash, setSlash] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Phase 0: System Boot (0 - 5.0s)
    const t1 = setTimeout(() => setPhase(1), 5000);
    
    // Phase 1: WARNING (5.0s - 8.0s)
    
    // Slash cut trigger at 8.0s
    const t2 = setTimeout(() => setSlash(true), 8000);
    
    // Screen split & text hide at 8.15s
    const t3 = setTimeout(() => {
      setPhase(2);
      setExit(true);
    }, 8150);
    
    // Complete & Unmount at 8.8s
    const t4 = setTimeout(() => onComplete(), 8800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {/* Top Background Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={exit ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#050505] border-b-2 border-[#ff3333]"
        style={{ borderColor: exit ? "#ff3333" : "transparent" }}
      />

      {/* Bottom Background Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={exit ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#050505] border-t-2 border-[#ff3333]"
        style={{ borderColor: exit ? "#ff3333" : "transparent" }}
      />

      <AnimatePresence>
        {phase < 2 && (
          <motion.div
            key="loading-content"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* PHASE 0: SYSTEM BOOT */}
            {phase === 0 && (
              <>
                {/* Centered Boot Logs - Smaller Size */}
                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 font-mono text-lg md:text-2xl lg:text-4xl text-[#00D4FF] opacity-90 leading-loose tracking-widest font-bold">
                  <TypewriterLine text="> WEZAEMON_PROTOCOL_v3.7.1" delay={0} />
                  <TypewriterLine text="> INITIATING_COMBAT_ROUTINES..." delay={1000} />
                  <TypewriterLine text="> OVERRIDING_SAFETY_LIMITS..." delay={2000} />
                  <TypewriterLine text="> SCANNING_SECTOR_FOR_THREATS..." delay={3000} />
                  <TypewriterLine text="> MATCH_FOUND." delay={4000} color="#CC0000" />
                </div>

                {/* Cyan Scan Line sweeping down */}
                <motion.div
                  initial={{ top: "-10%" }}
                  animate={{ top: "110%" }}
                  transition={{ duration: 5.0, ease: "linear" }}
                  className="absolute left-0 right-0 h-[3px] bg-[#00D4FF] opacity-60 shadow-[0_0_20px_#00D4FF]"
                />
              </>
            )}

            {/* PHASE 1: MASSIVE WARNING */}
            {phase === 1 && (
              <>
                {/* Central Warning Panel */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative p-[2px] bg-[#CC0000] w-[95vw] max-w-5xl"
                  style={{
                    clipPath: "polygon(40px 0, calc(100% - 40px) 0, 100% 40px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 40px 100%, 0 calc(100% - 40px), 0 40px)"
                  }}
                >
                  {/* Inner container to create the 2px border */}
                  <div 
                    className="relative flex flex-col items-center justify-center py-10 md:py-16 px-4 md:px-12 bg-[#050000]"
                    style={{
                      clipPath: "polygon(38px 0, calc(100% - 38px) 0, 100% 38px, 100% calc(100% - 38px), calc(100% - 38px) 100%, 38px 100%, 0 calc(100% - 38px), 0 38px)"
                    }}
                  >
                    {/* Scanline background inside box */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(transparent 50%, #CC0000 50%)", backgroundSize: "100% 4px" }} />
                    
                    {/* Diagonal stripes top and bottom */}
                    <div className="absolute top-0 left-16 right-16 h-4 opacity-60" style={{ backgroundImage: "repeating-linear-gradient(45deg, #CC0000, #CC0000 4px, transparent 4px, transparent 8px)" }} />
                    <div className="absolute bottom-0 left-16 right-16 h-4 opacity-60" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #CC0000, #CC0000 4px, transparent 4px, transparent 8px)" }} />

                    {/* Left/Right accent blocks */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-1/3 bg-[#CC0000] opacity-80" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-1/3 bg-[#CC0000] opacity-80" />

                    {/* Main Warning Text */}
                    <div className="relative font-display font-black text-[#CC0000] uppercase tracking-widest flex items-center justify-center gap-4 md:gap-8 z-10 w-full" style={{ fontSize: "clamp(2rem, 7vw, 6rem)" }}>
                      <span className="text-[#CC0000] animate-pulse opacity-80 text-[0.8em]">⚠</span>
                      <span>WARNING</span>
                      <span className="text-[#CC0000] animate-pulse opacity-80 text-[0.8em]">⚠</span>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative z-10 font-mono text-[#E0E0E0] tracking-[0.4em] mt-6 md:mt-8 text-[10px] md:text-sm lg:text-base uppercase border border-[#CC0000]/40 px-8 py-3 bg-[#CC0000]/10"
                    >
                      <span className="animate-pulse">BOSS ENCOUNTER DETECTED</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Glitch Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Katana Slash Effect */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={slash ? (exit ? { opacity: 0 } : { scaleX: 1 }) : { scaleX: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="absolute top-1/2 left-[-20%] right-[-20%] h-[4px] bg-[#ff3333] z-50 origin-left"
        style={{
          boxShadow: "0 0 30px #ff0000, 0 0 15px #fff",
          transform: "translateY(-50%) rotate(-4deg)",
        }}
      />
    </div>
  );
};

// Component helper cho hiệu ứng gõ chữ của Boot Logs
const TypewriterLine = ({ text, delay, color = "#00D4FF" }: { text: string; delay: number; color?: string }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 30); // tốc độ gõ
    return () => clearInterval(interval);
  }, [started, text]);

  if (!started) return null;

  return (
    <div style={{ color }} className="mb-4">
      {displayed}
      {displayed.length < text.length && <span className="bg-current w-3 md:w-4 h-5 md:h-8 inline-block ml-2 animate-pulse translate-y-1" />}
    </div>
  );
};
