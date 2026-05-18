// Skills section
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Color themes per domain ──────────────────────────────────────────────────
const DOMAIN_COLORS = {
  pipeline: {
    accent: "#00F5FF",      // Neon cyan
    accentDim: "#00F5FF",
    glow: "rgba(0,245,255,0.5)",
    glowSoft: "rgba(0,245,255,0.12)",
    border: "rgba(0,245,255,0.35)",
    borderActive: "rgba(0,245,255,0.55)",
    barFull: "#00D4E0",
    barMid: "#00A8B5",
    barBase: "#007A85",
    barEmpty: "rgba(0,245,255,0.10)",
    barGlow: "rgba(0,245,255,0.45)",
    bg: "rgba(0,245,255,0.05)",
    bgActive: "rgba(0,245,255,0.08)",
    textAccent: "#00F5FF",
  },
  ai: {
    accent: "#A855F7",      // Electric purple
    accentDim: "#A855F7",
    glow: "rgba(168,85,247,0.5)",
    glowSoft: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.35)",
    borderActive: "rgba(168,85,247,0.55)",
    barFull: "#A855F7",
    barMid: "#8B3DD4",
    barBase: "#6D28B0",
    barEmpty: "rgba(168,85,247,0.10)",
    barGlow: "rgba(168,85,247,0.45)",
    bg: "rgba(168,85,247,0.05)",
    bgActive: "rgba(168,85,247,0.08)",
    textAccent: "#C084FC",
  },
  backend: {
    accent: "#F97316",      // Ember orange
    accentDim: "#F97316",
    glow: "rgba(249,115,22,0.5)",
    glowSoft: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.35)",
    borderActive: "rgba(249,115,22,0.55)",
    barFull: "#F97316",
    barMid: "#D4600E",
    barBase: "#A84D0B",
    barEmpty: "rgba(249,115,22,0.10)",
    barGlow: "rgba(249,115,22,0.45)",
    bg: "rgba(249,115,22,0.05)",
    bgActive: "rgba(249,115,22,0.08)",
    textAccent: "#FB923C",
  },
  cloud: {
    accent: "#EF4444",      // Crimson red
    accentDim: "#EF4444",
    glow: "rgba(239,68,68,0.5)",
    glowSoft: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.35)",
    borderActive: "rgba(239,68,68,0.55)",
    barFull: "#EF4444",
    barMid: "#C93030",
    barBase: "#991B1B",
    barEmpty: "rgba(239,68,68,0.10)",
    barGlow: "rgba(239,68,68,0.45)",
    bg: "rgba(239,68,68,0.05)",
    bgActive: "rgba(239,68,68,0.08)",
    textAccent: "#F87171",
  },
  frontend: {
    accent: "#22D3EE",      // Sky cyan
    accentDim: "#22D3EE",
    glow: "rgba(34,211,238,0.5)",
    glowSoft: "rgba(34,211,238,0.12)",
    border: "rgba(34,211,238,0.35)",
    borderActive: "rgba(34,211,238,0.55)",
    barFull: "#22D3EE",
    barMid: "#0EA5C0",
    barBase: "#0B7A8F",
    barEmpty: "rgba(34,211,238,0.10)",
    barGlow: "rgba(34,211,238,0.45)",
    bg: "rgba(34,211,238,0.05)",
    bgActive: "rgba(34,211,238,0.08)",
    textAccent: "#67E8F9",
  },
  tools: {
    accent: "#10B981",      // Emerald green
    accentDim: "#10B981",
    glow: "rgba(16,185,129,0.5)",
    glowSoft: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.35)",
    borderActive: "rgba(16,185,129,0.55)",
    barFull: "#10B981",
    barMid: "#0D9668",
    barBase: "#087050",
    barEmpty: "rgba(16,185,129,0.10)",
    barGlow: "rgba(16,185,129,0.45)",
    bg: "rgba(16,185,129,0.05)",
    bgActive: "rgba(16,185,129,0.08)",
    textAccent: "#34D399",
  },
} as const;

type ColorTheme = typeof DOMAIN_COLORS[keyof typeof DOMAIN_COLORS];

