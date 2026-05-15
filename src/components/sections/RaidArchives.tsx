// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS · "ARCHIVE" — Mission Terminal
// Typography: improved for readability on dark bg
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";

const FILTERS = ["ALL", "Pipeline", "Dashboard", "Analytics", "Other"] as const;
type Filter = typeof FILTERS[number];

const headerVariants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 18 } },
};
const cardVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.2 } },
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonCard = ({ i }: { i: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
    className="bg-background/60 border border-border/30 h-[320px]"
  />
);

// ── Mission Card ──────────────────────────────────────────────────────────────
interface CardProps {
  project: {
    id: string; name: string; description: string; techStack: string[];
    category: string; featured: boolean; githubLink?: string; demoLink?: string; coverImage?: string;
  };
  index: number;
  isFeatured?: boolean;
}

const MissionCard = ({ project: p, index, isFeatured }: CardProps) => (
  <motion.article
    layout
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={`
      group relative border transition-all duration-300 overflow-hidden flex flex-col
      border-border/40 bg-background/60 backdrop-blur-sm
      hover:border-wez-cyan/40 hover:shadow-card-hover
      ${isFeatured ? "col-span-full" : ""}
    `}
  >
    {/* Top accent */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    {/* Cover image */}
    {p.coverImage && (
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: isFeatured ? 240 : 160 }}>
        <img
          src={p.coverImage}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          style={{ filter: "contrast(0.9) brightness(0.7)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>
    )}

    {/* Content */}
    <div className={`${isFeatured ? "p-6 md:p-7" : "p-5"} flex-1 flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-wez-cyan/70 tracking-[0.22em] uppercase mb-1">
            ── OP // {p.name.toUpperCase()} ──
          </p>
          <p className="font-mono text-[11px] text-crimson/70 tracking-wider uppercase">
            CATEGORY: {p.category}
          </p>
        </div>
        {p.featured ? (
          <span className="font-mono text-[11px] tracking-wider border border-crimson/50 text-enrage px-2 py-0.5 bg-crimson/10 whitespace-nowrap flex-shrink-0">
            {isFeatured ? "⚑ PRIORITY" : "██ ACTIVE"}
          </span>
        ) : (
          <span className="font-mono text-[11px] tracking-wider border border-border/30 text-muted-foreground px-2 py-0.5 whitespace-nowrap flex-shrink-0">
            ✓ SEALED
          </span>
        )}
      </div>

      <p className="font-mono text-sm text-foreground/70 leading-relaxed line-clamp-2">
        {p.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {p.techStack.slice(0, 4).map((t) => (
          <span key={t} className="font-mono text-[11px] tracking-wider border border-wez-cyan/25 text-wez-cyan/70 px-2.5 py-0.5 uppercase">
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-auto">
        {p.githubLink && (
          <a
            href={p.githubLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center font-mono text-xs tracking-[0.2em] uppercase border border-wez-cyan/30 text-wez-cyan/80 py-2.5 no-underline transition-colors hover:bg-wez-cyan/10 hover:text-wez-cyan"
          >
            → MISSION BRIEF
          </a>
        )}
        {p.demoLink && (
          <a
            href={p.demoLink}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center font-mono text-xs tracking-[0.2em] uppercase border border-crimson/40 text-enrage/80 py-2.5 no-underline transition-colors hover:bg-crimson/10 hover:text-enrage"
          >
            ◈ LIVE SYSTEM
          </a>
        )}
      </div>
    </div>
  </motion.article>
);

// ── Main ─────────────────────────────────────────────────────────────────────
export const RaidArchives = () => {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState<Filter>("ALL");
  const ref = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-10%" as any });

  const filtered = useMemo(() => {
    const base = filter === "ALL" ? projects : projects.filter((p) => p.category === filter);
    return [...base].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, filter]);

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || p !== featured);

  const total  = projects.length;
  const active = projects.filter((p) => p.featured).length;
  const sealed = total - active;

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[#050508] overflow-hidden"
    >
      <div className="absolute inset-0 crt-scanlines opacity-[0.025] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(139,0,0,0.05) 0%, transparent 55%)" }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* ── Header ── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-xs text-crimson mb-2 tracking-widest uppercase">
            // 03 — ARCHIVE
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-crimson to-transparent mb-6" />
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase leading-tight mb-6">
            Classified <span className="text-wez-cyan">Operations</span>
          </h2>

          {/* Stats row */}
          <div className="border border-border/40 bg-background/30 p-4 flex items-center justify-between flex-wrap gap-3">
            <span className="font-mono text-xs text-wez-cyan/70 tracking-[0.2em]">
              ── CLASSIFIED ARCHIVE ────────────
            </span>
            <div className="flex gap-5">
              {[
                { label: "TOTAL OPS", value: total, cls: "text-wez-cyan/70" },
                { label: "ACTIVE",    value: active, cls: "text-enrage" },
                { label: "SEALED",    value: sealed, cls: "text-muted-foreground" },
              ].map((s) => (
                <span key={s.label} className={`font-mono text-xs tracking-wider ${s.cls}`}>
                  {s.label}: [{s.value}]
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="flex gap-2 mb-8 flex-wrap"
        >
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-all relative overflow-hidden ${
                  isActive
                    ? "border-crimson text-enrage bg-crimson/[0.12]"
                    : "border-border/40 text-muted-foreground hover:text-foreground/80 hover:border-border/70"
                }`}
              >
                {f}
              </button>
            );
          })}
        </motion.div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} i={i} />)}
            <div className="col-span-full text-center font-mono text-xs tracking-widest text-wez-cyan/60 mt-4">
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                DECRYPTING ARCHIVE...
              </motion.span>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 font-mono text-sm tracking-[0.25em] text-crimson/50 uppercase relative">
            <div className="hud-grid absolute inset-0 opacity-[0.02]" />
            NO OPS FOUND IN THIS CATEGORY
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured && <MissionCard key={featured.id} project={featured} index={0} isFeatured />}
              {rest.map((p, i) => (
                <MissionCard key={p.id} project={p} index={i + (featured ? 1 : 0)} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};
