import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import wazaemonImg from "@/assets/wezaemon-avt.webp";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [slash, setSlash] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSlash(true), 3000);
    const t2 = setTimeout(() => { setPhase(2); setExit(true); }, 3150);
    const t3 = setTimeout(() => onComplete(), 3650);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {/* Split panels */}
      <motion.div
        initial={{ y: 0 }}
        animate={exit ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.53, ease: [0.7, 0, 0.3, 1] }}
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#020202] z-40 ${exit ? "border-b border-[#ff0000] shadow-[0_10px_30px_rgba(255,0,0,0.3)]" : ""}`}
      />
      <motion.div
        initial={{ y: 0 }}
        animate={exit ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.53, ease: [0.7, 0, 0.3, 1] }}
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#020202] z-40 ${exit ? "border-t border-[#ff0000] shadow-[0_-10px_30px_rgba(255,0,0,0.3)]" : ""}`}
      />

      <AnimatePresence>
        {phase < 2 && (
          <motion.div
            key="loading-content"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,183,197,0.15)_0%,transparent_50%)] z-0" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(0,0,0,0.8)_0%,transparent_70%)] z-0" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl w-[90vw]">
                {/* Image */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.13, duration: 0.67 }}
                  className="relative w-64 h-80 md:w-80 md:h-[500px] group"
                >
                  <div className="absolute inset-0 border-2 border-[#FFB7C5]/30 overflow-hidden clip-chamfer">
                    <img
                      src={wazaemonImg}
                      alt="Wezaemon"
                      loading="lazy"
                      className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/20 opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a0508] opacity-80" />
                  </div>
                  <div className="absolute -inset-4 bg-[#FFB7C5]/10 blur-2xl animate-pulse -z-10" />
                </motion.div>

                {/* Boss info */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.27 }}
                    className="mb-6 relative"
                  >
                    <div className="bg-[#FFB7C5] text-[#1a0508] px-6 py-1 font-black text-xl md:text-2xl italic tracking-tighter skew-x-[-15deg] shadow-[4px_4px_0_rgba(255,255,255,0.2)]">
                      UNIQUE MONSTER
                    </div>
                    <div className="absolute inset-0 bg-[#FFB7C5] blur-sm opacity-30 -z-10" />
                  </motion.div>

                  <div className="relative">
                    <motion.h1
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.53 }}
                      className="text-white font-serif font-black relative z-10"
                      style={{ fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: "0.85", textShadow: "4px 4px 0 #FFB7C5, -4px -4px 0 rgba(255,255,255,0.1)" }}
                    >
                        墓守の<br />ウェザエモン
                    </motion.h1>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.67, duration: 0.67 }}
                      className="font-display text-[#FFB7C5] text-xl md:text-3xl tracking-[0.6em] font-black uppercase mt-4 italic opacity-80"
                    >
                      WARDEN WEZAEMON
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.93 }}
                    className="mt-8 font-serif text-white/50 text-xl md:text-3xl tracking-[0.2em] italic border-l-4 border-[#FFB7C5] pl-6"
                  >
                      に遭遇しました
                  </motion.div>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 text-[15rem] font-serif text-white/[0.02] pointer-events-none select-none italic">
                WEZAEMON
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slash */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={slash ? (exit ? { opacity: 0 } : { scaleX: 1 }) : { scaleX: 0 }}
        transition={{ duration: 0.13, ease: "circOut" }}
        className="absolute top-1/2 left-[-30%] right-[-30%] h-[10px] bg-white z-[300] origin-left"
        style={{ boxShadow: "0 0 80px #ff0000, 0 0 30px #fff", transform: "translateY(-50%) rotate(-6deg)" }}
      />
    </div>
  );
};
