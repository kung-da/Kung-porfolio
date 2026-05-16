// ─────────────────────────────────────────────────────────────────────────────
// SKILLS · "ARSENAL" — Weapon Loadout Interface
// Typography: improved for readability on dark bg
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Domain data ───────────────────────────────────────────────────────────────
const DOMAINS = [
  {
    id: "pipeline", label: "DATA ENGINEERING", icon: "⌬",
    skills: [
      { name: "Apache Spark",   lvl: 90, notes: "Used in 3 production pipelines, processing 10M+ events/day.", related: ["PySpark", "Databricks"] },
      { name: "Apache Airflow", lvl: 88, notes: "Orchestration for complex DAG-based ETL pipelines.", related: ["Luigi", "Prefect"] },
      { name: "dbt",            lvl: 85, notes: "Analytics engineering for transformation layers.", related: ["SQL", "BigQuery"] },
      { name: "Kafka",          lvl: 82, notes: "Real-time streaming at scale, millions of events/sec.", related: ["Flink", "Kinesis"] },
      { name: "PostgreSQL",     lvl: 87, notes: "Battle-hardened relational DB for production workloads.", related: ["TimescaleDB", "pgvector"] },
      { name: "Python",         lvl: 95, notes: "Primary weapon. Data pipelines, automation, APIs.", related: ["Polars", "NumPy"] },
    ],
  },
  {
    id: "ai", label: "AI / LLM", icon: "◈",
    skills: [
      { name: "LangChain",    lvl: 85, notes: "LLM orchestration for RAG and agent systems.", related: ["LangGraph", "LlamaIndex"] },
      { name: "OpenAI API",   lvl: 90, notes: "GPT-4/o integrations across multiple production systems.", related: ["Anthropic", "Gemini"] },
      { name: "RAG Systems",  lvl: 83, notes: "Retrieval-augmented generation for enterprise knowledge bases.", related: ["Pinecone", "pgvector"] },
      { name: "Hugging Face", lvl: 78, notes: "Fine-tuning and inference for open-source LLMs.", related: ["PEFT", "LoRA"] },
      { name: "Vector DBs",   lvl: 81, notes: "Semantic search and embedding storage at scale.", related: ["Pinecone", "Weaviate"] },
    ],
  },
  {
    id: "backend", label: "BACKEND SYSTEMS", icon: "⚙",
    skills: [
      { name: "FastAPI",  lvl: 90, notes: "High-performance async APIs for ML and data services.", related: ["Pydantic", "Uvicorn"] },
      { name: "Django",   lvl: 82, notes: "Full-featured backend for complex web applications.", related: ["DRF", "Celery"] },
      { name: "Go",       lvl: 65, notes: "Systems programming for high-throughput services.", related: ["Gin", "gRPC"] },
      { name: "Redis",    lvl: 85, notes: "Caching layer, session store, pub/sub messaging.", related: ["Valkey", "DragonflyDB"] },
      { name: "gRPC",     lvl: 72, notes: "Inter-service communication for microservice meshes.", related: ["Protobuf", "tRPC"] },
    ],
  },
  {
    id: "cloud", label: "CLOUD & INFRA", icon: "☁",
    skills: [
      { name: "AWS",        lvl: 85, notes: "EC2, S3, Lambda, RDS, ECS — full production deployments.", related: ["GCP", "Azure"] },
      { name: "Docker",     lvl: 92, notes: "Containerization for all deployment environments.", related: ["Podman", "Buildah"] },
      { name: "Kubernetes", lvl: 78, notes: "Container orchestration for auto-scaling workloads.", related: ["Helm", "ArgoCD"] },
      { name: "Terraform",  lvl: 80, notes: "Infrastructure as code for repeatable deployments.", related: ["Pulumi", "CDK"] },
      { name: "CI/CD",      lvl: 87, notes: "GitHub Actions, GitLab CI — automated pipelines.", related: ["ArgoCD", "Tekton"] },
    ],
  },
  {
    id: "frontend", label: "FRONTEND CRAFT", icon: "⬡",
    skills: [
      { name: "React",         lvl: 93, notes: "Primary frontend weapon. Complex state, performance.", related: ["Next.js", "Remix"] },
      { name: "TypeScript",    lvl: 90, notes: "Type-safe development across all frontend projects.", related: ["Zod", "ts-pattern"] },
      { name: "Framer Motion", lvl: 88, notes: "Animation system for cinematic UI experiences.", related: ["GSAP", "Motion"] },
      { name: "TailwindCSS",   lvl: 92, notes: "Utility-first styling with custom design systems.", related: ["UnoCSS", "StyleX"] },
    ],
  },
  {
    id: "tools", label: "WORKFLOW & TOOLS", icon: "⊕",
    skills: [
      { name: "Git / GitHub", lvl: 95, notes: "Version control, PR reviews, GitHub Actions.", related: ["GitLab", "Bitbucket"] },
      { name: "Notion",       lvl: 88, notes: "Project management and documentation system.", related: ["Linear", "Jira"] },
      { name: "Linux / Bash", lvl: 85, notes: "System administration, shell scripting, automation.", related: ["Zsh", "Fish"] },
      { name: "DataBricks",   lvl: 80, notes: "Unified analytics platform for large-scale data.", related: ["Spark", "Delta Lake"] },
    ],
  },
] as const;

