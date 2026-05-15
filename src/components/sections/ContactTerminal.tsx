// ─────────────────────────────────────────────────────────────────────────────
// CONTACT · "SIGNAL" — Secure Transmission Interface
// Typography: improved for readability on dark bg
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Animation variants ────────────────────────────────────────────────────────
const fieldVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

const rightPanelVariants = {
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 260, damping: 22, delay: 0.2 } },
};

// ── Particle field (canvas) ───────────────────────────────────────────────────
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1, w: Math.random() * 2 + 0.5, h: Math.random() * 1 + 0.5,
    }));
    let rafId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        ctx.globalAlpha = p.alpha; ctx.fillStyle = "#00e5ff"; ctx.fillRect(p.x, p.y, p.w, p.h);
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      });
      rafId = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30" />;
};

// ── Terminal input ──────────────────────────────────────────────────────────
interface TermInputProps {
  label: string; fieldId: string; placeholder: string; type?: string;
  value: string; onChange: (v: string) => void; multiline?: boolean; rows?: number; required?: boolean;
}
const TermInput = ({ label, fieldId, placeholder, type = "text", value, onChange, multiline, rows = 4, required }: TermInputProps) => {
  const [focused, setFocused] = useState(false);
  const commonCls = "w-full bg-transparent border-0 border-b font-mono text-sm text-foreground py-3 outline-none transition-colors";
  const borderColor = focused ? "border-wez-cyan" : "border-crimson/40";
  return (
    <div className="relative">
      <label htmlFor={fieldId} className={`block font-mono text-xs tracking-[0.25em] uppercase mb-1.5 transition-colors ${focused ? "text-wez-cyan/90" : "text-crimson/70"}`}>
        {label}:
      </label>
      <div className="relative">
        {multiline ? (
          <textarea id={fieldId} required={required} rows={rows} placeholder={placeholder} value={value}
            onChange={(e) => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className={`${commonCls} ${borderColor} resize-none`} style={{ caretColor: "#00e5ff" }} />
        ) : (
          <input id={fieldId} type={type} required={required} placeholder={placeholder} value={value}
            onChange={(e) => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            className={`${commonCls} ${borderColor}`} style={{ caretColor: "#00e5ff" }} />
        )}
        <motion.div
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 h-px bg-wez-cyan origin-left"
          style={{ boxShadow: "0 0 6px rgba(0,229,255,0.6)" }}
        />
      </div>
    </div>
  );
};

// ── Main ─────────────────────────────────────────────────────────────────────
export const ContactTerminal = () => {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState(false);
  const [txId, setTxId]       = useState("");
  const [flash, setFlash]     = useState(false);

  const ref = useRef<HTMLElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-10%" as any });
  const set = (key: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true); setError(false);
    try {
      await new Promise((r) => setTimeout(r, 1400));
      const id = Math.random().toString(16).slice(2, 10).toUpperCase();
      setTxId(id); setFlash(true);
      setTimeout(() => setFlash(false), 600);
      setSuccess(true);
    } catch {
      setError(true); setTimeout(() => setError(false), 3000);
    } finally { setSending(false); }
  };

  const COMM_LINKS = [
    { label: "GITHUB",      href: "https://github.com/kung-da",  icon: "⎇" },
    { label: "LINKEDIN",    href: "https://linkedin.com/in/cung", icon: "in" },
    { label: "EMAIL RELAY", href: "mailto:hello@cung-master.dev", icon: "@" },
  ];

  return (
    <>
      <AnimatePresence>
        {flash && (
          <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-white z-[9999] pointer-events-none" />
        )}
      </AnimatePresence>

      <section id="contact" ref={ref} className="relative min-h-screen py-24 px-6 md:px-12 bg-[#050508] overflow-hidden">
        <div className="absolute inset-0 crt-scanlines opacity-[0.02] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(139,0,0,0.08) 0%, transparent 60%)" }} />
        <ParticleField />

        <div className="container mx-auto max-w-5xl relative z-10">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <p className="font-mono text-xs text-crimson mb-2 tracking-widest uppercase">
              // 05 — SIGNAL
            </p>
            <div className="w-16 h-[1px] bg-gradient-to-r from-crimson to-transparent mb-6" />
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase leading-tight mb-6">
              Open <span className="text-wez-cyan">Transmission</span>
            </h2>

            <div className="font-mono text-xs tracking-wider text-wez-cyan/60 flex gap-4 md:gap-6 flex-wrap items-center">
              <span>─── WINDOW OPEN ────────</span>
              <span className="text-crimson/60">ENCRYPTION: AES-256</span>
              <span className="text-crimson/60">LATENCY: 12ms</span>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="text-status-active">
                ● UPLINK: ACTIVE
              </motion.span>
            </div>
          </motion.div>

          {/* ── Two-column grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* LEFT — Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border border-wez-cyan/30 bg-wez-cyan/[0.04] p-12 text-center"
                  >
                    <p className="font-display text-lg font-bold text-wez-cyan tracking-[0.2em] mb-4">
                      SIGNAL RECEIVED
                    </p>
                    <p className="font-mono text-sm text-foreground/70 leading-relaxed">
                      WEZAEMON WILL RESPOND.
                    </p>
                    <p className="font-mono text-xs text-wez-cyan/50 mt-5">TX_ID: [{txId}]</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} className="flex flex-col gap-7">
                    {[
                      { label: "SENDER_ID",    key: "name"  as const, placeholder: "ENTER DESIGNATION...", type: "text" },
                      { label: "SUBJECT_LINE", key: "email" as const, placeholder: "RELAY ADDRESS...",      type: "email" },
                    ].map((f, i) => (
                      <motion.div key={f.key} custom={i} variants={fieldVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
                        <TermInput fieldId={`contact-${f.key}`} label={f.label} placeholder={f.placeholder} type={f.type}
                          value={form[f.key]} onChange={set(f.key)} required />
                      </motion.div>
                    ))}
                    <motion.div custom={2} variants={fieldVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
                      <TermInput fieldId="contact-message" label="MESSAGE_BODY" placeholder="INITIATE TRANSMISSION..."
                        value={form.message} onChange={set("message")} multiline rows={5} required />
                    </motion.div>

                    <motion.div custom={3} variants={fieldVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
                      <motion.button
                        type="submit"
                        disabled={sending}
                        whileHover={!sending ? { x: 4 } : {}}
                        whileTap={!sending ? { scale: 0.98 } : {}}
                        className={`w-full py-3.5 px-6 font-mono text-sm tracking-[0.25em] uppercase border transition-all relative overflow-hidden flex items-center justify-center gap-3 ${
                          error
                            ? "border-enrage text-enrage bg-enrage/[0.06]"
                            : sending
                              ? "border-border/50 text-muted-foreground"
                              : "border-crimson/50 text-foreground bg-crimson/[0.06] hover:bg-crimson/10 shadow-[0_0_20px_rgba(139,0,0,0.1)]"
                        }`}
                      >
                        {sending && (
                          <motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 1.4, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-px bg-wez-cyan" style={{ boxShadow: "0 0 6px rgba(0,229,255,0.8)" }} />
                        )}
                        {error ? "⚡ UPLINK FAILED. RETRY." : sending ? "TRANSMITTING..." : "◈ TRANSMIT ──────────▶"}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT — Comm links */}
            <motion.div variants={rightPanelVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="flex flex-col gap-6">
              <div>
                <p className="font-mono text-xs text-wez-cyan/60 tracking-[0.2em] uppercase mb-3">
                  AVAILABLE COMM CHANNELS
                </p>
                <div className="h-px bg-border/30 mb-5" />
                {COMM_LINKS.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 py-3 border-b border-border/20 no-underline transition-colors group"
                  >
                    <div className="w-2 h-2 bg-crimson/60 rounded-full flex-shrink-0 group-hover:bg-crimson transition-colors" />
                    <span className="font-mono text-xs text-wez-cyan/60 tracking-wider w-5 flex-shrink-0">{l.icon}</span>
                    <span className="font-mono text-sm text-foreground/70 tracking-[0.2em] uppercase group-hover:text-foreground/90 transition-colors">
                      {l.label}
                    </span>
                    <span className="font-mono text-sm text-crimson/40 ml-auto">→</span>
                  </motion.a>
                ))}
              </div>

              <div className="h-px bg-border/20" />

              {/* Location */}
              <div>
                <p className="font-mono text-xs text-crimson/70 tracking-[0.2em] uppercase mb-3">LOCATION NODE:</p>
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-status-active flex-shrink-0"
                    style={{ boxShadow: "0 0 10px rgba(0,255,136,0.5)" }}
                  />
                  <div>
                    <p className="font-mono text-sm text-foreground/85 tracking-wider">Vietnam — South Sector</p>
                    <p className="font-mono text-xs text-wez-cyan/50 tracking-wider mt-0.5">ICT (UTC+7) · Response &lt; 24H</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