// ── Domain data ───────────────────────────────────────────────────────────────
const DOMAINS = [
  {
    id: "pipeline", label: "DATA ENGINEERING", icon: "⌬",
    skills: [
      { name: "Apache Spark", lvl: 90, notes: "Used in 3 production pipelines, processing 10M+ events/day.", related: ["PySpark", "Databricks"] },
      { name: "Apache Airflow", lvl: 88, notes: "Orchestration for complex DAG-based ETL pipelines.", related: ["Luigi", "Prefect"] },
      { name: "dbt", lvl: 85, notes: "Analytics engineering for transformation layers.", related: ["SQL", "BigQuery"] },
      { name: "Kafka", lvl: 82, notes: "Real-time streaming at scale, millions of events/sec.", related: ["Flink", "Kinesis"] },
      { name: "PostgreSQL", lvl: 87, notes: "Battle-hardened relational DB for production workloads.", related: ["TimescaleDB", "pgvector"] },
      { name: "Python", lvl: 95, notes: "Primary weapon. Data pipelines, automation, APIs.", related: ["Polars", "NumPy"] },
    ],
  },
  {
    id: "ai", label: "AI / LLM", icon: "◈",
    skills: [
      { name: "LangChain", lvl: 85, notes: "LLM orchestration for RAG and agent systems.", related: ["LangGraph", "LlamaIndex"] },
      { name: "OpenAI API", lvl: 90, notes: "GPT-4/o integrations across multiple production systems.", related: ["Anthropic", "Gemini"] },
      { name: "RAG Systems", lvl: 83, notes: "Retrieval-augmented generation for enterprise knowledge bases.", related: ["Pinecone", "pgvector"] },
      { name: "Hugging Face", lvl: 78, notes: "Fine-tuning and inference for open-source LLMs.", related: ["PEFT", "LoRA"] },
      { name: "Vector DBs", lvl: 81, notes: "Semantic search and embedding storage at scale.", related: ["Pinecone", "Weaviate"] },
    ],
  },
  {
    id: "backend", label: "BACKEND SYSTEMS", icon: "⚙",
    skills: [
      { name: "FastAPI", lvl: 90, notes: "High-performance async APIs for ML and data services.", related: ["Pydantic", "Uvicorn"] },
      { name: "Django", lvl: 82, notes: "Full-featured backend for complex web applications.", related: ["DRF", "Celery"] },
      { name: "Go", lvl: 65, notes: "Systems programming for high-throughput services.", related: ["Gin", "gRPC"] },
      { name: "Redis", lvl: 85, notes: "Caching layer, session store, pub/sub messaging.", related: ["Valkey", "DragonflyDB"] },
      { name: "gRPC", lvl: 72, notes: "Inter-service communication for microservice meshes.", related: ["Protobuf", "tRPC"] },
    ],
  },
  {
    id: "cloud", label: "CLOUD & INFRA", icon: "☁",
    skills: [
      { name: "AWS", lvl: 85, notes: "EC2, S3, Lambda, RDS, ECS — full production deployments.", related: ["GCP", "Azure"] },
      { name: "Docker", lvl: 92, notes: "Containerization for all deployment environments.", related: ["Podman", "Buildah"] },
      { name: "Kubernetes", lvl: 78, notes: "Container orchestration for auto-scaling workloads.", related: ["Helm", "ArgoCD"] },
      { name: "Terraform", lvl: 80, notes: "Infrastructure as code for repeatable deployments.", related: ["Pulumi", "CDK"] },
      { name: "CI/CD", lvl: 87, notes: "GitHub Actions, GitLab CI — automated pipelines.", related: ["ArgoCD", "Tekton"] },
    ],
  },
  {
    id: "frontend", label: "FRONTEND CRAFT", icon: "⬡",
    skills: [
      { name: "React", lvl: 93, notes: "Primary frontend weapon. Complex state, performance.", related: ["Next.js", "Remix"] },
      { name: "TypeScript", lvl: 90, notes: "Type-safe development across all frontend projects.", related: ["Zod", "ts-pattern"] },
      { name: "Framer Motion", lvl: 88, notes: "Animation system for cinematic UI experiences.", related: ["GSAP", "Motion"] },
      { name: "TailwindCSS", lvl: 92, notes: "Utility-first styling with custom design systems.", related: ["UnoCSS", "StyleX"] },
    ],
  },
  {
    id: "tools", label: "WORKFLOW & TOOLS", icon: "⊕",
    skills: [
      { name: "Git / GitHub", lvl: 95, notes: "Version control, PR reviews, GitHub Actions.", related: ["GitLab", "Bitbucket"] },
      { name: "Notion", lvl: 88, notes: "Project management and documentation system.", related: ["Linear", "Jira"] },
      { name: "Linux / Bash", lvl: 85, notes: "System administration, shell scripting, automation.", related: ["Zsh", "Fish"] },
      { name: "DataBricks", lvl: 80, notes: "Unified analytics platform for large-scale data.", related: ["Spark", "Delta Lake"] },
    ],
  },
] as const;

