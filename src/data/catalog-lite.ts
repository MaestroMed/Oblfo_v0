// Version légère du catalogue pour le navigateur (panier, langue, vus récemment) :
// noms, prix, photos et slugs, sans descriptions ni caractéristiques.
// Construite côté serveur et transmise par <CatalogProvider> : le catalogue complet
// (descriptions en 4 langues) n'entre plus dans le JavaScript envoyé au client.
import { getPacks, getProducts, getSellableById, type Pack, type Product, type Sellable } from "./catalog";
import type { Locale } from "@/i18n/routing";

export type LiteProduct = Pick<
  Product,
  "id" | "slug" | "slugs" | "price" | "available" | "badge" | "name" | "tagline" | "image" | "cutout" | "variant"
>;

export type LiteCatalog = {
  products: LiteProduct[];
  packs: Pack[];
  sellables: Record<string, Sellable>;
};

export function buildLiteCatalog(locale: Locale): LiteCatalog {
  const products = getProducts(locale).map(
    ({ id, slug, slugs, price, available, badge, name, tagline, image, cutout, variant }) => ({
      id, slug, slugs, price, available, badge, name, tagline, image, cutout, variant,
    }),
  );
  const packs = getPacks(locale);
  const sellables: Record<string, Sellable> = {};
  for (const id of [...products.map((p) => p.id), ...packs.map((p) => p.id)]) {
    const s = getSellableById(id, locale);
    if (s) sellables[id] = s;
  }
  return { products, packs, sellables };
}
