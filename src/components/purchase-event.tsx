"use client";

import { useEffect } from "react";
import { trackEvent } from "@/components/ga4";

/**
 * Événement GA4 `purchase` sur la page de confirmation — c'est la conversion
 * importée dans Google Ads. gtag se charge après l'hydratation : on l'attend
 * jusqu'à 10 s. Une seule fois par commande (un rechargement ne recompte pas).
 */
export function PurchaseEvent({ id, value, currency }: { id: string; value: number; currency: string }) {
  useEffect(() => {
    const key = `obflo-purchase-${id}`;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch {}
    let tries = 0;
    const timer = setInterval(() => {
      const ready = typeof (window as unknown as { gtag?: unknown }).gtag === "function";
      if (ready) {
        trackEvent("purchase", { transaction_id: id, value, currency });
        try {
          sessionStorage.setItem(key, "1");
        } catch {}
      }
      // Pas de gtag au bout de 10 s = consentement refusé : rien n'est envoyé.
      if (ready || ++tries > 33) clearInterval(timer);
    }, 300);
    return () => clearInterval(timer);
  }, [id, value, currency]);

  return null;
}
