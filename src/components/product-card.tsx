import Image from "next/image";
import { useTranslations } from "next-intl";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ImageSlot } from "@/components/image-slot";
import { formatPrice, type Product } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import { TILE_CLASS, isDarkTile, productTile } from "@/lib/tile";
import type { Locale } from "@/i18n/routing";

/**
 * Champs strictement nécessaires à la carte — c'est ce sous-ensemble qui est
 * sérialisé vers les composants client (grille triable), jamais le Product
 * complet (description, specs, gallery restent côté serveur).
 */
export type CardProduct = Pick<
  Product,
  | "id"
  | "slug"
  | "price"
  | "available"
  | "badge"
  | "name"
  | "tagline"
  | "image"
  | "cutout"
  | "variant"
>;

export function toCardProduct(p: Product): CardProduct {
  return {
    id: p.id,
    slug: p.slug,
    price: p.price,
    available: p.available,
    badge: p.badge,
    name: p.name,
    tagline: p.tagline,
    image: p.image,
    cutout: p.cutout,
    variant: p.variant,
  };
}

/**
 * Carte produit : aplat de couleur propre au produit (`src/lib/tile.ts`), détouré, prix en pastille.
 * `wide` : sous 1024 px, le texte passe à gauche et le détouré à droite (cartes de l'accueil).
 */
export function ProductCard({
  product,
  locale,
  wide = false,
}: {
  product: CardProduct;
  locale: Locale;
  wide?: boolean;
}) {
  const t = useTranslations("HomeV2");
  const tCart = useTranslations("Cart");
  const tile = productTile(product.id);
  const dark = isDarkTile(tile);
  const href = {
    pathname: "/produits/[slug]" as const,
    params: { slug: product.slug },
  };
  const button = `btn btn-sm btn-block relative z-[1] px-3 ${dark ? "btn-cream" : ""}`;

  return (
    <article
      className={`tile ${TILE_CLASS[tile]} group relative flex h-full ${wide ? "flex-row-reverse lg:flex-col" : "flex-col"}`}
    >
      <span
        className={`relative block shrink-0 ${wide ? "w-[42%] lg:aspect-square lg:w-auto" : "aspect-square"}`}
      >
        {product.cutout ? (
          <Image
            src={product.cutout}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="cutout p-3 transition-transform duration-300 group-hover:scale-105 sm:p-6"
          />
        ) : product.image ? (
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover"
          />
        ) : (
          <ImageSlot />
        )}
        {product.badge === "new" ? (
          <span className={`chip absolute top-3 left-3 ${dark ? "chip-cream" : ""}`}>
            {t("badgeNew")}
          </span>
        ) : null}
      </span>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-3 p-3 sm:p-5">
        <h3
          className={`leading-[1.08] [overflow-wrap:anywhere] hyphens-auto sm:text-[22px] ${wide ? "text-[20px]" : "text-[18px]"}`}
        >
          {/* Le lien du titre couvre toute la carte : l'image reste décorative. */}
          <Link href={href} className="no-underline after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <span
          className={`price price-sm mt-auto sm:px-[14px] sm:py-1 sm:text-[20px] ${dark ? "price-moutarde" : ""}`}
        >
          {formatPrice(product.price, locale)}
        </span>
        {product.available ? (
          product.variant ? (
            <Link
              href={href}
              aria-label={`${tCart("chooseOnProduct")} — ${product.variant.label} — ${product.name}`}
              className={`${button} no-underline`}
            >
              {tCart("chooseOnProduct")}
            </Link>
          ) : (
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={product.price}
              className={button}
            >
              {t("cardAdd")}
              <span className="sr-only"> {product.name}</span>
            </AddToCartButton>
          )
        ) : (
          <span aria-disabled="true" className="btn btn-sm btn-block btn-outline px-3">
            {tCart("unavailable")}
          </span>
        )}
      </div>
    </article>
  );
}
