import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Github, Linkedin, Mail } from "lucide-react";

export const ContactTerminal = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setLog((l) => [...l, "> TRANSMITTING MESSAGE TO TOMBGUARD..."]);
    await new Promise((r) => setTimeout(r, 900));
    setLog((l) => [
      ...l,
      "> ENCRYPTION: SECURE",
      "> TRANSMISSION SUCCESSFUL",
      "> STANDBY FOR RESPONSE...",
    ]);
    toast.success("Signal transmitted to the Hidden Garden.");
    setForm({ name: "", email: "", message: "" });
    setSending(false);
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(10, 10, 10, 0.5)",
    border: "1px solid #333333",
    color: "#00f5ff",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 14,
    transition: "all 0.3s ease",
  };

  return (
    <section id="terminal" className="relative py-24 px-6 bg-[#050505] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8102E]/30 to-transparent" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#C8102E] uppercase mb-2">
            // COMMUNICATION LINK
          </p>
          <h2 className="font-black text-3xl md:text-5xl uppercase tracking-widest text-[#E0E0E0] drop-shadow-[0_0_8px_rgba(200,16,46,0.3)]">
            Command <span className="text-[#C8102E]">Terminal</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 md:gap-12">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0A0A] border border-[#333333] p-6 md:p-8 relative shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            {/* Scanner line effect */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00f5ff]/20 shadow-[0_0_10px_#00f5ff] animate-[scan_3s_linear_infinite]" style={{ animation: "scan 3s linear infinite" }} />

            <div className="font-mono text-[10px] text-[#00f5ff] mb-6 tracking-wider leading-relaxed p-4 bg-[#050505] border border-[#333333]">
              <div>&gt; ESTABLISHING SECURE CHANNEL...</div>
              <div>&gt; TARGET: WEZAEMON COMMANDER</div>
              <div>&gt; ENCRYPTION: <span className="animate-blink text-[#C8102E]">ACTIVE</span></div>
            </div>

            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block mb-2 uppercase">Sender ID</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00f5ff"; e.currentTarget.style.boxShadow = "0 0 15px rgba(0,245,255,0.15)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#333333"; e.currentTarget.style.boxShadow = "none"; }}
                  placeholder="Enter your designation..."
                  className="placeholder:text-[#333333]"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block mb-2 uppercase">Frequency / Comm Link</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00f5ff"; e.currentTarget.style.boxShadow = "0 0 15px rgba(0,245,255,0.15)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#333333"; e.currentTarget.style.boxShadow = "none"; }}
                  placeholder="Enter your email frequency..."
                  className="placeholder:text-[#333333]"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] text-[#888888] block mb-2 uppercase">Transmission Data</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#00f5ff"; e.currentTarget.style.boxShadow = "0 0 15px rgba(0,245,255,0.15)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#333333"; e.currentTarget.style.boxShadow = "none"; }}
                  placeholder="Encode your message here..."
                  className="placeholder:text-[#333333]"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full relative overflow-hidden group border border-[#C8102E] bg-transparent text-[#C8102E] px-6 py-4 uppercase font-mono tracking-[0.25em] text-xs transition-all duration-300 hover:text-[#E0E0E0] hover:shadow-[0_0_20px_rgba(200,16,46,0.4)]"
                style={{ cursor: sending ? "wait" : "pointer" }}
              >
                <span className="relative z-10 transition-colors duration-300">
                  {sending ? ">> TRANSMITTING" : "[ TRANSMIT SIGNAL ]"}
                </span>
                <div className="absolute inset-0 bg-[#C8102E] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
              </button>

              {log.length > 0 && (
                <div className="font-mono text-[10px] mt-6 p-4 bg-[#050505] border border-[#333333] text-[#00f5ff] leading-relaxed">
                  {log.map((l, i) => (
                    <div key={i}>{l}</div>
                  ))}
                </div>
              )}
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Direct Channels */}
            <div className="bg-[#0A0A0A] border border-[#333333] p-6 relative">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[#C8102E] uppercase mb-4">DIRECT CHANNELS</p>
              <div className="w-full h-[1px] bg-gradient-to-r from-[#333333] to-transparent mb-6" />
              <ul className="font-mono text-xs space-y-4 text-[#C0C0C0]">
                <li>
                  <a href="#" className="flex items-center gap-3 hover:text-[#00f5ff] transition-colors group">
                    <Mail size={16} className="text-[#888888] group-hover:text-[#00f5ff] transition-colors" />
                    <span>hello@cung-master.dev</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 hover:text-[#00f5ff] transition-colors group">
                    <Github size={16} className="text-[#888888] group-hover:text-[#00f5ff] transition-colors" />
                    <span>github.com/kung-da</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 hover:text-[#00f5ff] transition-colors group">
                    <Linkedin size={16} className="text-[#888888] group-hover:text-[#00f5ff] transition-colors" />
                    <span>linkedin.com/in/cung</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Availability */}
            <div className="bg-[#0A0A0A] border border-[#333333] p-6 relative">
              <p className="font-mono text-[10px] tracking-[0.3em] text-[#C8102E] uppercase mb-4">SYSTEM STATUS</p>
              <div className="w-full h-[1px] bg-gradient-to-r from-[#333333] to-transparent mb-6" />
              
              <div className="font-mono text-[11px] p-3 inline-flex items-center gap-3 bg-[#050505] border border-[#333333] text-[#00f5ff] tracking-wider shadow-[0_0_10px_rgba(0,245,255,0.1)]">
                <span className="animate-blink">●</span> READY FOR COMBAT
              </div>

              <p className="font-mono text-[9px] text-[#888888] mt-6 tracking-[0.2em] uppercase">
                ESTIMATED RESPONSE LATENCY: &lt; 24 HOURS
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(600px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
