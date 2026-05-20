// Skills section
import { memo, useMemo, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Box,
  Brain,
  Cloud,
  Code2,
  Database,
  Folder,
  Globe2,
  ServerCog,
} from "lucide-react";

const DOMAIN_COLORS = {
  pipeline: {
    accent: "#00F5FF",
    accentDim: "#00F5FF",
    glow: "rgba(0,245,255,0.34)",
    glowSoft: "rgba(0,245,255,0.075)",
    border: "rgba(0,245,255,0.35)",
    borderActive: "rgba(0,245,255,0.55)",
    barFull: "#00D4E0",
    barMid: "#00A8B5",
    barBase: "#007A85",
    barEmpty: "rgba(0,245,255,0.10)",
    barGlow: "rgba(0,245,255,0.28)",
    bg: "rgba(0,245,255,0.05)",
    bgActive: "rgba(0,245,255,0.08)",
    textAccent: "#00F5FF",
  },
  ai: {
    accent: "#A855F7",
    accentDim: "#A855F7",
    glow: "rgba(168,85,247,0.34)",
    glowSoft: "rgba(168,85,247,0.075)",
    border: "rgba(168,85,247,0.35)",
    borderActive: "rgba(168,85,247,0.55)",
    barFull: "#A855F7",
    barMid: "#8B3DD4",
    barBase: "#6D28B0",
    barEmpty: "rgba(168,85,247,0.10)",
    barGlow: "rgba(168,85,247,0.28)",
    bg: "rgba(168,85,247,0.05)",
    bgActive: "rgba(168,85,247,0.08)",
    textAccent: "#C084FC",
  },
  backend: {
    accent: "#F97316",
    accentDim: "#F97316",
    glow: "rgba(249,115,22,0.34)",
    glowSoft: "rgba(249,115,22,0.075)",
    border: "rgba(249,115,22,0.35)",
    borderActive: "rgba(249,115,22,0.55)",
    barFull: "#F97316",
    barMid: "#D4600E",
    barBase: "#A84D0B",
    barEmpty: "rgba(249,115,22,0.10)",
    barGlow: "rgba(249,115,22,0.28)",
    bg: "rgba(249,115,22,0.05)",
    bgActive: "rgba(249,115,22,0.08)",
    textAccent: "#FB923C",
  },
  cloud: {
    accent: "#EF4444",
    accentDim: "#EF4444",
    glow: "rgba(239,68,68,0.34)",
    glowSoft: "rgba(239,68,68,0.075)",
    border: "rgba(239,68,68,0.35)",
    borderActive: "rgba(239,68,68,0.55)",
    barFull: "#EF4444",
    barMid: "#C93030",
    barBase: "#991B1B",
    barEmpty: "rgba(239,68,68,0.10)",
    barGlow: "rgba(239,68,68,0.28)",
    bg: "rgba(239,68,68,0.05)",
    bgActive: "rgba(239,68,68,0.08)",
    textAccent: "#F87171",
  },
  frontend: {
    accent: "#22D3EE",
    accentDim: "#22D3EE",
    glow: "rgba(34,211,238,0.34)",
    glowSoft: "rgba(34,211,238,0.075)",
    border: "rgba(34,211,238,0.35)",
    borderActive: "rgba(34,211,238,0.55)",
    barFull: "#22D3EE",
    barMid: "#0EA5C0",
    barBase: "#0B7A8F",
    barEmpty: "rgba(34,211,238,0.10)",
    barGlow: "rgba(34,211,238,0.28)",
    bg: "rgba(34,211,238,0.05)",
    bgActive: "rgba(34,211,238,0.08)",
    textAccent: "#67E8F9",
  },
  tools: {
    accent: "#10B981",
    accentDim: "#10B981",
    glow: "rgba(16,185,129,0.34)",
    glowSoft: "rgba(16,185,129,0.075)",
    border: "rgba(16,185,129,0.35)",
    borderActive: "rgba(16,185,129,0.55)",
    barFull: "#10B981",
    barMid: "#0D9668",
    barBase: "#087050",
    barEmpty: "rgba(16,185,129,0.10)",
    barGlow: "rgba(16,185,129,0.28)",
    bg: "rgba(16,185,129,0.05)",
    bgActive: "rgba(16,185,129,0.08)",
    textAccent: "#34D399",
  },
} as const;

