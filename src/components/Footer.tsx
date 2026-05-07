export const Footer = () => (
  <footer
    className="relative py-10 text-center"
    style={{
      background: "linear-gradient(180deg, transparent, rgba(0,191,255,0.05))",
      borderTop: "1px solid rgba(0,191,255,0.25)",
      zIndex: 5,
    }}
  >
    <p className="text-sm text-muted-foreground mb-3">
      Built with React + Vite · Powered by Notion
    </p>
    <p className="text-base tracking-widest uppercase">
      <span className="text-muted-foreground">Made by </span>
      <span className="neon-text font-bold">Kung</span>
      <span className="text-muted-foreground"> with </span>
      <span className="inline-block animate-heartbeat neon-pink">❤</span>
    </p>
  </footer>
);
