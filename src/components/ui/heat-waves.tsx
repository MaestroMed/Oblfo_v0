// Trois ondes de chaleur au trait : le seul ornement de la DA. Décoratif, donc masqué aux lecteurs d'écran.
export function HeatWaves({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      aria-hidden="true"
      className={`heat-waves text-moutarde ${className}`}
    >
      <path d="M10 60c-8-10 8-18 0-28s8-18 0-28" />
      <path d="M30 60c-8-10 8-18 0-28s8-18 0-28" />
      <path d="M50 60c-8-10 8-18 0-28s8-18 0-28" />
    </svg>
  );
}
