"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  type CookieConsent,
} from "@/components/cookie-banner";

/**
 * Google Analytics 4, chargé uniquement après consentement explicite.
 *
 * Remplace Vercel Analytics, retiré pour deux raisons : la facturation, et
 * l'alignement du parc sur GA4 (les événements portent les mêmes noms sur tous
 * les sites, ce qui les rend comparables sans retraitement).
 *
 * Aucun script Google n'est injecté tant que `analytics` n'est pas accepté.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

export function Ga4() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (!raw) return setAllowed(false);
        const parsed = JSON.parse(raw) as Partial<CookieConsent>;
        setAllowed(Boolean(parsed.analytics));
      } catch {
        setAllowed(false);
      }
    };
    read();

    const onUpdate = () => read();
    window.addEventListener(CONSENT_EVENT, onUpdate);
    // Synchronisation entre onglets.
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_STORAGE_KEY) read();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(CONSENT_EVENT, onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (!allowed || !GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}

type EventParams = Record<string, string | number | boolean>;

/** Sans consentement, gtag n'existe pas et l'appel est simplement ignoré. */
export function trackEvent(name: string, params?: EventParams) {
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
  };
  if (typeof window !== "undefined" && w.gtag) {
    w.gtag("event", name, params);
  }
}
