"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";

type Variant = { label: string; options: string[] };

const REASSURE = ["reassureShip", "reassureReturn", "reassurePay", "reassureContact"] as const;
const ICONS = ["↗", "↺", "◆", "@"];

/**
 * Bloc d'achat : déclinaison, double CTA (prix dans le bouton), réassurance,
 * et barre collante mobile qui apparaît quand les boutons sortent de l'écran.
 * « Acheter maintenant » ajoute sans toast et ouvre le tiroir : c'est lui qui porte
 * l'acceptation des CGV et le passage au paiement Stripe.
 */
export function BuyBox({
  id,
  name,
  price,
  variant,
  available,
}: {
  id: string;
  name: string;
  price: number;
  variant?: Variant;
  available: boolean;
}) {
  const t = useTranslations("Ux");
  const tCart = useTranslations("Cart");
  const locale = useLocale() as Locale;
  const { addItem, openDrawer } = useCart();
  const [selected, setSelected] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const priceLabel = formatPrice(price, locale);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setBarVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const add = (buyNow: boolean) => {
    if (variant && !selected) {
      setTouched(true);
      pickerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    addItem({ id, name, price, ...(selected ? { variant: selected } : {}) }, { silent: buyNow });
    if (buyNow) openDrawer();
  };

  if (!available) {
    return (
      <div className="flex flex-col gap-3">
        <div className="font-serif text-[44px] font-medium leading-none">{priceLabel}</div>
        <span className="w-fit rounded-xl border border-black/15 px-6 py-[14px] text-[15px] font-semibold text-muted-warm">
          {tCart("unavailable")}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="font-serif text-[44px] font-medium leading-none">{priceLabel}</div>

      {variant ? (
        <div ref={pickerRef} className="flex flex-col gap-2.5">
          <span className="font-mono text-[10.5px] tracking-[0.18em] text-muted-warm uppercase">{variant.label}</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label={variant.label}>
            {variant.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                aria-pressed={selected === option}
                className={`min-w-11 cursor-pointer rounded-lg border px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                  selected === option
                    ? "border-ink-warm bg-ink-warm text-cream"
                    : "border-black/15 bg-white hover:border-ink-warm"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {touched && !selected ? (
            <p role="alert" className="font-mono text-[11px] tracking-[0.08em] text-ember">
              {tCart("variantRequired", { label: variant.label })}
            </p>
          ) : null}
        </div>
      ) : null}

      <div ref={ctaRef} className="flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={() => add(false)}
          className="flex-1 cursor-pointer rounded-xl border-[1.5px] border-ink-warm px-5 py-[14px] text-[15px] font-semibold transition-colors hover:bg-ink-warm hover:text-cream"
        >
          {t("addWithPrice", { price: priceLabel })}
        </button>
        <button
          type="button"
          onClick={() => add(true)}
          className="flex-1 cursor-pointer rounded-xl bg-[linear-gradient(135deg,#f07b2e,#e8451f)] px-5 py-[14px] text-[15px] font-semibold text-espresso transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(232,69,31,0.6)]"
        >
          {t("buyNow")}
        </button>
      </div>

      <ul className="grid grid-cols-1 gap-2 border-t border-black/[0.08] pt-4 sm:grid-cols-2">
        {REASSURE.map((key, i) => (
          <li key={key} className="flex items-center gap-2.5 text-[13.5px] text-muted-warm">
            <span aria-hidden className="w-4 text-center font-mono text-copper">{ICONS[i]}</span>
            {t(key)}
          </li>
        ))}
      </ul>

      <div
        aria-hidden={!barVisible}
        className={`fixed inset-x-0 bottom-0 z-[60] flex items-center gap-3 border-t border-black/10 bg-cream/95 px-4 py-3 backdrop-blur transition-transform duration-300 lg:hidden ${
          barVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-semibold">{name}</div>
          <div className="font-serif text-lg leading-tight">{priceLabel}</div>
        </div>
        <button
          type="button"
          tabIndex={barVisible ? 0 : -1}
          onClick={() => add(true)}
          className="flex-none cursor-pointer rounded-xl bg-[linear-gradient(135deg,#f07b2e,#e8451f)] px-5 py-3 text-[14.5px] font-semibold text-espresso"
        >
          {t("buyNowPrice", { price: priceLabel })}
        </button>
      </div>
    </div>
  );
}
