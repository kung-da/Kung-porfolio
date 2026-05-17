import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import wazaemonImg from "@/assets/wezaemon-avt.webp";

// Solo Leveling Palette
const SL = {
  bg: "#04090f",
  titleBg: "#071525",
  outerBorder: "#1a6090",
  innerBorder: "#0d3d5e",
  diamond: "#1e7ab8",
  titleText: "#c2e0f4",
  sectionHeader: "#3e7fa3",
  label: "#5a9aba",
  value: "#e8f4ff",
  number: "#ffe066",
  noteText: "#ff3e3e",
  warning: "#ff0000",
};

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [slash, setSlash] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 5667);
    const t2 = setTimeout(() => setSlash(true), 7667);
    const t3 = setTimeout(() => { setPhase(2); setExit(true); }, 7767);
    const t4 = setTimeout(() => onComplete(), 8200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
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
            {/* PHASE 0: SYSTEM BOARD */}
            {phase === 0 && <SystemBoard />}

            {/* PHASE 1: UNIQUE MONSTER ENCOUNTER */}
            {phase === 1 && (
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
                      <img src={wazaemonImg} alt="Wezaemon" loading="lazy"
                        className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/20 opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a0508] opacity-80" />
                    </div>
                    <div className="absolute -inset-4 bg-[#FFB7C5]/10 blur-2xl animate-pulse -z-10" />
                  </motion.div>

                  {/* Boss info */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.27 }} className="mb-6 relative">
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
            )}
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

/* ═════════════════════════════════════════════════════════════════════════════
   PHASE 0 — SYSTEM BOARD (reformatted layout)
   ═════════════════════════════════════════════════════════════════════════════ */

interface BoardLine {
  type: "header" | "row" | "spacer";
  text?: string;
  label?: string;
  value?: string;
  sub?: string;
  valType?: "value" | "number" | "danger";
}

const BOARD_LINES: BoardLine[] = [
  { type: "header", text: "BOSS ENCOUNTER ALERT" },
  { type: "row", label: "ENTITY_TYPE", value: "UNIQUE MONSTER", valType: "value" },
  { type: "row", label: "RANK", value: "CLASS-S (OVERLORD)", valType: "value" },
  { type: "row", label: "DANGER_LEVEL", value: "CRITICAL", valType: "danger" },
  { type: "spacer" },
  { type: "header", text: "THREAT ANALYSIS" },
  { type: "row", label: "REID_DENSITY", value: "9999", sub: "+", valType: "number" },
  { type: "row", label: "KILL_PROB", value: "99.9", sub: "%", valType: "number" },
];

