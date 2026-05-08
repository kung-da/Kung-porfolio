import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

interface Cat {
  glyph: string;
  name: string;
  skills: string[];
  level: number;
  status: "MASTERED" | "PROFICIENT" | "TRAINING";
}

const CATEGORIES: Cat[] = [
  {
    glyph: "⚙",
    name: "DATA ENGINEERING",
    skills: ["Python", "Spark", "Airflow", "dbt", "Kafka", "PostgreSQL", "BigQuery"],
    level: 92,
    status: "MASTERED",
  },
  {
    glyph: "◈",
    name: "AI / ML",
    skills: ["LangChain", "OpenAI API", "Hugging Face", "RAG", "Vector DBs", "Prompts"],
    level: 84,
    status: "PROFICIENT",
  },
  {
    glyph: "▣",
    name: "INFRASTRUCTURE",
    skills: ["Docker", "K8s", "Terraform", "AWS", "GCP", "CI/CD", "Supabase"],
    level: 78,
    status: "PROFICIENT",
  },
  {
    glyph: "⌬",
    name: "FRONTEND",
    skills: ["React", "TypeScript", "Tailwind", "Vite", "Next.js", "Framer Motion"],
    level: 80,
    status: "PROFICIENT",
  },
  {
    glyph: "⟁",
    name: "DATABASES",
    skills: ["PostgreSQL", "Redis", "ClickHouse", "Pinecone", "Weaviate"],
    level: 75,
    status: "PROFICIENT",
  },
  {
    glyph: "✦",
    name: "TOOLS",
    skills: ["Git", "Notion", "Linear", "Postman", "Grafana", "Metabase"],
    level: 88,
    status: "MASTERED",
  },
];

const STATUS_COLOR: Record<Cat["status"], string> = {
  MASTERED: "#8FEFFF",
  PROFICIENT: "#0A0A0A",
  TRAINING: "#888888",
};

export const AbilitySection = () => {
  return (
    <section id="abilities" className="relative py-24 px-6 bg-washi" style={{ zIndex: 4 }}>
      <div className="container mx-auto max-w-6xl">
        <SectionHeader chapter="02" title="System Abilities" jp="能力" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="manga-panel p-5 transition-all"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "8px 8px 0 #0A0A0A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0,0)";
                e.currentTarget.style.boxShadow = "6px 6px 0 #0A0A0A";
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-display text-2xl text-ink">{c.glyph}</span>
                <h3 className="font-display text-xs tracking-[0.2em] text-ink">{c.name}</h3>
              </div>
              <div className="manga-rule mb-3" />
              <p className="font-mono-ui text-xs text-stone leading-relaxed mb-5">
                {c.skills.join(" · ")}
              </p>

              <p className="chapter-label mb-2">PROFICIENCY</p>
              <div className="flex items-center gap-3">
                <div className="skill-bar-track flex-1">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2 + i * 0.05 }}
                  />
                </div>
                <span
                  className="font-display text-[10px] tracking-[0.15em] px-2 py-0.5"
                  style={{
                    color: c.status === "MASTERED" ? "#0A0A0A" : "#FAFAF8",
                    background: c.status === "MASTERED" ? "#8FEFFF" : "#0A0A0A",
                    border: `1px solid ${STATUS_COLOR[c.status]}`,
                  }}
                >
                  [{c.status}]
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
