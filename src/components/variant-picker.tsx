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
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10.5px] tracking-[0.18em] text-[#8FA1B3] uppercase">
          {label}
        </span>
        {layout === "pills" ? (
          <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                aria-pressed={selected === option}
                className={`cursor-pointer rounded-lg border px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                  selected === option
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-white/15 text-[#C4D2DE] hover:border-accent/50"
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
            className="cursor-pointer rounded-lg border border-white/15 bg-transparent px-3 py-2 text-[13.5px] text-[#C4D2DE] outline-none focus:border-accent/70 [&>option]:bg-[#14100C]"
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
        <p className="font-mono text-[10.5px] tracking-[0.1em] text-accent">
          {t("variantRequired", { label })}
        </p>
      ) : null}
      <div>
        <button
          type="button"
          onClick={add}
          aria-disabled={!selected}
          className={`${buttonClassName} ${!selected ? "opacity-60" : ""}`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