const SystemBoard = () => {
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    const line = BOARD_LINES[lineIdx];
    if (!line) return;
    if (line.type === "header" || line.type === "spacer") {
      const t = setTimeout(() => {
        if (lineIdx < BOARD_LINES.length - 1) setLineIdx((p) => p + 1);
      }, line.type === "spacer" ? 200 : 500);
      return () => clearTimeout(t);
    }
  }, [lineIdx]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-[90vw] max-w-[520px] select-none"
      style={{ background: SL.bg, boxShadow: "0 0 60px rgba(0,0,0,0.6)" }}
    >
      {/* Outer frame */}
      <div className="absolute inset-0 border" style={{ borderColor: SL.outerBorder }} />
      <div className="absolute inset-[6px] border-[0.5px]" style={{ borderColor: SL.innerBorder }} />

      {/* Corner diamonds */}
      <CornerDiamond pos="top-left" /><CornerDiamond pos="top-right" />
      <CornerDiamond pos="bottom-left" /><CornerDiamond pos="bottom-right" />

      {/* Edge accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1" style={{ background: SL.diamond }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1" style={{ background: SL.diamond }} />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1" style={{ background: SL.outerBorder }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1" style={{ background: SL.outerBorder }} />

      {/* Title bar */}
      <div className="relative flex items-center justify-center" style={{ height: 48, background: SL.titleBg }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#ff0000]/20" />
          <span
            className="font-mono uppercase tracking-[0.35em]"
            style={{ fontSize: 13, color: SL.warning, fontWeight: 500 }}
          >
            Warning: Unknown Entity
          </span>
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#ff0000]/20" />
        </div>
        {/* Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px w-full" style={{ background: SL.outerBorder }} />
          <div className="h-[0.5px] w-full mt-[2px]" style={{ background: "#0a3050" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45" style={{ background: SL.outerBorder }} />
        </div>
      </div>

      {/* Body */}
      <div className="px-8 pt-5 pb-14 space-y-0">
        {BOARD_LINES.map((line, idx) =>
          idx <= lineIdx ? (
            <div key={idx}>
              {line.type === "spacer" ? (
                <div className="h-4" />
              ) : line.type === "header" ? (
                <div className="pt-1 pb-2">
                  <span
                    className="font-mono uppercase tracking-[0.3em]"
                    style={{ fontSize: 11, color: SL.sectionHeader, fontWeight: 400 }}
                  >
                    {line.text}
                  </span>
                  <div className="h-px w-full mt-1.5" style={{ background: SL.innerBorder }} />
                </div>
              ) : (
                <TypewriterRow
                  label={line.label!}
                  value={line.value!}
                  sub={line.sub}
                  valType={line.valType as "value" | "number" | "danger"}
                  active={idx === lineIdx}
                  onComplete={() =>
                    idx === lineIdx && lineIdx < BOARD_LINES.length - 1 && setLineIdx(idx + 1)
                  }
                />
              )}
            </div>
          ) : null
        )}
      </div>

      {/* Bottom caution bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center px-8 border-t"
        style={{ height: 34, background: "#040d1a", borderColor: SL.outerBorder }}
      >
        <span className="font-mono uppercase tracking-[0.15em]" style={{ fontSize: 10, color: SL.noteText, fontWeight: 600 }}>
          caution: evasive action recommended immediately
        </span>
      </div>
    </motion.div>
  );
};

/* ── Corner Diamond ── */
const CornerDiamond = ({ pos }: { pos: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const style: React.CSSProperties = { position: "absolute", zIndex: 10 };
  if (pos.includes("top")) style.top = 0;
  if (pos.includes("bottom")) style.bottom = 0;
  if (pos.includes("left")) style.left = 0;
  if (pos.includes("right")) style.right = 0;

  return (
    <div style={style}>
      <div
        className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{ background: SL.diamond, top: 0, left: 0 }}
      />
    </div>
  );
};

/* ── Typewriter Row ── */
const TypewriterRow = ({
  label, value, sub, valType = "value", active, onComplete,
}: {
  label: string; value: string; sub?: string;
  valType?: "value" | "number" | "danger";
  active: boolean; onComplete: () => void;
}) => {
  const [labelDone, setLabelDone] = useState(false);
  const [valueDone, setValueDone] = useState(false);
  const [displayedLabel, setDisplayedLabel] = useState("");
  const [displayedValue, setDisplayedValue] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayedLabel(label); setDisplayedValue(value);
      setLabelDone(true); setValueDone(true);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      setDisplayedLabel(label.slice(0, i + 1));
      i++;
      if (i >= label.length) { clearInterval(id); setLabelDone(true); }
    }, 27);
    return () => clearInterval(id);
  }, [active, label]);

  useEffect(() => {
    if (labelDone && !valueDone) {
      let i = 0;
      const id = setInterval(() => {
        setDisplayedValue(value.slice(0, i + 1));
        i++;
        if (i >= value.length) { clearInterval(id); setValueDone(true); onComplete(); }
      }, 27);
      return () => clearInterval(id);
    }
  }, [labelDone, value, onComplete, valueDone]);

  const valueColor =
    active && !valueDone
      ? SL.label
      : valType === "danger"
        ? SL.warning
        : valType === "number"
          ? SL.number
          : SL.value;

  return (
    <div className="flex items-center h-[30px] font-mono" style={{ fontSize: 13 }}>
      {/* Label */}
      <span className="uppercase tracking-[0.12em] shrink-0" style={{ color: SL.label, width: 180 }}>
        {displayedLabel}
        {active && !labelDone && <BlinkCursor />}
      </span>
      {/* Value */}
      <span
        className="uppercase"
        style={{ color: valueColor, fontWeight: valType === "number" || valType === "danger" ? 600 : 500, letterSpacing: "0.06em" }}
      >
        {displayedValue}
        {active && labelDone && !valueDone && <BlinkCursor />}
      </span>
      {valueDone && sub && (
        <span className="ml-1 opacity-60 text-[11px]" style={{ color: SL.value }}>{sub}</span>
      )}
    </div>
  );
};

const BlinkCursor = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 0.5, repeat: Infinity }}
    className="inline-block w-[7px] h-[14px] ml-0.5 translate-y-[2px]"
    style={{ background: SL.label }}
  />
);
