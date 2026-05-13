import { motion } from "framer-motion";

const MODULES = [
  {
    name: "DATA PIPELINE",
    code: "MOD_01",
    color: "#00F5FF",
    skills: ["Python", "Spark", "Airflow", "dbt", "Kafka", "PostgreSQL"],
    pwr: 92,
    desc: "Real-time ingestion and transformation at scale. Sub-second latency across distributed systems.",
    clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 16px)",
  },
  {
    name: "AI SYSTEMS",
    code: "MOD_02",
    color: "#FF003C",
    skills: ["LangChain", "OpenAI", "Hugging Face", "RAG", "Pinecone"],
    pwr: 85,
    desc: "Neural weapon systems. RAG architectures and LLM integration for autonomous intelligence.",
    clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
  },
  {
    name: "INFRASTRUCTURE",
    code: "MOD_03",
    color: "#FCEE0A",
    skills: ["Docker", "K8s", "Terraform", "AWS", "CI/CD"],
    pwr: 88,
    desc: "Hardened deployment architecture. Zero-downtime containers and infrastructure-as-code mastery.",
    clipPath: "polygon(24px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 24px)",
  },
  {
    name: "FRONTEND MODULES",
    code: "MOD_04",
    color: "#00FF88",
    skills: ["React", "TypeScript", "Tailwind", "Next.js", "Framer Motion"],
    pwr: 95,
    desc: "Precision interface weaponry. High-performance UIs with aggressive motion systems.",
    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 16px 100%, 0 calc(100% - 16px))",
  },
];

/* Hard impact spring */
const slamIn = {
  hidden: { opacity: 0, y: -25, scale: 1.08 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 12 },
  },
};

export const AbilitySection = () => {
  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* BG Effects */}
      <div className="absolute inset-0 crt-scanlines opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 hud-grid pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          variants={slamIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-xs text-crimson mb-2 tracking-widest uppercase">
            // ARMOR MODULES
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-crimson to-transparent mb-6" />
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase leading-tight">
            Active <span className="text-wez-cyan">Armor</span> Systems
          </h2>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {MODULES.map((mod, i) => (
            <motion.div
              key={mod.code}
              initial={{ opacity: 0, y: 40, rotateX: -5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 300, damping: 15 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="relative bg-background/40 backdrop-blur-sm border border-border/60 p-6 md:p-7 group overflow-hidden transition-shadow hover:shadow-card-hover"
            >
              {/* Top accent bar with color */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: mod.color }}
              />

              {/* Header */}
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div>
                  <span className="font-mono text-xs text-muted-foreground tracking-widest block mb-2 uppercase">
                    {mod.code}
                  </span>
                  <h3
                    className="font-display text-lg md:text-xl font-bold tracking-wide uppercase"
                    style={{ color: mod.color }}
                  >
                    {mod.name}
                  </h3>
                </div>
                <span
                  className="font-mono text-xs px-2.5 py-1 border tracking-widest"
                  style={{ borderColor: `${mod.color}88`, color: mod.color }}
                >
                  ONLINE
                </span>
              </div>

              {/* Description */}
              <p className="font-mono text-sm text-foreground/70 leading-relaxed mb-6 relative z-10">
                {mod.desc}
              </p>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {mod.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-2.5 py-1 border"
                    style={{
                      borderColor: `${mod.color}66`,
                      color: mod.color,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Power Bar */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="flex-1 h-1 bg-border/50 overflow-hidden rounded-full">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: mod.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${mod.pwr}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
                  />
                </div>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {mod.pwr}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
