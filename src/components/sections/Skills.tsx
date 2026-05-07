import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";

const CATEGORIES = [
  {
    name: "Languages",
    skills: [
      { name: "Python", value: 90 },
      { name: "SQL", value: 88 },
      { name: "Scala", value: 72 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Apache Spark", value: 82 },
      { name: "Airflow", value: 85 },
      { name: "dbt", value: 78 },
      { name: "Kafka", value: 70 },
    ],
  },
  {
    name: "Cloud",
    skills: [
      { name: "AWS", value: 75 },
      { name: "GCP", value: 80 },
    ],
  },
  {
    name: "Visualization",
    skills: [
      { name: "PowerBI", value: 80 },
      { name: "Metabase", value: 85 },
    ],
  },
];

const SkillBar = ({ name, value, visible }: { name: string; value: number; visible: boolean }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1.5">
      <span className="text-foreground">{name}</span>
      <span className="text-muted-foreground">{value}%</span>
    </div>
    <div
      className="w-full rounded-full overflow-hidden"
      style={{ height: 6, background: "#1a2540" }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: visible ? `${value}%` : "0%",
          background: "linear-gradient(to right, #00BFFF, #f2a7c3)",
          boxShadow: "0 0 8px #00BFFF",
          transition: "width 1.2s ease",
        }}
      />
    </div>
  </div>
);

export const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="relative py-[100px] px-6" style={{ zIndex: 5 }}>
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <SectionHeader
          eyebrow="03 / SKILLS"
          title="Power Level"
          subtitle={<span className="font-jp">スキル</span>}
        />

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {CATEGORIES.map((cat) => (
            <div key={cat.name}>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#00BFFF" }}>
                {cat.name}
              </p>
              {cat.skills.map((s) => (
                <SkillBar key={s.name} {...s} visible={visible} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
