import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SectionHeader } from "@/components/SectionHeader";

export const ContactTerminal = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setLog((l) => [...l, "> TRANSMITTING..."]);
    await new Promise((r) => setTimeout(r, 900));
    setLog((l) => [
      ...l,
      "> TRANSMISSION SUCCESSFUL",
      "> MESSAGE RECEIVED BY CUNG-MASTER",
      "> STANDBY FOR RESPONSE...",
    ]);
    toast.success("Message transmitted");
    setForm({ name: "", email: "", message: "" });
    setSending(false);
  };

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #0A0A0A",
    color: "#0A0A0A",
    padding: "8px 4px",
    width: "100%",
    outline: "none",
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 14,
  };

  return (
    <section id="terminal" className="relative py-24 px-6 bg-washi" style={{ zIndex: 4 }}>
      <div className="container mx-auto max-w-5xl">
        <SectionHeader chapter="05" title="Signal Transmission" jp="通信" />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="manga-panel p-6 md:p-8"
          >
            <div className="font-mono-ui text-xs text-cyan-accent mb-1" style={{ background: "#0A0A0A", padding: 12 }}>
              <div>&gt; ESTABLISHING SECURE CHANNEL...</div>
              <div>&gt; TARGET: CUNG-MASTER</div>
              <div>&gt; ENCRYPTION: <span className="animate-blink">ACTIVE</span></div>
            </div>

            <form onSubmit={submit} className="space-y-6 mt-6">
              <div>
                <label className="chapter-label block mb-1">SENDER ID</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderBottomColor = "#8FEFFF"; e.currentTarget.style.boxShadow = "0 1px 0 #8FEFFF"; }}
                  onBlur={(e) => { e.currentTarget.style.borderBottomColor = "#0A0A0A"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label className="chapter-label block mb-1">FREQUENCY</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => { e.currentTarget.style.borderBottomColor = "#8FEFFF"; e.currentTarget.style.boxShadow = "0 1px 0 #8FEFFF"; }}
                  onBlur={(e) => { e.currentTarget.style.borderBottomColor = "#0A0A0A"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label className="chapter-label block mb-1">MESSAGE</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    ...inputStyle,
                    border: "1px solid #0A0A0A",
                    padding: 10,
                    resize: "vertical",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#8FEFFF"; e.currentTarget.style.boxShadow = "0 0 8px rgba(143,239,255,0.3)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#0A0A0A"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="font-display text-xs tracking-[0.25em] px-6 py-3 transition-all"
                style={{
                  background: "#0A0A0A",
                  color: "#8FEFFF",
                  border: "2px solid #0A0A0A",
                  boxShadow: "4px 4px 0 #8FEFFF",
                  cursor: sending ? "wait" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (sending) return;
                  e.currentTarget.style.background = "#8FEFFF";
                  e.currentTarget.style.color = "#0A0A0A";
                  e.currentTarget.style.boxShadow = "4px 4px 0 #0A0A0A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0A0A0A";
                  e.currentTarget.style.color = "#8FEFFF";
                  e.currentTarget.style.boxShadow = "4px 4px 0 #8FEFFF";
                }}
              >
                {sending ? "> TRANSMITTING..." : "[ TRANSMIT MESSAGE ]"}
              </button>

              {log.length > 0 && (
                <div className="font-mono-ui text-[11px] mt-4 p-3" style={{ background: "#0A0A0A", color: "#8FEFFF" }}>
                  {log.map((l, i) => (
                    <div key={i}>{l}</div>
                  ))}
                </div>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="manga-panel p-6"
          >
            <p className="chapter-label mb-3">DIRECT CHANNELS</p>
            <div className="manga-rule mb-4" />
            <ul className="font-mono-ui text-xs space-y-3 text-ink mb-6">
              <li>📧 hello@cung-master.dev</li>
              <li>⌨ github.com/kung-da</li>
              <li>💼 linkedin.com/in/cung</li>
            </ul>

            <p className="chapter-label mb-3">AVAILABILITY</p>
            <div
              className="font-mono-ui text-xs p-3 inline-flex items-center gap-2"
              style={{ background: "#0A0A0A", color: "#8FEFFF" }}
            >
              <span className="animate-blink">●</span> OPEN TO OPPORTUNITIES
            </div>

            <p className="font-mono-ui text-[11px] text-stone mt-6">
              RESPONSE TIME: &lt; 24 HOURS
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
