import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import profilePic from "@/assets/profile-picture.jpg";

const TIMELINE = [
  { year: "2024 → Present", role: "Senior Data Engineer", org: "Confidential" },
  { year: "2022 → 2024", role: "Data Engineer", org: "Tech Studio" },
  { year: "2020 → 2022", role: "Analytics Engineer", org: "Startup HQ" },
];

export const HunterProfile = () => {
  return (
    <section id="profile" className="relative py-24 px-6 bg-washi" style={{ zIndex: 4 }}>
      <div className="container mx-auto max-w-6xl">
        <SectionHeader chapter="04" title="Hunter Profile" jp="経歴" />

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8">
          {/* Left decorative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="manga-panel relative overflow-hidden speed-lines flex items-center justify-center"
            style={{ minHeight: 480 }}
          >
            <div
              className="font-display font-black text-stone"
              style={{
                fontSize: "clamp(5rem, 12vw, 10rem)",
                writingMode: "vertical-rl",
                letterSpacing: "0.4em",
                opacity: 0.25,
                lineHeight: 1,
              }}
            >
              C·U·N·G
            </div>

            <div
              className="absolute"
              style={{
                top: 24,
                left: 24,
                width: 88,
                height: 88,
                border: "2px solid #0A0A0A",
                boxShadow: "4px 4px 0 #8FEFFF",
                overflow: "hidden",
              }}
            >
              <img src={profilePic} alt="cung-master" loading="lazy" className="w-full h-full object-cover" style={{ filter: "grayscale(0.6) contrast(1.1)" }} />
            </div>

            <span className="absolute bottom-3 right-4 font-mono-ui text-[10px] text-stone tracking-[0.3em]">
              PAGE 01
            </span>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="manga-panel p-6 md:p-8"
          >
            <h3 className="font-display text-lg tracking-[0.15em] text-ink mb-2">
              HUNTER : CUNG-MASTER
            </h3>
            <div className="manga-rule mb-4" />

            <div className="font-mono-ui text-xs space-y-1 mb-6 text-ink">
              <div><span className="text-stone">STATUS    : </span>ACTIVE COMBAT</div>
              <div><span className="text-stone">LOCATION  : </span>Ho Chi Minh City, Vietnam</div>
              <div><span className="text-stone">SPECIALTY : </span>Data Engineering + AI Dev</div>
            </div>

            <p className="chapter-label mb-2">━━━━ BACKGROUND ━━━━</p>
            <div
              className="p-4 mb-6 font-jp text-sm leading-relaxed"
              style={{ background: "#0A0A0A", color: "#FAFAF8" }}
            >
              ┃ In a world drowning in raw data, one engineer rose from the
              command line to forge pipelines that bend petabytes to his will.
              By day he tames distributed systems; by night he chases trains
              through Japan and sketches mountains that never sleep.
            </div>

            <p className="chapter-label mb-3">━━━━ COMBAT LOG ━━━━</p>
            <div className="space-y-3 mb-6">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-cyan-accent mt-1">◉</span>
                  <div className="flex-1">
                    <p className="font-mono-ui text-xs text-stone">{t.year}</p>
                    <p className="font-display text-sm text-ink tracking-wide">
                      {t.role} <span className="text-stone">· {t.org}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="chapter-label mb-3">━━━━ CLEARANCE ━━━━</p>
            <div className="flex flex-wrap gap-2">
              {["GitHub", "LinkedIn", "Resume"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="font-display text-[10px] tracking-[0.2em] px-4 py-2"
                  style={{ border: "1px solid #0A0A0A", color: "#0A0A0A" }}
                >
                  [ {l.toUpperCase()} ]
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
