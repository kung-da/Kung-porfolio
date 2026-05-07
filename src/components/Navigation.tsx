import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", id: "about", code: "01" },
  { label: "Skills", id: "skills", code: "02" },
  { label: "Projects", id: "projects", code: "03" },
  { label: "Journey", id: "journey", code: "04" },
  { label: "Contact", id: "contact", code: "05" },
];

export const Navigation = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ["home", ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 transition-all duration-500"
      style={{
        zIndex: 100,
        background: scrolled ? "hsl(0 0% 2% / 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid hsl(0 0% 100% / 0.05)" : "1px solid transparent",
      }}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo / sigil */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <div
            className="relative w-9 h-9 flex items-center justify-center font-display font-bold text-sm transition-all"
            style={{
              border: "1px solid hsl(var(--primary) / 0.6)",
              color: "hsl(var(--primary))",
              background: "hsl(var(--primary) / 0.06)",
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)",
            }}
          >
            K
          </div>
          <div className="hidden sm:block">
            <p className="text-[9px] font-mono-ui tracking-[0.3em] text-cyan-accent leading-none">
              0xKUNG
            </p>
            <p className="text-[9px] font-mono-ui tracking-[0.2em] text-muted-foreground leading-none mt-0.5">
              · TERMINAL ·
            </p>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="group relative flex items-baseline gap-1.5 text-xs font-mono-ui tracking-[0.25em] uppercase transition-colors"
                style={{ color: isActive ? "hsl(var(--primary))" : "hsl(0 0% 75%)" }}
              >
                <span className="text-[9px] opacity-60">{l.code}</span>
                <span>{l.label}</span>
                <span
                  className="absolute -bottom-1.5 left-0 h-px transition-all duration-300"
                  style={{
                    width: isActive ? "100%" : 0,
                    background: "hsl(var(--primary))",
                    boxShadow: isActive ? "0 0 8px hsl(var(--primary))" : "none",
                  }}
                />
              </button>
            );
          })}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 backdrop-blur-xl" style={{ background: "hsl(0 0% 2% / 0.95)" }}>
          <div className="flex flex-col px-6 py-4 gap-3">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left text-xs font-mono-ui tracking-[0.25em] uppercase flex items-baseline gap-2"
                style={{ color: active === l.id ? "hsl(var(--primary))" : "hsl(0 0% 80%)" }}
              >
                <span className="text-[9px] opacity-60">{l.code}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
