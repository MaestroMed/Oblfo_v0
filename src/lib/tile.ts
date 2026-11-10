import type { Category } from "@/data/catalog";

// Une couleur d'aplat par produit et par famille, la même sur tout le site.
// Choisie à l'œil sur les détourés : jamais un produit noir sur chocolat, ni un rouge sur tomate.
export type Tile = "miel" | "peche" | "sable" | "argile";

const PRODUCT_TILE: Record<string, Tile> = {
  "gants-chauffants": "miel",
  "chauffe-mains": "peche",
  "chaussons-chauffants": "sable",
  "chaussettes-chauffantes": "miel",
  "semelles-chauffantes": "argile",
  "gilet-chauffant": "peche",
  "echarpe-chauffante": "argile",
  "ceinture-lombaire-chauffante": "sable",
  "bonnet-chauffant": "miel",
  "plaid-chauffant": "miel",
  "coussin-chauffant": "argile",
  "tapis-chauffant-animaux": "argile",
  "mini-chauffe-tasse": "argile",
  "sous-main-chauffant": "sable",
  "chauffage-appoint": "miel",
};

const CATEGORY_TILE: Record<Category, Tile> = {
  mains: "miel",
  pieds: "sable",
  corps: "argile",
  maison: "miel",
  bureau: "argile",
  piece: "peche",
};

export const productTile = (id: string): Tile => PRODUCT_TILE[id] ?? "miel";
export const categoryTile = (c: Category): Tile => CATEGORY_TILE[c];

export const TILE_CLASS: Record<Tile, string> = {
  miel: "on-miel",
  peche: "on-peche",
  sable: "on-sable",
  argile: "on-argile",
};

/** Photo d'habillage plein cadre : `hero` ou le nom d'une famille (`public/images/deco/`). */
export const deco = (name: string) => `/images/deco/${name}.webp`;
