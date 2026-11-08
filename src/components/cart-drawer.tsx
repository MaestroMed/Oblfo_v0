"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { lineKey, useCart, type CartItem } from "@/components/cart-context";
import { TermsConsent } from "@/components/terms-consent";
import { useCheckout } from "@/components/use-checkout";
import { formatPrice, getPacks, getSellableById, type Pack } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";

// Pack qui contient le plus d'articles déjà au panier, absent du panier et ajoutable sans choix de variante.
function suggestPack(items: CartItem[], locale: Locale): Pack | undefined {
  const ids = new Set(items.map((i) => i.id));
  let best: { pack: Pack; hits: number } | undefined;
  for (const pack of getPacks(locale)) {
    if (ids.has(pack.id) || !pack.available || getSellableById(pack.id, locale)?.variant) continue;
    const hits = pack.items.filter((id) => ids.has(id)).length;
    if (hits && (!best || hits > best.hits)) best = { pack, hits };
  }
  return best?.pack;
}

export function CartDrawer() {
  const t = useTranslations("Cart");
  const tUx = useTranslations("Ux");
  const locale = useLocale() as Locale;
  const { items, total, drawerOpen, closeDrawer, removeItem, setQty, addItem } = useCart();
  const { state: checkoutState, busy: checkoutBusy, startCheckout } = useCheckout(locale);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  const left = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const progress = Math.min(1, total / FREE_SHIPPING_THRESHOLD);
  const pack = items.length ? suggestPack(items, locale) : undefined;

  return (
    <AnimatePresence>
      {drawerOpen ? (
        <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label={t("title")}>
          <motion.button
            type="button"
            aria-label={t("closeCart")}
            onClick={closeDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 cursor-default bg-espresso/70 backdrop-blur-[2px]"
          />
          <motion.aside
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="absolute top-0 right-0 flex h-full w-full max-w-[440px] flex-col bg-cream text-ink-warm shadow-[-30px_0_80px_-30px_rgba(22,17,12,0.8)]"
          >
            <div className="flex items-center justify-between bg-espresso px-6 py-5 text-[#F5EFE6]">
              <div className="font-mono text-xs tracking-[0.2em]">{t("title")}</div>
              <button
                type="button"
                onClick={closeDrawer}
                className="cursor-pointer font-mono text-xl leading-none text-[#B7AA99] transition-colors hover:text-accent"
                aria-label={t("close")}
              >
                ×
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="h-2 w-2 rotate-45 bg-accent shadow-[0_0_14px_rgba(240,123,46,0.9)]" />
                <p className="text-[15px] text-muted-warm">{t("empty")}</p>
                <a
                  href={`/${locale}#essentiels`}
                  onClick={closeDrawer}
                  className="mt-2 rounded-lg bg-accent px-5 py-[11px] text-sm font-semibold text-espresso no-underline"
                >
                  {t("emptyCta")}
                </a>
              </div>
            ) : (
              <>
                <div className="border-b border-black/[0.06] px-6 py-4">
                  <p className="mb-2 text-[13px] font-medium" aria-live="polite">
                    {left > 0
                      ? tUx("freeShipLeft", { amount: formatPrice(left, locale) })
                      : `✦ ${tUx("freeShipDone")}`}
                  </p>
                  <div className="h-1.5 overflow-hidden rounded-full bg-cream-2">
                    <motion.div
                      className="h-full origin-left rounded-full bg-[linear-gradient(90deg,#c98a4b,#f07b2e,#e8451f)]"
                      initial={false}
                      animate={{ scaleX: progress }}
                      transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    />
                  </div>
                </div>

                <ul className="flex-1 overflow-y-auto px-6 py-2">
                  {items.map((item) => (
                    <li
                      key={lineKey(item)}
                      className="flex items-center justify-between gap-4 border-b border-black/[0.06] py-4 last:border-b-0"
                    >
                      <div className="flex min-w-0 flex-col gap-1">
                        <span className="truncate text-[15px] font-semibold">{item.name}</span>
                        {item.variant ? (
                          <span className="font-mono text-[10px] tracking-[0.12em] text-ember">{item.variant}</span>
                        ) : null}
                        <span className="font-mono text-[11px] tracking-[0.1em] text-muted-warm">
                          {t("perUnit", { price: formatPrice(item.price, locale) })}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(lineKey(item))}
                          className="w-fit cursor-pointer font-mono text-[10px] tracking-[0.14em] text-muted-warm transition-colors hover:text-ember"
                        >
                          {t("remove")}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setQty(lineKey(item), item.qty - 1)}
                          aria-label={t("decrease", { name: item.name })}
                          className="h-8 w-8 cursor-pointer rounded-md border border-black/15 font-mono text-sm transition-colors hover:border-accent"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center font-mono text-sm">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(lineKey(item), item.qty + 1)}
                          aria-label={t("increase", { name: item.name })}
                          className="h-8 w-8 cursor-pointer rounded-md border border-black/15 font-mono text-sm transition-colors hover:border-accent"
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {pack ? (
                  <div className="mx-6 mb-4 flex items-center justify-between gap-3 rounded-xl border border-copper/40 bg-white px-4 py-3">
                    <div className="flex min-w-0 flex-col">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-copper">{tUx("packSuggest")}</span>
                      <span className="truncate text-[13.5px] font-medium">
                        {tUx("packSuggestText", {
                          name: pack.name,
                          save: formatPrice(pack.compareAt - pack.price, locale),
                        })}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => addItem({ id: pack.id, name: pack.name, price: pack.price }, { silent: true })}
                      className="flex-none cursor-pointer rounded-lg border border-ink-warm px-3 py-2 text-[12.5px] font-semibold transition-colors hover:bg-ink-warm hover:text-cream"
                    >
                      {tUx("packSuggestCta")} · {formatPrice(pack.price, locale)}
                    </button>
                  </div>
                ) : null}

                <div className="border-t border-black/[0.08] bg-white px-6 py-5">
                  <div className="mb-1 flex items-baseline justify-between">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-muted-warm">{t("subtotal")}</span>
                    <span className="font-serif text-[28px] font-medium">{formatPrice(total, locale)}</span>
                  </div>
                  <p className="mb-4 font-mono text-[10px] tracking-[0.12em] text-muted-warm">{t("shippingAtCheckout")}</p>
                  <div className="mb-4 [&_a]:text-ember [&_label]:text-muted-warm">
                    <TermsConsent checked={termsAccepted} onChange={setTermsAccepted} />
                  </div>
                  <button
                    type="button"
                    onClick={startCheckout}
                    disabled={checkoutBusy || !termsAccepted}
                    data-state={checkoutState}
                    aria-busy={checkoutBusy}
                    className="w-full cursor-pointer rounded-xl bg-accent px-6 py-[15px] text-[15px] font-semibold text-espresso transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(240,123,46,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t("checkout")} · {formatPrice(total, locale)}
                  </button>
                  {checkoutState === "unavailable" ? (
                    <p role="alert" className="mt-3 text-center font-mono text-[11px] tracking-[0.08em] text-ember">{t("checkoutSoon")}</p>
                  ) : null}
                  {checkoutState === "error" ? (
                    <p role="alert" className="mt-3 text-center font-mono text-[11px] tracking-[0.08em] text-ember">{t("checkoutError")}</p>
                  ) : null}
                  <Link
                    href="/panier"
                    onClick={closeDrawer}
                    className="mt-3 block text-center font-mono text-[11px] tracking-[0.14em] text-muted-warm no-underline transition-colors hover:text-ink-warm"
                  >
                    {t("viewCart")}
                  </Link>
                  <p className="mt-3 text-center font-mono text-[10px] tracking-[0.14em] text-muted-warm">{t("reassurance")}</p>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