type ColorTheme = typeof DOMAIN_COLORS[keyof typeof DOMAIN_COLORS];

const DOMAINS = [
  {
    id: "pipeline", label: "DATA ENGINEERING", icon: Box,
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
    id: "ai", label: "AI / LLM", icon: Brain,
    skills: [
      { name: "LangChain", lvl: 85, notes: "LLM orchestration for RAG and agent systems.", related: ["LangGraph", "LlamaIndex"] },
      { name: "OpenAI API", lvl: 90, notes: "GPT-4/o integrations across multiple production systems.", related: ["Anthropic", "Gemini"] },
      { name: "RAG Systems", lvl: 83, notes: "Retrieval-augmented generation for enterprise knowledge bases.", related: ["Pinecone", "pgvector"] },
      { name: "Hugging Face", lvl: 78, notes: "Fine-tuning and inference for open-source LLMs.", related: ["PEFT", "LoRA"] },
      { name: "Vector DBs", lvl: 81, notes: "Semantic search and embedding storage at scale.", related: ["Pinecone", "Weaviate"] },
    ],
  },
  {
    id: "backend", label: "BACKEND SYSTEMS", icon: ServerCog,
    skills: [
      { name: "FastAPI", lvl: 90, notes: "High-performance async APIs for ML and data services.", related: ["Pydantic", "Uvicorn"] },
      { name: "Django", lvl: 82, notes: "Full-featured backend for complex web applications.", related: ["DRF", "Celery"] },
      { name: "Go", lvl: 65, notes: "Systems programming for high-throughput services.", related: ["Gin", "gRPC"] },
      { name: "Redis", lvl: 85, notes: "Caching layer, session store, pub/sub messaging.", related: ["Valkey", "DragonflyDB"] },
      { name: "gRPC", lvl: 72, notes: "Inter-service communication for microservice meshes.", related: ["Protobuf", "tRPC"] },
    ],
  },
  {
    id: "cloud", label: "CLOUD & INFRA", icon: Cloud,
    skills: [
      { name: "AWS", lvl: 85, notes: "EC2, S3, Lambda, RDS, ECS - full production deployments.", related: ["GCP", "Azure"] },
      { name: "Docker", lvl: 92, notes: "Containerization for all deployment environments.", related: ["Podman", "Buildah"] },
      { name: "Kubernetes", lvl: 78, notes: "Container orchestration for auto-scaling workloads.", related: ["Helm", "ArgoCD"] },
      { name: "Terraform", lvl: 80, notes: "Infrastructure as code for repeatable deployments.", related: ["Pulumi", "CDK"] },
      { name: "CI/CD", lvl: 87, notes: "GitHub Actions, GitLab CI - automated pipelines.", related: ["ArgoCD", "Tekton"] },
    ],
  },
  {
    id: "frontend", label: "FRONTEND CRAFT", icon: Code2,
    skills: [
      { name: "React", lvl: 93, notes: "Primary frontend weapon. Complex state, performance.", related: ["Next.js", "Remix"] },
      { name: "TypeScript", lvl: 90, notes: "Type-safe development across all frontend projects.", related: ["Zod", "ts-pattern"] },
      { name: "Framer Motion", lvl: 88, notes: "Animation system for cinematic UI experiences.", related: ["GSAP", "Motion"] },
      { name: "TailwindCSS", lvl: 92, notes: "Utility-first styling with custom design systems.", related: ["UnoCSS", "StyleX"] },
    ],
  },
  {
    id: "tools", label: "WORKFLOW & TOOLS", icon: Globe2,
    skills: [
      { name: "Git / GitHub", lvl: 95, notes: "Version control, PR reviews, GitHub Actions.", related: ["GitLab", "Bitbucket"] },
      { name: "Notion", lvl: 88, notes: "Project management and documentation system.", related: ["Linear", "Jira"] },
      { name: "Linux / Bash", lvl: 85, notes: "System administration, shell scripting, automation.", related: ["Zsh", "Fish"] },
      { name: "DataBricks", lvl: 80, notes: "Unified analytics platform for large-scale data.", related: ["Spark", "Delta Lake"] },
    ],
  },
] as const;

