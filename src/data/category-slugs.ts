// Slugs des pages catégories par locale — module volontairement minuscule :
// importé par des composants client (header, switcher, cartes home),
// il ne doit jamais tirer le contenu éditorial dans le bundle.

import type { Category } from "./catalog-types";
import type { Locale } from "@/i18n/routing";

export const CATEGORY_SLUGS: Record<Category, Record<Locale, string>> = {
  mains: { fr: "mains", en: "hands", de: "haende", es: "manos" },
  pieds: { fr: "pieds", en: "feet", de: "fuesse", es: "pies" },
  corps: { fr: "corps", en: "body", de: "koerper", es: "cuerpo" },
  maison: { fr: "maison", en: "home", de: "zuhause", es: "casa" },
  bureau: { fr: "bureau", en: "desk", de: "schreibtisch", es: "escritorio" },
  piece: {
    fr: "petite-piece",
    en: "small-room",
    de: "kleiner-raum",
    es: "habitacion-pequena",
  },
};

export function categoryFromSlug(
  locale: Locale,
  slug: string,
): Category | undefined {
  return (Object.keys(CATEGORY_SLUGS) as Category[]).find(
    (c) => CATEGORY_SLUGS[c][locale] === slug,
  );
}

export function translateCategorySlug(
  slug: string,
  from: Locale,
  to: Locale,
): string | undefined {
  const category = categoryFromSlug(from, slug);
  return category ? CATEGORY_SLUGS[category][to] : undefined;
}
