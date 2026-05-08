export const Footer = () => (
  <footer
    className="relative pt-16 pb-12 px-6 bg-[#050505] overflow-hidden"
  >
    {/* Scanline overlay */}
    <div className="absolute inset-0 z-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />

    <div className="container mx-auto max-w-4xl text-center relative z-10">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8102E] to-transparent mb-8 opacity-50" />
      
      <p className="font-display text-xs md:text-sm tracking-[0.4em] text-[#E0E0E0] mb-4">
        ─── <span className="text-[#00f5ff]">END OF TRANSMISSION</span> ───
      </p>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-6 font-mono text-[10px] tracking-[0.2em] uppercase text-[#888888]">
        <p className="hover:text-[#00f5ff] transition-colors cursor-default">
          <span className="text-[#C8102E]">&gt;</span> FORGED BY KUNG · {new Date().getFullYear()}
        </p>
        <p className="hidden md:block text-[#333333]">|</p>
        <p className="hover:text-[#00f5ff] transition-colors cursor-default">
          <span className="text-[#C8102E]">&gt;</span> CUNG-MASTER © ALL RIGHTS RESERVED
        </p>
      </div>

      <p className="font-mono text-[9px] tracking-[0.3em] text-[#333333] uppercase">
        POWERED BY: REACT // VITE // TAILWIND // FRAMER MOTION
      </p>
      
      <div className="w-24 h-[1px] bg-[#C8102E] mx-auto mt-8 mb-4 shadow-[0_0_8px_#C8102E]" />
      
      <p className="font-display text-[9px] tracking-[0.5em] text-[#00f5ff] drop-shadow-[0_0_5px_rgba(0,245,255,0.5)]">
        WEZAEMON CODEX v2.0.0
      </p>
    </div>
  </footer>
);
