export const Footer = () => (
  <footer
    className="relative pt-12 pb-8 px-6 mt-12 speed-lines"
    style={{ borderTop: "2px solid #0A0A0A", background: "#FAFAF8" }}
  >
    <div className="container mx-auto max-w-4xl text-center">
      <div className="manga-rule mb-6" />
      <p className="font-display text-xs md:text-sm tracking-[0.4em] text-ink mb-3">
        ─── END OF VOLUME 01 ───
      </p>
      <p className="font-jp text-base md:text-lg text-ink mb-2">
        Made by Kung with <span style={{ color: "#C0392B" }}>❤</span> · {new Date().getFullYear()}
      </p>
      <p className="font-mono-ui text-[11px] tracking-[0.2em] text-stone uppercase mb-1">
        CUNG-MASTER © All Rights Reserved
      </p>
      <p className="font-mono-ui text-[11px] tracking-[0.2em] text-stone uppercase">
        Built with React · Vite · Notion · Supabase
      </p>
      <div className="manga-rule mt-6 mb-3" />
      <p className="font-display text-[9px] tracking-[0.5em] text-stone">
        WEZAEMON CODEX v2.0.0
      </p>
    </div>
  </footer>
);
