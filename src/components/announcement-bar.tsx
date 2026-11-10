"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

const DISMISS_KEY = "obflo-annonce-bf-2026";
const DISMISS_EVENT = "obflo:annonce-dismiss";

// Repli mémoire : en navigation privée la fermeture n'est pas persistée,
// mais elle doit au moins tenir le temps de la session.
let sessionDismissed = false;

function subscribe(onChange: () => void) {
  window.addEventListener(DISMISS_EVENT, onChange);
  return () => window.removeEventListener(DISMISS_EVENT, onChange);
}

function getSnapshot() {
  if (sessionDismissed) return true;
  try {
    return Boolean(window.localStorage.getItem(DISMISS_KEY));
  } catch {
    return false;
  }
}

export function AnnouncementBar() {
  const t = useTranslations("Announcement");
  // Rendu serveur : bandeau affiché ; le snapshot client le masque après
  // hydratation si une fermeture est déjà enregistrée.
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, () => false);

  if (dismissed) return null;

  const dismiss = () => {
    sessionDismissed = true;
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // stockage indisponible — fermeture non persistée
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  return (
    <div className="on-choco relative bg-choco-2 px-11 py-2 text-center font-display text-[14px] font-semibold leading-tight sm:text-[15px]">
      {/* Mobile : un message à la fois, en fondu. Grand écran : les trois en ligne. */}
      <div className="grid items-center sm:flex sm:flex-wrap sm:justify-center sm:gap-x-3">
        {(["msg1", "msg2", "msg3"] as const).map((key, i) => (
          <span
            key={key}
            className="announce-item"
            style={{ "--i": i } as React.CSSProperties}
          >
            {i > 0 ? (
              <span aria-hidden className="mr-3 hidden text-moutarde sm:inline">
                ·
              </span>
            ) : null}
            {t(key)}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("close")}
        className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
