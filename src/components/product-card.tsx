import Image from "next/image";
import { useTranslations } from "next-intl";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ImageSlot } from "@/components/image-slot";
import { formatPrice, type Product } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import { TILE_CLASS, productTile } from "@/lib/tile";
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

const button = "btn btn-outline btn-sm btn-block relative z-[1] mt-1 px-3";

/** Carte produit : la photo détourée sur la teinte du produit (`src/lib/tile.ts`), puis nom, prix et bouton sur la page. */
export function ProductCard({ product, locale }: { product: CardProduct; locale: Locale }) {
  const t = useTranslations("HomeV2");
  const tCart = useTranslations("Cart");
  const href = {
    pathname: "/produits/[slug]" as const,
    params: { slug: product.slug },
  };

  return (
    <article className="group relative flex h-full flex-col">
      <span className={`tile relative block aspect-square shrink-0 ${TILE_CLASS[productTile(product.id)]}`}>
        {product.cutout ? (
          <Image
            src={product.cutout}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="cutout p-[7%] transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <ImageSlot />
        )}
        {product.badge === "new" ? (
          <span className="chip absolute top-3 left-3">{t("badgeNew")}</span>
        ) : null}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1 pt-3">
        <h3 className="text-[17px] leading-[1.15] [overflow-wrap:anywhere] hyphens-auto sm:text-[19px]">
          {/* Le lien du titre couvre toute la carte : l'image reste décorative. */}
          <Link href={href} className="no-underline after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <span className="mb-auto text-[17px] font-bold tabular-nums sm:text-[18px]">
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
          <span aria-disabled="true" className={button}>
            {tCart("unavailable")}
          </span>
        )}
      </div>
    </article>
  );
}
