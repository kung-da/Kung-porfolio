export const Footer = () => (
  <footer className="relative py-12 px-6" style={{ zIndex: 5 }}>
    <div className="container mx-auto max-w-6xl">
      <div className="h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)" }} />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-mono-ui tracking-[0.3em] text-muted-foreground uppercase">
          // SESSION · 風来人 · {new Date().getFullYear()}
        </p>
        <p className="text-xs font-mono-ui tracking-[0.25em] uppercase flex items-center gap-2">
          <span className="text-muted-foreground">Made by</span>
          <span className="text-cyan-accent text-glow-cyan font-bold">KUNG</span>
          <span className="text-muted-foreground">with</span>
          <span className="text-sakura text-glow-sakura">❤</span>
        </p>
        <p className="text-[10px] font-mono-ui tracking-[0.3em] text-muted-foreground uppercase">
          REACT · TAILWIND · FRAMER
        </p>
      </div>
    </div>
  </footer>
);