type DomainId = typeof DOMAINS[number]["id"];
type Skill = typeof DOMAINS[number]["skills"][number];

// ── Proficiency bar ──────────────────────────────────────────────────────────
const ProficiencyBar = ({ lvl, active }: { lvl: number; active: boolean }) => {
  const blocks = 10;
  const filled = Math.round((lvl / 100) * blocks);
  return (
    <div className="flex gap-[3px] items-end">
      {Array.from({ length: blocks }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={active ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ delay: i * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 7, height: i < filled ? 16 : 9,
            background: i < filled
              ? (i >= blocks * 0.8 ? "#e74c3c" : i >= blocks * 0.6 ? "#c0392b" : "#8b0000")
              : "rgba(139,0,0,0.12)",
            transformOrigin: "bottom",
            boxShadow: i < filled ? "0 0 4px rgba(139,0,0,0.5)" : "none",
          }}
        />
      ))}
      <span className="font-mono text-xs text-enrage ml-2 tabular-nums font-semibold">{lvl}</span>
    </div>
  );
};

// ── Skill card ──────────────────────────────────────────────────────────────
const SkillCard = ({ skill, index, isSelected, onSelect }: { skill: Skill; index: number; isSelected: boolean; onSelect: () => void }) => (
  <motion.div
    custom={index}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1, transition: { delay: index * 0.06, type: "spring", stiffness: 320, damping: 18 } }}
    exit={{ opacity: 0, scale: 0.8 }}
    onClick={onSelect}
    role="button"
    tabIndex={0}
    aria-label={`Select ${skill.name}`}
    onKeyDown={(e) => e.key === "Enter" && onSelect()}
    className={`p-4 border transition-all duration-200 relative overflow-hidden ${
      isSelected
        ? "border-wez-cyan/50 bg-wez-cyan/[0.07] shadow-[0_0_20px_rgba(143,239,255,0.12)]"
        : "border-[rgba(143,239,255,0.12)] bg-[rgba(10,10,18,0.7)] shadow-[inset_0_1px_0_rgba(143,239,255,0.04),0_2px_8px_rgba(0,0,0,0.3)] hover:border-wez-cyan/35 hover:bg-[rgba(10,10,18,0.85)] hover:shadow-[0_0_20px_rgba(143,239,255,0.1),inset_0_1px_0_rgba(143,239,255,0.06)]"
    }`}
    style={{ cursor: "pointer" }}
  >
    {isSelected && (
      <motion.div layoutId="selected-skill" className="absolute top-0 left-0 right-0 h-px bg-wez-cyan" />
    )}
    <div className={`font-mono text-sm mb-2 tracking-wide ${isSelected ? "text-wez-cyan font-semibold" : "text-foreground"}`}>
      {skill.name}
    </div>
    <ProficiencyBar lvl={skill.lvl} active={true} />
  </motion.div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
