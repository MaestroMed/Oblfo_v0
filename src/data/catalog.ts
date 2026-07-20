// Catalogue statique v0 — sera piloté par l'app de gestion de boutique à terme.
// Les ids (produits, packs) sont stables et indépendants de la langue :
// ce sont eux qui circulent dans le panier, le checkout et bientôt l'app de pilotage.
// Les libellés photo (imageLabel, gallery) sont des briefs de shooting internes,
// volontairement non traduits — remplacés par de vraies images à terme.

import type { Locale } from "@/i18n/routing";

export type GlowTone = "warm" | "cold";

type LText = Record<Locale, string>;
type LTextList = Record<Locale, string[]>;
type LSpecs = Record<Locale, { label: string; value: string }[]>;

type ProductSource = {
  id: string;
  slug: LText;
  price: number;
  /** Passe à false pour retirer de la vente sans supprimer la page (rupture CJ). */
  available?: boolean;
  glow: GlowTone;
  name: LText;
  tagline: LText;
  tags: LTextList;
  imageLabel: string;
  description: LTextList;
  highlights: LTextList;
  specs: LSpecs;
  gallery: string[];
};

type PackSource = {
  id: string;
  name: LText;
  contents: LText;
  items: string[];
  price: number;
  compareAt: number;
  imageLabel: string;
  available?: boolean;
  featured?: boolean;
};

export type Product = {
  id: string;
  slug: string;
  /** Slug dans chaque locale — pour les alternates hreflang. */
  slugs: Record<Locale, string>;
  price: number;
  available: boolean;
  glow: GlowTone;
  name: string;
  tagline: string;
  tags: string[];
  imageLabel: string;
  description: string[];
  highlights: string[];
  specs: { label: string; value: string }[];
  gallery: string[];
};

export type Pack = {
  id: string;
  name: string;
  contents: string;
  items: string[];
  price: number;
  compareAt: number;
  imageLabel: string;
  available: boolean;
  featured?: boolean;
};

export type Moment = {
  kicker: string;
  title: string;
  productLine: string;
  imageLabel: string;
};