type DomainId = typeof DOMAINS[number]["id"];
type Domain = typeof DOMAINS[number];
type Skill = typeof DOMAINS[number]["skills"][number];
const BAR_SEGMENTS = Array.from({ length: 10 });
const DOSSIER_SIGNAL_BARS = Array.from({ length: 18 });
const STATUS_DOTS = Array.from({ length: 4 });

const SegmentedBar = ({
  value,
  colors,
  compact = false,
  segments = 10,
}: {
  value: number;
  colors: ColorTheme;
  compact?: boolean;
  segments?: number;
}) => {
  const active = Math.round((value / 100) * segments);

  return (
    <div className={`flex items-end gap-[3px] ${compact ? "gap-[2px]" : ""}`}>
      {(segments === 10 ? BAR_SEGMENTS : Array.from({ length: segments })).map((_, index) => {
        const isActive = index < active;
        return (
          <span
            key={index}
            className={`${compact ? "h-3 w-1.5" : "h-4 w-1.5 md:h-[18px] md:w-2"} shrink-0 rounded-[1px]`}
            style={{
              background: isActive ? colors.barFull : colors.barEmpty,
              border: isActive ? "none" : `1px solid ${colors.border}`,
              boxShadow: isActive ? `0 0 5px ${colors.barGlow}` : "none",
            }}
          />
        );
      })}
    </div>
  );
};

const CategoryNav = ({
  activeDomain,
  onSelect,
}: {
  activeDomain: DomainId;
  onSelect: (domain: Domain) => void;
}) => {
  const activeColors = DOMAIN_COLORS[activeDomain];

  return (
    <aside
      className="relative overflow-hidden border bg-black/50 shadow-[0_18px_46px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.025)] backdrop-blur-lg [clip-path:polygon(4%_0,100%_0,100%_92%,93%_100%,0_100%,0_4%)]"
      style={{
        borderColor: "rgba(255,255,255,0.115)",
        boxShadow: "0 18px 46px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.025)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.012) 34%, transparent 70%)",
        }}
      />
      <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/38 to-transparent" />
      <div className="pointer-events-none absolute inset-0 border border-white/[0.035]" />
      <div className="relative p-1">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon as ElementType;
          const active = domain.id === activeDomain;
          const colors = DOMAIN_COLORS[domain.id];

          return (
            <button
              key={domain.id}
              onClick={() => onSelect(domain)}
              className={[
                "group relative flex w-full items-center gap-3 border-b border-white/[0.05] px-4 py-4 text-left transition-all duration-300",
                "hover:bg-white/[0.025]",
                active ? "shadow-[inset_2px_0_0_var(--domain-accent)]" : "text-zinc-300/80",
              ].join(" ")}
              style={{
                "--domain-accent": colors.accent,
                color: active ? colors.accent : undefined,
                background: active
                  ? `linear-gradient(90deg, ${colors.bg}, rgba(255,255,255,0.012), transparent)`
                  : undefined,
              } as React.CSSProperties}
            >
              <span
                className="grid h-8 w-8 place-items-center border bg-black/25 transition-all duration-300 backdrop-blur-sm"
                style={{
                  borderColor: active ? colors.borderActive : "rgba(255,255,255,0.16)",
                  color: active ? colors.accent : "rgba(228,228,231,0.78)",
                  boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,0.07)" : "inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <Icon size={16} strokeWidth={1.65} />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.12em] md:text-sm">
                {domain.label}
              </span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-crimson/85" />
              )}
            </button>
          );
        })}
      </div>
      <div
        className="pointer-events-none absolute bottom-4 left-5 right-5 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${activeColors.accent}33, transparent)` }}
      />
    </aside>
  );
};

