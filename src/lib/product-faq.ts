import type { Spec } from "@/data/catalog-types";

export type FaqEntry = { question: string; answer: string };

// Questions tirées des caractéristiques de la fiche : la réponse est la valeur relevée, rien d'inventé.
// L'ordre compte : la première question qui reconnaît une caractéristique la prend.
const watts = /\d\s*W\b/;
const FROM_SPECS: { key: string; match: (s: Spec) => boolean }[] = [
  { key: "qPower", match: (s) => /alimentation|power supply|stromversorgung|alimentación|batterie|battery|akku|batería/i.test(s.label) || (/^(power|puissance|leistung|potencia)$/i.test(s.label) && !watts.test(s.value)) },
  { key: "qCharge", match: (s) => /recharge|charging|aufladung|carga/i.test(s.label) },
  { key: "qWattage", match: (s) => /puissance|power|leistung|potencia/i.test(s.label) && watts.test(s.value) },
  { key: "qLevels", match: (s) => /niveau|réglage|température|level|setting|temperature|stufe|einstellung|temperatur|nivel|ajuste|temperatura/i.test(s.label) },
  { key: "qSize", match: (s) => /dimension|taille|plateau|size|plate|größe|maße|platte|tamaño|talla|placa/i.test(s.label) },
  { key: "qMaterial", match: (s) => /matière|matériau|material|boîtier|case|gehäuse|carcasa|extérieur|exterior|außen/i.test(s.label) },
  { key: "qSafety", match: (s) => /sécurité|safety|sicherheit|seguridad/i.test(s.label) },
  { key: "qContents", match: (s) => /contenu|contents|lieferumfang|contenido/i.test(s.label) },
  { key: "qCare", match: (s) => /entretien|care|pflege|cuidado/i.test(s.label) },
];
const MAX_FROM_SPECS = 5;

/** FAQ propre au produit (brief : 5 à 8 questions) : jusqu'à 5 issues des caractéristiques, puis livraison, retours, garantie. */
export function productFaq(specs: Spec[], t: (key: string) => string): FaqEntry[] {
  const used = new Set<Spec>();
  const items: FaqEntry[] = [];
  for (const { key, match } of FROM_SPECS) {
    if (items.length === MAX_FROM_SPECS) break;
    const spec = specs.find((s) => !used.has(s) && match(s));
    if (!spec) continue;
    used.add(spec);
    items.push({ question: t(key), answer: spec.value });
  }
  for (const key of ["Delivery", "Returns", "Warranty"]) {
    items.push({ question: t(`q${key}`), answer: t(`a${key}`) });
  }
  return items;
}
