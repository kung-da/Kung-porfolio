import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Cpu, Database, Cloud, GitBranch, Zap, Layers, Box, Activity } from "lucide-react";

interface Ability {
  name: string;
  tier: "S" | "A" | "B";
  level: number;
  Icon: any;
  desc: string;
}

const TREES: { branch: string; jp: string; abilities: Ability[] }[] = [
  {
    branch: "Core Forge",
    jp: "鍛冶",
    abilities: [
      { name: "Python", tier: "S", level: 90, Icon: Cpu, desc: "Primary weapon" },
      { name: "SQL", tier: "S", level: 88, Icon: Database, desc: "Query mastery" },
      { name: "Scala", tier: "B", level: 72, Icon: Box, desc: "JVM forging" },
    ],
  },
  {
    branch: "Pipeline Arts",
    jp: "流派",
    abilities: [
      { name: "Apache Spark", tier: "A", level: 82, Icon: Zap, desc: "Distributed strike" },
      { name: "Airflow", tier: "A", level: 85, Icon: GitBranch, desc: "Orchestration" },
      { name: "Kafka", tier: "B", level: 70, Icon: Activity, desc: "Stream conduit" },
      { name: "dbt", tier: "A", level: 78, Icon: Layers, desc: "Transform craft" },
    ],
  },
  {
    branch: "Cloud Sigil",
    jp: "天空",
    abilities: [
      { name: "AWS", tier: "B", level: 75, Icon: Cloud, desc: "Sky domain" },
      { name: "GCP", tier: "A", level: 80, Icon: Cloud, desc: "Sky domain" },
      { name: "Lakehouse", tier: "A", level: 80, Icon: Layers, desc: "Architecture" },
    ],
  },
];

const TIER_COLOR: Record<Ability["tier"], string> = {
  S: "hsl(var(--accent))",   // sakura — legendary
  A: "hsl(var(--primary))",  // cyan — rare
  B: "hsl(0 0% 70%)",        // silver — common
};

const AbilityCard = ({ a, visible, idx }: { a: Ability; visible: boolean; idx: number }) => {
  const color = TIER_COLOR[a.tier];
  return (
    <div
      className="hud-panel p-4 group transition-all duration-500 hover:-translate-y-1 sweep-border"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${idx * 60}ms`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="shrink-0 w-10 h-10 flex items-center justify-center"
          style={{
            background: `${color.replace(")", " / 0.08)")}`,
            border: `1px solid ${color.replace(")", " / 0.4)")}`,
          }}
        >
          <a.Icon size={18} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-display tracking-wider text-foreground truncate">{a.name}</h4>
            <span
              className="text-[10px] font-mono-ui font-bold px-1.5 py-0.5"
              style={{
                color,
                border: `1px solid ${color.replace(")", " / 0.5)")}`,
                background: `${color.replace(")", " / 0.05)")}`,
              }}
            >
              {a.tier}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground tracking-wider mt-0.5">{a.desc}</p>

          {/* Level bar */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-[3px] bg-white/5 overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: visible ? `${a.level}%` : "0%",
                  background: `linear-gradient(90deg, ${color}, ${color.replace(")", " / 0.3)")})`,
                  boxShadow: `0 0 8px ${color.replace(")", " / 0.6)")}`,
                  transition: "width 1.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  transitionDelay: `${idx * 60 + 200}ms`,
                }}
              />
            </div>
            <span className="text-[10px] font-mono-ui text-muted-foreground w-8 text-right">{a.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-[120px] px-6" style={{ zIndex: 5 }}>
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <SectionHeader
          eyebrow="03 / ABILITY TREE"
          title="System Mastery"
          subtitle={<span className="font-jp">能力</span>}
        />

        <div className="space-y-12">
          {TREES.map((tree, treeIdx) => (
            <div key={tree.branch}>
              <div className="flex items-center gap-4 mb-5">
                <span className="font-jp text-sakura/70 text-2xl">{tree.jp}</span>
                <h3 className="text-sm font-display tracking-[0.4em] text-silver uppercase">{tree.branch}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tree.abilities.map((a, i) => (
                  <AbilityCard key={a.name} a={a} visible={visible} idx={treeIdx * 4 + i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
