import { defineRouting } from "next-intl/routing";

// Structure d'URL internationale FIGÉE — toute nouvelle locale s'ajoute ici.
// Préfixe systématique (/fr, /en), chemins localisés par segment.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/produits/[slug]": {
      fr: "/produits/[slug]",
      en: "/products/[slug]",
    },
    "/livraison-retours": {
      fr: "/livraison-retours",
      en: "/shipping-returns",
    },
    "/contact": "/contact",
    "/mentions-legales": {
      fr: "/mentions-legales",
      en: "/legal-notice",
    },
    "/cgv": {
      fr: "/cgv",
      en: "/terms-of-sale",
    },
    "/confidentialite": {
      fr: "/confidentialite",
      en: "/privacy",
    },
    "/merci": {
      fr: "/merci",
      en: "/thank-you",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}