const SkillCard = memo(({
  skill,
  index,
  selected,
  hasSelection,
  onSelect,
  colors,
  reveal,
}: {
  skill: Skill;
  index: number;
  selected: boolean;
  hasSelection: boolean;
  onSelect: () => void;
  colors: ColorTheme;
  reveal: boolean;
}) => (
  <motion.button
    type="button"
    onClick={onSelect}
    initial={{ opacity: 0, scale: 0.98 }}
    animate={reveal ? { opacity: selected ? 1 : hasSelection ? 0.68 : 0.95, scale: 1 } : { opacity: 0, scale: 0.98 }}
    transition={{ delay: index * 0.022, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -3, opacity: selected ? 1 : 0.95 }}
    className={[
      "group relative h-full overflow-hidden p-4 text-left transition-colors duration-300 md:p-5",
      "border bg-black/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.025)] backdrop-blur-lg",
      "[clip-path:polygon(6%_0,100%_0,100%_88%,94%_100%,0_100%,0_8%)]",
      selected ? "opacity-100" : hasSelection ? "opacity-[0.68] hover:opacity-95" : "opacity-95 hover:opacity-100",
    ].join(" ")}
    style={{
      borderColor: selected ? colors.borderActive : "rgba(255,255,255,0.105)",
      background: selected
        ? `linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.014) 34%, transparent 72%), linear-gradient(135deg, ${colors.bgActive}, rgba(0,0,0,0.5) 46%, ${colors.bg}), rgba(0,0,0,0.48)`
        : "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.008) 34%, transparent 72%), rgba(0,0,0,0.58)",
      boxShadow: selected
        ? `0 18px 42px rgba(0,0,0,0.36), 0 0 24px ${colors.glowSoft}, inset 0 0 18px ${colors.bgActive}, inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.03)`
        : "0 12px 30px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.055), inset 0 -1px 0 rgba(255,255,255,0.02)",
    }}
  >
    <div
      className="absolute inset-x-4 top-0 h-px"
      style={{
        background: `linear-gradient(90deg, transparent, ${selected ? `${colors.accent}AA` : "rgba(255,255,255,0.32)"}, transparent)`,
      }}
    />
    <div className="pointer-events-none absolute inset-0 border border-white/[0.03]" />
    {selected && (
      <>
        <motion.span
          className="absolute right-0 top-0 h-16 w-px"
          style={{ background: colors.accent, boxShadow: `0 0 12px ${colors.glow}` }}
        />
        <span
          className="absolute right-5 top-5 h-4 w-4 border-r border-t"
          style={{ borderColor: `${colors.accent}CC` }}
        />
      </>
    )}
    <span
      className="absolute right-4 top-4 h-4 w-4 border-r border-t transition-colors"
      style={{ borderColor: selected ? `${colors.accent}66` : "rgba(255,255,255,0.22)" }}
    />

    <div className="relative flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-crimson/90" />
      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-400">
        Core module
      </span>
    </div>

    <div className="relative mt-6">
      <h3 className="font-title text-lg font-semibold tracking-wide text-zinc-100 md:text-xl">
        {skill.name}
      </h3>
      <div className="mt-4 flex min-w-0 items-center justify-between gap-3">
        <SegmentedBar value={skill.lvl} colors={colors} />
        <span
          className="shrink-0 font-mono text-base font-semibold tabular-nums md:text-lg"
          style={{ color: colors.accent, textShadow: `0 0 5px ${colors.glowSoft}` }}
        >
          {skill.lvl}
        </span>
      </div>
    </div>

    <div className="relative mt-5 flex items-center justify-between">
      <div className="flex flex-1 items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.15em] text-zinc-500">Proficiency</span>
        <span className="h-px flex-1 bg-white/[0.08]" />
      </div>
      <div className="ml-4 flex gap-1">
        {STATUS_DOTS.map((_, dot) => (
          <span key={dot} className="h-1 w-1 rounded-full bg-crimson/90" />
        ))}
      </div>
    </div>
  </motion.button>
));

SkillCard.displayName = "SkillCard";

