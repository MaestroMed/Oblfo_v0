"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/components/cart-context";
import { ImageSlot } from "@/components/image-slot";
import { TermsConsent } from "@/components/terms-consent";
import { useCheckout } from "@/components/use-checkout";
import { formatPrice, getProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { FREE_SHIPPING_THRESHOLD, shippingCostFor } from "@/lib/shipping";

export function CartPageContent({ locale }: { locale: Locale }) {
  const t = useTranslations("CartPage");
  const tCart = useTranslations("Cart");
  const { items, total, removeItem, setQty } = useCart();
  const { state: checkoutState, startCheckout } = useCheckout(locale);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const shipping = shippingCostFor(total);
  const grandTotal = total + shipping;
  const remaining = FREE_SHIPPING_THRESHOLD - total;
  const progress = Math.min(1, total / FREE_SHIPPING_THRESHOLD);
  const inCart = new Set(items.map((i) => i.id));
  const crossSell = getProducts(locale).filter((p) => !inCart.has(p.id));

  return (
    <main className="bg-night py-[70px]">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="mb-10 flex flex-col gap-3.5">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
            <span className="text-[#66788A]">—</span>
            <span className="h-px w-7 bg-accent/50" />
            <span className="text-accent">{t("kicker")}</span>
          </div>
          <h1 className="text-[clamp(34px,4vw,52px)] font-bold leading-[1.04] tracking-[-0.02em] text-ink">
            {t("title")}
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-start gap-5 rounded-[18px] border border-white/7 bg-card p-10">
            <span className="h-2 w-2 rotate-45 bg-accent shadow-[0_0_14px_rgba(255,106,43,0.9)]" />
            <p className="text-[16px] text-[#93A2B1]">{t("empty")}</p>
            <a
              href={`/${locale}#gamme`}
              className="rounded-xl bg-accent px-[26px] py-[14px] text-[15px] font-semibold text-[#14100C] no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(255,106,43,0.6)]"
            >
              {t("emptyCta")}
            </a>
          </div>
        ) : (
          <div className="flex flex-wrap items-start gap-10">
            {/* Lignes du panier */}
            <ul className="min-w-[320px] flex-[1_1_560px] rounded-[18px] border border-white/7 bg-card px-7">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-4 border-b border-white/6 py-6 last:border-b-0"
                >
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <span className="text-[17px] font-semibold text-ink">
                      {item.name}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.1em] text-[#8595A5]">
                      {tCart("perUnit", {
                        price: formatPrice(item.price, locale),
                      })}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="w-fit cursor-pointer font-mono text-[10px] tracking-[0.14em] text-[#66788A] transition-colors hover:text-accent"
                    >
                      {tCart("remove")}
                    </button>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label={tCart("decrease", { name: item.name })}
                        className="h-8 w-8 cursor-pointer rounded-md border border-white/12 font-mono text-sm text-[#C4D2DE] transition-colors hover:border-accent/60"
                      >
                        −
                      </button>
                      <span className="min-w-7 text-center font-mono text-[15px] text-ink">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label={tCart("increase", { name: item.name })}
                        className="h-8 w-8 cursor-pointer rounded-md border border-white/12 font-mono text-sm text-[#C4D2DE] transition-colors hover:border-accent/60"
                      >
                        +
                      </button>
                    </div>
                    <span className="min-w-[80px] text-right text-[19px] font-bold text-ink">
                      {formatPrice(item.price * item.qty, locale)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Récapitulatif */}
            <div className="flex min-w-[320px] flex-[0_1_380px] flex-col gap-5 rounded-[18px] border border-white/8 bg-pack p-7">
              {/* Progression livraison offerte */}
              <div className="flex flex-col gap-2.5">
                <div className="font-mono text-[10.5px] tracking-[0.14em] text-[#8FA1B3]">
                  {remaining > 0
                    ? t("freeShippingProgress", {
                        amount: formatPrice(remaining, locale),
                      })
                    : t("freeShippingReached")}
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#FF6A2B,#E8451F)] transition-[width] duration-300"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/8 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[#93A2B1]">{t("subtotal")}</span>
                  <span className="text-[16px] font-semibold text-ink">
                    {formatPrice(total, locale)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[#93A2B1]">{t("shipping")}</span>
                  <span
                    className={`text-[16px] font-semibold ${shipping === 0 ? "text-accent" : "text-ink"}`}
                  >
                    {shipping === 0
                      ? t("shippingFree")
                      : formatPrice(shipping, locale)}
                  </span>
                </div>
                <div className="mt-1 flex items-baseline justify-between border-t border-white/8 pt-4">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[#8FA1B3]">
                    {t("total").toUpperCase()}
                  </span>
                  <span className="text-[28px] font-bold text-accent">
                    {formatPrice(grandTotal, locale)}
                  </span>
                </div>
              </div>

              <TermsConsent
                checked={termsAccepted}
                onChange={setTermsAccepted}
              />
              <button
                type="button"
                onClick={startCheckout}
                disabled={checkoutState === "loading" || !termsAccepted}
                className="w-full cursor-pointer rounded-xl bg-accent px-6 py-[15px] text-[15px] font-semibold text-[#14100C] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(255,106,43,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("checkout")}
              </button>
              {checkoutState === "unavailable" ? (
                <p className="text-center font-mono text-[11px] tracking-[0.08em] text-accent">
                  {tCart("checkoutSoon")}
                </p>
              ) : null}
              {checkoutState === "error" ? (
                <p className="text-center font-mono text-[11px] tracking-[0.08em] text-accent">
                  {tCart("checkoutError")}
                </p>
              ) : null}
              <a
                href={`/${locale}#gamme`}
                className="text-center font-mono text-[11px] tracking-[0.14em] text-[#66788A] no-underline transition-colors hover:text-white"
              >
                {t("continueShopping")}
              </a>
              <p className="text-center font-mono text-[10px] tracking-[0.14em] text-[#66788A]">
                {tCart("reassurance")}
              </p>
            </div>
          </div>
        )}

        {/* Cross-sell */}
        {items.length > 0 && crossSell.length > 0 ? (
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
              <span className="text-[#66788A]">{t("crossSellKicker")}</span>
              <span className="h-px w-7 bg-accent/50" />
              <span className="text-accent">{t("crossSellLabel")}</span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
              {crossSell.map((product) => (
                <Link
                  key={product.id}
                  href={{
                    pathname: "/produits/[slug]",
                    params: { slug: product.slug },
                  }}
                  className="flex flex-col overflow-hidden rounded-[18px] border border-white/7 bg-card no-underline transition-[border-color,box-shadow,transform] duration-[250ms] hover:-translate-y-[3px] hover:border-accent/55 hover:shadow-[0_24px_70px_-30px_rgba(255,106,43,0.45)]"
                >
                  <div className="relative aspect-[4/3] bg-media">
                    <ImageSlot label={product.imageLabel} />
                  </div>
                  <div className="flex items-center justify-between gap-3 px-5 py-4">
                    <span className="text-[15px] font-semibold text-ink">
                      {product.name}
                    </span>
                    <span className="text-base font-bold text-accent">
                      {formatPrice(product.price, locale)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
