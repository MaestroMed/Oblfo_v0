"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const DISMISS_KEY = "obflo-annonce-2026";

export function AnnouncementBar() {
  const t = useTranslations("Announcement");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY)) setDismissed(true);
    } catch {
      // stockage indisponible — bandeau affiché
    }
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // stockage indisponible — fermeture non persistée
    }
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
