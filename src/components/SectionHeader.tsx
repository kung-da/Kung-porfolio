interface Props {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export const SectionHeader = ({ eyebrow, title, subtitle }: Props) => (
  <div className="mb-14">
    <p className="text-xs font-semibold tracking-[0.3em] mb-3" style={{ color: "#00BFFF" }}>
      {eyebrow}
    </p>
    <h2 className="text-4xl md:text-5xl font-bold text-foreground inline-flex items-baseline gap-4 flex-wrap">
      {title}
      {subtitle && <span className="text-xl text-sakura font-normal">{subtitle}</span>}
    </h2>
    <div className="mt-4 h-[2px] w-[60px]" style={{ background: "#00BFFF" }} />
  </div>
);
