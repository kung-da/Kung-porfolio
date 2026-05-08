import { motion } from "framer-motion";
import wazaemonImg from "@/assets/wazaemon.png";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center px-6 md:px-12 lg:px-20"
      style={{ paddingTop: 120, paddingBottom: 80 }}
    >
      {/* Wezaemon fixed background */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          backgroundImage: `url(${wazaemonImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.85,
          filter: "sepia(15%) contrast(110%)",
          willChange: "transform",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background:
            "linear-gradient(to right, rgba(250,250,248,0.94) 0%, rgba(250,250,248,0.55) 35%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container mx-auto max-w-6xl relative" style={{ zIndex: 1 }}>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT — boss encounter card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="manga-panel p-6 md:p-8 relative speed-lines"
          >
            <p className="text-sm md:text-base font-mono uppercase tracking-widest text-[#888888] mb-2">[ BOSS ENCOUNTER ]</p>
            <div className="manga-rule mb-5" />

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#0A0A0A] leading-none mb-2">
              <motion.span
                whileHover={{}}
                className="inline-block glitch-hover hollow-text"
                data-text="CUNG"
              >
                CUNG
              </motion.span>
              <br />
              <span className="text-[#0A0A0A]">
                MASTER
              </span>
            </h1>

            <div className="manga-rule my-5" />

            <p className="font-jp italic text-stone text-base md:text-lg mb-6">
              「 Forging systems beyond mortal limits 」
            </p>

            <div
              className="font-mono-ui text-xs space-y-1 p-4"
              style={{ background: "#0A0A0A", color: "#8FEFFF" }}
            >
              <div>
                <span style={{ opacity: 0.6 }}>STATUS </span>:{" "}
                <span className="animate-blink">●</span> ACTIVE
              </div>
              <div>
                <span style={{ opacity: 0.6 }}>CLASS  </span>: Data Engineer
              </div>
              <div>
                <span style={{ opacity: 0.6 }}>SPEC   </span>: AI Developer
              </div>
              <div>
                <span style={{ opacity: 0.6 }}>RANK   </span>: System Builder
              </div>
            </div>
          </motion.div>

          {/* RIGHT — boss stat panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="manga-panel p-6 md:p-7"
            style={{ background: "rgba(250,250,248,0.95)" }}
          >
            <div className="font-display text-xs tracking-[0.25em] mb-3 text-ink">
              ▓ WEZAEMON · TOMBGUARD
            </div>
            <div className="manga-rule mb-4" />

            <div className="font-mono-ui text-sm leading-relaxed space-y-1.5 mb-6">
              <Row k="TYPE" v="Cyber-Undead / Boss" />
              <Row k="WEAKNESS" v="None detected" />
              <Row k="ELEMENT" v="Void + Technology" />
              <div className="flex justify-between">
                <span className="text-stone">THREAT</span>
                <span className="text-ink">
                  ██████████ <strong>S-TIER</strong>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  document.getElementById("raids")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-[#0A0A0A] text-[#FAFAF8] px-8 py-4 uppercase font-mono tracking-[0.2em] text-sm border border-[#0A0A0A] relative overflow-hidden transition-all duration-300 rounded-none hover:shadow-[0_0_20px_rgba(143,239,255,0.4)] hover:border-[#8FEFFF] hover:text-[#8FEFFF]"
              >
                [ BEGIN RAID ]
              </button>
              <button
                onClick={() =>
                  document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-transparent text-[#0A0A0A] border border-[#0A0A0A]/30 px-4 py-2 uppercase font-mono text-xs tracking-wider rounded-none hover:bg-[#0A0A0A] hover:text-[#FAFAF8] transition-colors duration-200 flex items-center justify-center"
              >
                [ VIEW PROFILE ]
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="text-center mt-16 font-mono-ui text-xs tracking-[0.4em]"
          style={{ color: "#0A0A0A" }}
        >
          ▾ SCROLL TO PROCEED ▾
        </motion.div>
      </div>
    </section>
  );
};

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-stone">{k}</span>
    <span className="text-ink">{v}</span>
  </div>
);
