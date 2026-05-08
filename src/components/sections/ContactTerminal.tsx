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
    await new Promise((r) => setTimeout(r, 1200)); // Simulate transmission delay
    setTxId(Math.random().toString(16).slice(2, 10).toUpperCase());
    setSuccess(true);
    toast.success("Message Transmitted");
    setSending(false);
  };

  const inputStyle: React.CSSProperties = {
    background: "#000",
    border: "1px solid #1a1a2e",
    color: "#00D4FF",
    padding: "8px 12px",
    width: "100%",
    outline: "none",
    fontFamily: "monospace",
    fontSize: "13px",
    transition: "all 0.2s ease",
  };

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 bg-[#050510] overflow-hidden text-[#E0E0E0]">
      {/* Animated Vertical Scan Lines */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[length:100%_4px] bg-[linear-gradient(transparent_50%,rgba(0,212,255,0.25)_50%)] animate-[scan_10s_linear_infinite]" 
        style={{ animation: "scan 10s linear infinite" }}
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="mb-16">
          <p className="font-mono text-[11px] text-[#00D4FF] mb-2 tracking-wider">
            // COMMS_TERMINAL.SH
          </p>
          <div className="w-full h-[1px] bg-[#00D4FF] mb-4" />
          <h2 className="font-bold text-3xl md:text-4xl tracking-widest text-[#E0E0E0]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            OPEN CHANNEL — TRANSMIT REQUEST
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Terminal Status */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="border border-[#1a1a2e] bg-[#070710] p-6 mb-8 font-mono text-[12px] text-[#00D4FF] leading-relaxed">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }}>&gt; WEZAEMON STATUS: [ACTIVE <span className="text-[#00FF88] animate-pulse">●</span>]</motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>&gt; LOCATION: HO CHI MINH CITY, VN</motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }}>&gt; TIMEZONE: ICT (UTC+7)</motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.0 }}>&gt; RESPONSE TIME: &lt; 24 HOURS</motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.3 }}>&gt; ENCRYPTION: AES-256 ACTIVE</motion.div>
            </div>

            <div className="w-full h-[1px] bg-[#1a1a2e] mb-8 relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-[#050510] text-[#1a1a2e] text-[10px] font-mono">+++</div>
            </div>

            <div className="flex flex-col gap-3 font-mono text-[12px]">
              <a href="https://github.com/kung-da" target="_blank" rel="noreferrer" className="border border-[#00D4FF33] text-[#00D4FF88] p-3 hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all bg-[#000]">
                [ $ ./connect --github ]
              </a>
              <a href="https://linkedin.com/in/cung" target="_blank" rel="noreferrer" className="border border-[#00D4FF33] text-[#00D4FF88] p-3 hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all bg-[#000]">
                [ $ ./connect --linkedin ]
              </a>
              <a href="mailto:hello@cung-master.dev" className="border border-[#00D4FF33] text-[#00D4FF88] p-3 hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all bg-[#000]">
                [ $ ./connect --email ]
              </a>
            </div>
          </motion.div>

          {/* Right: Transmission Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {success ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className="h-full flex flex-col items-center justify-center border border-[#00D4FF44] bg-[#00D4FF0A] p-8 text-center"
              >
                <div className="font-mono text-[13px] text-[#00D4FF] mb-4 typewriter-glitch">
                  &gt; MESSAGE RECEIVED. WEZAEMON WILL RESPOND.
                </div>
                <div className="font-mono text-[11px] text-[#7899aa]">
                  &gt; TRANSMISSION ID: [{txId}]
                </div>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5 bg-[#070710] border border-[#1a1a2e] p-6">
                <div>
                  <label className="block font-mono text-[11px] text-[#00D4FF] mb-2">&gt; SENDER_NAME:</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 8px #00D4FF22"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1a1a2e"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-[#00D4FF] mb-2">&gt; CONTACT_EMAIL:</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 8px #00D4FF22"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1a1a2e"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-[#00D4FF] mb-2">&gt; MISSION_TYPE:</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    style={{ ...inputStyle, appearance: "none" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 8px #00D4FF22"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1a1a2e"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <option>Data</option>
                    <option>AI</option>
                    <option>Fullstack</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-[#00D4FF] mb-2">&gt; MESSAGE:</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#00D4FF"; e.currentTarget.style.boxShadow = "0 0 8px #00D4FF22"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#1a1a2e"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full mt-4 border border-[#00D4FF] bg-transparent text-[#00D4FF] py-3 font-mono text-[13px] tracking-widest transition-all duration-200 hover:bg-[#00D4FF] hover:text-[#000]"
                  style={{ cursor: sending ? "wait" : "pointer" }}
                >
                  {sending ? "[ TRANSMITTING... ]" : "[ TRANSMIT MESSAGE → ]"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0% { background-position: 0 0; }
          100% { background-position: 0 100vh; }
        }
        .typewriter-glitch {
          animation: glitch 1s linear infinite;
        }
        @keyframes glitch {
          2%, 64% { transform: translate(2px, 0) skew(0deg); }
          4%, 60% { transform: translate(-2px, 0) skew(0deg); }
          62% { transform: translate(0, 0) skew(5deg); }
        }
      `}</style>
    </section>
  );
};
