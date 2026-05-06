import { SectionHeader } from "@/components/SectionHeader";
import { Database, Sparkles, GitBranch, BarChart3 } from "lucide-react";

const STAGES = [
  { label: "Raw Data", Icon: Database },
  { label: "Clean", Icon: Sparkles },
  { label: "Transform", Icon: GitBranch },
  { label: "Insight", Icon: BarChart3 },
];

export const About = () => {
  return (
    <section id="about" className="relative py-[100px] px-6" style={{ zIndex: 5 }}>
      <div className="container mx-auto max-w-6xl">
        <SectionHeader eyebrow="02 / ABOUT" title="The Wanderer" />

        <div className="grid md:grid-cols-2 gap-[60px] items-center">
          {/* LEFT */}
          <div className="text-center md:text-left">
            <div
              className="mx-auto md:mx-0 mb-5 rounded-full p-[3px]"
              style={{
                width: 160,
                height: 160,
                background: "linear-gradient(135deg, #00d4aa, #f2a7c3)",
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-4xl font-bold"
                style={{ background: "#0a0f1e", color: "#00d4aa" }}
              >
                DW
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Data Wanderer</h3>
            <p className="text-teal mb-4 text-sm tracking-wider uppercase">Data Engineer · Explorer</p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I build resilient data pipelines that move millions of rows quietly in the background.
              Off the clock, I'm chasing trains through the Japanese countryside, sketching
              mountains, and arguing about the best Studio Ghibli film. Data is my craft —
              wandering is my fuel.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { n: "3+", l: "Years Exp" },
                { n: "12", l: "Projects" },
                { n: "8", l: "Countries" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-lg p-4 text-center"
                  style={{
                    background: "#111827",
                    border: "0.5px solid rgba(0,212,170,0.3)",
                  }}
                >
                  <div className="text-2xl font-bold" style={{ color: "#00d4aa" }}>{s.n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — pipeline */}
          <div>
            <p className="text-sm text-muted-foreground tracking-widest uppercase mb-5">My Data Process</p>
            <div className="flex items-center justify-between flex-wrap gap-y-4">
              {STAGES.map((s, i) => (
                <div key={s.label} className="flex items-center">
                  <div
                    className="rounded-lg px-5 py-3 text-center transition-all hover:-translate-y-1 group"
                    style={{
                      background: "#1a2540",
                      border: "1px solid rgba(0,212,170,0.4)",
                      boxShadow: "0 0 0 transparent",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,170,0.4)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 0 0 transparent")}
                  >
                    <s.Icon size={20} className="mx-auto mb-2" style={{ color: "#00d4aa" }} />
                    <div className="text-xs text-foreground font-medium">{s.label}</div>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="marching-ants mx-2" style={{ width: 32, height: 2 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
