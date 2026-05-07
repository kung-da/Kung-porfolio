import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import profilePic from "@/assets/profile-picture.jpg";

const WORDS = ["Data Engineer", "Pipeline Builder", "World Explorer"];

const Typewriter = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIdx];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), 2000);
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
    }, deleting ? 50 : 80);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx]);

  return (
    <span className="font-mono" style={{ color: "#00BFFF" }}>
      {text}
      <span className="animate-blink" style={{ color: "#00BFFF" }}>|</span>
    </span>
  );
};

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const particles = Array.from({ length: 20 }).map((_, i) => ({
    size: 2 + Math.random() * 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: 0.2 + Math.random() * 0.2,
    delay: Math.random() * 4,
    duration: 3 + Math.random() * 4,
    key: i,
  }));

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "100vh" }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.key}
          className="absolute rounded-full animate-pulse-soft"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: "#00BFFF",
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Mountain layers */}
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "40vh", transform: `translateY(${scrollY * 0.1}px)`, zIndex: 2 }}
      >
        <path d="M0,400 L0,250 L200,150 L400,220 L600,120 L800,200 L1000,140 L1200,210 L1440,170 L1440,400 Z" fill="#0d1535" />
      </svg>
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "45vh", transform: `translateY(${scrollY * 0.2}px)`, zIndex: 3 }}
      >
        <path d="M0,400 L0,300 L150,200 L350,280 L550,180 L750,260 L950,200 L1150,290 L1440,230 L1440,400 Z" fill="#111d3d" />
      </svg>
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "50vh", transform: `translateY(${scrollY * 0.3}px)`, zIndex: 4 }}
      >
        <path d="M0,400 L0,340 L120,260 L300,330 L500,250 L700,320 L900,260 L1100,340 L1440,290 L1440,400 Z" fill="#162347" />
      </svg>

      {/* Content */}
      <div className="relative text-center px-6 flex flex-col items-center" style={{ zIndex: 10 }}>
        <div
          className="relative mb-6 rounded-full p-1"
          style={{
            background: "linear-gradient(135deg, #00BFFF, #FF1493)",
            boxShadow: "0 0 30px rgba(0,191,255,0.7), 0 0 60px rgba(255,20,147,0.4)",
          }}
        >
          <img
            src={profilePic}
            alt="Avatar"
            className="rounded-full object-cover"
            style={{ width: 128, height: 128, border: "2px solid #03040d" }}
          />
        </div>

        <p className="font-jp neon-pink mb-3" style={{ fontSize: 18 }}>
          こんにちは, I'm
        </p>
        <h1
          className="font-bold mb-5 gradient-text uppercase"
          style={{ fontSize: "clamp(40px, 8vw, 68px)", letterSpacing: "0.15em" }}
        >
          Data Wanderer
        </h1>
        <div className="text-2xl md:text-3xl mb-4 h-10">
          <Typewriter />
        </div>
        <p className="text-muted-foreground mb-8" style={{ fontSize: 16, letterSpacing: "0.05em" }}>
          Building data pipelines by day · Chasing sunsets by night
        </p>
        <div className="flex flex-wrap justify-center" style={{ gap: 16 }}>
          <a
            href="#projects"
            className="px-6 py-3 rounded-md font-semibold border-2 transition-all hover:bg-teal hover:text-background uppercase tracking-widest neon-glow"
            style={{ borderColor: "#00BFFF", color: "#00BFFF" }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-md font-semibold transition-all hover:opacity-85 uppercase tracking-widest neon-glow-pink"
            style={{ background: "#FF1493", color: "#fff" }}
          >
            Download CV
          </a>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow"
        style={{ zIndex: 10, color: "#00BFFF" }}
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};
