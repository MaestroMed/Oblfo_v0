"use client";

import { useEffect, useRef, useState } from "react";
import { PaymentIcons } from "@/components/payment-icons";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";

type Variant = { label: string; options: string[] };

// Réassurances : clé de texte + tracé de l'icône (trait épais, grille 24).
const REASSURE = [
  {
    key: "reassureShip",
    icon: (
      <>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </>
    ),
  },
  {
    key: "reassureReturn",
    icon: (
      <>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </>
    ),
  },
  {
    key: "reassurePay",
    icon: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
  },
  {
    key: "reassureContact",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  },
] as const;

/**
 * Bloc d'achat : prix, déclinaison, un seul bouton (1 CTA par écran), réassurance,
 * et barre collante mobile qui apparaît quand les boutons sortent de l'écran.
 * Le bouton ajoute sans toast et ouvre le tiroir : c'est lui qui porte
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
  const tPage = useTranslations("ProductPage");
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
      <div className="flex flex-col items-start gap-5">
        <span className="font-display text-[32px] leading-none font-bold tabular-nums">{priceLabel}</span>
        <button type="button" disabled className="btn btn-lg btn-block">
          {tCart("unavailable")}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="font-display text-[32px] leading-none font-bold tabular-nums">{priceLabel}</span>
      </div>

      {variant ? (
        <div ref={pickerRef} className="flex flex-col gap-2.5">
          <span className="flex items-baseline gap-2 text-[16px] font-semibold">
            {variant.label}
            {selected ? <span className="font-normal text-muted">{selected}</span> : null}
          </span>
          <div
            role="group"
            aria-label={variant.label}
            className={`grid gap-2 ${variant.options.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}
          >
            {variant.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                aria-pressed={selected === option}
                className={`font-display min-h-[52px] cursor-pointer rounded-2xl px-2 text-[17px] font-semibold ring-2 ring-inset transition-colors duration-150 ${
                  selected === option
                    ? "bg-choco text-cream ring-choco"
                    : "bg-paper text-choco ring-choco/25 hover:ring-choco"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {touched && !selected ? (
            <p role="alert" className="text-[16px] font-bold text-tomate">
              {tCart("variantRequired", { label: variant.label })}
            </p>
          ) : null}
        </div>
      ) : null}

      <div ref={ctaRef} className="flex flex-col gap-3">
        <button type="button" onClick={() => add(true)} className="btn btn-braise btn-lg btn-block">
          {tPage("addToCart")}
        </button>
      </div>
      <PaymentIcons className="justify-center" />

      <ul className="tile on-cream-2 grid gap-3 p-5 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4 sm:p-6">
        {REASSURE.map(({ key, icon }) => (
          <li key={key} className="flex items-center gap-3 text-[16px] leading-snug font-medium">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-miel">
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                {icon}
              </svg>
            </span>
            {t(key)}
          </li>
        ))}
      </ul>

      <div
        aria-hidden={!barVisible}
        className={`on-choco fixed inset-x-0 bottom-0 z-[60] flex items-center gap-3 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 motion-reduce:transition-none lg:hidden ${
          barVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="font-display line-clamp-2 min-w-0 flex-1 text-[16px] leading-tight font-semibold">
          {name}
        </div>
        <button
          type="button"
          tabIndex={barVisible ? 0 : -1}
          onClick={() => add(true)}
          className="btn btn-braise btn-sm flex-none px-4"
        >
          {t("buyNowPrice", { price: priceLabel })}
        </button>
      </div>
    </div>
  );
}
