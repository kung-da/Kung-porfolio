export const Footer = () => (
  <footer className="relative py-16 px-6" style={{ zIndex: 5 }}>
    <div className="container mx-auto max-w-6xl">
      <div
        className="h-px mb-10"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)" }}
      />
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-sm md:text-base font-mono-ui tracking-[0.25em] uppercase flex items-center gap-2">
          <span className="text-muted-foreground">Made by</span>
          <span className="text-cyan-accent text-glow-cyan font-bold text-lg">KUNG</span>
          <span className="text-muted-foreground">with</span>
          <span className="text-sakura text-glow-sakura text-lg">❤</span>
        </p>
        <p className="text-[10px] font-mono-ui tracking-[0.3em] text-muted-foreground/50 uppercase">
          // SESSION · cung-master · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  </footer>
);
