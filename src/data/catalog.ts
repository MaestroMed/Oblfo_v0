// Catalogue statique v0 — sera piloté par l'app de gestion de boutique à terme.

export type GlowTone = "warm" | "cold";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  tags: string[];
  imageLabel: string;
  glow: GlowTone;
  /** Copie longue de la page produit, un paragraphe par entrée. */
  description: string[];
  highlights: string[];
  specs: { label: string; value: string }[];
  /** Libellés des photos attendues pour la galerie produit. */
  gallery: string[];
};

export type Pack = {
  slug: string;
  name: string;
  contents: string;
  /** Slugs des produits inclus. */
  items: string[];
  price: number;
  compareAt: number;
  imageLabel: string;
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

export const products: Product[] = [
  {
    slug: "gants-chauffants",
    name: "Gants Chauffants",
    tagline: "Zones chauffantes paume et doigts, textile déperlant.",
    price: 49,
    tags: ["USB", "3 NIVEAUX"],
    imageLabel: "PHOTO STUDIO — gants chauffants",
    glow: "warm",
    description: [
      "Des mains froides, c'est la première chose qui gâche une sortie d'hiver. Les gants chauffants OBFLO diffusent une chaleur douce sur la paume et le dessus des doigts — là où le froid mord en premier — en une trentaine de secondes.",
      "Trois niveaux de chauffe pour doser selon la météo, un textile déperlant qui encaisse la bruine, et une alimentation USB universelle : branche-les sur une powerbank dans la poche et tu es autonome pour la matinée.",
    ],
    highlights: [
      "Zones chauffantes paume + doigts",
      "3 niveaux de chauffe",
      "Textile déperlant, index tactile",
      "Fonctionne sur powerbank",
    ],
    specs: [
      { label: "Alimentation", value: "USB 5V" },
      { label: "Niveaux de chauffe", value: "3 (éco / confort / boost)" },
      { label: "Temps de chauffe", value: "≈ 30 secondes" },
      { label: "Autonomie sur powerbank 10 000 mAh", value: "3 à 6 h selon le niveau" },
      { label: "Entretien", value: "Lavage à la main, câble débranché" },
    ],
    gallery: [
      "PHOTO — gant chauffant porté, fond sombre, lueur orange",
      "PHOTO MACRO — zones chauffantes paume",
      "PHOTO — gants + powerbank dans une poche de manteau",
      "PACKSHOT — paire de gants sur fond studio sombre",
    ],
  },
  {
    slug: "chaussons-chauffants",
    name: "Chaussons Chauffants",
    tagline: "Chaleur avant-pied, intérieur doux, port USB discret.",
    price: 44,
    tags: ["USB", "CHALEUR RAPIDE"],
    imageLabel: "PHOTO STUDIO — chaussons chauffants",
    glow: "cold",
    description: [
      "Rentrer chez soi et garder les pieds gelés pendant une heure, c'est fini. Les chaussons chauffants OBFLO concentrent la chaleur sur l'avant-pied, la zone la plus longue à réchauffer, avec un intérieur doux qui garde la chaleur même une fois débranchés.",
      "Le port USB est discret, le câble se détache pour marcher librement, et l'ensemble se lave à la main une fois le module débranché.",
    ],
    highlights: [
      "Chaleur ciblée avant-pied",
      "Intérieur doux et isolant",
      "Câble USB détachable",
      "Semelle antidérapante",
    ],
    specs: [
      { label: "Alimentation", value: "USB 5V" },
      { label: "Temps de chauffe", value: "≈ 45 secondes" },
      { label: "Pointures", value: "Taille unique 36–45 (intérieur adaptatif)" },
      { label: "Semelle", value: "Antidérapante, usage intérieur" },
      { label: "Entretien", value: "Lavage à la main, câble débranché" },
    ],
    gallery: [
      "PHOTO — chaussons portés sur parquet, neige à la fenêtre",
      "PHOTO MACRO — intérieur doux et zone chauffante",
      "PHOTO — détail port USB discret",
      "PACKSHOT — paire de chaussons sur fond studio sombre",
    ],
  },
  {
    slug: "chauffage-appoint",
    name: "Chauffage d'Appoint",
    tagline: "Réchauffe une petite pièce en quelques minutes.",
    price: 59,
    tags: ["3 NIVEAUX", "COMPACT"],
    imageLabel: "PHOTO STUDIO — chauffage d'appoint",
    glow: "warm",
    description: [
      "Chauffer toute la maison pour une seule pièce occupée, c'est le meilleur moyen de faire exploser la facture. Le chauffage d'appoint OBFLO réchauffe l'espace où tu es — un bureau, une chambre — en quelques minutes, puis maintient la température sans gaspiller.",
      "Céramique à chauffe rapide, trois modes dont une ventilation seule pour l'été, et des protections contre la surchauffe et le basculement : il se pose sur un bureau et se fait oublier.",
    ],
    highlights: [
      "Chauffe une pièce de 10–15 m²",
      "3 modes dont ventilation seule",
      "Protections surchauffe + basculement",
      "Format compact, posable sur un bureau",
    ],
    specs: [
      { label: "Technologie", value: "Céramique PTC, chauffe rapide" },
      { label: "Modes", value: "3 (éco / confort / ventilation)" },
      { label: "Surface conseillée", value: "10 à 15 m²" },
      { label: "Sécurité", value: "Coupure surchauffe et basculement" },
      { label: "Alimentation", value: "Secteur 220–240 V" },
    ],
    gallery: [
      "PHOTO — chauffage d'appoint sur bureau, ambiance soir",
      "PHOTO MACRO — grille et lueur chaude",
      "PHOTO — dans une chambre, lumière tamisée",
      "PACKSHOT — chauffage sur fond studio sombre",
    ],
  },
  {
    slug: "mini-chauffe-tasse",
    name: "Mini Chauffe-Tasse",
    tagline: "Ton café reste à température, tout l'après-midi.",
    price: 19,
    tags: ["USB", "COMPACT"],
    imageLabel: "PHOTO STUDIO — mini chauffe-tasse",
    glow: "cold",
    description: [
      "Le café froid à moitié bu, c'est le lot de tous les après-midis de travail. Le mini chauffe-tasse OBFLO maintient ton mug à température de dégustation tant qu'il est posé dessus — pas de re-chauffe, pas d'aller-retour au micro-ondes.",
      "Il se branche en USB sur l'ordinateur ou un chargeur, occupe la place d'un dessous de verre, et s'éteint tout seul quand tu retires la tasse.",
    ],
    highlights: [
      "Maintient la boisson à ≈ 55°C",
      "Arrêt automatique au retrait de la tasse",
      "Format dessous de verre",
      "Compatible mugs à fond plat",
    ],
    specs: [
      { label: "Alimentation", value: "USB 5V" },
      { label: "Température de maintien", value: "≈ 55°C" },
      { label: "Diamètre du plateau", value: "≈ 10 cm" },
      { label: "Arrêt automatique", value: "Oui, au retrait de la tasse" },
      { label: "Compatibilité", value: "Mugs et tasses à fond plat" },
    ],
    gallery: [
      "PHOTO — mug sur chauffe-tasse, laptop sombre",
      "PHOTO MACRO — plateau chauffant et témoin lumineux",
      "PHOTO — bureau du soir, vapeur au-dessus du mug",
      "PACKSHOT — chauffe-tasse sur fond studio sombre",
    ],
  },
];

export const packs: Pack[] = [
  {
    slug: "pack-sortie-hiver",
    name: "Pack Sortie Hiver",
    contents: "Gants Chauffants + Mini Chauffe-Tasse",
    items: ["gants-chauffants", "mini-chauffe-tasse"],
    price: 59,
    compareAt: 68,
    imageLabel: "PHOTO — gants + chauffe-tasse ensemble",
  },
  {
    slug: "pack-maison-chaude",
    name: "Pack Maison Chaude",
    contents: "Chaussons Chauffants + Chauffage d'Appoint",
    items: ["chaussons-chauffants", "chauffage-appoint"],
    price: 89,
    compareAt: 103,
    imageLabel: "PHOTO — chaussons + chauffage d'appoint",
  },
  {
    slug: "pack-full-obflo",
    name: "Pack Full OBFLO",
    contents: "Les 4 produits — mains, pieds, café, pièce",
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

export const moments: Moment[] = [
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
];

export const technoFeatures = [
  "Chauffe en quelques secondes",
  "Alimentation USB",
  "Format portable",
  "Usage intérieur & extérieur",
];

export const pourquoiItems = [
  {
    title: "USB universel",
    text: "Compatible bureau, maison, powerbank.",
  },
  {
    title: "Chaleur instantanée",
    text: "Pensé pour les moments où tu as froid maintenant.",
  },
  {
    title: "Compact & portable",
    text: "Facile à déplacer, ranger, emporter.",
  },
  {
    title: "Retours 30 jours",
    text: "Tu testes sans pression.",
  },
  {
    title: "Livraison rapide",
    text: "Essentiel pour des produits d'hiver.",
  },
];

export const reviews: Review[] = [
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
];

export const faqItems: FaqItem[] = [
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
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getPacksForProduct(slug: string): Pack[] {
  return packs.filter((pack) => pack.items.includes(slug));
}

export function formatPrice(value: number): string {
  return `${value} €`;
}
