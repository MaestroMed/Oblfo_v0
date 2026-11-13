"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { useFreeShippingPromo } from "@/components/use-free-shipping-promo";
import { Link } from "@/i18n/navigation";
import { isFreeShippingPromo } from "@/lib/shipping";

// Clé à part pendant la promo de port : qui a fermé le bandeau avant la voit quand même.
const dismissKey = () =>
  isFreeShippingPromo(new Date()) ? "obflo-annonce-bf-2026-port" : "obflo-annonce-bf-2026";
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
    return Boolean(window.localStorage.getItem(dismissKey()));
  } catch {
    return false;
  }
}

export function AnnouncementBar({ promo: serverPromo }: { promo: boolean }) {
  const t = useTranslations("Announcement");
  const promo = useFreeShippingPromo(serverPromo);
  // Rendu serveur : bandeau affiché ; le snapshot client le masque après
  // hydratation si une fermeture est déjà enregistrée.
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, () => false);

  if (dismissed) return null;

  const dismiss = () => {
    sessionDismissed = true;
    try {
      window.localStorage.setItem(dismissKey(), "1");
    } catch {
      // stockage indisponible — fermeture non persistée
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  // Mobile : un message à la fois, en fondu. Grand écran : les trois en ligne.
  const messages = (
    <div className="grid items-center sm:flex sm:flex-wrap sm:justify-center sm:gap-x-4">
      {(["msg1", promo ? "msg2Promo" : "msg2", "msg3"] as const).map((key, i) => (
        <span
          key={key}
          className="announce-item"
          style={{ "--i": i } as React.CSSProperties}
        >
          {i > 0 ? (
            <span aria-hidden className="mr-4 hidden text-moutarde sm:inline">
              ·
            </span>
          ) : null}
          {key === "msg2Promo" ? (
            <span className="underline underline-offset-4">{t(key)}</span>
          ) : (
            t(key)
          )}
        </span>
      ))}
    </div>
  );

  return (
    <div className="on-choco relative flex min-h-12 items-center justify-center bg-choco-2 px-12 py-2 text-center [text-wrap:balance] font-display text-caption font-semibold">
      {/* Pendant la promo, tout le bandeau mène à la page Black Friday. */}
      {promo ? (
        <Link href="/black-friday" className="block">
          {messages}
        </Link>
      ) : (
        messages
      )}
      <button
        type="button"
        onClick={dismiss}
        aria-label={t("close")}
        className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
