export function SectionKicker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
      <span className="text-[#66788A]">{index}</span>
      <span className="h-px w-7 bg-accent/50" />
      <span className="text-accent">{label}</span>
    </div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`flex max-w-[720px] flex-col gap-3.5 ${className ?? "mb-[54px]"}`}>
      <SectionKicker index={index} label={label} />
      <h2 className="text-[clamp(34px,4vw,52px)] font-bold leading-[1.04] tracking-[-0.02em] text-ink">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[560px] text-[16.5px] leading-relaxed text-[#93A2B1] text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
