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

  useEffect(() => {
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
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav
        className="fixed left-0 right-0 hidden md:flex items-center justify-center gap-8"
        style={{
          top: 40,
          height: 44,
          zIndex: 80,
          background: "rgba(250,250,248,0.92)",
          borderBottom: "1px solid #0A0A0A",
          backdropFilter: "blur(8px)",
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
                color: "#0A0A0A",
                fontWeight: isActive ? 700 : 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "2px 2px 0 #0A0A0A";
                e.currentTarget.style.background = "#FAFAF8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "transparent";
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
                    background: "#8FEFFF",
                    boxShadow: "0 0 8px #8FEFFF",
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile button */}
      <button
        className="md:hidden fixed right-3 flex items-center justify-center"
        style={{
          top: 44,
          zIndex: 95,
          width: 40,
          height: 40,
          background: "#FAFAF8",
          border: "2px solid #0A0A0A",
          boxShadow: "2px 2px 0 #0A0A0A",
          color: "#0A0A0A",
        }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            className="md:hidden fixed top-0 right-0 bottom-0"
            style={{
              zIndex: 92,
              width: "78%",
              maxWidth: 320,
              background: "#FAFAF8",
              borderLeft: "2px solid #0A0A0A",
              padding: "80px 24px 24px",
            }}
          >
            <p className="chapter-label mb-6">// NAVIGATION</p>
            <div className="flex flex-col gap-1">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="font-display text-sm tracking-[0.2em] text-left p-3"
                  style={{
                    color: active === l.id ? "#0A0A0A" : "#888",
                    background: active === l.id ? "#FAFAF8" : "transparent",
                    border: "1px solid #0A0A0A",
                    boxShadow: active === l.id ? "3px 3px 0 #0A0A0A" : "none",
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
