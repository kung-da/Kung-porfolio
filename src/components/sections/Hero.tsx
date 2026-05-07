import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import profilePic from "@/assets/profile-picture.jpg";

const BOSS_LINES = [
  "SYSTEM OVERRIDE...",
  "SCANNING NEXUS...",
  "ENTITY FOUND: CUNG-MASTER",
];
const ROLES = ["Data Engineer", "AI Developer", "System Builder"];

const BossTypewriter = () => {
  const [phase, setPhase] = useState<"intro" | "roles">("intro");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [displayLines, setDisplayLines] = useState<string[]>([]);

  useEffect(() => {
    if (phase === "intro") {
      const line = BOSS_LINES[lineIdx];
      if (charIdx < line.length) {
        const t = setTimeout(() => setCharIdx((c) => c + 1), 40);
        return () => clearTimeout(t);
      } else {
        if (lineIdx < BOSS_LINES.length - 1) {
          const t = setTimeout(() => {
            setDisplayLines((d) => [...d, line]);
            setLineIdx((i) => i + 1);
            setCharIdx(0);
          }, 600);
          return () => clearTimeout(t);
        } else {
          const t = setTimeout(() => {
            setDisplayLines((d) => [...d, line]);
            setPhase("roles");
          }, 1200);
          return () => clearTimeout(t);
        }
      }
    }
  }, [phase, lineIdx, charIdx]);

  useEffect(() => {
    if (phase !== "roles") return;
    const word = ROLES[roleIdx];
    if (!deleting && roleText === word) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && roleText === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
      return;
    }
    const t = setTimeout(() => {
      setRoleText((cur) =>
        deleting ? word.substring(0, cur.length - 1) : word.substring(0, cur.length + 1)
      );
    }, deleting ? 50 : 90);
    return () => clearTimeout(t);
  }, [roleText, deleting, roleIdx, phase]);

  return (
    <div className="font-mono-ui text-sm md:text-base">
      {displayLines.map((l, i) => (
        <div key={i} className="text-cyan-accent/60 mb-1">
          <span className="text-muted-foreground mr-2">&gt;</span>
          {l}
        </div>
      ))}
      {phase === "intro" && (
        <div className="text-cyan-accent">
          <span className="text-muted-foreground mr-2">&gt;</span>
          {BOSS_LINES[lineIdx].substring(0, charIdx)}
          <span className="animate-blink text-cyan-accent">▍</span>
        </div>
      )}
      {phase === "roles" && (
        <div className="mt-3 text-lg md:text-xl">
          <span className="text-cyan-accent text-glow-cyan">{roleText}</span>
          <span className="animate-blink text-cyan-accent">▍</span>
        </div>
      )}
    </div>
  );
};

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center px-6 md:px-16 lg:px-24">
      {/* Kanji watermark */}
      <div
        aria-hidden
        className="absolute right-[-2vw] top-[12vh] font-jp pointer-events-none select-none"
        style={{ fontSize: "clamp(220px, 36vw, 520px)", color: "hsl(0 0% 100% / 0.02)", lineHeight: 0.85, fontWeight: 900 }}
      >
        墓守
      </div>

      {/* Grid horizon */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[40vh] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(192 100% 60% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(192 100% 60% / 0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          transform: "perspective(600px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto grid md:grid-cols-12 gap-10 items-center" style={{ zIndex: 10 }}>
        {/* LEFT — Avatar with cyber ring */}
        <motion.div
          className="md:col-span-5 flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -60 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative">
            {/* Rotating cyber ring */}
            <div
              className="absolute -inset-6 animate-cyber-ring pointer-events-none"
              style={{
                border: "2px solid transparent",
                borderTopColor: "hsl(var(--primary) / 0.8)",
                borderRightColor: "hsl(var(--primary) / 0.3)",
                borderRadius: "50%",
                filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))",
              }}
            />
            {/* Second ring — counter-rotate */}
            <div
              className="absolute -inset-10 pointer-events-none"
              style={{
                border: "1px solid transparent",
                borderBottomColor: "hsl(var(--accent) / 0.6)",
                borderLeftColor: "hsl(var(--accent) / 0.2)",
                borderRadius: "50%",
                animation: "cyber-ring-rotate 12s linear infinite reverse",
                filter: "drop-shadow(0 0 6px hsl(var(--accent) / 0.4))",
              }}
            />
            {/* Mon crest decorative corners */}
            <div className="absolute -inset-4 pointer-events-none">
              {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c, i) => (
                <div key={i} className={`absolute w-8 h-8 ${c}`} style={{ borderColor: "hsl(var(--primary) / 0.7)" }} />
              ))}
            </div>

            <div
              className="relative overflow-hidden animate-pulse-glow"
              style={{
                width: 280, height: 340,
                background: "linear-gradient(180deg, hsl(0 0% 8%), hsl(0 0% 4%))",
                clipPath: "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)",
              }}
            >
              <img src={profilePic} alt="cung-master Avatar" className="w-full h-full object-cover" style={{ filter: "contrast(1.1) saturate(0.85) brightness(0.9)" }} />
              <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ background: "linear-gradient(180deg, hsl(192 100% 60% / 0.2), transparent 40%, hsl(340 70% 60% / 0.15))" }} />
              {/* CRT scanline */}
              <div className="absolute inset-0 scanline opacity-40 pointer-events-none" />
              {/* Bottom HUD */}
              <div className="absolute bottom-0 inset-x-0 px-3 py-2 backdrop-blur-md" style={{ background: "hsl(0 0% 0% / 0.7)" }}>
                <p className="text-[10px] tracking-[0.3em] text-cyan-accent font-mono-ui">⚔ TOMBGUARD · LV.∞</p>
                <p className="text-xs text-silver tracking-widest">ENTITY : cung-master</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Boss intro text */}
        <div className="md:col-span-7 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Threat indicator */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono-ui text-[10px] tracking-[0.4em] text-red-400 uppercase">⚠ Boss Encounter · Threat Level: Ω</span>
            </div>
          </motion.div>

          <motion.h1
            className="font-display title-cinematic uppercase"
            style={{ fontSize: "clamp(36px, 5.5vw, 78px)", lineHeight: 0.95, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, x: 60 }}
            animate={mounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Forging<br />
            <span className="text-glow-cyan" style={{ color: "hsl(var(--primary))" }}>scalable</span> systems<br />
            beyond limits.
          </motion.h1>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <BossTypewriter />
          </motion.div>

          <motion.p
            className="mt-4 text-sm text-muted-foreground tracking-[0.15em] uppercase font-mono-ui"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            // hadoopcung@nexus :: status=active
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <a
              href="#projects"
              className="glitch-hover group relative px-7 py-3 text-sm tracking-[0.25em] uppercase font-mono-ui transition-all"
              style={{ color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.5)", background: "hsl(var(--primary) / 0.06)", clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
            >
              <span className="relative z-10">Enter Archive</span>
            </a>
            <a
              href="#contact"
              className="glitch-hover group relative px-7 py-3 text-sm tracking-[0.25em] uppercase font-mono-ui transition-all"
              style={{ color: "hsl(var(--accent))", border: "1px solid hsl(var(--accent) / 0.5)", background: "hsl(var(--accent) / 0.06)", clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
            >
              <span className="relative z-10">Send Signal</span>
            </a>
          </motion.div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow text-cyan-accent/70"
        style={{ zIndex: 10 }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};
