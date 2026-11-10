// API du catalogue quadrilingue — les données vivent dans catalog-products-a/b
// et catalog-packs ; les ids restent stables et indépendants de la langue
// (panier, checkout, future app de pilotage). de/es replient sur en (pickL).

import { productsA } from "./catalog-products-a";
import { productsB } from "./catalog-products-b";
import { productsC } from "./catalog-products-c";
import { faqSources, packSources } from "./catalog-packs";
import type {
  Category,
  GlowTone,
  LSpecs,
  LText,
  LTextList,
  PackSource,
  ProductSource,
  ProductVariant,
  Spec,
} from "./catalog-types";
import type { Locale } from "@/i18n/routing";
import { frTypoDeep } from "@/lib/typo";

export type { Category, GlowTone } from "./catalog-types";

export const CATEGORY_ORDER: Category[] = [
  "mains",
  "pieds",
  "corps",
  "maison",
  "bureau",
  "piece",
];

const productSources: ProductSource[] = [...productsA, ...productsB, ...productsC];

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
  /** Packshot détouré (fond transparent), à poser sur un aplat. */
  cutout?: string;
  photos?: string[];
  /** Déclinaison obligatoire (taille, pointure) — libellé localisé + options. */
  variant?: { label: string; options: string[] };
  color?: string;
  description: string[];
  highlights: string[];
  specs: Spec[];
  gallery: string[];
};

export type PackLine = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image?: string;
  cutout?: string;
};

export type Pack = {
  id: string;
  name: string;
  items: string[];
  /** Les articles du pack, avec leur prix à l'unité. */
  lines: PackLine[];
  price: number;
  /** Total des articles achetés séparément — calculé, jamais saisi. */
  compareAt: number;
  save: number;
  available: boolean;
  featured?: boolean;
};

export type FaqItem = {
  question: string;
  answer: string;
};

/** Valeur localisée avec repli sur l'anglais pour les locales incomplètes. */
function pickL(lt: LText, locale: Locale): string;
function pickL(lt: LTextList, locale: Locale): string[];
function pickL(lt: LSpecs, locale: Locale): Spec[];
function pickL(
  lt: LText | LTextList | LSpecs,
  locale: Locale,
): string | string[] | Spec[] {
  const record = lt as Record<string, string | string[] | Spec[] | undefined>;
  const picked = record[locale] ?? lt.en;
  return locale === "fr" ? frTypoDeep(picked) : picked;
}

function slugsByLocale(slug: LText): Record<Locale, string> {
  return {
    fr: slug.fr,
    en: slug.en,
    de: slug.de ?? slug.en,
    es: slug.es ?? slug.en,
  };
}

// public/images/products/<id>/cutout.webp est généré depuis 02-packshot.jpg
function cutoutOf(image?: string): string | undefined {
  return image?.replace("02-packshot.jpg", "cutout.webp");
}

function localizeProduct(source: ProductSource, locale: Locale): Product {
  return {
    id: source.id,
    slug: pickL(source.slug, locale),
    slugs: slugsByLocale(source.slug),
    price: source.price,
    available: source.available ?? true,
    category: source.category,
    glow: source.glow,
    badge: source.badge,
    image: source.image,
    cutout: cutoutOf(source.image),
    photos: source.photos,
    name: pickL(source.name, locale),
    tagline: pickL(source.tagline, locale),
    tags: pickL(source.tags, locale),
    imageLabel: source.imageLabel,
    variant: source.variant
      ? {
          label: pickL(source.variant.name, locale),
          options: source.variant.options,
        }
      : undefined,
    color: source.color && pickL(source.color, locale),
    description: pickL(source.description, locale),
    highlights: pickL(source.highlights, locale),
    specs: pickL(source.specs, locale),
    gallery: source.gallery,
  };
}

function packItems(pack: PackSource): ProductSource[] {
  return pack.items.map((id) => {
    const product = productSources.find((p) => p.id === id);
    if (!product) throw new Error(`Pack ${pack.id} : article inconnu ${id}`);
    return product;
  });
}

function packCompareCents(pack: PackSource): number {
  return packItems(pack).reduce((sum, p) => sum + Math.round(p.price * 100), 0);
}

// Garde-fou : un pack en vente coûte moins cher que ses articles à l'unité,
// sinon le prix barré affiché serait faux.
for (const pack of packSources) {
  if ((pack.available ?? true) && Math.round(pack.price * 100) >= packCompareCents(pack)) {
    throw new Error(`Pack ${pack.id} : prix supérieur ou égal au total des articles`);
  }
}

function localizePack(source: PackSource, locale: Locale): Pack {
  const compareCents = packCompareCents(source);
  return {
    id: source.id,
    name: pickL(source.name, locale),
    items: source.items,
    lines: packItems(source).map((p) => ({
      id: p.id,
      name: pickL(p.name, locale),
      slug: pickL(p.slug, locale),
      price: p.price,
      image: p.image,
      cutout: cutoutOf(p.image),
    })),
    price: source.price,
    compareAt: compareCents / 100,
    save: (compareCents - Math.round(source.price * 100)) / 100,
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
  const source = productSources.find((p) => pickL(p.slug, locale) === slug);
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
    .filter((pack) => (pack.available ?? true) && pack.items.includes(productId))
    .map((p) => localizePack(p, locale));
}

export function getFaqItems(locale: Locale): FaqItem[] {
  return faqSources.map((f) => ({
    question: pickL(f.question, locale),
    answer: pickL(f.answer, locale),
  }));
}

export type Sellable = {
  id: string;
  name: string;
  price: number;
  available: boolean;
  /**
   * Déclinaison à choisir obligatoirement avant la vente. Pour un pack, elle
   * est héritée du produit à variantes qu'il contient — par construction un
   * pack ne peut contenir qu'UN produit à variantes (garde-fou ci-dessous).
   */
  variant?: { label: string; options: string[] };
};

function variantOf(
  source: ProductVariant | undefined,
  locale: Locale,
): Sellable["variant"] {
  return source
    ? { label: pickL(source.name, locale), options: source.options }
    : undefined;
}

/** Prix d'un article vendable (produit ou pack) par id — source de vérité du checkout. */
export function getSellableById(
  id: string,
  locale: Locale,
): Sellable | undefined {
  const product = productSources.find((p) => p.id === id);
  if (product) {
    return {
      id,
      name: pickL(product.name, locale),
      price: product.price,
      available: product.available ?? true,
      variant: variantOf(product.variant, locale),
    };
  }
  const pack = packSources.find((p) => p.id === id);
  if (pack) {
    const variantItems = pack.items
      .map((itemId) => productSources.find((p) => p.id === itemId))
      .filter((p): p is ProductSource => Boolean(p?.variant));
    if (variantItems.length > 1) {
      // Un pack avec plusieurs produits à variantes n'est pas vendable en
      // l'état (une seule sélection par ligne de panier) — on le bloque
      // plutôt que de vendre une offre ambiguë.
      return {
        id,
        name: pickL(pack.name, locale),
        price: pack.price,
        available: false,
      };
    }
    return {
      id,
      name: pickL(pack.name, locale),
      price: pack.price,
      available: pack.available ?? true,
      variant: variantOf(variantItems[0]?.variant, locale),
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
  const source = productSources.find((p) => pickL(p.slug, from) === slug);
  return source ? pickL(source.slug, to) : undefined;
}

export function formatPrice(value: number, locale: Locale): string {
  const formatted = Number.isInteger(value)
    ? String(value)
    : value.toFixed(2).replace(".", locale === "en" ? "." : ",");
  return locale === "en" ? `€${formatted}` : `${formatted} €`;
}