export type Review = {
  author: string;
  city: string;
  rating: number;
  text: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

const productSources: ProductSource[] = [
  {
    id: "gants-chauffants",
    slug: { fr: "gants-chauffants", en: "heated-gloves" },
    price: 49,
    glow: "warm",
    name: { fr: "Gants Chauffants", en: "Heated Gloves" },
    tagline: {
      fr: "Zones chauffantes paume et doigts, textile déperlant.",
      en: "Heating zones on palm and fingers, water-repellent fabric.",
    },
    tags: {
      fr: ["USB", "3 NIVEAUX"],
      en: ["USB", "3 HEAT LEVELS"],
    },
    imageLabel: "PHOTO STUDIO — gants chauffants",
    description: {
      fr: [
        "Des mains froides, c'est la première chose qui gâche une sortie d'hiver. Les gants chauffants OBFLO diffusent une chaleur douce sur la paume et le dessus des doigts — là où le froid mord en premier — en une trentaine de secondes.",
        "Trois niveaux de chauffe pour doser selon la météo, un textile déperlant qui encaisse la bruine, et une alimentation USB universelle : branche-les sur une powerbank dans la poche et tu es autonome pour la matinée.",
      ],
      en: [
        "Cold hands are the first thing that ruins a winter outing. OBFLO heated gloves deliver gentle warmth across the palm and the top of the fingers — where the cold bites first — in about thirty seconds.",
        "Three heat levels to match the weather, a water-repellent fabric that shrugs off drizzle, and universal USB power: plug them into a power bank in your pocket and you're set for the whole morning.",
      ],
    },
    highlights: {
      fr: [
        "Zones chauffantes paume + doigts",
        "3 niveaux de chauffe",
        "Textile déperlant, index tactile",
        "Fonctionne sur powerbank",
      ],
      en: [
        "Heating zones on palm + fingers",
        "3 heat levels",
        "Water-repellent fabric, touchscreen index",
        "Works with any power bank",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5V" },
        { label: "Niveaux de chauffe", value: "3 (éco / confort / boost)" },
        { label: "Temps de chauffe", value: "≈ 30 secondes" },
        {
          label: "Autonomie sur powerbank 10 000 mAh",
          value: "3 à 6 h selon le niveau",
        },
        { label: "Entretien", value: "Lavage à la main, câble débranché" },
      ],
      en: [
        { label: "Power", value: "USB 5V" },
        { label: "Heat levels", value: "3 (eco / comfort / boost)" },
        { label: "Heat-up time", value: "≈ 30 seconds" },
        {
          label: "Battery life on a 10,000 mAh power bank",
          value: "3 to 6 h depending on level",
        },
        { label: "Care", value: "Hand wash, cable unplugged" },
      ],
    },
    gallery: [
      "PHOTO — gant chauffant porté, fond sombre, lueur orange",
      "PHOTO MACRO — zones chauffantes paume",
      "PHOTO — gants + powerbank dans une poche de manteau",
      "PACKSHOT — paire de gants sur fond studio sombre",
    ],
  },
  {
    id: "chaussons-chauffants",
    slug: { fr: "chaussons-chauffants", en: "heated-slippers" },
    price: 44,
    glow: "cold",
    name: { fr: "Chaussons Chauffants", en: "Heated Slippers" },
    tagline: {
      fr: "Chaleur avant-pied, intérieur doux, port USB discret.",
      en: "Forefoot warmth, soft lining, discreet USB port.",
    },
    tags: {
      fr: ["USB", "CHALEUR RAPIDE"],
      en: ["USB", "FAST HEAT"],
    },
    imageLabel: "PHOTO STUDIO — chaussons chauffants",
    description: {
      fr: [
        "Rentrer chez soi et garder les pieds gelés pendant une heure, c'est fini. Les chaussons chauffants OBFLO concentrent la chaleur sur l'avant-pied, la zone la plus longue à réchauffer, avec un intérieur doux qui garde la chaleur même une fois débranchés.",
        "Le port USB est discret, le câble se détache pour marcher librement, et l'ensemble se lave à la main une fois le module débranché.",
      ],
      en: [
        "Coming home and keeping frozen feet for an hour — that's over. OBFLO heated slippers focus warmth on the forefoot, the slowest area to warm up, with a soft lining that holds the heat even once unplugged.",
        "The USB port is discreet, the cable detaches so you can walk freely, and everything hand-washes once the module is unplugged.",
      ],
    },
    highlights: {
      fr: [
        "Chaleur ciblée avant-pied",
        "Intérieur doux et isolant",
        "Câble USB détachable",
        "Semelle antidérapante",
      ],
      en: [
        "Targeted forefoot warmth",
        "Soft, insulating lining",
        "Detachable USB cable",
        "Non-slip sole",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5V" },
        { label: "Temps de chauffe", value: "≈ 45 secondes" },
        {
          label: "Pointures",
          value: "Taille unique 36–45 (intérieur adaptatif)",
        },
        { label: "Semelle", value: "Antidérapante, usage intérieur" },
        { label: "Entretien", value: "Lavage à la main, câble débranché" },
      ],
      en: [
        { label: "Power", value: "USB 5V" },
        { label: "Heat-up time", value: "≈ 45 seconds" },
        {
          label: "Sizes",
          value: "One size EU 36–45 (adaptive lining)",
        },
        { label: "Sole", value: "Non-slip, indoor use" },
        { label: "Care", value: "Hand wash, cable unplugged" },
      ],
    },
    gallery: [
      "PHOTO — chaussons portés sur parquet, neige à la fenêtre",
      "PHOTO MACRO — intérieur doux et zone chauffante",
      "PHOTO — détail port USB discret",
      "PACKSHOT — paire de chaussons sur fond studio sombre",
    ],
  },
  {
    id: "chauffage-appoint",
    slug: { fr: "chauffage-appoint", en: "portable-space-heater" },
    price: 59,
    glow: "warm",
    name: { fr: "Chauffage d'Appoint", en: "Portable Space Heater" },
    tagline: {
      fr: "Réchauffe une petite pièce en quelques minutes.",
      en: "Warms up a small room in minutes.",
    },
    tags: {
      fr: ["3 NIVEAUX", "COMPACT"],
      en: ["3 MODES", "COMPACT"],
    },
    imageLabel: "PHOTO STUDIO — chauffage d'appoint",
    description: {
      fr: [
        "Chauffer toute la maison pour une seule pièce occupée, c'est le meilleur moyen de faire exploser la facture. Le chauffage d'appoint OBFLO réchauffe l'espace où tu es — un bureau, une chambre — en quelques minutes, puis maintient la température sans gaspiller.",
        "Céramique à chauffe rapide, trois modes dont une ventilation seule pour l'été, et des protections contre la surchauffe et le basculement : il se pose sur un bureau et se fait oublier.",
      ],
      en: [
        "Heating the whole house for one occupied room is the fastest way to blow up the bill. The OBFLO space heater warms the space you're actually in — a desk, a bedroom — within minutes, then holds the temperature without waste.",
        "Fast-heating ceramic, three modes including fan-only for summer, plus overheat and tip-over protection: it sits on a desk and disappears from your mind.",
      ],
    },
    highlights: {
      fr: [
        "Chauffe une pièce de 10–15 m²",
        "3 modes dont ventilation seule",
        "Protections surchauffe + basculement",
        "Format compact, posable sur un bureau",
      ],
      en: [
        "Heats a 10–15 m² room",
        "3 modes including fan-only",
        "Overheat + tip-over protection",
        "Compact, fits on a desk",
      ],
    },
    specs: {
      fr: [
        { label: "Technologie", value: "Céramique PTC, chauffe rapide" },
        { label: "Modes", value: "3 (éco / confort / ventilation)" },
        { label: "Surface conseillée", value: "10 à 15 m²" },
        { label: "Sécurité", value: "Coupure surchauffe et basculement" },
        { label: "Alimentation", value: "Secteur 220–240 V" },
      ],
      en: [
        { label: "Technology", value: "PTC ceramic, fast heat-up" },
        { label: "Modes", value: "3 (eco / comfort / fan)" },
        { label: "Recommended area", value: "10 to 15 m²" },
        { label: "Safety", value: "Overheat and tip-over cut-off" },
        { label: "Power", value: "Mains 220–240 V" },
      ],
    },
    gallery: [
      "PHOTO — chauffage d'appoint sur bureau, ambiance soir",
      "PHOTO MACRO — grille et lueur chaude",
      "PHOTO — dans une chambre, lumière tamisée",
      "PACKSHOT — chauffage sur fond studio sombre",
    ],
  },
  {
    id: "mini-chauffe-tasse",
    slug: { fr: "mini-chauffe-tasse", en: "mug-warmer" },
    price: 19,
    glow: "cold",
    name: { fr: "Mini Chauffe-Tasse", en: "Mini Mug Warmer" },
    tagline: {
      fr: "Ton café reste à température, tout l'après-midi.",
      en: "Your coffee stays at temperature, all afternoon.",
    },
    tags: {
      fr: ["USB", "COMPACT"],
      en: ["USB", "COMPACT"],
    },
    imageLabel: "PHOTO STUDIO — mini chauffe-tasse",
    description: {
      fr: [
        "Le café froid à moitié bu, c'est le lot de tous les après-midis de travail. Le mini chauffe-tasse OBFLO maintient ton mug à température de dégustation tant qu'il est posé dessus — pas de re-chauffe, pas d'aller-retour au micro-ondes.",
        "Il se branche en USB sur l'ordinateur ou un chargeur, occupe la place d'un dessous de verre, et s'éteint tout seul quand tu retires la tasse.",
      ],
      en: [
        "Half-drunk cold coffee is the fate of every working afternoon. The OBFLO mini mug warmer keeps your mug at drinking temperature as long as it sits on it — no reheating, no trips to the microwave.",
        "It plugs into your laptop or a USB charger, takes up the space of a coaster, and switches off by itself when you lift the mug.",
      ],
    },
    highlights: {
      fr: [
        "Maintient la boisson à ≈ 55°C",
        "Arrêt automatique au retrait de la tasse",
        "Format dessous de verre",
        "Compatible mugs à fond plat",
      ],
      en: [
        "Keeps drinks at ≈ 55°C",
        "Auto-off when the mug is lifted",
        "Coaster-sized footprint",
        "Works with flat-bottomed mugs",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5V" },
        { label: "Température de maintien", value: "≈ 55°C" },
        { label: "Diamètre du plateau", value: "≈ 10 cm" },
        { label: "Arrêt automatique", value: "Oui, au retrait de la tasse" },
        { label: "Compatibilité", value: "Mugs et tasses à fond plat" },
      ],
      en: [
        { label: "Power", value: "USB 5V" },
        { label: "Holding temperature", value: "≈ 55°C" },
        { label: "Plate diameter", value: "≈ 10 cm" },
        { label: "Auto-off", value: "Yes, when the mug is lifted" },
        { label: "Compatibility", value: "Flat-bottomed mugs and cups" },
      ],
    },
    gallery: [
      "PHOTO — mug sur chauffe-tasse, laptop sombre",
      "PHOTO MACRO — plateau chauffant et témoin lumineux",
      "PHOTO — bureau du soir, vapeur au-dessus du mug",
      "PACKSHOT — chauffe-tasse sur fond studio sombre",
    ],
  },
];

const packSources: PackSource[] = [
  {
    id: "pack-sortie-hiver",
    name: { fr: "Pack Sortie Hiver", en: "Winter Outing Bundle" },
    contents: {
      fr: "Gants Chauffants + Mini Chauffe-Tasse",
      en: "Heated Gloves + Mini Mug Warmer",
    },
    items: ["gants-chauffants", "mini-chauffe-tasse"],
    price: 59,
    compareAt: 68,
    imageLabel: "PHOTO — gants + chauffe-tasse ensemble",
  },
  {
    id: "pack-maison-chaude",
    name: { fr: "Pack Maison Chaude", en: "Warm Home Bundle" },
    contents: {
      fr: "Chaussons Chauffants + Chauffage d'Appoint",
      en: "Heated Slippers + Portable Space Heater",
    },
    items: ["chaussons-chauffants", "chauffage-appoint"],
    price: 89,
    compareAt: 103,
    imageLabel: "PHOTO — chaussons + chauffage d'appoint",
  },
  {
    id: "pack-full-obflo",
    name: { fr: "Pack Full OBFLO", en: "Full OBFLO Bundle" },
    contents: {
      fr: "Les 4 produits — mains, pieds, café, pièce",
      en: "All 4 products — hands, feet, coffee, room",
    },
    items: [
      "gants-chauffants",
      "chaussons-chauffants",
      "chauffage-appoint",
      "mini-chauffe-tasse",
    ],
    price: 139,
    compareAt: 171,
    imageLabel: "PHOTO — les 4 produits OBFLO réunis",
    featured: true,
  },
];

const momentSources: Record<Locale, Moment[]> = {
  fr: [
    {
      kicker: "DEHORS",
      title: "Pour sortir sans subir l'hiver.",
      productLine: "GANTS CHAUFFANTS — 49 €",
      imageLabel: "PHOTO — rue froide, buée, gants portés",
    },
    {
      kicker: "À LA MAISON",
      title: "Pour rentrer et couper le froid net.",
      productLine: "CHAUSSONS CHAUFFANTS — 44 €",
      imageLabel: "PHOTO — chaussons sur parquet, neige à la fenêtre",
    },
    {
      kicker: "AU BUREAU",
      title: "Pour garder ton café chaud plus longtemps.",
      productLine: "MINI CHAUFFE-TASSE — 19 €",
      imageLabel: "PHOTO — mug sur chauffe-tasse, laptop sombre",
    },
    {
      kicker: "PETITE PIÈCE",
      title: "Pour réchauffer ton espace, pas toute la maison.",
      productLine: "CHAUFFAGE D'APPOINT — 59 €",
      imageLabel: "PHOTO — chauffage d'appoint sur bureau, ambiance soir",
    },
  ],
  en: [
    {
      kicker: "OUTSIDE",
      title: "To go out without suffering winter.",
      productLine: "HEATED GLOVES — €49",
      imageLabel: "PHOTO — rue froide, buée, gants portés",
    },
    {
      kicker: "AT HOME",
      title: "To come home and cut the cold dead.",
      productLine: "HEATED SLIPPERS — €44",
      imageLabel: "PHOTO — chaussons sur parquet, neige à la fenêtre",
    },
    {
      kicker: "AT THE DESK",
      title: "To keep your coffee hot for longer.",
      productLine: "MINI MUG WARMER — €19",
      imageLabel: "PHOTO — mug sur chauffe-tasse, laptop sombre",
    },
    {
      kicker: "SMALL ROOM",
      title: "To warm your space, not the whole house.",
      productLine: "PORTABLE SPACE HEATER — €59",
      imageLabel: "PHOTO — chauffage d'appoint sur bureau, ambiance soir",
    },
  ],
};

const reviewSources: Record<Locale, Review[]> = {
  fr: [
    {
      author: "Amine",
      city: "Lyon",
      rating: 5,
      text: "Je bosse souvent tard dans une pièce mal chauffée. Le chauffe-tasse est devenu indispensable.",
    },
    {
      author: "Laura",
      city: "Lille",
      rating: 5,
      text: "Les chaussons chauffent vite, parfait le soir devant la télé.",
    },
    {
      author: "Karim",
      city: "Paris",
      rating: 4,
      text: "Les gants sont pratiques en scooter le matin.",
    },
  ],
  en: [
    {
      author: "Amine",
      city: "Lyon",
      rating: 5,
      text: "I often work late in a badly heated room. The mug warmer has become essential.",
    },
    {
      author: "Laura",
      city: "Lille",
      rating: 5,
      text: "The slippers heat up fast — perfect for evenings in front of the TV.",
    },
    {
      author: "Karim",
      city: "Paris",
      rating: 4,
      text: "The gloves are great on my scooter in the morning.",
    },
  ],
};

const faqSources: Record<Locale, FaqItem[]> = {
  fr: [
    {
      question: "Les gants fonctionnent avec une powerbank ?",
      answer:
        "Oui. Tous nos produits s'alimentent en USB standard (5V). Une powerbank de 10 000 mAh fait fonctionner les gants ou les chaussons pendant plusieurs heures.",
    },
    {
      question: "Combien de temps faut-il pour chauffer ?",
      answer:
        "Entre 30 secondes et 2 minutes selon le produit et le niveau choisi. La chaleur est perceptible quasi immédiatement.",
    },
    {
      question: "Les chaussons sont-ils lavables ?",
      answer:
        "Oui, à la main et à l'eau froide, une fois le câble USB débranché. On évite le lave-linge et le sèche-linge.",
    },
    {
      question: "Le chauffage d'appoint consomme beaucoup ?",
      answer:
        "Non. Il est conçu pour chauffer un espace réduit — un bureau, une chambre — pas toute la maison. C'est justement ce qui le rend économe.",
    },
    {
      question: "Peut-on retourner un produit ?",
      answer:
        "Oui, sous 30 jours après réception, sans justification. Remboursement intégral dès que le produit nous revient.",
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer:
        "3 à 5 jours ouvrés en France métropolitaine, avec un numéro de suivi envoyé dès l'expédition.",
    },
  ],
  en: [
    {
      question: "Do the gloves work with a power bank?",
      answer:
        "Yes. All our products run on standard USB (5V). A 10,000 mAh power bank runs the gloves or slippers for several hours.",
    },
    {
      question: "How long do they take to heat up?",
      answer:
        "Between 30 seconds and 2 minutes depending on the product and the level. You feel the warmth almost immediately.",
    },
    {
      question: "Are the slippers washable?",
      answer:
        "Yes, by hand in cold water, once the USB cable is unplugged. Avoid the washing machine and the dryer.",
    },
    {
      question: "Does the space heater use a lot of power?",
      answer:
        "No. It's designed to heat a small space — a desk area, a bedroom — not the whole house. That's exactly what makes it economical.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes, within 30 days of delivery, no questions asked. Full refund as soon as the product reaches us.",
    },
    {
      question: "What are the delivery times?",
      answer:
        "3 to 5 business days in metropolitan France, with a tracking number sent as soon as your order ships.",
    },
  ],
};

function localizeProduct(source: ProductSource, locale: Locale): Product {
  return {
    id: source.id,
    slug: source.slug[locale],
    slugs: source.slug,
    price: source.price,
    available: source.available ?? true,
    glow: source.glow,
    name: source.name[locale],
    tagline: source.tagline[locale],
    tags: source.tags[locale],
    imageLabel: source.imageLabel,
    description: source.description[locale],
    highlights: source.highlights[locale],
    specs: source.specs[locale],
    gallery: source.gallery,
  };
}

function localizePack(source: PackSource, locale: Locale): Pack {
  return {
    id: source.id,
    name: source.name[locale],
    contents: source.contents[locale],
    items: source.items,
    price: source.price,
    compareAt: source.compareAt,
    imageLabel: source.imageLabel,
    available: source.available ?? true,
    featured: source.featured,
  };
}

export function getProducts(locale: Locale): Product[] {
  return productSources.map((p) => localizeProduct(p, locale));
}

export function getProductBySlug(
  locale: Locale,
  slug: string,
): Product | undefined {
  const source = productSources.find((p) => p.slug[locale] === slug);
  return source ? localizeProduct(source, locale) : undefined;
}

export function getProductById(
  id: string,
  locale: Locale,
): Product | undefined {
  const source = productSources.find((p) => p.id === id);
  return source ? localizeProduct(source, locale) : undefined;
}

export function getPacks(locale: Locale): Pack[] {
  return packSources.map((p) => localizePack(p, locale));
}

export function getPacksForProduct(locale: Locale, productId: string): Pack[] {
  return packSources
    .filter((pack) => pack.items.includes(productId))
    .map((p) => localizePack(p, locale));
}

export function getMoments(locale: Locale): Moment[] {
  return momentSources[locale];
}

export function getReviews(locale: Locale): Review[] {
  return reviewSources[locale];
}

export function getFaqItems(locale: Locale): FaqItem[] {
  return faqSources[locale];
}

/** Prix d'un article vendable (produit ou pack) par id — source de vérité du checkout. */
export function getSellableById(
  id: string,
  locale: Locale,
): { id: string; name: string; price: number; available: boolean } | undefined {
  const product = productSources.find((p) => p.id === id);
  if (product) {
    return {
      id,
      name: product.name[locale],
      price: product.price,
      available: product.available ?? true,
    };
  }
  const pack = packSources.find((p) => p.id === id);
  if (pack) {
    return {
      id,
      name: pack.name[locale],
      price: pack.price,
      available: pack.available ?? true,
    };
  }
  return undefined;
}

/** Traduit un slug produit d'une locale vers une autre (pour le switcher de langue). */
export function translateProductSlug(
  slug: string,
  from: Locale,
  to: Locale,
): string | undefined {
  const source = productSources.find((p) => p.slug[from] === slug);
  return source?.slug[to];
}

export function formatPrice(value: number, locale: Locale): string {
  const formatted = Number.isInteger(value)
    ? String(value)
    : value.toFixed(2).replace(".", locale === "fr" ? "," : ".");
  return locale === "fr" ? `${formatted} €` : `€${formatted}`;
}
