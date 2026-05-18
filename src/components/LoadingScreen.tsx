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

              <div className="relative z-10 flex w-[90vw] max-w-5xl -translate-y-4 flex-col items-center gap-7 md:flex-row md:gap-12 lg:-translate-y-6 lg:gap-14">
                {/* Image */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.13, duration: 0.67 }}
                  className="relative h-72 w-56 shrink-0 group md:h-[420px] md:w-[270px] lg:h-[500px] lg:w-80"
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
                <div className="flex min-w-0 flex-col items-center text-center md:items-start md:text-left">
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.27 }}
                    className="mb-6 relative"
                  >
                    <div className="bg-[#FFB7C5] px-5 py-1 text-lg font-black italic tracking-tighter text-[#1a0508] shadow-[4px_4px_0_rgba(255,255,255,0.2)] skew-x-[-15deg] md:text-xl lg:text-2xl">
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
                      style={{ fontSize: "clamp(3rem, 7.8vw, 6.25rem)", lineHeight: "0.86", textShadow: "4px 4px 0 #FFB7C5, -4px -4px 0 rgba(255,255,255,0.1)" }}
                    >
                        墓守の<br />ウェザエモン
                    </motion.h1>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.67, duration: 0.67 }}
                      className="mt-4 font-display text-lg font-black uppercase italic tracking-[0.28em] text-[#FFB7C5] opacity-80 md:text-2xl md:tracking-[0.36em] lg:text-3xl lg:tracking-[0.42em]"
                    >
                      WARDEN WEZAEMON
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.93 }}
                    className="mt-7 border-l-4 border-[#FFB7C5] pl-5 font-serif text-lg italic tracking-[0.16em] text-white/50 md:text-2xl lg:text-3xl"
                  >
                      に遭遇しました
                  </motion.div>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 text-[clamp(7rem,13vw,15rem)] font-serif text-white/[0.02] pointer-events-none select-none italic">
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
