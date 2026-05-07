import { useState, useMemo } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { useProjects } from "@/hooks/useProjects";
import { Github, ExternalLink, Shield } from "lucide-react";

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
          eyebrow="04 / RAID LOG"
          title="Mission Archive"
          subtitle={<span className="font-jp">任務</span>}
        />

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
                  color: active ? "hsl(var(--primary))" : "hsl(0 0% 70%)",
                  border: active
                    ? "1px solid hsl(var(--primary) / 0.7)"
                    : "1px solid hsl(0 0% 100% / 0.1)",
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, idx) => {
              const rank = RANK[p.category] || RANK.Other;
              return (
                <article
                  key={p.id}
                  className="hud-panel sweep-border group overflow-hidden transition-all duration-500 hover:-translate-y-1"
                  style={{ animationDelay: `${idx * 80}ms` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 12px 40px -8px hsl(192 100% 60% / 0.25)";
                    e.currentTarget.style.borderColor = "hsl(192 100% 60% / 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  {/* Cover */}
                  <div className="relative h-[180px] overflow-hidden">
                    {p.coverImage ? (
                      <img
                        src={p.coverImage}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ filter: "brightness(0.7) contrast(1.1) saturate(0.85)" }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center font-mono-ui text-xs text-cyan-accent/60 tracking-[0.3em]"
                        style={{
                          background:
                            "linear-gradient(135deg, hsl(0 0% 8%), hsl(0 0% 4%))",
                          backgroundImage:
                            "linear-gradient(hsl(192 100% 60% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(192 100% 60% / 0.06) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      >
                        // {p.techStack.slice(0, 2).join(" / ")}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Top HUD bar */}
                    <div className="absolute top-3 inset-x-3 flex items-start justify-between">
                      <span
                        className="text-[10px] font-mono-ui font-bold tracking-[0.2em] px-2 py-0.5"
                        style={{
                          color: rank.color,
                          background: "hsl(0 0% 0% / 0.6)",
                          border: `1px solid ${rank.color.replace(")", " / 0.6)")}`,
                        }}
                      >
                        {rank.label}
                      </span>
                      {p.featured && (
                        <span
                          className="text-[10px] font-mono-ui font-bold tracking-[0.2em] px-2 py-0.5 inline-flex items-center gap-1"
                          style={{
                            color: "hsl(var(--accent))",
                            background: "hsl(0 0% 0% / 0.6)",
                            border: "1px solid hsl(var(--accent) / 0.5)",
                          }}
                        >
                          <Shield size={10} /> LEGEND
                        </span>
                      )}
                    </div>

                    {/* Bottom codename */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[10px] font-mono-ui text-cyan-accent/80 tracking-[0.3em] mb-1">
                        // CODENAME
                      </p>
                      <h3 className="text-base font-display text-foreground tracking-wider truncate">
                        {p.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3 text-[10px] font-mono-ui tracking-[0.2em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse" />
                      <span className="text-cyan-accent">STATUS</span>
                      <span className="text-muted-foreground">: CLEARED</span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {p.description}
                    </p>

                    <div className="mb-4">
                      <p className="text-[10px] font-mono-ui text-silver/60 tracking-[0.2em] mb-2">
                        // ARSENAL
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {p.techStack.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono-ui px-1.5 py-0.5 tracking-wider"
                            style={{
                              color: "hsl(0 0% 80%)",
                              background: "hsl(0 0% 100% / 0.04)",
                              border: "1px solid hsl(0 0% 100% / 0.08)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                      {p.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-cyan-accent transition-colors"
                          aria-label="GitHub"
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {p.demoLink && (
                        <a
                          href={p.demoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-cyan-accent transition-colors"
                          aria-label="Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <span className="ml-auto text-[10px] font-mono-ui text-muted-foreground tracking-wider">
                        #{String(idx + 1).padStart(3, "0")}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
