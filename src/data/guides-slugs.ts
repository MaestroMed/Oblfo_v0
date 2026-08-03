// Slugs des guides par locale — module volontairement minuscule :
// importé par des composants client (header, switcher), il ne doit
// JAMAIS tirer le contenu des guides dans le bundle.

import type { Locale } from "@/i18n/routing";

export const GUIDE_SLUGS: Record<string, Record<Locale, string>> = {
  "chauffage-appoint-economique": {
    fr: "chauffage-appoint-economique",
    en: "space-heater-running-costs",
    de: "heizluefter-stromverbrauch",
    es: "calefactor-consumo",
  },
  "choisir-gants-chauffants": {
    fr: "choisir-gants-chauffants",
    en: "heated-gloves-buying-guide",
    de: "beheizbare-handschuhe-ratgeber",
    es: "guia-guantes-calefactables",
  },
  "plaid-chauffant-guide": {
    fr: "plaid-chauffant-consommation",
    en: "heated-blanket-running-costs",
    de: "heizdecke-stromverbrauch",
    es: "manta-electrica-consumo",
  },
  "gilet-chauffant-guide": {
    fr: "choisir-gilet-chauffant",
    en: "heated-vest-guide",
    de: "beheizbare-weste-ratgeber",
    es: "guia-chaleco-calefactable",
  },
  "pieds-froids-guide": {
    fr: "pieds-froids-solutions",
    en: "cold-feet-solutions",
    de: "kalte-fuesse-loesungen",
    es: "pies-frios-soluciones",
  },
  "chauffe-mains-guide": {
    fr: "chauffe-mains-rechargeable-guide",
    en: "rechargeable-hand-warmer-guide",
    de: "handwaermer-ratgeber",
    es: "guia-calientamanos",
  },
  "chaussons-guide": {
    fr: "choisir-chaussons-chauffants",
    en: "heated-slippers-guide",
    de: "beheizbare-hausschuhe-ratgeber",
    es: "guia-zapatillas-calefactables",
  },
  "chauffe-tasse-guide": {
    fr: "chauffe-tasse-usb-guide",
    en: "mug-warmer-guide",
    de: "tassenwaermer-ratgeber",
    es: "guia-calientatazas",
  },
  "sous-main-guide": {
    fr: "mains-froides-bureau",
    en: "cold-hands-desk-guide",
    de: "kalte-haende-schreibtisch",
    es: "manos-frias-escritorio",
  },
};

export function translateGuideSlug(
  slug: string,
  from: Locale,
  to: Locale,
): string | undefined {
  const entry = Object.values(GUIDE_SLUGS).find((s) => s[from] === slug);
  return entry?.[to];
}

export function guideIdFromSlug(
  locale: Locale,
  slug: string,
): string | undefined {
  return Object.keys(GUIDE_SLUGS).find(
    (id) => GUIDE_SLUGS[id][locale] === slug,
  );
}
