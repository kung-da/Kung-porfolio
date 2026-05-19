// Projects section
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, Database, ExternalLink, Github, Layers3, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";

const FILTERS = ["ALL", "Pipeline", "Dashboard", "Analytics", "Other"] as const;
type Filter = typeof FILTERS[number];

const CATEGORY_META: Record<string, { code: string; color: string; tint: string }> = {
  Pipeline: { code: "PIPE", color: "#8FEFFF", tint: "rgba(143,239,255,0.08)" },
  Dashboard: { code: "DASH", color: "#00FF88", tint: "rgba(0,255,136,0.08)" },
  Analytics: { code: "ANLY", color: "#FCEE0A", tint: "rgba(252,238,10,0.08)" },
  Other: { code: "OTHR", color: "#A1A1AA", tint: "rgba(161,161,170,0.08)" },
};

const headerVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.36, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.18 } },
};

const SkeletonCard = ({ i }: { i: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.28, 0.58, 0.28] }}
    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
    className="min-h-[340px] border border-white/[0.08] bg-[rgba(5,11,17,0.68)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
  />
);

const StatPill = ({ label, value, tone = "cyan" }: { label: string; value: number; tone?: "cyan" | "crimson" | "zinc" }) => {
  const tones = {
    cyan: "border-wez-cyan/20 bg-wez-cyan/[0.045] text-wez-cyan",
    crimson: "border-crimson/25 bg-crimson/[0.06] text-enrage",
    zinc: "border-white/[0.08] bg-white/[0.025] text-zinc-300",
  };

  return (
    <span className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] ${tones[tone]}`}>
      <strong className="font-semibold">{value}</strong>
      <span className="text-zinc-500">{label}</span>
    </span>
  );
};

interface CardProps {
  project: {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    category: string;
    featured: boolean;
    slug: string;
    githubLink?: string;
    demoLink?: string;
  };
  index: number;
}

const MissionCard = ({ project: p, index }: CardProps) => {
  const navigate = useNavigate();
  const meta = CATEGORY_META[p.category] ?? CATEGORY_META.Other;
  const openDetail = () => navigate(`/projects/${p.slug}`);
  const visibleTech = p.techStack.slice(0, 4);

  return (
    <motion.article
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="button"
      tabIndex={0}
      aria-label={`Open project details for ${p.name}`}
      onClick={openDetail}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetail();
        }
      }}
      className="group relative flex min-h-[300px] cursor-pointer flex-col overflow-hidden border border-white/[0.09] bg-[rgba(5,11,17,0.72)] shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_18px_44px_rgba(0,0,0,0.24)] transition-all duration-300 hover:-translate-y-1 hover:border-wez-cyan/35 hover:bg-[rgba(8,15,23,0.9)] hover:shadow-[0_0_28px_rgba(143,239,255,0.10),0_24px_54px_rgba(0,0,0,0.32)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wez-cyan"
    >
      <div className="absolute inset-x-0 top-0 h-px opacity-90" style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }} aria-hidden="true" />
      <div className="absolute inset-0 opacity-80" style={{ background: `radial-gradient(circle at 16% 0%, ${meta.tint}, transparent 34%), radial-gradient(circle at 96% 16%, rgba(214,58,74,0.07), transparent 30%)` }} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 top-0 w-1 opacity-80" style={{ background: meta.color }} aria-hidden="true" />

      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              #{String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-3 w-px bg-white/[0.12]" aria-hidden="true" />
            <span className="truncate font-mono text-xs uppercase tracking-[0.16em]" style={{ color: meta.color }}>
              {meta.code} / {p.category}
            </span>
          </div>

          {p.featured && (
            <span className="shrink-0 border border-crimson/45 bg-crimson/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-enrage">
              Featured
            </span>
          )}
        </div>

        <h3 className="font-display text-2xl font-bold leading-tight text-zinc-50 transition-colors duration-200 group-hover:text-wez-cyan">
          {p.name}
        </h3>

        <p className="mt-4 min-h-[72px] font-mono text-sm leading-7 text-zinc-400 line-clamp-3">
          {p.description}
        </p>

        <div className="mt-5 flex min-h-[60px] flex-wrap content-start gap-2">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="border border-white/[0.09] bg-white/[0.035] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-300"
            >
              {tech}
            </span>
          ))}
          {p.techStack.length > visibleTech.length && (
            <span className="border border-wez-cyan/20 bg-wez-cyan/[0.04] px-2.5 py-1 font-mono text-[11px] text-wez-cyan/75">
              +{p.techStack.length - visibleTech.length}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-white/[0.08] pt-5">
          <span className="flex flex-1 items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-zinc-300 transition-colors group-hover:text-wez-cyan">
            View dossier
            <ArrowUpRight size={14} strokeWidth={1.7} />
          </span>
          {p.githubLink && (
            <a
              href={p.githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${p.name} on GitHub`}
              onClick={(event) => event.stopPropagation()}
              className="flex h-9 w-9 items-center justify-center border border-wez-cyan/25 text-wez-cyan/70 transition-colors hover:border-wez-cyan hover:bg-wez-cyan/10 hover:text-wez-cyan"
            >
              <Github size={15} strokeWidth={1.8} />
            </a>
          )}
          {p.demoLink && (
            <a
              href={p.demoLink}
              target="_blank"
              rel="noreferrer"
              aria-label={`View live demo of ${p.name}`}
              onClick={(event) => event.stopPropagation()}
              className="flex h-9 w-9 items-center justify-center border border-crimson/35 text-enrage/80 transition-colors hover:border-crimson hover:bg-crimson/10 hover:text-enrage"
            >
              <ExternalLink size={15} strokeWidth={1.8} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export const RaidArchives = () => {
  const { projects, loading, error } = useProjects();
  const [filter, setFilter] = useState<Filter>("ALL");
  const ref = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-10%" as any });

  const filtered = useMemo(() => {
    const base = filter === "ALL" ? projects : projects.filter((p) => p.category === filter);
    return [...base].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, filter]);

  const total = projects.length;
  const featured = projects.filter((p) => p.featured).length;
  const other = total - featured;

  return (
    <section
      id="projects"
      ref={ref}
      className="content-section relative isolate overflow-hidden px-5 text-zinc-100 sm:px-8 lg:px-12 xl:px-16"
      style={{ background: "transparent" }}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(214,58,74,0.07),transparent_30%),radial-gradient(circle_at_78%_36%,rgba(143,239,255,0.055),transparent_34%)]" />
      <div className="absolute inset-0 section-vignette pointer-events-none" />
      <div className="absolute inset-0 section-floor pointer-events-none" />

      <div className="container relative z-10 mx-auto w-full max-w-[1760px]">
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-8 md:mb-9"
        >
          <div className="flex max-w-[760px] items-center gap-4">
            <Database size={17} className="text-crimson" strokeWidth={1.6} />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-crimson sm:text-sm">
              Project Archive
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-crimson/70 via-crimson/20 to-transparent" />
          </div>

          <h2
            className="section-title mt-5 max-w-4xl font-display text-4xl font-bold uppercase leading-none tracking-[0.04em] text-zinc-50 drop-shadow-[0_0_18px_rgba(214,58,74,0.34)] sm:text-5xl lg:text-6xl xl:text-7xl"
            data-text="PROJECTS"
          >
            Projects
          </h2>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatPill label="Total" value={total} />
            <StatPill label="Featured" value={featured} tone="crimson" />
            <StatPill label="Archive" value={other} tone="zinc" />
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12, duration: 0.35 }}
          className="mb-6 grid gap-4 border border-white/[0.09] bg-[rgba(5,11,17,0.72)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.045),0_16px_34px_rgba(0,0,0,0.2)] lg:grid-cols-[minmax(0,1fr)_auto]"
        >
          <div className="flex min-w-0 items-center gap-3">
            <Search size={16} className="shrink-0 text-wez-cyan" strokeWidth={1.6} />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-wez-cyan/80">
              {filtered.length} visible modules
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-all sm:px-4 ${isActive ? "border-wez-cyan bg-wez-cyan/[0.09] text-wez-cyan shadow-[0_0_18px_rgba(143,239,255,0.12)]" : "border-white/[0.08] bg-white/[0.02] text-zinc-500 hover:border-wez-cyan/30 hover:text-wez-cyan/80"}`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </motion.div>

        {error ? (
          <div className="border border-crimson/25 bg-crimson/[0.045] px-5 py-10 text-center font-mono text-xs uppercase tracking-[0.18em] text-enrage">
            Project database unavailable
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} i={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="border border-white/[0.08] bg-[rgba(5,11,17,0.6)] py-16 text-center font-mono text-xs uppercase tracking-[0.2em] text-crimson/70">
            No projects found in this category
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
              {filtered.map((project, index) => (
                <MissionCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
