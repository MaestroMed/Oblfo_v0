"use client";

import { useSyncExternalStore } from "react";
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

// Repli mémoire : en navigation privée le choix n'est pas persisté mais doit
// masquer le bandeau pour la session en cours.
let sessionChoiceMade = false;

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

function getSnapshot() {
  if (sessionChoiceMade) return false;
  try {
    // Rien n'est affiché tant qu'un choix existe déjà.
    return !localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return true;
  }
}

export function CookieBanner() {
  const t = useTranslations("CookieBanner");
  // Rendu serveur : masqué ; le snapshot client l'affiche après hydratation
  // si aucun choix n'est enregistré (même timing que l'ancien useEffect).
  const visible = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const save = (analytics: boolean) => {
    const prefs: CookieConsent = { necessary: true, analytics };
    sessionChoiceMade = true;
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // stockage indisponible — choix non persisté, valable pour la session
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: prefs }));
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("ariaLabel")}
      className="tile on-paper fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[110] mx-auto max-w-md border-2 border-choco p-4 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:p-5"
    >
      <p className="text-[16px] leading-snug sm:text-[16px]">
        {t("message")}{" "}
        <Link href="/confidentialite" className="link -my-[15px] inline-block py-[15px] font-semibold">
          {t("privacyLink")}
        </Link>
      </p>
      {/* Refuser et accepter : même taille, même poids. */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => save(false)} className="btn btn-sm px-2">
          {t("refuse")}
        </button>
        <button type="button" onClick={() => save(true)} className="btn btn-sm px-2">
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
