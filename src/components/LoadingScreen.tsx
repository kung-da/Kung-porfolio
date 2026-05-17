import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import wazaemonImg from "@/assets/wezaemon-avt.webp";

// Solo Leveling Palette
const SL_COLORS = {
  bg: "#04090f",
  titleBg: "#071525",
  outerBorder: "#1a6090",
  innerBorder: "#0d3d5e",
  diamond: "#1e7ab8",
  titleText: "#c2e0f4",
  sectionHeader: "#3e7fa3",
  label: "#7ab8d8",
  value: "#e8f4ff",
  number: "#ffe066",
  noteText: "#ff3e3e",
  noteBg: "#040d1a",
  warning: "#ff0000",
};

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [slash, setSlash] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Phase 0: System Boot (0 - 5.6s)
    const t1 = setTimeout(() => setPhase(1), 5667);

    // Slash cut trigger at 7.6s
    const t2 = setTimeout(() => setSlash(true), 7667);

    // Screen split & text hide at 7.7s
    const t3 = setTimeout(() => {
      setPhase(2);
      setExit(true);
    }, 7767);

    // Complete & Unmount at 8.2s
    const t4 = setTimeout(() => onComplete(), 8200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden font-sans">
      {/* Top Background Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={exit ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.53, ease: [0.7, 0, 0.3, 1] }}
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#020202] z-40 transition-colors ${exit ? 'border-b border-[#ff0000] shadow-[0_10px_30px_rgba(255,0,0,0.3)]' : ''}`}
      />

      {/* Bottom Background Panel */}
      <motion.div
        initial={{ y: 0 }}
        animate={exit ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.53, ease: [0.7, 0, 0.3, 1] }}
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#020202] z-40 transition-colors ${exit ? 'border-t border-[#ff0000] shadow-[0_-10px_30px_rgba(255,0,0,0.3)]' : ''}`}
      />

      <AnimatePresence>
        {phase < 2 && (
          <motion.div
            key="loading-content"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-50"
          >
            {/* PHASE 0: SOLO LEVELING SYSTEM BOARD */}
            {phase === 0 && <SoloLevelingBoard />}

            {/* PHASE 1: SLF UNIQUE MONSTER ALERT (IMAGE + TEXT + LIGHTING) */}
            {phase === 1 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative flex flex-col items-center justify-center w-full h-full"
              >
                {/* Background Shadow/Lighting Layer */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(255,183,197,0.15)_0%,transparent_50%)] z-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(0,0,0,0.8)_0%,transparent_70%)] z-0" />

                {/* Main Content Container */}
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl w-[90vw]">

                  {/* Left Side: Stylized Image with Mask/Lighting */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.13, duration: 0.67 }}
                    className="relative w-64 h-80 md:w-80 md:h-[500px] group"
                  >
                    {/* Image with contrast/lighting adjustment */}
                    <div className="absolute inset-0 border-2 border-[#FFB7C5]/30 overflow-hidden clip-chamfer">
                      <img
                        src={wazaemonImg}
                        alt="Wezaemon"
                        loading="lazy"
                        className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-1000"
                      />
                      {/* Gradient Overlay for "Light and Dark" */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/20 opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a0508] opacity-80" />
                    </div>

                    {/* Animated Glow behind image */}
                    <div className="absolute -inset-4 bg-[#FFB7C5]/10 blur-2xl animate-pulse -z-10" />
                  </motion.div>

                  {/* Right Side: Boss Information */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    {/* Header Label: UNIQUE MONSTER */}
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

                    {/* Boss Name with "Light/Dark" typography */}
                    <div className="relative">
                      <motion.h1
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.53 }}
                        className="text-white font-serif font-black relative z-10"
                        style={{
                          fontSize: "clamp(3rem, 10vw, 7rem)",
                          lineHeight: "0.85",
                          textShadow: "4px 4px 0 #FFB7C5, -4px -4px 0 rgba(255,255,255,0.1)"
                        }}
                      >
                        墓守の<br />ウェザエモン
                      </motion.h1>

                      {/* Subtitle */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.67, duration: 0.67 }}
                        className="font-display text-[#FFB7C5] text-xl md:text-3xl tracking-[0.6em] font-black uppercase mt-4 italic opacity-80"
                      >
                        WARDEN WEZAEMON
                      </motion.div>
                    </div>

                    {/* Footer text */}
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

                {/* Background Visual Enhancements */}
                <div className="absolute bottom-10 left-10 text-[15rem] font-serif text-white/[0.02] pointer-events-none select-none italic">
                  WEZAEMON
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Slash Effect */}
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={slash ? (exit ? { opacity: 0 } : { scaleX: 1 }) : { scaleX: 0 }}
        transition={{ duration: 0.13, ease: "circOut" }}
        className="absolute top-1/2 left-[-30%] right-[-30%] h-[10px] bg-white z-[300] origin-left"
        style={{
          boxShadow: "0 0 80px #ff0000, 0 0 30px #fff",
          transform: "translateY(-50%) rotate(-6deg)",
        }}
      />
    </div>
  );
};

