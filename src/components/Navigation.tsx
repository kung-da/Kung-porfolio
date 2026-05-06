import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
  { label: "Data Lab", id: "datalab" },
  { label: "Contact", id: "contact" },
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
    ["home", ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 border-b"
      style={{
        zIndex: 100,
        background: "rgba(10,15,30,0.85)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center justify-center font-bold text-base"
          style={{ width: 36, height: 36, background: "#00d4aa", color: "#0a0f1e", borderRadius: 6 }}
          aria-label="Home"
        >
          DW
        </button>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="relative text-sm font-medium tracking-wider uppercase transition-colors group"
              style={{ color: active === l.id ? "#00d4aa" : "#e8f0ff" }}
            >
              {l.label}
              <span
                className="absolute left-0 -bottom-1 h-px transition-all duration-300"
                style={{
                  width: active === l.id ? "100%" : 0,
                  background: "#00d4aa",
                }}
              />
            </button>
          ))}
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
        <div className="md:hidden border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex flex-col px-6 py-4 gap-4">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left text-sm font-medium tracking-wider uppercase"
                style={{ color: active === l.id ? "#00d4aa" : "#e8f0ff" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
