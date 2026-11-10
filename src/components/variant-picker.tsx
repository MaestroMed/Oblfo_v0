"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/components/cart-context";

/**
 * Sélecteur de déclinaison (taille, pointure) + ajout au panier.
 * L'ajout est impossible tant qu'aucune option n'est choisie — l'offre
 * exacte n'est jamais ambiguë (le serveur revalide de toute façon).
 */
export function VariantPicker({
  id,
  name,
  price,
  label,
  options,
  layout,
  buttonClassName,
  buttonLabel,
}: {
  id: string;
  name: string;
  price: number;
  label: string;
  options: string[];
  layout: "pills" | "select";
  buttonClassName: string;
  buttonLabel: string;
  /** Sans effet depuis la DA v3 (le composant hérite du bloc) ; gardé pour les appelants. */
  light?: boolean;
}) {
  const t = useTranslations("Cart");
  const { addItem } = useCart();
  const [selected, setSelected] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const add = () => {
    if (!selected) {
      setTouched(true);
      return;
    }
    addItem({ id, name, price, variant: selected });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Le libellé et l'alerte héritent de la couleur du bloc ; champ et pastilles portent leur propre fond. */}
      <div className="flex flex-col gap-2">
        <span className="text-[15px] font-semibold">{label}</span>
        {layout === "pills" ? (
          <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                aria-pressed={selected === option}
                className={`font-display min-h-11 min-w-11 cursor-pointer rounded-full px-4 text-[16px] font-semibold ring-2 ring-inset transition-colors duration-150 ${
                  selected === option
                    ? "bg-choco text-cream ring-cream"
                    : "bg-paper text-choco ring-choco/25"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <select
            value={selected ?? ""}
            onChange={(e) => setSelected(e.target.value || null)}
            aria-label={label}
            className="field cursor-pointer"
          >
            <option value="">{label}…</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
      {touched && !selected ? (
        <p role="alert" className="text-[15px] font-bold">
          {t("variantRequired", { label })}
        </p>
      ) : null}
      <button
        type="button"
        onClick={add}
        className={buttonClassName}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