export const AbilitySection = () => {
  const [activeDomain, setActiveDomain] = useState<DomainId>("pipeline");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const ref = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-10%" as any });
  const currentDomain = DOMAINS.find((d) => d.id === activeDomain)!;

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[#050508] overflow-hidden"
    >
      <div className="absolute inset-0 crt-scanlines opacity-[0.025] pointer-events-none" />
      <div className="absolute inset-0 hud-grid pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-xs text-crimson mb-2 tracking-widest uppercase">
            // 02 — ARSENAL
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-crimson to-transparent mb-6" />
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase leading-tight">
            Active <span className="text-wez-cyan">Armor</span> Systems
          </h2>

          <div className="mt-4 font-mono text-xs tracking-[0.18em] text-wez-cyan/60 flex items-center gap-4 flex-wrap">
            <span>── ARSENAL SCAN ──</span>
            <span className="text-crimson/60">SYS: LOADING COMBAT MODULES...</span>
            <div className="flex gap-[2px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={inView ? { background: ["rgba(139,0,0,0.15)", "#8b0000", "rgba(139,0,0,0.15)"] } : {}}
                  transition={{ duration: 0.8, delay: i * 0.08, repeat: Infinity }}
                  style={{ width: 8, height: 8, background: i < 9 ? "#8b0000" : "rgba(139,0,0,0.15)" }}
                />
              ))}
            </div>
            <span className="text-crimson font-semibold">94%</span>
          </div>
        </motion.div>

        {/* ── Three-panel layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_280px] gap-5 items-start">
          {/* LEFT — Domain list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="hidden md:flex flex-col gap-1"
          >
            {DOMAINS.map((d) => {
              const isActive = activeDomain === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => { setActiveDomain(d.id); setSelectedSkill(null); }}
                  className={`flex items-center gap-3 px-4 py-3 text-left font-mono text-xs tracking-[0.15em] uppercase transition-all duration-150 border-l-2 ${
                    isActive
                      ? "border-l-crimson bg-crimson/[0.06] text-enrage font-semibold"
                      : "border-l-transparent text-foreground/50 hover:text-foreground/80 hover:bg-white/[0.02]"
                  }`}
                >
                  <span className={`text-base ${isActive ? "text-crimson" : "text-crimson/40"}`}>{d.icon}</span>
                  {d.label}
                </button>
              );
            })}
          </motion.div>

          {/* CENTER — Skill grid */}
          <div>
            {/* Mobile domain tabs */}
            <div className="flex md:hidden overflow-x-auto gap-2 mb-6 pb-2" style={{ scrollbarWidth: "none" }}>
              {DOMAINS.map((d) => {
                const isActive = activeDomain === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => { setActiveDomain(d.id); setSelectedSkill(null); }}
                    className={`flex-shrink-0 px-3 py-1.5 font-mono text-xs tracking-wider uppercase border transition-colors ${
                      isActive ? "border-crimson text-enrage bg-crimson/10" : "border-border/40 text-muted-foreground"
                    }`}
                  >
                    {d.icon} {d.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeDomain}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {currentDomain.skills.map((skill, i) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={i}
                    isSelected={selectedSkill?.name === skill.name}
                    onSelect={() => setSelectedSkill(selectedSkill?.name === skill.name ? null : skill)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — Intelligence report */}
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="border border-crimson/40 bg-[rgba(10,10,18,0.75)] backdrop-blur-sm p-5 relative overflow-hidden hidden md:block shadow-[inset_0_1px_0_rgba(139,0,0,0.1),0_4px_16px_rgba(0,0,0,0.3)]"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-crimson via-enrage to-transparent" />

                <p className="font-mono text-xs text-wez-cyan/60 tracking-[0.2em] mb-5 uppercase">── WEAPON INTEL ──</p>

                <div className="space-y-4">
                  <div>
                    <p className="font-mono text-xs text-crimson/70 tracking-[0.18em] uppercase mb-1">WEAPON:</p>
                    <p className="font-display text-base text-enrage tracking-wide font-bold">{selectedSkill.name}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-crimson/70 tracking-[0.18em] uppercase mb-1">CLASS:</p>
                    <p className="font-mono text-sm text-foreground/80">{currentDomain.label}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-crimson/70 tracking-[0.18em] uppercase mb-2">PROFICIENCY:</p>
                    <ProficiencyBar lvl={selectedSkill.lvl} active={true} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-crimson/70 tracking-[0.18em] uppercase mb-2">FIELD NOTES:</p>
                    <p className="font-mono text-sm text-foreground/75 leading-relaxed">{selectedSkill.notes}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-crimson/70 tracking-[0.18em] uppercase mb-2">RELATED:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.related.map((r) => (
                        <span key={r} className="font-mono text-xs border border-wez-cyan/25 text-wez-cyan/65 px-2.5 py-1">{r}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="border border-[rgba(143,239,255,0.08)] bg-[rgba(10,10,18,0.5)] h-[200px] hidden md:flex items-center justify-center"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-crimson/40 uppercase">SELECT A WEAPON</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
