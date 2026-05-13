import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const ContactTerminal = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", type: "Data" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txId, setTxId] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setTxId(Math.random().toString(16).slice(2, 10).toUpperCase());
    setSuccess(true);
    toast.success("Signal Transmitted");
    setSending(false);
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 crt-scanlines opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 1.08 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 500, damping: 12 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-xs text-crimson mb-2 tracking-widest uppercase">
            // CONNECT
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-crimson to-transparent mb-6" />
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight uppercase leading-tight">
            Send a <span className="text-wez-cyan">Signal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div
              className="border border-border/60 bg-background/30 backdrop-blur-md p-5 md:p-6 mb-6 md:mb-8 font-mono text-sm text-wez-cyan leading-relaxed space-y-3"
            >
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                &gt; Status: <span className="text-status-active animate-pulse">● ACTIVE</span>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                &gt; Location: HO CHI MINH CITY, VN
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                &gt; Timezone: ICT (UTC+7)
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                &gt; Response: &lt; 24H
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                &gt; Encryption: <span className="text-status-active">AES-256 ACTIVE</span>
              </motion.div>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { label: "GitHub", href: "https://github.com/kung-da", icon: "⎇" },
                { label: "LinkedIn", href: "https://linkedin.com/in/cung", icon: "in" },
                { label: "Email", href: "mailto:hello@cung-master.dev", icon: "@" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-border/60 bg-background/30 backdrop-blur-md text-foreground/80 hover:text-wez-cyan p-4 transition-all duration-200 hover:bg-background/60 hover:border-wez-cyan/60"
                >
                  <span className="font-mono text-xs text-wez-cyan">{link.icon}</span>
                  <span className="font-mono text-xs ml-2">{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
          >
            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center border border-wez-cyan/40 bg-wez-cyan/5 backdrop-blur-md p-8 text-center"
              >
                <div className="font-mono text-base text-wez-cyan mb-3 font-semibold">
                  ✓ Message Received
                </div>
                <div className="font-mono text-xs text-foreground/70">
                  Wezaemon will respond within 24 hours
                </div>
                <div className="font-mono text-xs text-muted-foreground mt-4">
                  TX_ID: [{txId}]
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={submit}
                className="space-y-6"
              >
                {[
                  { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", key: "email", type: "email", placeholder: "your@email.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block font-mono text-xs text-wez-cyan mb-2 tracking-wide uppercase">
                      {field.label}
                    </label>
                    <input
                      required
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(form as any)[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-background/30 backdrop-blur-sm border-b border-border/60 text-foreground placeholder:text-foreground/30 font-mono text-sm py-3 px-1 outline-none transition-all duration-200 focus:border-wez-cyan focus:bg-background/50"
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-mono text-xs text-wez-cyan mb-2 tracking-wide uppercase">
                    Project Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-background/30 backdrop-blur-sm border-b border-border/60 text-foreground font-mono text-sm py-3 px-1 outline-none appearance-none transition-all duration-200 focus:border-wez-cyan focus:bg-background/50"
                  >
                    <option>Data Engineering</option>
                    <option>AI/ML</option>
                    <option>Full Stack</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-wez-cyan mb-2 tracking-wide uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-background/30 backdrop-blur-sm border-b border-border/60 text-foreground placeholder:text-foreground/30 font-mono text-sm py-3 px-1 outline-none resize-none transition-all duration-200 focus:border-wez-cyan focus:bg-background/50"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 border border-crimson bg-transparent text-crimson py-3.5 font-mono text-sm font-semibold tracking-wide uppercase transition-all duration-200 hover:bg-crimson hover:text-background hover:shadow-[0_0_20px_rgba(255,0,60,0.3)]"
                  style={{
                    cursor: sending ? "wait" : "pointer",
                    opacity: sending ? 0.7 : 1,
                  }}
                >
                  {sending ? "TRANSMITTING..." : "SEND SIGNAL"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
