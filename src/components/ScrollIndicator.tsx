// Fixed right-side dot rail — scroll indicator
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SECTIONS } from "@/design/tokens";

export const ScrollIndicator = () => {
  const [active, setActive] = useState("home");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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
      { rootMargin: "-40% 0px -40% 0px" }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) { obs.observe(el); ratios.set(s.id, 0); }
    });

    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 80,
        display: "flex",
        flexDirection: "column",
        gap: 12,
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
            style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
            onMouseEnter={() => setHoveredId(s.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => scrollTo(s.id)}
            role="button"
            tabIndex={0}
            aria-label={`Go to ${s.label}`}
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
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    color: isActive ? "#00e5ff" : "rgba(139,0,0,0.7)",
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
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                backgroundColor: isActive ? "#00e5ff" : isHovered ? "#8b0000" : "rgba(139,0,0,0.4)",
                boxShadow: isActive
                  ? "0 0 8px rgba(0,229,255,0.7), 0 0 16px rgba(0,229,255,0.3)"
                  : "none",
              }}
              transition={{ duration: 0.2 }}
              style={{ borderRadius: "50%", flexShrink: 0 }}
            />
          </div>
        );
      })}
    </div>
  );
};