const SoloLevelingBoard = () => {
  const [lineIndex, setLineIndex] = useState(0);

  const lines = [
    { type: 'header', text: 'BOSS ENCOUNTER ALERT' },
    { type: 'row', label: 'ENTITY_TYPE', value: 'UNIQUE MONSTER' },
    { type: 'row', label: 'RANK', value: 'CLASS-S (OVERLORD)' },
    { type: 'row', label: 'DANGER_LEVEL', value: 'CRITICAL', valType: 'danger' },
    { type: 'header', text: 'THREAT ANALYSIS' },
    { type: 'row', label: 'REID_DENSITY', value: '9999', sub: '+', valType: 'number' },
    { type: 'row', label: 'KILL_PROB', value: '99.9', sub: '%', valType: 'number' },
  ];

  // Auto-advance if the current line is a header
  useEffect(() => {
    const currentLine = lines[lineIndex];
    if (currentLine && currentLine.type === 'header') {
      const timer = setTimeout(() => {
        if (lineIndex < lines.length - 1) {
          setLineIndex(prev => prev + 1);
        }
      }, 533);
      return () => clearTimeout(timer);
    }
  }, [lineIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-[500px] bg-[#04090f] overflow-hidden select-none"
      style={{ boxShadow: "0 0 50px rgba(0,0,0,0.5)" }}
    >
      {/* Outer Border */}
      <div className="absolute inset-0 border-[1.2px]" style={{ borderColor: SL_COLORS.outerBorder }} />
      
      {/* Inner Border */}
      <div className="absolute inset-[6px] border-[0.7px]" style={{ borderColor: SL_COLORS.innerBorder }} />

      {/* Corner Ornaments */}
      <CornerDiamond top={0} left={0} />
      <CornerDiamond top={0} right={0} />
      <CornerDiamond bottom={0} left={0} />
      <CornerDiamond bottom={0} right={0} />

      {/* Mid-edge Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1e7ab8]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1e7ab8]" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#1a6090]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#1a6090]" />

      {/* Title Bar */}
      <div className="h-[44px] bg-[#071525] flex items-center justify-center relative">
        <div className="flex items-center gap-4">
          <div className="w-[38px] h-[1px] bg-gradient-to-r from-transparent to-[#ff0000]/20" />
          <span className="text-[16px] font-medium uppercase tracking-[6px] text-[#ff0000]">
            Warning: Unknown Entity
          </span>
          <div className="w-[38px] h-[1px] bg-gradient-to-l from-transparent to-[#ff0000]/20" />
        </div>
        {/* Title Bar Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-[0.8px] w-full" style={{ backgroundColor: SL_COLORS.outerBorder }} />
          <div className="h-[0.5px] w-full mt-[1.5px]" style={{ backgroundColor: "#0a3050" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45" style={{ backgroundColor: SL_COLORS.outerBorder }} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-[35px] pt-[20px] pb-[60px] space-y-[16px]">
        {lines.map((line, idx) => (idx <= lineIndex ? (
          <div key={idx}>
            {line.type === 'header' ? (
              <div className="mb-2">
                <span className="text-[11px] font-normal uppercase tracking-[4px]" style={{ color: SL_COLORS.sectionHeader }}>{line.text}</span>
                <div className="h-[0.5px] w-full mt-1" style={{ backgroundColor: SL_COLORS.innerBorder }} />
              </div>
            ) : (
              <TypewriterRow 
                label={line.label || ''} 
                value={line.value || ''} 
                sub={line.sub}
                valType={line.valType as 'value' | 'number'} 
                active={idx === lineIndex}
                onComplete={() => idx === lineIndex && lineIndex < lines.length - 1 && setLineIndex(idx + 1)}
              />
            )}
          </div>
        ) : null))}
      </div>

      {/* System Note Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-[#040d1a] border-t-[0.8px] flex items-center px-[35px]" style={{ borderColor: SL_COLORS.outerBorder }}>
        <span className="text-[10px] uppercase tracking-[2px] font-semibold" style={{ color: SL_COLORS.noteText }}>
          caution: evasive action recommended immediately
        </span>
      </div>
    </motion.div>
  );
};

const CornerDiamond = ({ top, bottom, left, right }: { top?: number; bottom?: number; left?: number; right?: number }) => (
  <div className="absolute z-10" style={{ top, bottom, left, right }}>
    {/* Diamond */}
    <div className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#1e7ab8] top-0 left-0" />
    {/* Accent lines */}
    {left !== undefined && <div className="absolute w-2 h-[1px] bg-[#1a6090] top-0 left-0" style={{ left: 0 }} />}
    {top !== undefined && <div className="absolute h-2 w-[1px] bg-[#1a6090] top-0 left-0" style={{ top: 0 }} />}
    {right !== undefined && <div className="absolute w-2 h-[1px] bg-[#1a6090] top-0 right-0" style={{ right: 0 }} />}
    {bottom !== undefined && <div className="absolute h-2 w-[1px] bg-[#1a6090] bottom-0 right-0" style={{ bottom: 0 }} />}
  </div>
);

const TypewriterRow = ({ label, value, sub, valType = 'value', active, onComplete }: { label: string; value: string; sub?: string; valType?: 'value' | 'number'; active: boolean; onComplete: () => void }) => {
  const [labelDone, setLabelDone] = useState(false);
  const [valueDone, setValueDone] = useState(false);
  const [displayedLabel, setDisplayedLabel] = useState("");
  const [displayedValue, setDisplayedValue] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayedLabel(label);
      setDisplayedValue(value);
      setLabelDone(true);
      setValueDone(true);
      return;
    }

    let i = 0;
    const labelInterval = setInterval(() => {
      setDisplayedLabel(label.slice(0, i + 1));
      i++;
      if (i >= label.length) {
        clearInterval(labelInterval);
        setLabelDone(true);
      }
    }, 27);

    return () => clearInterval(labelInterval);
  }, [active, label]);

  useEffect(() => {
    if (labelDone && !valueDone) {
      let i = 0;
      const valueInterval = setInterval(() => {
        setDisplayedValue(value.slice(0, i + 1));
        i++;
        if (i >= value.length) {
          clearInterval(valueInterval);
          setValueDone(true);
          onComplete();
        }
      }, 27);
      return () => clearInterval(valueInterval);
    }
  }, [labelDone, value, onComplete, valueDone]);

  return (
    <div className="h-[24px] flex items-center relative text-[13px] font-sans">
      {/* Label */}
      <div className="absolute left-0 uppercase tracking-[2px]" style={{ color: SL_COLORS.label }}>
        {displayedLabel}
        {active && !labelDone && <BlinkingCursor />}
      </div>
      
      {/* Value */}
      <div className="absolute left-[200px]">
        <span 
          className="uppercase"
          style={{ 
            color: (active && !valueDone) ? SL_COLORS.label : (valType === 'danger' ? SL_COLORS.warning : (valType === 'number' ? SL_COLORS.number : SL_COLORS.value)),
            fontWeight: valType === 'number' || valType === 'danger' ? 600 : 500,
            letterSpacing: '1px'
          }}
        >
          {displayedValue}
          {active && labelDone && !valueDone && <BlinkingCursor />}
        </span>
        {valueDone && sub && (
          <span className="ml-1 opacity-60 text-[11px]" style={{ color: SL_COLORS.value }}>{sub}</span>
        )}
      </div>
    </div>
  );
};

const BlinkingCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.5, repeat: Infinity }}
    className="inline-block w-[8px] h-[13px] bg-[#7ab8d8] ml-1 translate-y-[2px]"
  />
);
