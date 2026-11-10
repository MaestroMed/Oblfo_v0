"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Case d'acceptation des CGV — requise avant de lancer le paiement. Le texte hérite de la couleur du bloc. */
export function TermsConsent({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const t = useTranslations("Cart");

  return (
    <label className="flex cursor-pointer items-start gap-3 py-2.5 text-[15px] leading-snug">
      <span className="relative flex h-6 w-6 flex-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-choco bg-paper checked:bg-moutarde"
        />
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute inset-0 hidden h-6 w-6 p-1 text-choco peer-checked:block"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      <span>
        {t.rich("acceptTerms", {
          terms: (chunks) => (
            <Link href="/cgv" className="link font-semibold">
              {chunks}
            </Link>
          ),
        })}
      </span>
    </label>
  );
}
