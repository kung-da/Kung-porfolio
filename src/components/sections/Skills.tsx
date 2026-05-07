import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Cpu, Database, Cloud, GitBranch, Zap, Layers, Box, Activity, Hexagon, Terminal } from "lucide-react";

interface Ability {
  name: string;
  tier: "S" | "A" | "B";
  level: number;
  Icon: any;
  desc: string;
}

const TREES: { branch: string; jp: string; subtitle: string; abilities: Ability[] }[] = [
  {
    branch: "Combat Arts",
    jp: "鍛冶",
    subtitle: "Core Languages & Frameworks",
    abilities: [
      { name: "Python", tier: "S", level: 90, Icon: Cpu, desc: "Primary weapon" },
      { name: "SQL", tier: "S", level: 88, Icon: Database, desc: "Query mastery" },
      { name: "Scala", tier: "B", level: 72, Icon: Box, desc: "JVM forging" },
    ],
  },
  {
    branch: "Forbidden Spells",
    jp: "禁術",
    subtitle: "Big Data · Hadoop · ML Pipeline",
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
    subtitle: "Cloud Architecture & Infra",
    abilities: [
      { name: "AWS", tier: "B", level: 75, Icon: Cloud, desc: "Sky domain" },
      { name: "GCP", tier: "A", level: 80, Icon: Cloud, desc: "Sky domain" },
      { name: "Lakehouse", tier: "A", level: 80, Icon: Layers, desc: "Architecture" },
    ],
  },
];

const TIER_COLOR: Record<Ability["tier"], string> = {
  S: "hsl(var(--accent))",
  A: "hsl(var(--primary))",
  B: "hsl(0 0% 70%)",
};

const TIER_GLOW: Record<Ability["tier"], string> = {
  S: "0 0 12px hsl(var(--accent) / 0.5)",
  A: "0 0 12px hsl(var(--primary) / 0.4)",
  B: "none",
};

const AbilityCard = ({ a, visible, idx }: { a: Ability; visible: boolean; idx: number }) => {
  const color = TIER_COLOR[a.tier];
  return (
    <motion.div
      className="hud-panel p-4 group transition-all duration-300 hover:-translate-y-1 crt-overlay"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.08, duration: 0.5 }}
      style={{ borderColor: visible ? `${color.replace(")", " / 0.3)")}` : undefined }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = TIER_GLOW[a.tier]; e.currentTarget.style.borderColor = color.replace(")", " / 0.6)"); }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = ""; }}
    >
      <div className="flex items-start gap-3">
        {/* Hex icon container */}
        <div className="shrink-0 w-11 h-11 flex items-center justify-center relative">
          <Hexagon size={44} className="absolute inset-0" style={{ color: `${color.replace(")", " / 0.2)")}` }} strokeWidth={1} />
          <a.Icon size={16} style={{ color }} className="relative z-10" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-display tracking-wider text-foreground truncate">{a.name}</h4>
            <span
              className="text-[10px] font-mono-ui font-bold px-2 py-0.5"
              style={{
                color,
                border: `1px solid ${color.replace(")", " / 0.5)")}`,
                background: `${color.replace(")", " / 0.08)")}`,
                clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))",
              }}
            >
              {a.tier}-RANK
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground tracking-wider mt-0.5 font-mono-ui">{a.desc}</p>

          {/* Energy bar */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-[4px] overflow-hidden" style={{ background: "hsl(0 0% 100% / 0.05)" }}>
              <div
                className="h-full transition-all duration-[1.4s] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{
                  width: visible ? `${a.level}%` : "0%",
                  background: `linear-gradient(90deg, ${color}, ${color.replace(")", " / 0.4)")})`,
                  boxShadow: `0 0 10px ${color.replace(")", " / 0.6)")}`,
                  transitionDelay: `${idx * 80 + 300}ms`,
                }}
              />
            </div>
            <span className="text-[10px] font-mono-ui text-muted-foreground w-8 text-right">{a.level}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
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

        {/* Terminal header */}
        <motion.div
          className="mb-8 p-3 font-mono-ui text-[11px]"
          style={{ background: "hsl(0 0% 0% / 0.4)", border: "1px solid hsl(0 0% 100% / 0.06)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Terminal size={12} className="text-cyan-accent" />
            <span className="text-cyan-accent">cung-master@nexus</span>:<span className="text-sakura">~</span>$ skill --list --verbose
          </div>
          <div className="text-muted-foreground/60">
            [INFO] Loading ability tree for entity hadoopcung...
            <span className="text-green-400 ml-2">✓ 10 skills loaded</span>
          </div>
        </motion.div>

        <div className="space-y-12">
          {TREES.map((tree, treeIdx) => (
            <motion.div
              key={tree.branch}
              initial={{ opacity: 0, x: treeIdx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: treeIdx * 0.15 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="font-jp text-sakura/70 text-2xl">{tree.jp}</span>
                <div>
                  <h3 className="text-sm font-display tracking-[0.4em] text-silver uppercase">{tree.branch}</h3>
                  <p className="text-[10px] font-mono-ui text-muted-foreground tracking-wider">{tree.subtitle}</p>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tree.abilities.map((a, i) => (
                  <AbilityCard key={a.name} a={a} visible={visible} idx={treeIdx * 4 + i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
