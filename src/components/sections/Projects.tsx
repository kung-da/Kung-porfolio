import { useState, useMemo } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useProjects } from "@/hooks/useProjects";
import { motion } from "framer-motion";
import { Github, ExternalLink, Shield, Lock, Unlock } from "lucide-react";

const FILTERS = ["All", "Pipeline", "Dashboard", "Analytics", "Other"] as const;

const RANK: Record<string, { label: string; color: string }> = {
  Pipeline: { label: "S-RANK", color: "hsl(var(--accent))" },
  Dashboard: { label: "A-RANK", color: "hsl(var(--primary))" },
  Analytics: { label: "A-RANK", color: "hsl(var(--primary))" },
  Other: { label: "B-RANK", color: "hsl(0 0% 70%)" },
};

export const Projects = () => {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    const base = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    return [...base].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [projects, filter]);

  return (
    <section id="projects" className="relative py-[120px] px-6" style={{ zIndex: 5 }}>
      <div className="container mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="04 / ENCRYPTED ARCHIVES"
          title="Memory Fragments"
          subtitle={<span className="font-jp">記憶</span>}
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 text-xs font-mono-ui tracking-[0.2em] uppercase transition-all"
                style={{
                  background: active ? "hsl(var(--primary) / 0.15)" : "transparent",
                  color: active ? "hsl(var(--primary))" : "hsl(0 0% 60%)",
                  border: active ? "1px solid hsl(var(--primary) / 0.7)" : "1px solid hsl(0 0% 100% / 0.08)",
                  clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="hud-panel h-[340px] animate-pulse" />
            ))}
          </div>
        ) : (
          /* Staggered asymmetric grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, idx) => {
              const rank = RANK[p.category] || RANK.Other;
              const isLarge = idx === 0 || (p.featured && idx < 2);
              return (
                <motion.article
                  key={p.id}
                  className={`katana-card group overflow-hidden transition-all duration-500 hover:-translate-y-1 ${isLarge && idx === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
                  style={{
                    background: "linear-gradient(135deg, hsl(0 0% 6% / 0.85), hsl(0 0% 3% / 0.9))",
                    backdropFilter: "blur(12px)",
                    border: "1px solid hsl(0 0% 100% / 0.06)",
                    clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "hsl(192 100% 60% / 0.4)";
                    e.currentTarget.style.boxShadow = "0 8px 32px -8px hsl(192 100% 60% / 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "hsl(0 0% 100% / 0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Cover */}
                  <div className="relative h-[180px] overflow-hidden">
                    {p.coverImage ? (
                      <img
                        src={p.coverImage}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: "brightness(0.6) contrast(1.15) saturate(0.8)" }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center font-mono-ui text-xs text-cyan-accent/40 tracking-[0.3em]"
                        style={{
                          background: "linear-gradient(135deg, hsl(0 0% 8%), hsl(0 0% 4%))",
                          backgroundImage: "linear-gradient(hsl(192 100% 60% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(192 100% 60% / 0.06) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      >
                        <Lock size={24} className="text-cyan-accent/30" />
                      </div>
                    )}
                    {/* Scanline on image */}
                    <div className="absolute inset-0 scanline opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-3 inset-x-3 flex items-start justify-between">
                      <span
                        className="text-[10px] font-mono-ui font-bold tracking-[0.2em] px-2 py-0.5"
                        style={{
                          color: rank.color,
                          background: "hsl(0 0% 0% / 0.7)",
                          border: `1px solid ${rank.color.replace(")", " / 0.6)")}`,
                          clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
                        }}
                      >
                        {rank.label}
                      </span>
                      {p.featured && (
                        <span
                          className="text-[10px] font-mono-ui font-bold tracking-[0.2em] px-2 py-0.5 inline-flex items-center gap-1"
                          style={{ color: "hsl(var(--accent))", background: "hsl(0 0% 0% / 0.7)", border: "1px solid hsl(var(--accent) / 0.5)" }}
                        >
                          <Shield size={10} /> LEGEND
                        </span>
                      )}
                    </div>

                    {/* Bottom: Fragment name */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[10px] font-mono-ui text-cyan-accent/70 tracking-[0.3em] mb-1 flex items-center gap-1">
                        <Unlock size={10} /> FRAGMENT DECRYPTED
                      </p>
                      <h3 className="text-base font-display text-foreground tracking-wider truncate">{p.name}</h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3 text-[10px] font-mono-ui tracking-[0.2em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400">STATUS</span>
                      <span className="text-muted-foreground">: CLEARED</span>
                      <span className="ml-auto text-muted-foreground">// cung-master</span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2" style={{ textShadow: "0 0 20px hsl(var(--primary) / 0.05)" }}>
                      {p.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-[10px] font-mono-ui text-silver/50 tracking-[0.2em] mb-2">// ARSENAL</p>
                      <div className="flex flex-wrap gap-1">
                        {p.techStack.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono-ui px-1.5 py-0.5 tracking-wider"
                            style={{
                              color: "hsl(0 0% 80%)",
                              background: "hsl(0 0% 100% / 0.04)",
                              border: "1px solid hsl(0 0% 100% / 0.08)",
                              clipPath: "polygon(0 0, calc(100% - 3px) 0, 100% 3px, 100% 100%, 3px 100%, 0 calc(100% - 3px))",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.05)" }}>
                      {p.githubLink && (
                        <a href={p.githubLink} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-cyan-accent transition-colors" aria-label="GitHub">
                          <Github size={16} />
                        </a>
                      )}
                      {p.demoLink && (
                        <a href={p.demoLink} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-cyan-accent transition-colors" aria-label="Demo">
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <span className="ml-auto text-[10px] font-mono-ui text-muted-foreground tracking-wider">
                        MEM_#{String(idx + 1).padStart(3, "0")}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
