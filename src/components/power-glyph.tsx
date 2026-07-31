/**
 * Symbole power (⏻) qui remplace le O final d'OBFLO : anneau ouvert en haut
 * + tige verticale. viewBox serré pour que le bas de l'anneau se pose sur la
 * ligne de base du texte (rendu inline-block, bottom = baseline).
 * Hérite de currentColor sauf si une classe d'animation pilote le stroke.
 */
export function PowerGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 99"
      fill="none"
      aria-hidden
      className={className}
      style={{ display: "block" }}
    >
      <path
        d="M 33 15 A 40 40 0 1 0 67 15"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="8"
        x2="50"
        y2="42"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
      />
    </svg>
  );
}
