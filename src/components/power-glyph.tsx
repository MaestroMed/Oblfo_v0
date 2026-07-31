/**
 * Symbole power (⏻) dessiné pour remplacer le O final d'OBFLO :
 * anneau ouvert en haut + tige verticale. Hérite de currentColor
 * sauf si une classe d'animation pilote le stroke.
 */
export function PowerGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={className}
      style={{ display: "inline-block" }}
    >
      <path
        d="M 33 15 A 40 40 0 1 0 67 15"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="6"
        x2="50"
        y2="44"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}
