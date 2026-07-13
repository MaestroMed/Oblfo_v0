"use client";

import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/data/catalog";

export function CartDrawer() {
  const { items, total, drawerOpen, closeDrawer, removeItem, setQty } =
    useCart();

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label="Fermer le panier"
        onClick={closeDrawer}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-[2px]"
      />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-[420px] flex-col border-l border-white/8 bg-[#0C1017] shadow-[-30px_0_80px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between border-b border-white/6 px-6 py-5">
          <div className="font-mono text-xs tracking-[0.2em] text-[#C4D2DE]">
            PANIER
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="cursor-pointer font-mono text-xl leading-none text-[#8595A5] transition-colors hover:text-accent"
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="h-2 w-2 rotate-45 bg-accent shadow-[0_0_14px_rgba(255,106,43,0.9)]" />
            <p className="text-[15px] text-[#93A2B1]">
              Ton panier est vide. Le froid, lui, n&apos;attend pas.
            </p>
            <a
              href="/#gamme"
              onClick={closeDrawer}
              className="mt-2 rounded-[10px] bg-accent px-5 py-[11px] text-sm font-semibold text-[#14100C] no-underline"
            >
              Découvrir la gamme
            </a>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b border-white/6 py-4 last:border-b-0"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-[15px] font-semibold text-ink">
                      {item.name}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.1em] text-[#8595A5]">
                      {formatPrice(item.price)} / unité
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="w-fit cursor-pointer font-mono text-[10px] tracking-[0.14em] text-[#66788A] transition-colors hover:text-accent"
                    >
                      RETIRER
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label={`Réduire la quantité de ${item.name}`}
                      className="h-7 w-7 cursor-pointer rounded-md border border-white/12 font-mono text-sm text-[#C4D2DE] transition-colors hover:border-accent/60"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center font-mono text-sm text-ink">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty + 1)}
                      aria-label={`Augmenter la quantité de ${item.name}`}
                      className="h-7 w-7 cursor-pointer rounded-md border border-white/12 font-mono text-sm text-[#C4D2DE] transition-colors hover:border-accent/60"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/8 px-6 py-5">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="font-mono text-[11px] tracking-[0.18em] text-[#8FA1B3]">
                  TOTAL
                </span>
                <span className="text-[26px] font-bold text-accent">
                  {formatPrice(total)}
                </span>
              </div>
              <button
                type="button"
                disabled
                title="Paiement bientôt disponible"
                className="w-full cursor-not-allowed rounded-xl bg-accent/30 px-6 py-[14px] text-[15px] font-semibold text-[#14100C]"
              >
                Commander — bientôt disponible
              </button>
              <p className="mt-3 text-center font-mono text-[10px] tracking-[0.14em] text-[#66788A]">
                LIVRAISON OFFERTE DÈS 60 € — RETOURS 30 J
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
