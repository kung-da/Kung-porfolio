import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "ENCOUNTER", id: "home" },
  { label: "INTEL", id: "about" },
  { label: "MOVESET", id: "skills" },
  { label: "ARCHIVES", id: "projects" },
  { label: "RECORD", id: "experience" },
  { label: "DUEL", id: "contact" },
];

export const Navigation = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

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
      {/* Desktop Nav */}
      <nav
        className="fixed left-0 right-0 hidden md:flex items-center justify-center gap-1 transition-all duration-300"
        style={{
          top: 36,
          height: 48,
          zIndex: 80,
          background: "rgba(5, 5, 5, 0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #1a1a2e",
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: isScrolled ? "auto" : "none",
        }}
      >
        {LINKS.map((l, i) => {
          const isActive = active === l.id;
          return (
            <span key={l.id} className="flex items-center">
              <button
                onClick={() => scrollTo(l.id)}
                className="font-display text-[10px] tracking-[0.2em] relative px-4 py-2 transition-all duration-100 uppercase katana-slash"
                style={{
                  color: isActive ? "#FF003C" : "#888",
                  textShadow: isActive ? "0 0 10px rgba(255,0,60,0.6)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#00F5FF";
                    e.currentTarget.style.textShadow = "0 0 8px rgba(0,245,255,0.6)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isActive ? "#FF003C" : "#888";
                  e.currentTarget.style.textShadow = isActive ? "0 0 10px rgba(255,0,60,0.6)" : "none";
                }}
              >
                {l.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF003C] shadow-[0_0_8px_#FF003C]" />
                )}
              </button>
              {i < LINKS.length - 1 && (
                <span className="text-[#1a1a2e] text-[8px] mx-1 select-none">/</span>
              )}
            </span>
          );
        })}
      </nav>

      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed right-4 flex items-center justify-center transition-all duration-300"
        style={{
          top: 44,
          zIndex: 95,
          width: 40,
          height: 40,
          background: "#050505",
          border: "1px solid #FF003C",
          color: "#E0E0E0",
          opacity: isScrolled || open ? 1 : 0,
          pointerEvents: isScrolled || open ? "auto" : "none",
          clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
        }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Slide Panel */}
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
              background: "rgba(5, 5, 5, 0.97)",
              backdropFilter: "blur(12px)",
              borderLeft: "2px solid #FF003C",
              padding: "80px 24px 24px",
              boxShadow: "-10px 0 40px rgba(255,0,60,0.15)",
            }}
          >
            <p className="font-mono-ui text-[10px] tracking-[0.3em] text-crimson mb-6 uppercase">
              // SYS_NAV
            </p>
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="font-display text-sm tracking-[0.2em] text-left p-3 transition-all duration-100 uppercase"
                  style={{
                    color: active === l.id ? "#FF003C" : "#888",
                    borderLeft: active === l.id ? "2px solid #FF003C" : "2px solid transparent",
                    background: active === l.id ? "linear-gradient(90deg, rgba(255,0,60,0.15) 0%, transparent 100%)" : "transparent",
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
