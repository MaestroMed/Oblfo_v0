// Mot-symbole OBFLO : tracé rond, très gras, une seule couleur (celle du texte parent).
// Décoratif : le lien qui le porte donne le nom accessible.
export function ObfloLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-3 -3 469 106"
      fill="none"
      stroke="currentColor"
      strokeWidth="22"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="50" cy="50" r="42" />
      <path d="M126 8H154A19 19 0 0 1 154 46H126M154 46H160A23 23 0 0 1 160 92H126V8" />
      <path d="M219 92V8H267M219 50H257" />
      <path d="M297 8V92H343" />
      <circle cx="413" cy="50" r="42" />
    </svg>
  );
}
