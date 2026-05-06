import { useMemo } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const METRICS = [
  { n: "12", l: "Projects Completed" },
  { n: "18", l: "Tech Tools Used" },
  { n: "847", l: "GitHub Commits" },
  { n: "8", l: "Countries Explored" },
];

const HOURS = [
  { name: "Python", hours: 12 },
  { name: "SQL", hours: 8 },
  { name: "Spark", hours: 6 },
  { name: "Airflow", hours: 5 },
  { name: "dbt", hours: 4 },
  { name: "GCP", hours: 3 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded px-3 py-2 text-sm"
      style={{ background: "#0a0f1e", border: "1px solid #00d4aa" }}
    >
      <div className="text-foreground font-medium">{label}</div>
      <div style={{ color: "#00d4aa" }}>{payload[0].value} hrs/week</div>
    </div>
  );
};

export const DataLab = () => {
  const heatmap = useMemo(
    () => Array.from({ length: 52 * 7 }).map(() => Math.random()),
    []
  );

  return (
    <section id="datalab" className="relative py-[100px] px-6" style={{ zIndex: 5 }}>
      <div className="container mx-auto max-w-6xl">
        <SectionHeader eyebrow="06 / DATA LAB" title="About Me, In Numbers" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {METRICS.map((m) => (
            <div
              key={m.l}
              className="rounded-lg p-6 text-center"
              style={{
                background: "#111827",
                borderTop: "2px solid #00d4aa",
                border: "0.5px solid rgba(255,255,255,0.06)",
                borderTopWidth: 2,
                borderTopColor: "#00d4aa",
              }}
            >
              <div className="font-bold mb-1" style={{ fontSize: 48, color: "#00d4aa" }}>
                {m.n}
              </div>
              <div className="text-muted-foreground" style={{ fontSize: 13 }}>{m.l}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div
            className="rounded-lg p-6"
            style={{ background: "#111827", border: "0.5px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: "#00d4aa" }}>
              Weekly Hours by Tech
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={HOURS} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="rgba(232,240,255,0.5)" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="rgba(232,240,255,0.5)" fontSize={12} width={70} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,212,170,0.1)" }} />
                <Bar dataKey="hours" fill="#00d4aa" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div
            className="rounded-lg p-6"
            style={{ background: "#111827", border: "0.5px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: "#00d4aa" }}>
              Contribution Activity
            </p>
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(52, 1fr)",
                gridAutoRows: 10,
                gap: 2,
              }}
            >
              {heatmap.map((v, i) => (
                <div
                  key={i}
                  style={{
                    background: `rgba(0,212,170,${0.1 + v * 0.9})`,
                    borderRadius: 2,
                    width: "100%",
                    height: 10,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">Last 52 weeks · simulated data</p>
          </div>
        </div>
      </div>
    </section>
  );
};
