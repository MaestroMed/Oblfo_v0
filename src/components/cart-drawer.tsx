"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { lineKey, useCart } from "@/components/cart-context";
import { TermsConsent } from "@/components/terms-consent";
import { useCheckout } from "@/components/use-checkout";
import { formatPrice } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function CartDrawer() {
  const t = useTranslations("Cart");
  const locale = useLocale() as Locale;
  const { items, total, drawerOpen, closeDrawer, removeItem, setQty } =
    useCart();
  const { state: checkoutState, startCheckout } = useCheckout(locale);
  const [termsAccepted, setTermsAccepted] = useState(false);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label={t("closeCart")}
        onClick={closeDrawer}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[2px]"
      />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-[420px] flex-col border-l border-white/8 bg-[#0C1017] shadow-[-30px_0_80px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between border-b border-white/6 px-6 py-5">
          <div className="font-mono text-xs tracking-[0.2em] text-[#C4D2DE]">
            {t("title")}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="cursor-pointer font-mono text-xl leading-none text-[#8595A5] transition-colors hover:text-accent"
            aria-label={t("close")}
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="h-2 w-2 rotate-45 bg-accent shadow-[0_0_14px_rgba(255,106,43,0.9)]" />
            <p className="text-[15px] text-[#93A2B1]">{t("empty")}</p>
            <a
              href={`/${locale}#essentiels`}
              onClick={closeDrawer}
              className="mt-2 rounded-[10px] bg-accent px-5 py-[11px] text-sm font-semibold text-[#14100C] no-underline"
            >
              {t("emptyCta")}
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <li
                  key={lineKey(item)}
                  className="flex items-center justify-between gap-4 border-b border-white/6 py-4 last:border-b-0"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-[15px] font-semibold text-ink">
                      {item.name}
                    </span>
                    {item.variant ? (
                      <span className="font-mono text-[10px] tracking-[0.12em] text-accent">
                        {item.variant}
                      </span>
                    ) : null}
                    <span className="font-mono text-[11px] tracking-[0.1em] text-[#8595A5]">
                      {t("perUnit", { price: formatPrice(item.price, locale) })}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(lineKey(item))}
                      className="w-fit cursor-pointer font-mono text-[10px] tracking-[0.14em] text-[#6D8093] transition-colors hover:text-accent"
                    >
                      {t("remove")}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty(lineKey(item), item.qty - 1)}
                      aria-label={t("decrease", { name: item.name })}
                      className="h-7 w-7 cursor-pointer rounded-md border border-white/12 font-mono text-sm text-[#C4D2DE] transition-colors hover:border-accent/60"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center font-mono text-sm text-ink">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(lineKey(item), item.qty + 1)}
                      aria-label={t("increase", { name: item.name })}
                      className="h-7 w-7 cursor-pointer rounded-md border border-white/12 font-mono text-sm text-[#C4D2DE] transition-colors hover:border-accent/60"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/8 px-6 py-5">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] text-[#8FA1B3]">
                  {t("subtotal")}
                </span>
                <span className="text-[26px] font-bold text-accent">
                  {formatPrice(total, locale)}
                </span>
              </div>
              <p className="mb-4 font-mono text-[10px] tracking-[0.12em] text-[#6D8093]">
                {t("shippingAtCheckout")}
              </p>
              <div className="mb-4">
                <TermsConsent
                  checked={termsAccepted}
                  onChange={setTermsAccepted}
                />
              </div>
              <button
                type="button"
                onClick={startCheckout}
                disabled={checkoutState === "loading" || !termsAccepted}
                className="w-full cursor-pointer rounded-xl bg-accent px-6 py-[14px] text-[15px] font-semibold text-[#14100C] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(255,106,43,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("checkout")}
              </button>
              {checkoutState === "unavailable" ? (
                <p className="mt-3 text-center font-mono text-[11px] tracking-[0.08em] text-accent">
                  {t("checkoutSoon")}
                </p>
              ) : null}
              {checkoutState === "error" ? (
                <p className="mt-3 text-center font-mono text-[11px] tracking-[0.08em] text-accent">
                  {t("checkoutError")}
                </p>
              ) : null}
              <Link
                href="/panier"
                onClick={closeDrawer}
                className="mt-3 block text-center font-mono text-[11px] tracking-[0.14em] text-[#8FA1B3] no-underline transition-colors hover:text-white"
              >
                {t("viewCart")}
              </Link>
              <p className="mt-3 text-center font-mono text-[10px] tracking-[0.14em] text-[#6D8093]">
                {t("reassurance")}
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