type DomainId = typeof DOMAINS[number]["id"];
type Skill = typeof DOMAINS[number]["skills"][number];

// ── Proficiency bar (color-themed) ──────────────────────────────────────────
const ProficiencyBar = ({ lvl, active, colors }: { lvl: number; active: boolean; colors: ColorTheme }) => {
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
              ? (i >= blocks * 0.8 ? colors.barFull : i >= blocks * 0.6 ? colors.barMid : colors.barBase)
              : colors.barEmpty,
            transformOrigin: "bottom",
            boxShadow: i < filled ? `0 0 4px ${colors.barGlow}` : "none",
          }}
        />
      ))}
      <span className="font-mono text-xs ml-2 tabular-nums font-semibold" style={{ color: colors.accent }}>{lvl}</span>
    </div>
  );
};

// ── Skill card (color-themed) ───────────────────────────────────────────────
const SkillCard = ({ skill, index, isSelected, onSelect, colors }: {
  skill: Skill; index: number; isSelected: boolean; onSelect: () => void; colors: ColorTheme;
}) => (
  <motion.div
    custom={index}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1, transition: { delay: index * 0.06, type: "spring", stiffness: 320, damping: 18 } }}
    exit={{ opacity: 0, scale: 0.8 }}
    onClick={onSelect}
    role="button"
    tabIndex={0}
    aria-label={`Select skill ${skill.name}`}
    onKeyDown={(e) => e.key === "Enter" && onSelect()}
    className="p-4 border transition-all duration-200 relative overflow-hidden"
    style={{
      cursor: "pointer",
      borderColor: isSelected ? colors.borderActive : colors.border,
      background: isSelected
        ? colors.bgActive
        : "rgba(10,10,18,0.7)",
      boxShadow: isSelected
        ? `0 0 20px ${colors.glowSoft}`
        : `inset 0 1px 0 ${colors.barEmpty}, 0 2px 8px rgba(0,0,0,0.3)`,
    }}
    whileHover={{
      borderColor: colors.borderActive,
      background: "rgba(10,10,18,0.85)",
      boxShadow: `0 0 20px ${colors.glowSoft}, inset 0 1px 0 ${colors.barEmpty}`,
    }}
  >
    {isSelected && (
      <motion.div layoutId="selected-skill" className="absolute top-0 left-0 right-0 h-px" style={{ background: colors.accent }} />
    )}
    <div
      className="font-mono text-sm mb-2 tracking-wide"
      style={{ color: isSelected ? colors.accent : "#E0E0E0", fontWeight: isSelected ? 600 : 400 }}
    >
      {skill.name}
    </div>
    <ProficiencyBar lvl={skill.lvl} active={true} colors={colors} />
  </motion.div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
