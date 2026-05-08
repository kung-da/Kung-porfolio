import { motion } from "framer-motion";

interface Cat {
  glyph: string;
  name: string;
  skills: string[];
  level: number;
  status: "MASTERED" | "PROFICIENT" | "TRAINING";
  color: string;
}

const CATEGORIES: Cat[] = [
  {
    glyph: "⚔",
    name: "DATA ENGINEERING",
    skills: ["Python", "Spark", "Airflow", "dbt", "Kafka", "PostgreSQL", "BigQuery"],
    level: 92,
    status: "MASTERED",
    color: "#C8102E"
  },
  {
    glyph: "◈",
    name: "AI / ML",
    skills: ["LangChain", "OpenAI API", "Hugging Face", "RAG", "Vector DBs", "Prompts"],
    level: 84,
    status: "PROFICIENT",
    color: "#00f5ff"
  },
  {
    glyph: "▣",
    name: "INFRASTRUCTURE",
    skills: ["Docker", "K8s", "Terraform", "AWS", "GCP", "CI/CD", "Supabase"],
    level: 78,
    status: "PROFICIENT",
    color: "#888888"
  },
  {
    glyph: "⌬",
    name: "FRONTEND",
    skills: ["React", "TypeScript", "Tailwind", "Vite", "Next.js", "Framer Motion"],
    level: 80,
    status: "PROFICIENT",
    color: "#00f5ff"
  },
  {
    glyph: "⟁",
    name: "DATABASES",
    skills: ["PostgreSQL", "Redis", "ClickHouse", "Pinecone", "Weaviate"],
    level: 75,
    status: "PROFICIENT",
    color: "#C8102E"
  },
  {
    glyph: "✦",
    name: "TOOLS",
    skills: ["Git", "Notion", "Linear", "Postman", "Grafana", "Metabase"],
    level: 88,
    status: "MASTERED",
    color: "#D4AF37"
  },
];

export const AbilitySection = () => {
  return (
    <section id="abilities" className="relative py-24 px-6 bg-[#0A0A0A] overflow-hidden" style={{ zIndex: 4 }}>
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8102E] rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00f5ff] rounded-full mix-blend-screen filter blur-[100px] opacity-10 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#C8102E] uppercase mb-2">
            // COMBAT CAPABILITIES
          </p>
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-widest text-[#E0E0E0] drop-shadow-[0_0_8px_rgba(200,16,46,0.3)]">
            Arsenal of the <span className="text-[#C8102E]">Tombguard</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-[#050505] border border-[#333333] p-6 relative group transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = c.color;
                e.currentTarget.style.boxShadow = `0 10px 30px -10px ${c.color}60`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#333333";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#888888] group-hover:border-white transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#888888] group-hover:border-white transition-colors" />

              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-2xl" style={{ color: c.color, textShadow: `0 0 10px ${c.color}80` }}>{c.glyph}</span>
                <h3 className="font-display text-sm tracking-[0.2em] text-[#E0E0E0]">{c.name}</h3>
              </div>
              <div className="w-full h-[1px] bg-gradient-to-r from-[#333333] to-transparent mb-4" />
              
              <p className="font-mono text-[11px] text-[#888888] leading-relaxed mb-6 uppercase tracking-wider h-16">
                {c.skills.join(" · ")}
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div className="flex-1 h-[2px] bg-[#1A1A1A] relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full"
                    style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2 + i * 0.05 }}
                  />
                </div>
                <span
                  className="font-mono text-[9px] tracking-[0.2em] px-2 py-1 uppercase"
                  style={{
                    color: c.status === "MASTERED" ? "#050505" : c.color,
                    background: c.status === "MASTERED" ? c.color : "transparent",
                    border: `1px solid ${c.color}`,
                  }}
                >
                  {c.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
