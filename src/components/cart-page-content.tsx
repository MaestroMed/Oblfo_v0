"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/components/cart-context";
import { CartCheckout, CartEmpty, CartLines, FreeShippingBar, PackSuggestion } from "@/components/cart-parts";
import { ProductCard, toCardProduct } from "@/components/product-card";
import { useFreeShippingPromo } from "@/components/use-free-shipping-promo";
import { formatPrice, getListedProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { shippingCostFor } from "@/lib/shipping";

export function CartPageContent({ locale }: { locale: Locale }) {
  const t = useTranslations("CartPage");
  const tCart = useTranslations("Cart");
  const { items, total, hydrated } = useCart();

  const promo = useFreeShippingPromo();
  const shipping = promo ? 0 : shippingCostFor(total);
  const grandTotal = total + shipping;
  const inCart = new Set(items.map((i) => i.id));
  const crossSell = getListedProducts(locale)
    .filter((p) => !inCart.has(p.id))
    .slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-[1240px] px-4 pt-8 pb-14 sm:px-8 sm:pt-12 sm:pb-24">
      <h1 className="mb-6 text-[clamp(28px,5vw,44px)] sm:mb-10">{t("title")}</h1>

      {!hydrated ? (
        // Le panier se lit dans le navigateur : on réserve la place plutôt que d'afficher « vide » une fraction de seconde.
        <div className="min-h-[50vh]" />
      ) : items.length === 0 ? (
        <div className="tile on-cream-2 px-6 py-14 sm:py-20">
          <CartEmpty />
        </div>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-10">
            <div className="flex min-w-0 flex-col gap-4">
              <div className="tile on-paper px-4 sm:px-7">
                <CartLines roomy />
              </div>
              <PackSuggestion />
              <Link href="/collection" className="link flex min-h-11 w-fit items-center font-display font-semibold">
                {t("continueShopping")}
              </Link>
            </div>

            {/* Mobile : `contents`, le bloc de paiement devient un enfant de la grille et reste collé en bas d'écran
                tant que le panier est visible. Bureau : une seule colonne collante. */}
            <div className="contents lg:sticky lg:top-24 lg:block">
              <section aria-labelledby="cart-summary" className="tile on-choco p-5 sm:p-7 lg:rounded-b-none">
                <h2 id="cart-summary" className="text-2xl">
                  {t("summaryTitle")}
                </h2>
                <FreeShippingBar className="mt-4" />
                <dl className="mt-5 flex flex-col gap-2.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt>{t("subtotal")}</dt>
                    <dd className="font-semibold tabular-nums">{formatPrice(total, locale)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt>{t("shipping")}</dt>
                    <dd className={`font-semibold tabular-nums ${shipping === 0 ? "text-moutarde" : ""}`}>
                      {shipping === 0 ? t("shippingFree") : formatPrice(shipping, locale)}
                    </dd>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <dt className="font-display text-xl font-semibold">{t("total")}</dt>
                    <dd className="price price-moutarde price-lg">{formatPrice(grandTotal, locale)}</dd>
                  </div>
                </dl>
              </section>
              <div className="on-cream-2 sticky bottom-0 z-10 -mx-4 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:rounded-b-[28px] lg:p-7">
                <CartCheckout amount={grandTotal} />
                <p className="mt-4 hidden text-center text-sm text-muted lg:block">{tCart(promo ? "reassurancePromo" : "reassurance")}</p>
              </div>
            </div>
          </div>

          {crossSell.length > 0 ? (
            <section className="mt-14 sm:mt-24">
              <h2 className="mb-6 text-[clamp(28px,5vw,44px)] sm:mb-10">{t("crossSellTitle")}</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                {crossSell.map((product) => (
                  <ProductCard key={product.id} product={toCardProduct(product)} locale={locale} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </main>
  );
}