export const AbilitySection = () => {
  const [activeDomain, setActiveDomain] = useState<DomainId>("pipeline");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const ref = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-10%" as any });
  const currentDomain = DOMAINS.find((d) => d.id === activeDomain)!;
  const colors = DOMAIN_COLORS[activeDomain];

  return (
    <section
      id="skills"
      ref={ref}
      className="content-section relative overflow-hidden px-6 md:px-10 xl:px-16"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 section-vignette pointer-events-none" />
      <div className="absolute inset-0 section-floor pointer-events-none" />

      <div className="container relative z-10 mx-auto w-full max-w-[1440px]">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 xl:mb-10"
        >
          <h2 className="section-title font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl" data-text="SKILLS">
            SKILLS
          </h2>

          <div className="mt-4 font-mono text-xs tracking-[0.15em] text-wez-cyan/50 flex items-center gap-4 flex-wrap">
            <span>Skill overview</span>
            <span className="text-crimson/50">Core modules loaded</span>
            <div className="flex gap-[2px]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  style={{ width: 8, height: 8, background: i < 9 ? "var(--crimson)" : "rgba(214,58,74,0.16)" }}
                />
              ))}
            </div>
            <span className="text-crimson font-semibold">94%</span>
          </div>
        </motion.div>

        {/* ── Three-panel layout ── */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[220px_1fr_300px] xl:grid-cols-[240px_1fr_320px]">
          {/* LEFT — Domain list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="hidden lg:flex flex-col gap-1"
          >
            {DOMAINS.map((d) => {
              const isActive = activeDomain === d.id;
              const c = DOMAIN_COLORS[d.id];
              return (
                <button
                  key={d.id}
                  onClick={() => { setActiveDomain(d.id); setSelectedSkill(null); }}
                  className="flex items-center gap-3 px-4 py-3 text-left font-mono text-xs tracking-[0.15em] uppercase transition-all duration-150 border-l-2"
                  style={{
                    borderLeftColor: isActive ? c.accent : "transparent",
                    background: isActive ? c.bg : "transparent",
                    color: isActive ? c.accent : "rgba(224,224,224,0.5)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <span style={{ color: isActive ? c.accent : `${c.accent}66`, fontSize: "1rem" }}>{d.icon}</span>
                  {d.label}
                </button>
              );
            })}
          </motion.div>

          {/* CENTER — Skill grid */}
          <div>
            {/* Mobile domain tabs */}
            <div className="flex lg:hidden overflow-x-auto gap-2 mb-6 pb-2" style={{ scrollbarWidth: "none" }}>
              {DOMAINS.map((d) => {
                const isActive = activeDomain === d.id;
                const c = DOMAIN_COLORS[d.id];
                return (
                  <button
                    key={d.id}
                    onClick={() => { setActiveDomain(d.id); setSelectedSkill(null); }}
                    className="flex-shrink-0 px-3 py-1.5 font-mono text-xs tracking-wider uppercase border transition-colors"
                    style={{
                      borderColor: isActive ? c.accent : "rgba(255,255,255,0.1)",
                      color: isActive ? c.accent : "rgba(224,224,224,0.5)",
                      background: isActive ? c.bg : "transparent",
                    }}
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
                    colors={colors}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — Intelligence report */}
          <div className="hidden lg:block h-[250px] xl:h-[250px]">
            <AnimatePresence mode="wait" initial={false}>
              {selectedSkill ? (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-full overflow-y-auto border p-5 backdrop-blur-sm"
                style={{
                  borderColor: `${colors.accent}66`,
                  background: "rgba(10,10,18,0.75)",
                  boxShadow: `inset 0 1px 0 ${colors.barEmpty}, 0 4px 16px rgba(0,0,0,0.3)`,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{
                  background: `linear-gradient(to right, ${colors.accent}, ${colors.barMid}, transparent)`,
                }} />

                <p className="font-mono text-xs tracking-[0.2em] mb-5 uppercase" style={{ color: `${colors.accent}99` }}>Skill details</p>

                <div className="space-y-3.5">
                  <div>
                    <p className="font-mono text-xs tracking-[0.18em] uppercase mb-1" style={{ color: `${colors.accent}B3` }}>SKILL:</p>
                    <p className="font-display text-base tracking-wide font-bold" style={{ color: colors.accent }}>{selectedSkill.name}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-[0.18em] uppercase mb-1" style={{ color: `${colors.accent}B3` }}>CATEGORY:</p>
                    <p className="font-mono text-sm text-foreground/80">{currentDomain.label}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-[0.18em] uppercase mb-2" style={{ color: `${colors.accent}B3` }}>PROFICIENCY:</p>
                    <ProficiencyBar lvl={selectedSkill.lvl} active={true} colors={colors} />
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-[0.18em] uppercase mb-2" style={{ color: `${colors.accent}B3` }}>NOTES:</p>
                    <p className="font-mono text-sm text-foreground/75 leading-relaxed">{selectedSkill.notes}</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs tracking-[0.18em] uppercase mb-2" style={{ color: `${colors.accent}B3` }}>RELATED:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkill.related.map((r) => (
                        <span
                          key={r}
                          className="font-mono text-xs px-2.5 py-1 border"
                          style={{ borderColor: `${colors.accent}40`, color: `${colors.accent}A6` }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex h-full items-center justify-center border"
                style={{
                  borderColor: `${colors.accent}14`,
                  background: "rgba(10,10,18,0.5)",
                }}
              >
                <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: `${colors.accent}66` }}>SELECT A SKILL</span>
              </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
