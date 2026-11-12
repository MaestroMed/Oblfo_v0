"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart-context";
import { trackEvent } from "@/components/ga4";
import type { Locale } from "@/i18n/routing";

/**
 * idle → loading → (redirecting | unavailable | error) ; unavailable/error → loading au clic suivant.
 * `redirecting` reste affiché jusqu'au départ vers Stripe (le bouton reste bloqué).
 * Exposé tel quel en `data-state` sur les boutons de paiement (tests, agents).
 */
export type CheckoutState = "idle" | "loading" | "redirecting" | "unavailable" | "error";

/** Démarre une session Stripe Checkout depuis le panier courant. */
export function useCheckout(locale: Locale) {
  const { items } = useCart();
  const [state, setState] = useState<CheckoutState>("idle");
  // Verrou synchrone : deux clics avant le re-rendu ne créent pas deux sessions Stripe.
  const busy = useRef(false);

  // Retour depuis Stripe via le bouton Précédent : le bfcache restaure l'état
  // React tel quel — sans ce reset, le bouton resterait bloqué.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      busy.current = false;
      setState("idle");
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const startCheckout = async () => {
    if (busy.current || items.length === 0) return;
    busy.current = true;
    setState("loading");
    // Envoyé dès le clic : lancé juste avant le départ vers Stripe, GA4 n'avait pas le temps de l'émettre.
    trackEvent("begin_checkout", { currency: "EUR", value: items.reduce((sum, i) => sum + i.price * i.qty, 0) });
    const fail = (next: "unavailable" | "error") => {
      busy.current = false;
      setState(next);
    };
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          items: items.map(({ id, qty, variant }) => ({ id, qty, variant })),
        }),
      });
      if (res.status === 503) return fail("unavailable");
      if (!res.ok) return fail("error");
      const { url } = (await res.json()) as { url?: string | null };
      // Stripe peut renvoyer url: null — sans ce garde-fou, assign(null) mène à /null.
      if (!url) return fail("error");
      setState("redirecting");
      window.location.assign(url);
    } catch {
      fail("error");
    }
  };

  return { state, busy: state === "loading" || state === "redirecting", startCheckout };
}
