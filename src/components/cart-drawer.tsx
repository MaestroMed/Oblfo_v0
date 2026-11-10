"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/components/cart-context";
import { CartCheckout, CartEmpty, CartLines, FreeShippingBar, PackSuggestion } from "@/components/cart-parts";
import { formatPrice } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function CartDrawer() {
  const t = useTranslations("Cart");
  const locale = useLocale() as Locale;
  const { items, count, total, drawerOpen, closeDrawer } = useCart();
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  // À l'ouverture le focus entre dans le tiroir ; à la fermeture il revient d'où il venait.
  // Effet séparé : closeDrawer change à chaque rendu, il ne doit pas redéclencher ce va-et-vient.
  useEffect(() => {
    if (!drawerOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    return () => opener?.focus({ preventScroll: true });
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
      if (e.key !== "Tab" || !dialog.current) return;
      // Piège à focus : Tab boucle dans le tiroir au lieu de filer derrière le voile.
      const focusable = dialog.current.querySelectorAll<HTMLElement>('a[href], button:not(:disabled):not([tabindex="-1"]), input');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!dialog.current.contains(active) || (!e.shiftKey && active === last)) {
        e.preventDefault();
        first?.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {drawerOpen ? (
        <div ref={dialog} className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label={t("title")}>
          <motion.button
            type="button"
            // Voile cliquable à la souris ; au clavier, Échap et le bouton de fermeture suffisent.
            tabIndex={-1}
            aria-label={t("closeCart")}
            onClick={closeDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 cursor-default bg-choco/60"
          />
          <motion.aside
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            // Écran très bas (téléphone à l'horizontale) : tout le panneau défile, le pied ne mange plus la liste.
            className="absolute top-0 right-0 flex h-full w-full max-w-[440px] flex-col bg-cream text-choco [@media(max-height:560px)]:overflow-y-auto"
          >
            <div className="on-braise flex flex-none items-center gap-3 py-2.5 pr-3 pl-4 sm:pl-6">
              <h2 className="text-[26px]">{t("title")}</h2>
              {count > 0 ? <span className="chip chip-moutarde tabular-nums">{count}</span> : null}
              <button
                type="button"
                ref={closeButton}
                onClick={closeDrawer}
                aria-label={t("close")}
                className="ml-auto flex h-11 w-11 flex-none cursor-pointer items-center justify-center rounded-full bg-cream text-choco transition-colors duration-150 hover:bg-paper"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col justify-center px-6 py-10">
                <CartEmpty onNavigate={closeDrawer} />
              </div>
            ) : (
              <>
                <FreeShippingBar className="on-choco flex-none px-4 py-3 sm:px-6" />

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 [@media(max-height:560px)]:flex-none [@media(max-height:560px)]:overflow-visible">
                  <CartLines />
                  <PackSuggestion className="mt-1 mb-4" />
                </div>

                <div className="on-cream-2 flex-none px-4 pt-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-lg font-semibold">{t("subtotal")}</span>
                    <span className="font-display text-[28px] leading-none font-bold tabular-nums">
                      {formatPrice(total, locale)}
                    </span>
                  </div>
                  <p className="mt-1 mb-3 text-sm text-muted">{t("shippingAtCheckout")}</p>
                  <CartCheckout amount={total} />
                  <Link
                    href="/panier"
                    onClick={closeDrawer}
                    className="link mx-auto mt-1 flex min-h-11 w-fit items-center font-display font-semibold"
                  >
                    {t("viewCart")}
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
