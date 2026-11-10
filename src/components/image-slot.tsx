import { HeatWaves } from "@/components/ui/heat-waves";

// Repli quand un produit n'a pas encore de photo : l'aplat de la tuile et les ondes de chaleur,
// dans la couleur de texte de l'aplat (jamais le libellé interne de l'emplacement).
export function ImageSlot() {
  return (
    <span aria-hidden className="absolute inset-0 flex items-center justify-center">
      <HeatWaves className="h-2/5 w-2/5 text-current!" />
    </span>
  );
}
