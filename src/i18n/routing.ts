import { defineRouting } from "next-intl/routing";

// Structure d'URL internationale FIGÉE — toute nouvelle locale s'ajoute ici.
// Préfixe systématique (/fr, /en, /de, /es), chemins localisés par segment.
export const routing = defineRouting({
  locales: ["fr", "en", "de", "es"],
  defaultLocale: "fr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/produits/[slug]": {
      fr: "/produits/[slug]",
      en: "/products/[slug]",
      de: "/produkte/[slug]",
      es: "/productos/[slug]",
    },
    "/livraison-retours": {
      fr: "/livraison-retours",
      en: "/shipping-returns",
      de: "/versand-rueckgabe",
      es: "/envios-devoluciones",
    },
    "/contact": {
      fr: "/contact",
      en: "/contact",
      de: "/kontakt",
      es: "/contacto",
    },
    "/panier": {
      fr: "/panier",
      en: "/cart",
      de: "/warenkorb",
      es: "/carrito",
    },
    "/guides": "/guides",
    "/guides/[slug]": "/guides/[slug]",
    "/collection": {
      fr: "/collection",
      en: "/collection",
      de: "/kollektion",
      es: "/coleccion",
    },
    "/collection/[category]": {
      fr: "/collection/[category]",
      en: "/collection/[category]",
      de: "/kollektion/[category]",
      es: "/coleccion/[category]",
    },
    "/mentions-legales": {
      fr: "/mentions-legales",
      en: "/legal-notice",
      de: "/impressum",
      es: "/aviso-legal",
    },
    "/cgv": {
      fr: "/cgv",
      en: "/terms-of-sale",
      de: "/agb",
      es: "/condiciones-de-venta",
    },
    "/confidentialite": {
      fr: "/confidentialite",
      en: "/privacy",
      de: "/datenschutz",
      es: "/privacidad",
    },
    "/merci": {
      fr: "/merci",
      en: "/thank-you",
      de: "/danke",
      es: "/gracias",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

/** Locale OpenGraph (og:locale) correspondante. */
export function ogLocale(locale: Locale): string {
  return { fr: "fr_FR", en: "en_US", de: "de_DE", es: "es_ES" }[locale];
}

/** Locale BCP-47 pour Intl (dates, nombres). */
export function intlLocale(locale: Locale): string {
  return { fr: "fr-FR", en: "en-GB", de: "de-DE", es: "es-ES" }[locale];
}

/** Alternates hreflang croisées pour un chemin construit par locale. */
export function hreflangAlternates(
  path: (locale: Locale) => string,
  current: Locale,
): { canonical: string; languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = path(l);
  languages["x-default"] = path(routing.defaultLocale);
  return { canonical: path(current), languages };
}
