import type { Category } from "@/data/catalog";

// Une couleur d'aplat par produit et par famille, la même sur tout le site.
// Choisie à l'œil sur les détourés : jamais un produit noir sur chocolat, ni un rouge sur tomate.
export type Tile = "moutarde" | "braise" | "tomate" | "brique" | "choco";

const PRODUCT_TILE: Record<string, Tile> = {
  "gants-chauffants": "moutarde",
  "chauffe-mains": "braise",
  "chaussons-chauffants": "choco",
  "chaussettes-chauffantes": "moutarde",
  "semelles-chauffantes": "tomate",
  "gilet-chauffant": "braise",
  "echarpe-chauffante": "tomate",
  "ceinture-lombaire-chauffante": "choco",
  "bonnet-chauffant": "moutarde",
  "plaid-chauffant": "moutarde",
  "coussin-chauffant": "brique",
  "tapis-chauffant-animaux": "tomate",
  "mini-chauffe-tasse": "brique",
  "sous-main-chauffant": "choco",
  "chauffage-appoint": "moutarde",
};

const CATEGORY_TILE: Record<Category, Tile> = {
  mains: "moutarde",
  pieds: "choco",
  corps: "tomate",
  maison: "moutarde",
  bureau: "brique",
  piece: "braise",
};

// Produit détouré qui représente la famille (lisible sur la couleur de la famille).
export const CATEGORY_HERO: Record<Category, string> = {
  mains: "gants-chauffants",
  pieds: "chaussons-chauffants",
  corps: "echarpe-chauffante",
  maison: "plaid-chauffant",
  bureau: "mini-chauffe-tasse",
  piece: "chauffage-appoint",
};

export const productTile = (id: string): Tile => PRODUCT_TILE[id] ?? "moutarde";
export const categoryTile = (c: Category): Tile => CATEGORY_TILE[c];

/** Vrai si le texte posé sur l'aplat est crème (boutons `.btn-cream`, prix `.price-moutarde`). */
export const isDarkTile = (t: Tile): boolean => t !== "moutarde";

// Classes écrites en toutes lettres pour que Tailwind ne les purge pas.
export const TILE_CLASS: Record<Tile, string> = {
  moutarde: "on-moutarde",
  braise: "on-braise",
  tomate: "on-tomate",
  brique: "on-brique",
  choco: "on-choco",
};
