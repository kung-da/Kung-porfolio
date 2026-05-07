import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import profilePic from "@/assets/profile-picture.jpg";

const WORDS = ["Data Engineer", "AI Developer", "System Builder"];

const Typewriter = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIdx];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % WORDS.length);
      return;
    }
    const t = setTimeout(() => {
      setText((cur) =>
        deleting ? word.substring(0, cur.length - 1) : word.substring(0, cur.length + 1)
      );
    }, deleting ? 50 : 90);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx]);

  return (
    <span className="font-mono-ui text-cyan-accent">
      {text}
      <span className="animate-blink text-cyan-accent">▍</span>
    </span>
  );
};

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center px-6 md:px-16 lg:px-24"
    >
      {/* Faint kanji watermark — cinematic poster vibe */}
      <div
        aria-hidden
        className="absolute right-[-2vw] top-[12vh] font-jp pointer-events-none select-none"
        style={{
          fontSize: "clamp(220px, 36vw, 520px)",
          color: "hsl(0 0% 100% / 0.025)",
          lineHeight: 0.85,
          letterSpacing: "-0.05em",
          fontWeight: 900,
        }}
      >
        境地
      </div>

      {/* Subtle grid horizon */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[40vh] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(192 100% 60% / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(192 100% 60% / 0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          transform: "perspective(600px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto grid md:grid-cols-12 gap-10 items-center" style={{ zIndex: 10 }}>
        {/* LEFT — character / avatar frame */}
        <div className="md:col-span-5 flex justify-center md:justify-start animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <div className="relative">
            {/* HUD frame corners */}
            <div className="absolute -inset-4 pointer-events-none">
              {[
                "top-0 left-0 border-t border-l",
                "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l",
                "bottom-0 right-0 border-b border-r",
              ].map((c, i) => (
                <div key={i} className={`absolute w-6 h-6 ${c}`} style={{ borderColor: "hsl(var(--primary) / 0.7)" }} />
              ))}
            </div>
            <div
              className="relative overflow-hidden animate-pulse-glow"
              style={{
                width: 280,
                height: 360,
                background: "linear-gradient(180deg, hsl(0 0% 8%), hsl(0 0% 4%))",
                clipPath: "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)",
              }}
            >
              <img
                src={profilePic}
                alt="Avatar"
                className="w-full h-full object-cover"
                style={{ filter: "contrast(1.05) saturate(0.9) brightness(0.95)" }}
              />
              {/* Color grade overlay */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(192 100% 60% / 0.15), transparent 40%, hsl(340 70% 60% / 0.18))",
                }}
              />
              {/* Bottom info strip */}
              <div className="absolute bottom-0 inset-x-0 px-3 py-2 backdrop-blur-md" style={{ background: "hsl(0 0% 0% / 0.6)" }}>
                <p className="text-[10px] tracking-[0.3em] text-cyan-accent font-mono-ui">PLAYER · LV.∞</p>
                <p className="text-xs text-silver tracking-widest">CODENAME : 風来人</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — title + cinematic empty space */}
        <div className="md:col-span-7 flex flex-col">
          <div className="animate-fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
            <p className="font-mono-ui text-xs tracking-[0.4em] text-cyan-accent mb-4 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-cyan-accent" />
              SYSTEM ONLINE · 0xKUNG
            </p>
          </div>

          <h1
            className="font-display title-cinematic uppercase animate-fade-up"
            style={{
              fontSize: "clamp(40px, 6vw, 84px)",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              animationDelay: "0.5s",
              opacity: 0,
            }}
          >
            Forging<br />
            <span className="text-glow-cyan" style={{ color: "hsl(var(--primary))" }}>scalable</span> systems<br />
            beyond limits.
          </h1>

          <div className="mt-8 text-lg md:text-xl text-silver/80 font-mono-ui animate-fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            <Typewriter />
          </div>

          <p className="mt-4 text-sm md:text-base text-muted-foreground tracking-[0.15em] uppercase animate-fade-up" style={{ animationDelay: "1s", opacity: 0 }}>
            Data Engineer · AI Developer · System Builder
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "1.2s", opacity: 0 }}>
            <a
              href="#projects"
              className="sweep-border group relative px-7 py-3 text-sm tracking-[0.25em] uppercase font-mono-ui transition-all"
              style={{
                color: "hsl(var(--primary))",
                border: "1px solid hsl(var(--primary) / 0.5)",
                background: "hsl(var(--primary) / 0.04)",
              }}
            >
              <span className="relative z-10">Enter Archive</span>
            </a>
            <a
              href="#contact"
              className="sweep-border group relative px-7 py-3 text-sm tracking-[0.25em] uppercase font-mono-ui transition-all"
              style={{
                color: "hsl(var(--accent))",
                border: "1px solid hsl(var(--accent) / 0.5)",
                background: "hsl(var(--accent) / 0.04)",
              }}
            >
              <span className="relative z-10">Send Signal</span>
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow text-cyan-accent/70"
        style={{ zIndex: 10 }}
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
};
