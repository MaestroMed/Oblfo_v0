// Réglages publiés depuis le back-office (/admin). Le fichier overrides.json est réécrit au build
// (scripts/pull-overrides.mjs) ; seules les valeurs qui diffèrent du catalogue y figurent.
import type { Locale } from "@/i18n/routing";
import type { LText, PackSource, ProductSource } from "./catalog-types";
import raw from "./overrides.json";

type LPartial = Partial<Record<Locale, string>>;
export type ProductOverride = { price?: number; available?: boolean; badge?: "new" | null; name?: LPartial; tagline?: LPartial };
export type PackOverride = { price?: number; available?: boolean };
export type Overrides = {
  products?: Record<string, ProductOverride>;
  packs?: Record<string, PackOverride>;
  /** Textes du site par langue : { fr: { HomeV2: { heroLead: "…" } } }. */
  messages?: Partial<Record<Locale, Record<string, Record<string, string>>>>;
  /** Les 2 produits posés sur la photo d'accueil. */
  featured?: string[];
  publishedAt?: string;
};

export const OVERRIDES = raw as Overrides;

const mergeL = (base: LText, o?: LPartial): LText => (o ? ({ ...base, ...o } as LText) : base);

export function applyProductOverride(p: ProductSource): ProductSource {
  const o = OVERRIDES.products?.[p.id];
  if (!o) return p;
  const badge = o.badge === null ? undefined : (o.badge ?? p.badge);
  return {
    ...p,
    price: o.price ?? p.price,
    available: o.available ?? p.available,
    badge,
    name: mergeL(p.name, o.name),
    tagline: mergeL(p.tagline, o.tagline),
  };
}

export function applyPackOverride(p: PackSource): PackSource {
  const o = OVERRIDES.packs?.[p.id];
  return o ? { ...p, price: o.price ?? p.price, available: o.available ?? p.available } : p;
}
