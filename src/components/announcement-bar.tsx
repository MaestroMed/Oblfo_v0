"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

const DISMISS_KEY = "obflo-annonce-2026";
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
    <div className="relative border-b border-black/30 bg-[#100C08] px-10 py-[9px] text-center">
      <span className="font-mono text-[10.5px] tracking-[0.14em] text-accent">
        🔥 {t("text")}
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="×"
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer font-mono text-base leading-none text-[#8a7c6c] transition-colors hover:text-white"
      >
        ×
      </button>
    </div>
  );
}
