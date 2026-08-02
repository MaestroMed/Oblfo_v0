"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Bandeau de consentement — préalable au chargement de GA4.
 *
 * GA4 dépose des cookies : en France, la CNIL impose un consentement explicite
 * *avant* dépôt. Le composant Ga4 ne monte rien tant que `analytics` n'est pas
 * accepté ici, et aucun script Google n'est chargé d'ici là.
 *
 * Le choix est stocké dans `cookie-consent` (localStorage) sous la forme
 * `{ necessary, analytics }`. L'événement `cookie-consent:updated` est émis à
 * l'enregistrement pour que Ga4 bascule sans rechargement — même convention que
 * sur sconnectfrance.fr.
 */
export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
};

export const CONSENT_STORAGE_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent:updated";

export function CookieBanner() {
  const t = useTranslations("CookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Rien n'est affiché tant qu'un choix existe déjà.
    setVisible(!localStorage.getItem(CONSENT_STORAGE_KEY));
  }, []);

  const save = (analytics: boolean) => {
    const prefs: CookieConsent = { necessary: true, analytics };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: prefs }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("ariaLabel")}
      className="fixed inset-x-3 bottom-3 z-[110] mx-auto max-w-2xl rounded-xl border border-accent/40 bg-[#121822] p-5 text-[#EDF1F5] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] sm:inset-x-auto sm:right-5 sm:bottom-5"
    >
      <p className="text-sm leading-relaxed">
        {t("message")}{" "}
        <Link href="/confidentialite" className="underline underline-offset-2">
          {t("privacyLink")}
        </Link>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => save(false)}
          className="rounded-lg border border-white/25 px-4 py-2 font-mono text-xs tracking-[0.1em] transition-colors hover:bg-white/10"
        >
          {t("refuse")}
        </button>
        <button
          type="button"
          onClick={() => save(true)}
          className="rounded-lg bg-accent px-4 py-2 font-mono text-xs tracking-[0.1em] text-[#121822] transition-opacity hover:opacity-90"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
