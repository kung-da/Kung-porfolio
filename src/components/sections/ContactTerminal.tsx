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
          className="mb-16"
        >
          <p className="font-mono-ui text-[11px] text-crimson mb-2 tracking-widest">
            // COMMS_TERMINAL.SH
          </p>
          <div className="w-full h-[1px] bg-[#FF003C] mb-4 opacity-60" />
          <h2 className="font-display font-bold text-2xl md:text-4xl tracking-widest uppercase">
            INITIATE <span className="text-warn">DUEL</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Terminal Status */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div
              className="border border-[#1a1a2e] bg-[#0A0A0A] p-6 mb-8 font-mono-ui text-[12px] text-cyan-accent leading-relaxed"
              style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
            >
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                &gt; WEZAEMON STATUS: [ACTIVE <span className="text-[#00FF88] animate-pulse">●</span>]
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                &gt; LOCATION: HO CHI MINH CITY, VN
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                &gt; TIMEZONE: ICT (UTC+7)
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                &gt; RESPONSE TIME: &lt; 24 HOURS
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                &gt; ENCRYPTION: AES-256 <span className="text-[#00FF88]">ACTIVE</span>
              </motion.div>
            </div>

            <div className="w-full h-[1px] bg-[#1a1a2e] mb-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-[#050505] text-[#1a1a2e] text-[10px] font-mono-ui">
                +++
              </div>
            </div>

            <div className="flex flex-col gap-3 font-mono-ui text-[11px]">
              {[
                { label: "[ $ ./connect --github ]", href: "https://github.com/kung-da" },
                { label: "[ $ ./connect --linkedin ]", href: "https://linkedin.com/in/cung" },
                { label: "[ $ ./connect --email ]", href: "mailto:hello@cung-master.dev" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#1a1a2e] text-dim p-3 transition-all duration-100 bg-[#0A0A0A] hover:border-[#00F5FF] hover:text-cyan-accent hover:shadow-[0_0_12px_rgba(0,245,255,0.15)] katana-slash overflow-hidden relative"
                  style={{ clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form with Hazard Border */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          >
            {success ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center border border-[#00F5FF33] bg-[#00F5FF08] p-8 text-center"
                style={{ clipPath: "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)" }}
              >
                <div className="font-mono-ui text-[13px] text-cyan-accent mb-4">
                  &gt; MESSAGE RECEIVED. WEZAEMON WILL RESPOND.
                </div>
                <div className="font-mono-ui text-[11px] text-dim">
                  &gt; TX_ID: [{txId}]
                </div>
              </motion.div>
            ) : (
              /* Hazard border wrapper */
              <div className="p-[3px] hazard-border">
                <form
                  onSubmit={submit}
                  className="space-y-5 bg-[#0A0A0A] p-6"
                >
                  {[
                    { label: "root@warden:~# SENDER_NAME", key: "name", type: "text" },
                    { label: "root@warden:~# CONTACT_EMAIL", key: "email", type: "email" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block font-mono-ui text-[10px] text-crimson mb-2 tracking-widest">
                        {field.label}
                      </label>
                      <input
                        required
                        type={field.type}
                        value={(form as any)[field.key]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-[#1a1a2e] text-cyan-accent font-mono-ui text-[13px] py-2 px-1 outline-none transition-all duration-100 focus:border-[#00F5FF] focus:shadow-[0_2px_8px_rgba(0,245,255,0.15)]"
                        style={{ borderRadius: 0 }}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block font-mono-ui text-[10px] text-crimson mb-2 tracking-widest">
                      root@warden:~# MISSION_TYPE
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#1a1a2e] text-cyan-accent font-mono-ui text-[13px] py-2 px-1 outline-none appearance-none transition-all duration-100 focus:border-[#00F5FF]"
                    >
                      <option className="bg-[#0A0A0A]">Data</option>
                      <option className="bg-[#0A0A0A]">AI</option>
                      <option className="bg-[#0A0A0A]">Fullstack</option>
                      <option className="bg-[#0A0A0A]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono-ui text-[10px] text-crimson mb-2 tracking-widest">
                      root@warden:~# MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-[#1a1a2e] text-cyan-accent font-mono-ui text-[13px] py-2 px-1 outline-none resize-vertical transition-all duration-100 focus:border-[#00F5FF]"
                      style={{ borderRadius: 0 }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 border-2 border-[#FF003C] bg-transparent text-crimson py-3 font-mono-ui text-[12px] tracking-[0.3em] uppercase transition-all duration-100 hover:bg-[#FF003C] hover:text-white hover:shadow-[0_0_25px_rgba(255,0,60,0.5)]"
                    style={{
                      cursor: sending ? "wait" : "pointer",
                      clipPath: "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
                      animation: sending ? "pulse-glow 0.5s infinite" : "none",
                    }}
                  >
                    {sending ? "[ TRANSMITTING... ]" : "[ TRANSMIT SIGNAL → ]"}
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
