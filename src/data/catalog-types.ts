// Types du catalogue quadrilingue.
// fr/en sont obligatoires ; de/es optionnels avec repli sur en (pickL) —
// on peut donc livrer une locale progressivement sans jamais casser le build.

export type GlowTone = "warm" | "cold";

/** Rayons du catalogue — libellés localisés dans messages (Categories.*). */
export type Category =
  | "mains"
  | "pieds"
  | "bureau"
  | "piece"
  | "maison"
  | "corps";

export type ExtraLocale = "de" | "es";

export type LText = { fr: string; en: string } & Partial<
  Record<ExtraLocale, string>
>;
export type LTextList = { fr: string[]; en: string[] } & Partial<
  Record<ExtraLocale, string[]>
>;
export type Spec = { label: string; value: string };
export type LSpecs = { fr: Spec[]; en: Spec[] } & Partial<
  Record<ExtraLocale, Spec[]>
>;

/**
 * Déclinaison obligatoire à choisir avant l'ajout au panier (taille, pointure).
 * Un produit qui en a une ne peut JAMAIS être vendu sans — validé côté serveur.
 */
export type ProductVariant = {
  /** Libellé du sélecteur : « Taille », « Pointure »… */
  name: LText;
  /** Valeurs proposées, telles qu'affichées et stockées (ex. "M", "EU 35–40"). */
  options: string[];
};

export type ProductSource = {
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
  variant?: ProductVariant;
  description: LTextList;
  highlights: LTextList;
  specs: LSpecs;
  gallery: string[];
};

export type PackSource = {
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

export type FaqSource = {
  question: LText;
  answer: LText;
};