const DossierField = memo(({
  label,
  children,
  colors,
}: {
  label: string;
  children: ReactNode;
  colors: ColorTheme;
}) => (
  <div
    className="relative overflow-hidden border px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(255,255,255,0.02)] backdrop-blur-sm"
    style={{
      borderColor: `${colors.accent}22`,
      background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.008) 45%, rgba(0,0,0,0.22)), rgba(0,0,0,0.24)",
    }}
  >
    <div className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    <p className="mb-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">
      {label}:
    </p>
    {children}
  </div>
));

DossierField.displayName = "DossierField";

const SkillDossier = memo(({
  skill,
  colors,
}: {
  skill: Skill;
  colors: ColorTheme;
}) => (
  <motion.aside
    key={skill.name}
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 24 }}
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    className="relative min-h-[620px] overflow-hidden border bg-black/50 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.025)] backdrop-blur-lg [clip-path:polygon(7%_0,94%_0,100%_7%,100%_93%,93%_100%,7%_100%,0_93%,0_7%)] lg:p-6"
    style={{
      borderColor: `${colors.accent}33`,
      background: `linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.012) 34%, transparent 72%), linear-gradient(135deg, ${colors.bgActive}, rgba(0,0,0,0.5) 52%, ${colors.bg}), rgba(0,0,0,0.52)`,
      boxShadow: `0 18px 48px rgba(0,0,0,0.38), 0 0 34px ${colors.glowSoft}, inset 0 0 30px ${colors.bgActive}, inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(255,255,255,0.025)`,
    }}
  >
    <motion.div
      key={`dossier-glow-${skill.name}`}
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.08, 0.42, 0.22] }}
      transition={{ duration: 0.62, ease: "easeOut" }}
      style={{
        background: `radial-gradient(circle at 18% 18%, ${colors.glow} 0, transparent 38%), linear-gradient(90deg, transparent, ${colors.bgActive}, transparent)`,
      }}
    />
    <div
      className="absolute inset-x-8 top-0 h-px"
      style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}CC, transparent)` }}
    />
    <div className="pointer-events-none absolute inset-0 border border-white/[0.03]" />
    <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-4">
      <div className="flex items-center gap-3">
        <Folder size={17} className="text-zinc-200" strokeWidth={1.5} />
        <h3 className="font-title text-sm font-semibold uppercase tracking-[0.14em] text-zinc-100">
          Skill Dossier
        </h3>
      </div>
      <div className="flex gap-1.5">
        {STATUS_DOTS.map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-crimson" />
        ))}
      </div>
    </div>

    <div className="relative mt-6 space-y-4">
      <DossierField label="Skill" colors={colors}>
        <span className="font-title text-2xl font-semibold" style={{ color: colors.accent }}>
          {skill.name}
        </span>
      </DossierField>

      <DossierField label="Proficiency" colors={colors}>
        <div className="flex flex-wrap items-center gap-6">
          <span className="font-mono text-2xl font-light text-zinc-100">
            <span className="font-semibold" style={{ color: colors.accent }}>{skill.lvl}</span>
            <span className="text-zinc-200"> / 100</span>
          </span>
          <SegmentedBar value={skill.lvl} colors={colors} compact />
        </div>
      </DossierField>

      <DossierField label="Related" colors={colors}>
        <div className="flex flex-wrap gap-2">
          {skill.related.map((item) => (
            <span
              key={item}
              className="border px-2.5 py-1 font-mono text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.055)] backdrop-blur-sm"
              style={{
                borderColor: `${colors.accent}40`,
                color: `${colors.accent}B3`,
                background: `linear-gradient(180deg, rgba(255,255,255,0.035), rgba(0,0,0,0.24)), ${colors.bg}`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </DossierField>
    </div>

    <div className="relative mt-6 border-t border-white/[0.08] pt-4">
      <div className="flex items-end justify-between gap-5">
        <div className="flex h-8 min-w-0 items-end gap-[3px] overflow-hidden">
          {DOSSIER_SIGNAL_BARS.map((_, index) => (
            <span
              key={index}
              className="w-[2px] bg-zinc-200/75"
              style={{ height: `${14 + ((index * 7) % 22)}px` }}
            />
          ))}
        </div>
        <div className="text-right">
          <p className="text-[9px] uppercase tracking-[0.16em] text-zinc-500">
            Module ID: {skill.name.toUpperCase().replace(/\s+/g, "-")}-{String(skill.lvl).padStart(3, "0")}
          </p>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em]" style={{ color: colors.accent }}>
            Ver. 2.1.0
          </p>
        </div>
      </div>
    </div>
  </motion.aside>
));

SkillDossier.displayName = "SkillDossier";

const EmptySkillDossier = ({ colors }: { colors: ColorTheme }) => (
  <aside
    className="relative min-h-[620px] overflow-hidden border bg-black/50 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.025)] backdrop-blur-lg [clip-path:polygon(7%_0,94%_0,100%_7%,100%_93%,93%_100%,7%_100%,0_93%,0_7%)] lg:p-6"
    style={{
      borderColor: `${colors.accent}24`,
      background: "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.01) 34%, transparent 72%), rgba(0,0,0,0.5)",
      boxShadow: "0 18px 48px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(255,255,255,0.02)",
    }}
  >
    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/26 to-transparent" />
    <div className="pointer-events-none absolute inset-0 border border-white/[0.025]" />
    <div className="relative flex items-center justify-between border-b border-white/[0.07] pb-4">
      <div className="flex items-center gap-3">
        <Folder size={17} className="text-zinc-500" strokeWidth={1.5} />
        <h3 className="font-title text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Skill Dossier
        </h3>
      </div>
      <div className="flex gap-1.5">
        {STATUS_DOTS.map((_, index) => (
          <span key={index} className="h-1 w-1 rounded-full bg-crimson/45" />
        ))}
      </div>
    </div>

    <div className="relative mt-6 space-y-4">
      <div
        className="min-h-[118px] border px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] backdrop-blur-sm"
        style={{
          borderColor: `${colors.accent}18`,
          background: "linear-gradient(180deg, rgba(255,255,255,0.028), rgba(0,0,0,0.22)), rgba(0,0,0,0.18)",
        }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
          Select a core module
        </p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">
          Dossier data pending
        </p>
      </div>
      <div
        className="min-h-[118px] border px-4 py-5 opacity-55 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-sm"
        style={{
          borderColor: `${colors.accent}14`,
          background: "linear-gradient(180deg, rgba(255,255,255,0.022), rgba(0,0,0,0.2)), rgba(0,0,0,0.16)",
        }}
      />
      <div
        className="min-h-[102px] border px-4 py-5 opacity-45 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm"
        style={{
          borderColor: `${colors.accent}12`,
          background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.18)), rgba(0,0,0,0.14)",
        }}
      />
    </div>

    <div className="relative mt-6 border-t border-white/[0.08] pt-4 opacity-45">
      <div className="flex items-end justify-between gap-5">
        <div className="flex h-8 min-w-0 items-end gap-[3px] overflow-hidden">
          {DOSSIER_SIGNAL_BARS.map((_, index) => (
            <span
              key={index}
              className="w-[2px] bg-zinc-500/45"
              style={{ height: `${14 + ((index * 7) % 22)}px` }}
            />
          ))}
        </div>
        <p className="text-right font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
          Module ID: pending
        </p>
      </div>
    </div>
  </aside>
);

export const AbilitySection = () => {
  const [activeDomain, setActiveDomain] = useState<DomainId>("pipeline");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const ref = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-10%" as any });
  const currentDomain = DOMAINS.find((domain) => domain.id === activeDomain)!;
  const colors = DOMAIN_COLORS[activeDomain];
  const activeSkill = selectedSkill && currentDomain.skills.some((skill) => skill.name === selectedSkill.name)
    ? selectedSkill
    : null;
  const overviewScore = useMemo(() => {
    const allSkills = DOMAINS.flatMap((domain) => domain.skills);
    return Math.round(allSkills.reduce((sum, skill) => sum + skill.lvl, 0) / allSkills.length);
  }, []);

  const selectDomain = (domain: Domain) => {
    setActiveDomain(domain.id);
    setSelectedSkill(null);
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="content-section skills-section relative isolate overflow-hidden px-5 text-zinc-100 sm:px-8 lg:px-12 xl:px-16"
      style={{ background: "#000" }}
    >
      <div className="container relative z-10 mx-auto w-full max-w-[1760px]">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-9"
        >
          <div className="flex max-w-[720px] items-center gap-4">
            <Database size={17} className="text-crimson" strokeWidth={1.6} />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-crimson sm:text-sm">
              Capability Matrix
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-crimson/70 via-crimson/20 to-transparent" />
            <div className="flex gap-1.5">
              {STATUS_DOTS.map((_, index) => (
                <span key={index} className="h-1 w-1 rounded-full bg-crimson" />
              ))}
            </div>
          </div>

          <h2
            className="section-title mt-5 max-w-4xl font-display text-4xl font-bold uppercase leading-none tracking-[0.04em] text-zinc-50 drop-shadow-[0_0_18px_rgba(214,58,74,0.34)] sm:text-5xl lg:text-6xl xl:text-7xl"
            data-text="TECHNICAL SKILLS"
          >
            Technical Skills
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-zinc-400 sm:text-sm">
              Core modules loaded
            </span>
            <SegmentedBar value={overviewScore} colors={DOMAIN_COLORS.pipeline} compact />
            <span className="font-mono text-sm font-medium text-wez-cyan">{overviewScore}%</span>
          </div>
        </motion.header>

        <div
          className={[
            "grid gap-6 lg:grid-cols-[270px_minmax(0,1fr)]",
            "xl:grid-cols-[280px_minmax(0,1fr)_340px] 2xl:grid-cols-[300px_minmax(0,1fr)_360px]",
          ].join(" ")}
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <CategoryNav activeDomain={activeDomain} onSelect={selectDomain} />
          </motion.div>

          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {DOMAINS.map((domain) => {
                const active = activeDomain === domain.id;
                const Icon = domain.icon as ElementType;
                const domainColors = DOMAIN_COLORS[domain.id];

                return (
                  <button
                    key={domain.id}
                    onClick={() => selectDomain(domain)}
                  className="flex shrink-0 items-center gap-2 border bg-black/50 px-3 py-2 font-mono text-xs uppercase tracking-wider shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(255,255,255,0.025)] backdrop-blur-md transition-colors"
                    style={{
                      borderColor: active ? domainColors.borderActive : "rgba(255,255,255,0.12)",
                      color: active ? domainColors.accent : "rgba(228,228,231,0.68)",
                      background: active
                        ? `linear-gradient(180deg, rgba(255,255,255,0.05), ${domainColors.bg} 42%, rgba(0,0,0,0.5))`
                        : "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.52))",
                      boxShadow: active
                        ? "inset 0 1px 0 rgba(255,255,255,0.09)"
                        : "inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                  >
                    <Icon size={14} strokeWidth={1.6} />
                    {domain.label}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.main
            key={activeDomain}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="grid content-start items-start gap-4 self-start sm:grid-cols-2 sm:auto-rows-[170px] 2xl:grid-cols-3 2xl:auto-rows-[184px]"
          >
            {currentDomain.skills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
                selected={activeSkill?.name === skill.name}
                hasSelection={Boolean(activeSkill)}
                onSelect={() => setSelectedSkill(skill)}
                colors={colors}
                reveal={inView}
              />
            ))}
          </motion.main>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill?.name ?? "empty-dossier"}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 xl:col-span-1"
            >
              {activeSkill ? (
                <SkillDossier skill={activeSkill} colors={colors} />
              ) : (
                <EmptySkillDossier colors={colors} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="mt-8 flex flex-wrap gap-x-12 gap-y-3 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
          <span><span className="text-crimson">//</span> User: Kung</span>
          <span><span className="text-crimson">//</span> Role: Data Engineer</span>
        </footer>
      </div>

    </section>
  );
};
