// Catalogue statique v0 — sera piloté par l'app de gestion de boutique à terme.
// Les ids (produits, packs) sont stables et indépendants de la langue :
// ce sont eux qui circulent dans le panier, le checkout et bientôt l'app de pilotage.
// Les libellés photo (imageLabel, gallery) sont des briefs de shooting internes,
// volontairement non traduits — remplacés par de vraies images à terme.

import type { Locale } from "@/i18n/routing";

export type GlowTone = "warm" | "cold";

/** Rayons du catalogue — libellés localisés dans messages (Categories.*). */
export type Category = "mains" | "pieds" | "bureau" | "piece" | "maison" | "corps";
export const CATEGORY_ORDER: Category[] = [
  "mains",
  "pieds",
  "corps",
  "maison",
  "bureau",
  "piece",
];

type LText = Record<Locale, string>;
type LTextList = Record<Locale, string[]>;
type LSpecs = Record<Locale, { label: string; value: string }[]>;

type ProductSource = {
  id: string;
  slug: LText;
  price: number;
  /** Passe à false pour retirer de la vente sans supprimer la page (rupture CJ). */
  available?: boolean;
  category: Category;
  glow: GlowTone;
  /** Badge marketing véridique (ex. "new") — jamais de fausse mention best-seller. */
  badge?: "new";
  name: LText;
  tagline: LText;
  tags: LTextList;
  imageLabel: string;
  /** Photo produit (packshot studio) — chemin public/. Fallback : ImageSlot. */
  image?: string;
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
  category: Category;
  glow: GlowTone;
  badge?: "new";
  name: string;
  tagline: string;
  tags: string[];
  imageLabel: string;
  image?: string;
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
    price: 59,
    category: "mains",
    glow: "warm",
    badge: "new",
    image: "/images/products/gants.jpg",
    name: { fr: "Gants Chauffants Pro 2026", en: "Heated Gloves Pro 2026" },
    tagline: {
      fr: "Chaleur rapide et réglable, paume et doigts.",
      en: "Fast, adjustable warmth across palm and fingers.",
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
    category: "pieds",
    glow: "cold",
    image: "/images/products/chaussons.jpg",
    name: {
      fr: "Chaussons Chauffants Confort",
      en: "Comfort Heated Slippers",
    },
    tagline: {
      fr: "Douceur & chaleur enveloppante, port USB discret.",
      en: "Soft, enveloping warmth with a discreet USB port.",
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
    price: 49,
    category: "piece",
    glow: "warm",
    badge: "new",
    image: "/images/products/chauffage.jpg",
    name: { fr: "Chauffage Céramique Pro", en: "Ceramic Heater Pro" },
    tagline: {
      fr: "Chauffe rapide, 2 niveaux, pour une petite pièce.",
      en: "Fast heat, 2 levels, sized for a small room.",
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
    category: "bureau",
    glow: "cold",
    image: "/images/products/tasse.jpg",
    name: { fr: "Mug Warmer Intelligent", en: "Smart Mug Warmer" },
    tagline: {
      fr: "Température constante, votre café reste chaud.",
      en: "Constant temperature — your coffee stays hot.",
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

const gilet: ProductSource = {
    id: "gilet-chauffant",
    slug: { fr: "gilet-chauffant", en: "heated-vest" },
    price: 79,
    category: "corps",
    glow: "warm",
    badge: "new",
    image: "/images/products/gilet.jpg",
    name: { fr: "Gilet Chauffant Graphène", en: "Graphene Heated Vest" },
    tagline: {
      fr: "Zones de chauffe graphène, du col aux lombaires.",
      en: "Graphene heating zones, from collar to lower back.",
    },
    tags: {
      fr: ["USB", "ZONES MULTIPLES"],
      en: ["USB", "MULTI-ZONE"],
    },
    imageLabel: "PACKSHOT — gilet chauffant matelassé noir",
    description: {
      fr: [
        "Le froid s'attaque d'abord au tronc — et c'est le tronc qui commande la sensation de chaleur de tout le corps. Le gilet chauffant OBFLO diffuse une chaleur graphène sur plusieurs zones indépendantes, du col aux lombaires, sous n'importe quelle veste.",
        "Trois niveaux de chauffe, un textile matelassé léger qui se porte discrètement, et une alimentation USB universelle : branchez votre powerbank (non incluse — 20 W recommandés pour une chauffe optimale) dans la poche intérieure et gardez les mains libres.",
      ],
      en: [
        "Cold goes for your core first — and your core drives how warm your whole body feels. The OBFLO heated vest delivers graphene warmth across several independent zones, from collar to lower back, under any jacket.",
        "Three heat levels, a light quilted fabric that wears discreetly, and universal USB power: plug your power bank (not included — 20 W recommended for best heat) into the inner pocket and keep your hands free.",
      ],
    },
    highlights: {
      fr: [
        "Zones de chauffe indépendantes (dos, lombaires, col)",
        "3 niveaux de chauffe",
        "Textile graphène léger, lavable en machine à froid",
        "Fonctionne sur powerbank USB (non incluse)",
      ],
      en: [
        "Independent heating zones (back, lower back, collar)",
        "3 heat levels",
        "Light graphene fabric, cold machine-washable",
        "Runs on a USB power bank (not included)",
      ],
    },
    specs: {
      fr: [
        { label: "Alimentation", value: "USB 5V — powerbank non incluse (20 W recommandés)" },
        { label: "Niveaux de chauffe", value: "3 (≈ 25 / 35 / 45 °C annoncés)" },
        {
          label: "Autonomie sur powerbank 10 000 mAh",
          value: "Jusqu'à ≈ 3 h à pleine puissance, davantage en mode éco",
        },
        {
          label: "Tailles",
          value: "S à 3XL — coupe asiatique : prenez UNE taille au-dessus de votre taille EU",
        },
        { label: "Entretien", value: "Lavage machine à froid, ne pas tordre" },
      ],
      en: [
        { label: "Power", value: "USB 5V — power bank not included (20 W recommended)" },
        { label: "Heat levels", value: "3 (≈ 25 / 35 / 45 °C claimed)" },
        {
          label: "Battery life on a 10,000 mAh power bank",
          value: "Up to ≈ 3 h at full power, longer in eco mode",
        },
        {
          label: "Sizes",
          value: "S to 3XL — Asian cut: order ONE size up from your EU size",
        },
        { label: "Care", value: "Cold machine wash, do not wring" },
      ],
    },
    gallery: [
      "PACKSHOT — gilet chauffant matelassé noir, bouton power orange",
      "PHOTO MACRO — zones de chauffe graphène dos",
      "PHOTO — gilet porté sous une veste, ville d'hiver",
      "PHOTO — poche intérieure avec powerbank branchée",
    ],
  };
const plaid: ProductSource = {
  id: "plaid-chauffant",
  slug: { fr: "plaid-chauffant", en: "heated-throw-blanket" },
  price: 79,
  category: "maison",
  glow: "warm",
  badge: "new",
  image: "/images/products/plaid.jpg",
  name: { fr: "Plaid Chauffant Cocon", en: "Cocoon Heated Throw" },
  tagline: {
    fr: "Flanelle double face, chaleur en minutes, arrêt auto.",
    en: "Double-sided flannel, warm in minutes, auto shut-off.",
  },
  tags: { fr: ["ARRÊT AUTO", "LAVABLE"], en: ["AUTO-OFF", "WASHABLE"] },
  imageLabel: "PACKSHOT — plaid chauffant gris anthracite plié",
  description: {
    fr: [
      "Le canapé d'hiver a un problème : la couverture met vingt minutes à devenir agréable. Le plaid chauffant OBFLO chauffe en quelques minutes grâce à son élément céramique PTC, et sa flanelle double face garde la chaleur même une fois éteint.",
      "Plusieurs niveaux de température, une minuterie avec arrêt automatique pour s'endormir dessous sans y penser, et un contrôleur détachable pour passer le plaid en machine à 30 °C.",
    ],
    en: [
      "Winter sofas have a problem: blankets take twenty minutes to feel good. The OBFLO heated throw warms up within minutes thanks to its PTC ceramic element, and its double-sided flannel holds the heat even after you switch it off.",
      "Multiple temperature levels, a timer with automatic shut-off so you can doze off under it worry-free, and a detachable controller so the throw goes straight into a 30 °C machine wash.",
    ],
  },
  highlights: {
    fr: [
      "Chauffe perceptible en quelques minutes (PTC)",
      "Minuterie + arrêt automatique",
      "Contrôleur détachable, lavable en machine à 30 °C",
      "Flanelle douce double face, format canapé 130×180 cm",
    ],
    en: [
      "Noticeably warm within minutes (PTC)",
      "Timer + automatic shut-off",
      "Detachable controller, 30 °C machine washable",
      "Soft double-sided flannel, 130×180 cm sofa size",
    ],
  },
  specs: {
    fr: [
      { label: "Alimentation", value: "Secteur 220–240 V, prise EU" },
      { label: "Puissance", value: "≈ 100 W" },
      { label: "Sécurité", value: "Arrêt automatique + protection anti-surchauffe" },
      { label: "Dimensions", value: "≈ 130 × 180 cm" },
      { label: "Entretien", value: "Machine à 30 °C, contrôleur détaché" },
    ],
    en: [
      { label: "Power", value: "Mains 220–240 V, EU plug" },
      { label: "Wattage", value: "≈ 100 W" },
      { label: "Safety", value: "Auto shut-off + overheat protection" },
      { label: "Dimensions", value: "≈ 130 × 180 cm" },
      { label: "Care", value: "30 °C machine wash, controller detached" },
    ],
  },
  gallery: [
    "PACKSHOT — plaid chauffant gris anthracite plié, contrôleur posé dessus",
    "PHOTO — plaid déplié sur canapé, soirée d'hiver",
    "PHOTO MACRO — flanelle + contrôleur à molette",
    "PHOTO — machine à laver, contrôleur détaché",
  ],
};

const coussin: ProductSource = {
  id: "coussin-chauffant",
  slug: { fr: "coussin-chauffant-nuque", en: "neck-shoulder-heating-pad" },
  price: 44,
  category: "maison",
  glow: "cold",
  badge: "new",
  image: "/images/products/coussin.jpg",
  name: {
    fr: "Coussin Chauffant Nuque & Épaules",
    en: "Neck & Shoulder Heating Pad",
  },
  tagline: {
    fr: "Chaleur ciblée sur les trapèzes, épouse la nuque.",
    en: "Targeted warmth on the trapezius, shaped for the neck.",
  },
  tags: { fr: ["ARRÊT AUTO", "ERGONOMIQUE"], en: ["AUTO-OFF", "ERGONOMIC"] },
  imageLabel: "PACKSHOT — coussin chauffant nuque-épaules gris",
  description: {
    fr: [
      "Nuque raide après une journée d'écran, épaules nouées par le froid : c'est exactement là que ce coussin travaille. Sa forme en U épouse la nuque et descend sur les trapèzes, là où un coussin classique glisse.",
      "Plusieurs niveaux de température, un arrêt automatique de sécurité, et une housse douce qui se retire pour le lavage. La chaleur détend — c'est le principe même de la thermothérapie du quotidien.",
    ],
    en: [
      "Stiff neck after a screen day, shoulders knotted by the cold: that's exactly where this pad works. Its U-shape hugs the neck and reaches down over the trapezius, right where a classic pad slides off.",
      "Multiple temperature levels, a safety auto shut-off, and a soft cover that comes off for washing. Heat relaxes — that's everyday heat-therapy working as intended.",
    ],
  },
  highlights: {
    fr: [
      "Forme en U : nuque + trapèzes couverts",
      "Plusieurs niveaux de température",
      "Arrêt automatique de sécurité",
      "Housse douce amovible et lavable",
    ],
    en: [
      "U-shape covers neck + trapezius",
      "Multiple temperature levels",
      "Safety auto shut-off",
      "Soft removable, washable cover",
    ],
  },
  specs: {
    fr: [
      { label: "Alimentation", value: "Secteur 220–240 V, prise EU" },
      { label: "Niveaux de chauffe", value: "Plusieurs niveaux (≈ 40–55 °C)" },
      { label: "Sécurité", value: "Arrêt automatique + protection surchauffe" },
      { label: "Zone couverte", value: "Nuque, épaules, haut du dos" },
      { label: "Entretien", value: "Housse amovible lavable, module débranché" },
    ],
    en: [
      { label: "Power", value: "Mains 220–240 V, EU plug" },
      { label: "Heat levels", value: "Multiple levels (≈ 40–55 °C)" },
      { label: "Safety", value: "Auto shut-off + overheat protection" },
      { label: "Coverage", value: "Neck, shoulders, upper back" },
      { label: "Care", value: "Removable washable cover, module unplugged" },
    ],
  },
  gallery: [
    "PACKSHOT — coussin nuque-épaules gris, contrôleur filaire",
    "PHOTO — porté assis au bureau, détente",
    "PHOTO MACRO — texture polaire + surpiqûres",
    "PHOTO — housse retirée pour lavage",
  ],
};

const chauffeMains: ProductSource = {
  id: "chauffe-mains",
  slug: { fr: "chauffe-mains-rechargeable", en: "rechargeable-hand-warmer" },
  price: 39,
  category: "mains",
  glow: "warm",
  badge: "new",
  image: "/images/products/chauffe-mains.jpg",
  name: {
    fr: "Chauffe-Mains Rechargeable",
    en: "Rechargeable Hand Warmer",
  },
  tagline: {
    fr: "Deux galets magnétiques, chauds en secondes, powerbank intégrée.",
    en: "Two magnetic pebbles, warm in seconds, built-in power bank.",
  },
  tags: { fr: ["2-EN-1", "SÉPARABLE"], en: ["2-IN-1", "SPLITS IN TWO"] },
  imageLabel: "PACKSHOT — paire de chauffe-mains galets noirs",
  description: {
    fr: [
      "Un galet dans chaque poche, et le trajet du matin change. Ce chauffe-mains se sépare magnétiquement en deux unités — une par main — qui montent en température en quelques secondes, avec trois niveaux jusqu'à 55 °C.",
      "La batterie fait aussi powerbank : un port USB dépanne votre téléphone en fin de journée. Double face chauffante, corps aluminium doux au toucher, et contrôle de température embarqué contre la surchauffe.",
    ],
    en: [
      "One pebble in each pocket changes the morning commute. This hand warmer splits magnetically into two units — one per hand — that heat up in seconds, with three levels up to 55 °C.",
      "The battery doubles as a power bank: a USB port tops up your phone at the end of the day. Double-sided heating, soft-touch aluminium body, and on-board temperature control against overheating.",
    ],
  },
  highlights: {
    fr: [
      "Se sépare en 2 unités magnétiques",
      "3 niveaux jusqu'à ≈ 55 °C, chauffe en secondes",
      "Fonction powerbank (sortie USB)",
      "Contrôle de température anti-surchauffe",
    ],
    en: [
      "Splits into 2 magnetic units",
      "3 levels up to ≈ 55 °C, warm in seconds",
      "Power bank function (USB output)",
      "Overheat-protected temperature control",
    ],
  },
  specs: {
    fr: [
      { label: "Batterie", value: "Lithium rechargeable (2 unités) — interdite en soute avion" },
      { label: "Niveaux de chauffe", value: "3 (≈ 45 / 50 / 55 °C), double face" },
      { label: "Autonomie réaliste", value: "≈ 4 à 8 h au niveau haut, selon capacité" },
      { label: "Recharge", value: "USB, ≈ 2 h ; sortie powerbank USB" },
      { label: "Entretien", value: "Chiffon sec — non lavable (électronique)" },
    ],
    en: [
      { label: "Battery", value: "Rechargeable lithium (2 units) — not allowed in checked luggage" },
      { label: "Heat levels", value: "3 (≈ 45 / 50 / 55 °C), double-sided" },
      { label: "Realistic battery life", value: "≈ 4 to 8 h on high, capacity-dependent" },
      { label: "Charging", value: "USB, ≈ 2 h; USB power-bank output" },
      { label: "Care", value: "Dry cloth — not washable (electronics)" },
    ],
  },
  gallery: [
    "PACKSHOT — deux galets noirs magnétiques, LED ambre",
    "PHOTO MACRO — séparation magnétique des deux unités",
    "PHOTO — galet dans une main gantée, hiver",
    "PHOTO — recharge USB-C sur bureau",
  ],
};

const semelles: ProductSource = {
  id: "semelles-chauffantes",
  slug: { fr: "semelles-chauffantes", en: "heated-insoles" },
  price: 49,
  category: "pieds",
  glow: "cold",
  badge: "new",
  image: "/images/products/semelles.jpg",
  name: {
    fr: "Semelles Chauffantes Télécommandées",
    en: "Remote-Control Heated Insoles",
  },
  tagline: {
    fr: "Batterie intégrée, télécommande, découpables à votre pointure.",
    en: "Built-in battery, wireless remote, trim-to-fit sizing.",
  },
  tags: { fr: ["TÉLÉCOMMANDE", "DÉCOUPABLES"], en: ["REMOTE", "TRIM-TO-FIT"] },
  imageLabel: "PACKSHOT — semelles chauffantes noires, zone avant-pied",
  description: {
    fr: [
      "Les pieds sont les premiers à geler et les derniers à se réchauffer. Ces semelles intègrent la batterie directement dans la semelle — pas de boîtier à la cheville, pas de câble dans la chaussure — et se pilotent à la télécommande sans se déchausser.",
      "Trois niveaux de chauffe centrés sur l'avant-pied, deux bases de tailles à découper proprement le long des lignes marquées, et une autonomie honnête : comptez 3 à 7 heures selon le niveau choisi.",
    ],
    en: [
      "Feet freeze first and warm up last. These insoles build the battery into the sole itself — no ankle pack, no cable inside the shoe — and are controlled by a wireless remote without taking your shoes off.",
      "Three heat levels focused on the forefoot, two size bases that trim cleanly along the marked lines, and honest battery life: expect 3 to 7 hours depending on the level.",
    ],
  },
  highlights: {
    fr: [
      "Batterie intégrée — aucun boîtier externe",
      "Télécommande sans fil, 3 niveaux",
      "Découpables : EU 35–40 et EU 41–46",
      "Chauffe ciblée avant-pied (≈ 35–55 °C)",
    ],
    en: [
      "Built-in battery — no external pack",
      "Wireless remote, 3 levels",
      "Trim-to-fit: EU 35–40 and EU 41–46",
      "Targeted forefoot heat (≈ 35–55 °C)",
    ],
  },
  specs: {
    fr: [
      { label: "Batterie", value: "Lithium ≈ 2000 mAh intégrée par semelle, recharge USB" },
      { label: "Niveaux de chauffe", value: "3 (≈ 35–55 °C), télécommande sans fil" },
      { label: "Autonomie réaliste", value: "3 à 7 h selon le niveau" },
      { label: "Pointures", value: "2 bases découpables : EU 35–40 / EU 41–46 (lignes marquées uniquement)" },
      { label: "Entretien", value: "Chiffon humide — ne pas immerger" },
    ],
    en: [
      { label: "Battery", value: "≈ 2000 mAh lithium built into each insole, USB charging" },
      { label: "Heat levels", value: "3 (≈ 35–55 °C), wireless remote" },
      { label: "Realistic battery life", value: "3 to 7 h depending on level" },
      { label: "Sizes", value: "2 trim-to-fit bases: EU 35–40 / EU 41–46 (marked lines only)" },
      { label: "Care", value: "Damp cloth — do not immerse" },
    ],
  },
  gallery: [
    "PACKSHOT — paire de semelles noires, motif de chauffe avant-pied",
    "PHOTO MACRO — lignes de découpe pointures",
    "PHOTO — télécommande en main, bottes d'hiver",
    "PHOTO — recharge USB des deux semelles",
  ],
};

const sousMain: ProductSource = {
  id: "sous-main-chauffant",
  slug: { fr: "sous-main-chauffant", en: "heated-desk-mat" },
  price: 39,
  category: "bureau",
  glow: "warm",
  badge: "new",
  image: "/images/products/tapis-bureau.jpg",
  name: { fr: "Sous-Main Chauffant", en: "Heated Desk Mat" },
  tagline: {
    fr: "Grand format 80×33 cm, mains et poignets au chaud en secondes.",
    en: "Large 80×33 cm surface — warm hands and wrists in seconds.",
  },
  tags: { fr: ["ARRÊT AUTO", "GRAND FORMAT"], en: ["AUTO-OFF", "FULL SIZE"] },
  imageLabel: "PACKSHOT — sous-main chauffant anthracite, coin relevé",
  description: {
    fr: [
      "Les mains froides au clavier ruinent la concentration. Ce sous-main grand format chauffe toute la zone clavier + souris en quelques secondes, et garde mains et poignets à température de travail toute la journée.",
      "Surface facile à nettoyer et résistante aux éclaboussures, plusieurs niveaux de température, et un arrêt automatique après quelques heures — la sécurité qui va avec un usage bureau prolongé.",
    ],
    en: [
      "Cold hands on a keyboard ruin focus. This full-size desk mat heats the entire keyboard + mouse area within seconds and keeps hands and wrists at working temperature all day.",
      "Easy-clean, splash-resistant surface, multiple temperature levels, and an automatic shut-off after a few hours — the safety that belongs with long desk sessions.",
    ],
  },
  highlights: {
    fr: [
      "Grand format 80 × 33 cm (clavier + souris)",
      "Chauffe en quelques secondes",
      "Arrêt automatique de sécurité",
      "Surface antidérapante, résistante aux éclaboussures",
    ],
    en: [
      "Full 80 × 33 cm size (keyboard + mouse)",
      "Heats up in seconds",
      "Safety auto shut-off",
      "Non-slip, splash-resistant surface",
    ],
  },
  specs: {
    fr: [
      { label: "Alimentation", value: "Secteur 220–240 V, prise EU" },
      { label: "Niveaux de chauffe", value: "3 niveaux (≈ 38–50 °C)" },
      { label: "Sécurité", value: "Arrêt automatique ≈ 3 h + anti-surchauffe" },
      { label: "Dimensions", value: "≈ 80 × 33 cm, épaisseur ≈ 3 mm" },
      { label: "Entretien", value: "Chiffon humide, surface étanche aux éclaboussures" },
    ],
    en: [
      { label: "Power", value: "Mains 220–240 V, EU plug" },
      { label: "Heat levels", value: "3 levels (≈ 38–50 °C)" },
      { label: "Safety", value: "≈ 3 h auto shut-off + overheat protection" },
      { label: "Dimensions", value: "≈ 80 × 33 cm, ≈ 3 mm thin" },
      { label: "Care", value: "Damp cloth, splash-proof surface" },
    ],
  },
  gallery: [
    "PACKSHOT — sous-main anthracite, commandes tactiles au bord",
    "PHOTO — setup bureau complet clavier + souris dessus",
    "PHOTO MACRO — commandes tactiles et témoin ambre",
    "PHOTO — mains au clavier, lumière chaude",
  ],
};

productSources.push(gilet, plaid, coussin, chauffeMains, semelles, sousMain);

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
    compareAt: 78,
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
    price: 79,
    compareAt: 93,
    imageLabel: "PHOTO — chaussons + chauffage d'appoint",
  },
  {
    id: "pack-exterieur",
    name: { fr: "Pack Extérieur Hiver", en: "Winter Outdoor Bundle" },
    contents: {
      fr: "Gants Pro + Semelles Chauffantes + Chauffe-Mains",
      en: "Pro Gloves + Heated Insoles + Hand Warmer",
    },
    items: ["gants-chauffants", "semelles-chauffantes", "chauffe-mains"],
    price: 129,
    compareAt: 147,
    imageLabel: "PHOTO — gants + semelles + chauffe-mains réunis",
  },
  {
    id: "pack-cocooning",
    name: { fr: "Pack Cocooning", en: "Cocooning Bundle" },
    contents: {
      fr: "Plaid Chauffant + Coussin Nuque & Épaules",
      en: "Heated Throw + Neck & Shoulder Pad",
    },
    items: ["plaid-chauffant", "coussin-chauffant"],
    price: 109,
    compareAt: 123,
    imageLabel: "PHOTO — plaid + coussin sur canapé",
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
    price: 149,
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
      productLine: "GANTS CHAUFFANTS — 59 €",
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
      productLine: "CHAUFFAGE CÉRAMIQUE — 49 €",
      imageLabel: "PHOTO — chauffage d'appoint sur bureau, ambiance soir",
    },
  ],
  en: [
    {
      kicker: "OUTSIDE",
      title: "To go out without suffering winter.",
      productLine: "HEATED GLOVES — €59",
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
      productLine: "CERAMIC HEATER — €49",
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
    category: source.category,
    glow: source.glow,
    badge: source.badge,
    image: source.image,
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
