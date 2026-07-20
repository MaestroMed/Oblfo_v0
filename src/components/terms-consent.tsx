"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Case d'acceptation des CGV — requise avant de lancer le paiement. */
export function TermsConsent({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const t = useTranslations("Cart");

  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-snug text-[#93A2B1]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 flex-none cursor-pointer accent-[#FF6A2B]"
      />
      <span>
        {t.rich("acceptTerms", {
          terms: (chunks) => (
            <Link href="/cgv" className="text-cold hover:text-accent">
              {chunks}
            </Link>
          ),
        })}
      </span>
    </label>
  );
}
