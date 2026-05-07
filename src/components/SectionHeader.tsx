interface Props {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export const SectionHeader = ({ eyebrow, title, subtitle }: Props) => (
  <div className="mb-14">
    <p className="text-[10px] font-mono-ui font-semibold tracking-[0.4em] mb-4 text-cyan-accent flex items-center gap-3">
      <span className="inline-block w-6 h-px bg-cyan-accent" />
      {eyebrow}
    </p>
    <h2 className="text-3xl md:text-5xl font-display title-cinematic uppercase inline-flex items-baseline gap-4 flex-wrap">
      {title}
      {subtitle && <span className="text-lg md:text-xl text-sakura/80 font-normal normal-case tracking-wider">{subtitle}</span>}
    </h2>
    <div className="mt-5 flex items-center gap-2">
      <div className="h-px w-[80px]" style={{ background: "linear-gradient(90deg, hsl(var(--primary)), transparent)" }} />
      <div className="w-1 h-1 rotate-45 bg-cyan-accent" />
    </div>
  </div>
);
