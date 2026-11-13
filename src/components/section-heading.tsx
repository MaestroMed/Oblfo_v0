// `index` et `label` restent acceptés pour les appelants existants mais ne sont plus affichés.
export function SectionHeading({
  title,
  description,
  className,
}: {
  index?: string;
  label?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`flex max-w-[760px] flex-col gap-4 ${className ?? "mb-8 sm:mb-12"}`}>
      <h2 className="text-display">{title}</h2>
      {description ? (
        <p className="max-w-[560px] text-body">{description}</p>
      ) : null}
    </div>
  );
}
