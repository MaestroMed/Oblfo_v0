// Emplacement photo en attente des assets définitifs.
// À remplacer par next/image quand les visuels produits seront générés.
export function ImageSlot({ label }: { label: string }) {
  return (
    <div
      aria-hidden
      className="slot-hatch absolute inset-0 flex items-center justify-center bg-media"
    >
      <span className="max-w-[80%] text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#3E4C5C]">
        {label}
      </span>
    </div>
  );
}
