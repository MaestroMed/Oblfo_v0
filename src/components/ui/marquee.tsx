// Défilement CSS pur (pas de JS) ; arrêté par prefers-reduced-motion dans globals.css.
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul className="marquee-track flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span aria-hidden className="text-accent">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee flex overflow-hidden ${className}`}>
      {row(false)}
      {row(true)}
    </div>
  );
}
