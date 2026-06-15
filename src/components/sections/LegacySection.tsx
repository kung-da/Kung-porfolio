import { useMemo } from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarClock, Database, GitBranch, LineChart, Sparkles } from "lucide-react";
import coastalCatImage from "@/assets/experience/coastal-cat.jpg";
import coastalPortraitImage from "@/assets/experience/coastal-portrait.jpg";
import mirrorPortraitImage from "@/assets/experience/mirror-portrait.jpg";
import redPavilionImage from "@/assets/experience/red-pavilion.jpg";
import vietnamCoastImage from "@/assets/experience/vietnam-coast.jpg";
import vngCampusImage from "@/assets/experience/vng-campus.jpg";
import vngPeopleWallImage from "@/assets/experience/vng-people-wall.jpg";
import { Stack } from "@/components/ui/Stack";

const EXPERIENCE = [
  {
    period: "2025 - Now",
    title: "Data Engineering Focus",
    role: "Pipeline design, ingestion workflows, analytics-ready datasets",
    details: ["Incremental crawlers", "Raw-to-clean data modeling", "Operational dashboards"],
    icon: Database,
  },
  {
    period: "2024 - 2025",
    title: "Frontend Systems",
    role: "Interactive portfolio, UI systems, responsive data storytelling",
    details: ["React interfaces", "Motion systems", "Design implementation"],
    icon: GitBranch,
  },
  {
    period: "Ongoing",
    title: "AI Assisted Builds",
    role: "Combining automation, product thinking, and fast prototyping",
    details: ["Prompt workflows", "Code iteration", "Project documentation"],
    icon: Sparkles,
  },
];

export const LegacySection = () => {
  const experienceCards = useMemo(
    () => [
      {
        image: coastalCatImage,
        label: "Life archive",
        title: "Quiet Moments",
        position: "object-center",
      },
      {
        image: vietnamCoastImage,
        label: "Journey log",
        title: "Vietnam Coast",
        position: "object-center",
      },
      {
        image: coastalPortraitImage,
        label: "Personal archive",
        title: "Open Horizon",
        position: "object-center",
      },
      {
        image: mirrorPortraitImage,
        label: "Profile log",
        title: "Daily Build",
        position: "object-center",
      },
      {
        image: redPavilionImage,
        label: "Journey log",
        title: "Exploration",
        position: "object-center",
      },
      {
        image: vngCampusImage,
        label: "Experience archive",
        title: "VNG Campus",
        position: "object-center",
      },
      {
        image: vngPeopleWallImage,
        label: "Experience archive",
        title: "We Are VNG",
        position: "object-center",
      },
    ].map((card) => (
      <div key={card.title} className="relative h-full w-full overflow-hidden bg-[#050b11]">
        <img
          src={card.image}
          alt={`${card.title} experience`}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover opacity-95 saturate-[0.9] ${card.position}`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(5,5,8,0.92)),radial-gradient(circle_at_70%_20%,rgba(214,58,74,0.12),transparent_34%)]" />
        <div className="absolute inset-x-5 bottom-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-crimson/85">
            {card.label}
          </p>
          <p className="mt-2 font-display text-xl font-bold text-zinc-50">
            {card.title}
          </p>
        </div>
      </div>
    )),
    []
  );

  return (
    <section
      id="experience"
      className="content-section experience-section relative isolate overflow-hidden px-5 text-zinc-100 sm:px-8 lg:px-12 xl:px-16"
      style={{ background: "#000" }}
    >
      <div className="container relative z-10 mx-auto w-full max-w-[1760px]">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="mb-5 md:mb-6"
        >
          <div className="flex max-w-[760px] items-center gap-4">
            <BriefcaseBusiness size={17} className="text-crimson" strokeWidth={1.6} />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-crimson sm:text-sm">
              Experience Log
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-crimson/70 via-crimson/20 to-transparent" />
          </div>

          <h2
            className="section-title mt-3 max-w-4xl font-display text-4xl font-bold uppercase leading-none tracking-[0.04em] text-zinc-50 drop-shadow-[0_0_18px_rgba(214,58,74,0.34)] sm:text-5xl lg:text-6xl"
            data-text="EXPERIENCE"
          >
            Experience
          </h2>
        </motion.header>

        <div className="grid items-start gap-5 xl:grid-cols-[320px_minmax(0,1fr)] 2xl:grid-cols-[350px_minmax(0,1fr)]">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="relative self-start overflow-hidden rounded-[28px] border border-crimson/20 bg-[rgba(5,11,17,0.45)] p-4 shadow-[inset_0_1px_0_rgba(214,58,74,0.08),0_18px_44px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/70 to-transparent" />
            <div className="relative mx-auto aspect-square w-full max-w-[320px]">
              <Stack
                cards={experienceCards}
                randomRotation
                sensitivity={120}
                sendToBackOnClick
                mobileClickOnly
                animationConfig={{ stiffness: 240, damping: 24 }}
              />
            </div>
            <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
              Drag or click to inspect stack
            </p>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="grid content-start gap-3"
          >
            {EXPERIENCE.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden border border-white/[0.08] bg-[rgba(5,11,17,0.72)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_34px_rgba(0,0,0,0.24)] transition-all duration-300 hover:border-wez-cyan/30 hover:bg-[rgba(8,15,23,0.9)]"
                >
                  <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-wez-cyan/50 to-transparent opacity-60" />
                  <div className="grid gap-3 lg:grid-cols-[140px_minmax(0,1fr)]">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-wez-cyan/25 bg-wez-cyan/[0.04] text-wez-cyan">
                        <Icon size={17} strokeWidth={1.7} />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                          Entry {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-1 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-crimson/80">
                          <CalendarClock size={13} strokeWidth={1.7} />
                          {item.period}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-bold leading-tight text-zinc-50 group-hover:text-wez-cyan">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-mono text-sm leading-snug text-zinc-400">
                        {item.role}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.details.map((detail) => (
                          <span
                            key={detail}
                            className="border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-400"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="flex flex-wrap items-center gap-4 border border-crimson/20 bg-crimson/[0.055] p-3 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400">
              <LineChart size={15} className="text-crimson" strokeWidth={1.7} />
              <span><span className="text-crimson">//</span> Trajectory: data systems, interface craft, applied AI</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
