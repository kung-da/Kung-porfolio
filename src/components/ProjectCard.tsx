// src/components/ProjectCard.tsx
// ═══════════════════════════════════════════════════════════════════
// Task 5: Upgraded ProjectCard
// - Click card → navigate /projects/:slug
// - Category left border color coding
// - Hover: manga shadow escalate + translateY
// - "VIEW →" tag appears on hover
// - GitHub/Demo buttons stopPropagation
// - ProjectCardSkeleton exported
// ═══════════════════════════════════════════════════════════════════

import { Link } from "react-router-dom";
import type { ProjectCard as ProjectCardType } from "../types/project";

// ─── Category config ──────────────────────────────────────────────
const CATEGORY: Record<string, { color: string; label: string }> = {
  Pipeline:  { color: "#8FEFFF", label: "PIPELINE"  },
  Dashboard: { color: "#00FF88", label: "DASHBOARD" },
  Analytics: { color: "#FCEE0A", label: "ANALYTICS" },
  Other:     { color: "#888888", label: "OTHER"     },
};

// ═══════════════════════════════════════════════════════════════════
// SKELETON
// ═══════════════════════════════════════════════════════════════════
export function ProjectCardSkeleton() {
  return (
    <div
      className="relative bg-[#111111] border border-[#1A1A1A] p-5 h-full"
      aria-hidden="true"
      role="presentation"
    >
      {/* Category left border placeholder */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1A1A1A] animate-skeleton-pulse" />

      {/* Cover image placeholder */}
      <div className="w-full aspect-video bg-[#1A1A1A] animate-skeleton-pulse mb-5" />

      {/* Category badge + featured */}
      <div className="flex items-center justify-between mb-3">
        <div className="w-20 h-5 bg-[#1A1A1A] animate-skeleton-pulse" />
        <div className="w-12 h-4 bg-[#1A1A1A] animate-skeleton-pulse" />
      </div>

      {/* Title */}
      <div className="w-4/5 h-6 bg-[#1A1A1A] animate-skeleton-pulse mb-2" />
      <div className="w-3/5 h-6 bg-[#1A1A1A] animate-skeleton-pulse mb-4" />

      {/* Description lines */}
      <div className="space-y-2 mb-5">
        <div className="w-full h-4 bg-[#1A1A1A] animate-skeleton-pulse" />
        <div className="w-full h-4 bg-[#1A1A1A] animate-skeleton-pulse" />
        <div className="w-3/4 h-4 bg-[#1A1A1A] animate-skeleton-pulse" />
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {[56, 72, 48, 64].map((w, i) => (
          <div
            key={i}
            className="h-6 bg-[#1A1A1A] animate-skeleton-pulse"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      {/* Buttons row */}
      <div className="flex gap-2 pt-4 border-t border-[#1A1A1A]">
        <div className="flex-1 h-8 bg-[#1A1A1A] animate-skeleton-pulse" />
        <div className="flex-1 h-8 bg-[#1A1A1A] animate-skeleton-pulse" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PROJECT CARD
// ═══════════════════════════════════════════════════════════════════
interface ProjectCardProps {
  project: ProjectCardType;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cat = CATEGORY[project.category] ?? CATEGORY.Other;
  const hasSlug = Boolean(project.slug);

  // ─── Inner content (shared between Link and div) ──────────────
  const CardContent = () => (
    <>
      {/* ── Category left border (CSS via inline style for dynamic color) ── */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-200"
        style={{ background: cat.color }}
        aria-hidden="true"
      />

      {/* ── "VIEW →" corner tag (appears on hover via group-hover) ── */}
      <div
        className="absolute top-0 right-0 font-mono text-[10px] font-medium px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        style={{ color: cat.color, background: "#0A0A0A", border: `1px solid ${cat.color}` }}
        aria-hidden="true"
      >
        VIEW →
      </div>

      {/* ── Cover image ──────────────────────────────────────────── */}
      {project.coverImage ? (
        <div className="w-full aspect-video overflow-hidden mb-5 relative">
          <img
            src={project.coverImage}
            alt={`${project.name} project cover`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      ) : (
        /* Cover placeholder when no image */
        <div
          className="w-full aspect-video mb-5 flex items-center justify-center bg-[#111111] relative overflow-hidden"
        >
          <div
            className="font-display text-6xl font-black opacity-10 select-none"
            style={{ color: cat.color }}
            aria-hidden="true"
          >
            {project.category.slice(0, 2).toUpperCase()}
          </div>
          {/* Grid lines */}
          <div className="absolute inset-0 bg-cyber-grid opacity-40" />
        </div>
      )}

      {/* ── Header row ────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Category badge */}
        <span
          className="font-mono text-[10px] font-medium px-2 py-0.5 tracking-wider flex-shrink-0"
          style={{ background: cat.color + "22", color: cat.color, border: `1px solid ${cat.color}40` }}
        >
          {cat.label}
        </span>

        {/* Featured indicator */}
        {project.featured && (
          <span className="font-mono text-[10px] text-status-active tracking-widest flex items-center gap-1 flex-shrink-0">
            <span
              className="w-1.5 h-1.5 rounded-full bg-status-active animate-blink inline-block"
              aria-hidden="true"
            />
            FEATURED
          </span>
        )}
      </div>

      {/* ── Title ────────────────────────────────────────────────── */}
      <h3 className="font-title text-lg font-bold text-washi leading-tight mb-3 group-hover:text-wez-cyan transition-colors duration-200">
        {project.name}
      </h3>

      {/* ── Description ──────────────────────────────────────────── */}
      <p className="font-sans text-sm text-stone leading-relaxed mb-5 line-clamp-3">
        {project.description}
      </p>

      {/* ── Tech stack tags ──────────────────────────────────────── */}
      {project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="tag-mono">
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="font-mono text-[10px] text-stone px-2 py-0.5 bg-[#1A1A1A]">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>
      )}

      {/* ── Action buttons ────────────────────────────────────────── */}
      {(project.githubLink || project.demoLink) && (
        <div
          className="flex gap-2 pt-4 border-t border-[#1A1A1A]"
          // stopPropagation is handled on each button below
        >
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 font-mono text-xs text-center py-2 border border-[#2A2A2A] text-stone hover:border-wez-cyan hover:text-wez-cyan transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wez-cyan"
              aria-label={`View ${project.name} on GitHub`}
            >
              GitHub ↗
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 font-mono text-xs text-center py-2 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wez-cyan"
              style={{
                background: cat.color + "15",
                border: `1px solid ${cat.color}60`,
                color: cat.color,
              }}
              aria-label={`View live demo of ${project.name}`}
            >
              Demo ↗
            </a>
          )}
        </div>
      )}
    </>
  );

  // ─── Shared className for the card wrapper ───────────────────
  const cardClass = [
    "group relative bg-[#111111] border border-[#1A1A1A] p-5",
    "transition-all duration-200 ease-out cursor-pointer",
    // Hover: shadow escalates manga → manga-xl, slight lift
    "hover:-translate-y-[2px] hover:shadow-manga-xl hover:border-[#2A2A2A]",
    "shadow-manga",
    // Focus ring handled by :focus-visible global CSS
  ].join(" ");

  // ─── If slug exists → wrap in Link ───────────────────────────
  if (hasSlug) {
    return (
      <Link
        to={`/projects/${project.slug}`}
        className={cardClass}
        aria-label={`View details for ${project.name}`}
      >
        <CardContent />
      </Link>
    );
  }

  // ─── No slug → non-navigable card (fallback/demo) ────────────
  return (
    <div className={cardClass} role="article">
      <CardContent />
    </div>
  );
}
