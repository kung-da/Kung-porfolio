import { SectionHeader } from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Database, Sparkles, GitBranch, BarChart3, Swords, Shield, Brain, Zap } from "lucide-react";
import profilePic from "@/assets/profile-picture.jpg";

const STATS = [
  { label: "STR", value: "3+", desc: "Years Exp", color: "hsl(var(--primary))" },
  { label: "INT", value: "12", desc: "Projects", color: "hsl(var(--accent))" },
  { label: "WIS", value: "8", desc: "Countries", color: "hsl(0 0% 70%)" },
];

const STAGES = [
  { label: "Raw Data", Icon: Database, jp: "原" },
  { label: "Clean", Icon: Sparkles, jp: "浄" },
  { label: "Transform", Icon: GitBranch, jp: "変" },
  { label: "Insight", Icon: BarChart3, jp: "悟" },
];

const slideIn = (dir: "left" | "right", delay = 0) => ({
  initial: { opacity: 0, x: dir === "left" ? -60 : 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut", delay },
});

export const About = () => {
  return (
    <section id="about" className="relative py-[120px] px-6" style={{ zIndex: 5 }}>
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="02 / DOSSIER"
          title="Entity Profile"
          subtitle={<span className="font-jp">墓守</span>}
        />

        <div className="grid md:grid-cols-2 gap-[60px] items-start">
          {/* LEFT — Character Dossier */}
          <motion.div {...slideIn("left")} className="crt-overlay">
            <div className="chamfered-panel p-6 md:p-8">
              {/* Avatar row */}
              <div className="flex items-center gap-5 mb-6">
                <div className="relative shrink-0">
                  <div
                    className="w-20 h-20 overflow-hidden"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)" }}
                  >
                    <img src={profilePic} alt="cung-master" className="w-full h-full object-cover" style={{ filter: "contrast(1.1) saturate(0.8)" }} />
                  </div>
                  <div className="absolute -inset-1 pointer-events-none" style={{ border: "1px solid hsl(var(--primary) / 0.4)", clipPath: "polygon(0 0, 100% 0, 100% 80%, 80% 100%, 0 100%)" }} />
                </div>
                <div>
                  <h3 className="text-xl font-display text-foreground tracking-wider">CUNG-MASTER</h3>
                  <p className="text-[10px] font-mono-ui text-cyan-accent tracking-[0.3em] mt-1">DATA ENGINEER · TOMBGUARD</p>
                  <p className="text-[10px] font-mono-ui text-muted-foreground tracking-[0.2em] mt-0.5">// CLASS: WANDERER</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6" style={{ textShadow: "0 0 30px hsl(var(--primary) / 0.1)" }}>
                I build resilient data pipelines that move millions of rows quietly in the background.
                Off the clock, I'm chasing trains through the Japanese countryside, sketching
                mountains, and arguing about the best anime arc. Data is my craft —
                wandering is my fuel.
              </p>

              {/* RPG Stats */}
              <div className="grid grid-cols-3 gap-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="text-center p-3"
                    style={{ background: "hsl(0 0% 100% / 0.03)", border: `1px solid ${s.color}30` }}
                  >
                    <div className="text-[10px] font-mono-ui tracking-[0.3em] text-muted-foreground mb-1">{s.label}</div>
                    <div className="text-2xl font-display font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{s.desc}</div>
                  </div>
                ))}
              </div>

              {/* Terminal log */}
              <div className="mt-5 p-3 font-mono-ui text-[10px] text-muted-foreground" style={{ background: "hsl(0 0% 0% / 0.4)", border: "1px solid hsl(0 0% 100% / 0.05)" }}>
                <span className="text-cyan-accent">cung-master@nexus</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-sakura">~</span>
                <span className="text-muted-foreground">$ cat status.log</span>
                <br />
                <span className="text-muted-foreground/70">[OK] All systems operational — HP: ∞ / MP: ∞</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Combat Techniques (pipeline) */}
          <motion.div {...slideIn("right", 0.2)}>
            <div className="mb-6">
              <p className="text-[10px] font-mono-ui tracking-[0.4em] text-cyan-accent mb-2 flex items-center gap-2">
                <Swords size={12} /> COMBAT TECHNIQUES
              </p>
              <p className="text-sm text-muted-foreground">The path of data transformation — four sacred stages.</p>
            </div>

            <div className="space-y-4">
              {STAGES.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="group flex items-center gap-4"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                >
                  {/* Stage number */}
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center font-jp text-lg text-sakura/70" style={{ background: "hsl(var(--accent) / 0.06)", border: "1px solid hsl(var(--accent) / 0.2)" }}>
                    {s.jp}
                  </div>

                  {/* Stage card */}
                  <div
                    className="flex-1 p-4 transition-all duration-300 group-hover:-translate-y-0.5"
                    style={{ background: "hsl(0 0% 6% / 0.6)", border: "1px solid hsl(var(--primary) / 0.15)", backdropFilter: "blur(8px)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "hsl(192 100% 60% / 0.5)"; e.currentTarget.style.boxShadow = "0 0 20px hsl(192 100% 60% / 0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "hsl(192 100% 60% / 0.15)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="flex items-center gap-3">
                      <s.Icon size={16} className="text-cyan-accent" />
                      <span className="text-sm font-display tracking-wider text-foreground">{s.label}</span>
                      <span className="text-[10px] font-mono-ui text-muted-foreground ml-auto">PHASE_{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>

                  {/* Connector */}
                  {i < STAGES.length - 1 && (
                    <div className="absolute left-[19px] mt-14 w-px h-4 bg-gradient-to-b from-cyan-accent/30 to-transparent" style={{ marginLeft: 0 }} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Traits */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { Icon: Shield, label: "Pipeline Armor", desc: "Fault-tolerant ETL" },
                { Icon: Brain, label: "AI Synapse", desc: "ML & Deep Learning" },
                { Icon: Zap, label: "Stream Strike", desc: "Real-time processing" },
                { Icon: Swords, label: "Query Blade", desc: "SQL mastery" },
              ].map((t, i) => (
                <motion.div
                  key={t.label}
                  className="p-3 flex items-center gap-3"
                  style={{ background: "hsl(0 0% 100% / 0.02)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <t.Icon size={14} className="text-cyan-accent shrink-0" />
                  <div>
                    <p className="text-xs font-display tracking-wider text-foreground">{t.label}</p>
                    <p className="text-[10px] text-muted-foreground">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
