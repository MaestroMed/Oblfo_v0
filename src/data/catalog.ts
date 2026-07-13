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
};

export type Pack = {
  slug: string;
  name: string;
  contents: string;
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
  },
  {
    slug: "chaussons-chauffants",
    name: "Chaussons Chauffants",
    tagline: "Chaleur avant-pied, intérieur doux, port USB discret.",
    price: 44,
    tags: ["USB", "CHALEUR RAPIDE"],
    imageLabel: "PHOTO STUDIO — chaussons chauffants",
    glow: "cold",
  },
  {
    slug: "chauffage-appoint",
    name: "Chauffage d'Appoint",
    tagline: "Réchauffe une petite pièce en quelques minutes.",
    price: 59,
    tags: ["3 NIVEAUX", "COMPACT"],
    imageLabel: "PHOTO STUDIO — chauffage d'appoint",
    glow: "warm",
  },
  {
    slug: "mini-chauffe-tasse",
    name: "Mini Chauffe-Tasse",
    tagline: "Ton café reste à température, tout l'après-midi.",
    price: 19,
    tags: ["USB", "COMPACT"],
    imageLabel: "PHOTO STUDIO — mini chauffe-tasse",
    glow: "cold",
  },
];

export const packs: Pack[] = [
  {
    slug: "pack-sortie-hiver",
    name: "Pack Sortie Hiver",
    contents: "Gants Chauffants + Mini Chauffe-Tasse",
    price: 59,
    compareAt: 68,
    imageLabel: "PHOTO — gants + chauffe-tasse ensemble",
  },
  {
    slug: "pack-maison-chaude",
    name: "Pack Maison Chaude",
    contents: "Chaussons Chauffants + Chauffage d'Appoint",
    price: 89,
    compareAt: 103,
    imageLabel: "PHOTO — chaussons + chauffage d'appoint",
  },
  {
    slug: "pack-full-obflo",
    name: "Pack Full OBFLO",
    contents: "Les 4 produits — mains, pieds, café, pièce",
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
    productLine: "GANTS CHAUFFANTS — 49 €",
    imageLabel: "PHOTO — rue froide, buée, gants portés",
  },
  {
    kicker: "À LA MAISON",
    title: "Pour rentrer et couper le froid net.",
    productLine: "CHAUSSONS CHAUFFANTS — 44 €",
    imageLabel: "PHOTO — chaussons sur parquet, neige à la fenêtre",
  },
  {
    kicker: "AU BUREAU",
    title: "Pour garder ton café chaud plus longtemps.",
    productLine: "MINI CHAUFFE-TASSE — 19 €",
    imageLabel: "PHOTO — mug sur chauffe-tasse, laptop sombre",
  },
  {
    kicker: "PETITE PIÈCE",
    title: "Pour réchauffer ton espace, pas toute la maison.",
    productLine: "CHAUFFAGE D'APPOINT — 59 €",
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
    question: "Les gants fonctionnent avec une powerbank ?",
    answer:
      "Oui. Tous nos produits s'alimentent en USB standard (5V). Une powerbank de 10 000 mAh fait fonctionner les gants ou les chaussons pendant plusieurs heures.",
  },
  {
    question: "Combien de temps faut-il pour chauffer ?",
    answer:
      "Entre 30 secondes et 2 minutes selon le produit et le niveau choisi. La chaleur est perceptible quasi immédiatement.",
  },
  {
    question: "Les chaussons sont-ils lavables ?",
    answer:
      "Oui, à la main et à l'eau froide, une fois le câble USB débranché. On évite le lave-linge et le sèche-linge.",
  },
  {
    question: "Le chauffage d'appoint consomme beaucoup ?",
    answer:
      "Non. Il est conçu pour chauffer un espace réduit — un bureau, une chambre — pas toute la maison. C'est justement ce qui le rend économe.",
  },
  {
    question: "Peut-on retourner un produit ?",
    answer:
      "Oui, sous 30 jours après réception, sans justification. Remboursement intégral dès que le produit nous revient.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "3 à 5 jours ouvrés en France métropolitaine, avec un numéro de suivi envoyé dès l'expédition.",
  },
];

export function formatPrice(value: number): string {
  return `${value} €`;
}
