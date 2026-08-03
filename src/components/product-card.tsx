import Image from "next/image";
import { useTranslations } from "next-intl";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ImageSlot } from "@/components/image-slot";
import { formatPrice, type Product } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
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
  | "imageLabel"
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
    imageLabel: p.imageLabel,
    variant: p.variant,
  };
}

/** Carte produit fond clair (homepage essentiels + page collection). */
export function ProductCard({
  product,
  locale,
}: {
  product: CardProduct;
  locale: Locale;
}) {
  const t = useTranslations("HomeV2");
  const tCart = useTranslations("Cart");

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_18px_50px_-30px_rgba(36,28,20,0.35)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(36,28,20,0.45)]">
      <Link
        href={{ pathname: "/produits/[slug]", params: { slug: product.slug } }}
        className="relative block aspect-square overflow-hidden bg-[#F7F3EC]"
      >
        {product.badge === "new" ? (
          <span className="absolute top-4 left-4 z-[1] rounded-full bg-accent px-3 py-1 font-mono text-[9.5px] font-medium tracking-[0.16em] text-white">
            {t("badgeNew")}
          </span>
        ) : null}
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <ImageSlot label={product.imageLabel} />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 px-5 pt-4 pb-5">
        <Link
          href={{
            pathname: "/produits/[slug]",
            params: { slug: product.slug },
          }}
          className="text-[15.5px] font-semibold text-ink-warm no-underline transition-colors hover:text-accent"
        >
          {product.name}
        </Link>
        <p className="text-[13px] leading-snug text-muted-warm">
          {product.tagline}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-[19px] font-bold text-ink-warm">
            {formatPrice(product.price, locale)}
          </span>
          {product.available ? (
            product.variant ? (
              <Link
                href={{
                  pathname: "/produits/[slug]",
                  params: { slug: product.slug },
                }}
                aria-label={`${tCart("chooseOnProduct")} — ${product.variant.label}`}
                className="flex h-9 items-center justify-center rounded-lg bg-accent px-3 text-[12px] font-semibold text-white no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(240,123,46,0.8)]"
              >
                {tCart("chooseOnProduct")}
              </Link>
            ) : (
              <AddToCartButton
                id={product.id}
                name={product.name}
                price={product.price}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-accent text-lg leading-none font-semibold text-white transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(240,123,46,0.8)]"
              >
                +
              </AddToCartButton>
            )
          ) : (
            <span className="text-[12px] font-semibold text-muted-warm">
              {tCart("unavailable")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
