import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { MapPin, Mail, Briefcase, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";

const Sakura = () => {
  const petals = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: i * 3 + Math.random() * 2,
        duration: 12 + Math.random() * 8,
      })),
    []
  );
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {petals.map((p, i) => (
        <div
          key={i}
          className="absolute animate-fall"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: 12,
            height: 20,
            background: "#FF1493",
            opacity: 0.4,
            borderRadius: "60% 40%",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    background: "#1a2540",
    border: "1px solid rgba(0,191,255,0.3)",
    color: "#e8f0ff",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    outline: "none",
  };

  return (
    <section id="contact" className="relative py-[100px] px-6 overflow-hidden" style={{ zIndex: 5 }}>
      <Sakura />
      <div className="container mx-auto max-w-6xl relative">
        <SectionHeader eyebrow="07 / CONTACT" title="Let's Connect" />

        <div className="grid md:grid-cols-2 gap-[60px]">
          <div className="relative">
            <div
              className="font-jp absolute pointer-events-none select-none"
              style={{
                fontSize: 200,
                color: "rgba(255,255,255,0.04)",
                top: -40,
                left: -20,
                lineHeight: 1,
              }}
            >
              繋
            </div>
            <div className="relative">
              <h3 className="text-3xl font-bold text-foreground mb-4">Got a data project?</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether it's a pipeline to build, a dataset to explore, or just want to talk about
                anime and travel — I'm always open to a good conversation.
              </p>
              <div className="space-y-4">
                {[
                  { Icon: MapPin, label: "Location", value: "Ho Chi Minh City, Vietnam" },
                  { Icon: Mail, label: "Email", value: "hello@datawanderer.dev" },
                  { Icon: Briefcase, label: "Available for", value: "Freelance · Full-time" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-4">
                    <div
                      className="rounded-md p-2"
                      style={{ background: "rgba(0,191,255,0.1)", border: "1px solid rgba(0,191,255,0.3)" }}
                    >
                      <row.Icon size={18} style={{ color: "#00BFFF" }} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{row.label}</p>
                      <p className="text-foreground">{row.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={submit} className="space-y-4">
              <input
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00BFFF")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,191,255,0.3)")}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00BFFF")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,191,255,0.3)")}
              />
              <input
                placeholder="Subject"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00BFFF")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,191,255,0.3)")}
              />
              <textarea
                placeholder="Message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#00BFFF")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,191,255,0.3)")}
              />
              <button
                type="submit"
                className="w-full font-bold rounded-lg py-3 transition-transform hover:scale-[1.01]"
                style={{ background: "#00BFFF", color: "#0a0f1e" }}
              >
                Send Message
              </button>
            </form>

            <div className="flex justify-center gap-8 mt-8">
              {[
                { Icon: Github, href: "https://github.com" },
                { Icon: Linkedin, href: "https://linkedin.com" },
                { Icon: Mail, href: "mailto:hello@datawanderer.dev" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-transform hover:scale-125"
                  style={{ color: "#00BFFF" }}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
