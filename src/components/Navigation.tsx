import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "ENCOUNTER", id: "home" },
  { label: "ABILITIES", id: "abilities" },
  { label: "RAIDS", id: "raids" },
  { label: "PROFILE", id: "profile" },
  { label: "TERMINAL", id: "terminal" },
];

export const Navigation = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      obs.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 hidden md:flex items-center justify-center gap-8 transition-all duration-500 ease-in-out`}
        style={{
          top: 0,
          height: 60,
          zIndex: 80,
          background: "rgba(5, 5, 5, 0.85)",
          borderBottom: "1px solid #8B0000",
          backdropFilter: "blur(12px)",
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? "translateY(0)" : "translateY(-10px)",
          pointerEvents: isScrolled ? "auto" : "none",
          boxShadow: "0 4px 30px rgba(139, 0, 0, 0.2)"
        }}
      >
        {LINKS.map((l) => {
          const isActive = active === l.id;
          return (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-display text-[10px] tracking-[0.25em] relative px-2 py-1 transition-all"
              style={{
                color: isActive ? "#FAFAF8" : "#888888",
                fontWeight: isActive ? 700 : 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FAFAF8";
                e.currentTarget.style.textShadow = "0 0 8px rgba(139,0,0,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive ? "#FAFAF8" : "#888888";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              {l.label}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: "#8B0000",
                    boxShadow: "0 0 8px #8B0000",
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile button */}
      <button
        className="md:hidden fixed right-4 flex items-center justify-center transition-all duration-500"
        style={{
          top: 16,
          zIndex: 95,
          width: 44,
          height: 44,
          background: "#0A0A0A",
          border: "1px solid #8B0000",
          boxShadow: isScrolled ? "0 0 15px rgba(139,0,0,0.4)" : "none",
          color: "#FAFAF8",
          opacity: isScrolled || open ? 1 : 0,
          transform: isScrolled || open ? "translateY(0)" : "translateY(-10px)",
          pointerEvents: isScrolled || open ? "auto" : "none",
        }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed top-0 right-0 bottom-0"
            style={{
              zIndex: 92,
              width: "78%",
              maxWidth: 320,
              background: "rgba(5, 5, 5, 0.95)",
              backdropFilter: "blur(12px)",
              borderLeft: "1px solid #8B0000",
              padding: "80px 24px 24px",
              boxShadow: "-10px 0 30px rgba(139,0,0,0.2)"
            }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#8B0000] mb-6">// NAVIGATION</p>
            <div className="flex flex-col gap-2">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="font-display text-sm tracking-[0.2em] text-left p-3 transition-colors duration-300"
                  style={{
                    color: active === l.id ? "#FAFAF8" : "#888888",
                    borderLeft: active === l.id ? "2px solid #8B0000" : "2px solid transparent",
                    background: active === l.id ? "linear-gradient(90deg, rgba(139,0,0,0.2) 0%, transparent 100%)" : "transparent"
                  }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
