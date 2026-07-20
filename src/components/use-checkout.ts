"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-context";
import type { Locale } from "@/i18n/routing";

export type CheckoutState = "idle" | "loading" | "unavailable" | "error";

/** Démarre une session Stripe Checkout depuis le panier courant. */
export function useCheckout(locale: Locale) {
  const { items } = useCart();
  const [state, setState] = useState<CheckoutState>("idle");

  const startCheckout = async () => {
    setState("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          items: items.map(({ id, qty }) => ({ id, qty })),
        }),
      });
      if (res.status === 503) {
        setState("unavailable");
        return;
      }
      if (!res.ok) {
        setState("error");
        return;
      }
      const { url } = (await res.json()) as { url: string };
      window.location.assign(url);
    } catch {
      setState("error");
    }
  };

  return { state, startCheckout };
}
