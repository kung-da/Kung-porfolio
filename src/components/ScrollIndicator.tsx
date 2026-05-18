// Fixed right-side dot rail — scroll indicator
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTIONS } from "@/design/tokens";

export const ScrollIndicator = () => {
  const [active, setActive] = useState("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const observedIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const ratios = new Map<string, number>();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });
        let bestId = "home";
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
        });
        if (bestRatio > 0) setActive(bestId);
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );

    // Observe all sections, retry for lazily-mounted elements
    const observeTargets = () => {
      SECTIONS.forEach((s) => {
        if (observedIds.current.has(s.id)) return;
        const el = document.getElementById(s.id);
        if (el) {
          obs.observe(el);
          observedIds.current.add(s.id);
          ratios.set(s.id, 0);
        }
      });
    };

    observeTargets();

    // Watch for new DOM nodes (lazy sections)
    let moRaf = 0;
    const mo = new MutationObserver(() => {
      window.cancelAnimationFrame(moRaf);
      moRaf = window.requestAnimationFrame(() => {
        observeTargets();
        if (observedIds.current.size >= SECTIONS.length) mo.disconnect();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mo.disconnect();
      window.cancelAnimationFrame(moRaf);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = id === "home" ? 0 : 86;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 18,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 80,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        alignItems: "flex-end",
      }}
      aria-label="Section navigation"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        const isHovered = hoveredId === s.id;

        return (
          <div
            key={s.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              padding: "4px 0",
            }}
            onMouseEnter={() => setHoveredId(s.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => scrollTo(s.id)}
            role="button"
            tabIndex={0}
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
            onKeyDown={(e) => e.key === "Enter" && scrollTo(s.id)}
          >
            {/* Label on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: isActive ? "#00e5ff" : "rgba(200,200,200,0.6)",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                  }}
                >
                  {s.mission}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.div
              animate={{
                width: isActive ? 14 : isHovered ? 11 : 9,
                height: isActive ? 14 : isHovered ? 11 : 9,
                backgroundColor: isActive ? "#00e5ff" : isHovered ? "#D63A4A" : "rgba(214,58,74,0.42)",
                boxShadow: isActive
                  ? "0 0 10px rgba(0,229,255,0.8), 0 0 24px rgba(0,229,255,0.35)"
                  : isHovered
                    ? "0 0 8px rgba(214,58,74,0.5)"
                    : "0 0 4px rgba(214,58,74,0.2)",
                borderColor: isActive
                  ? "rgba(0,229,255,0.6)"
                  : isHovered
                    ? "rgba(214,58,74,0.6)"
                    : "rgba(214,58,74,0.25)",
                borderWidth: isActive ? 2 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                borderRadius: "50%",
                flexShrink: 0,
                borderStyle: "solid",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
