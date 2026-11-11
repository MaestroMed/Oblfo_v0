"use client";

import Image from "next/image";
import { PaymentIcons } from "@/components/payment-icons";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { lineKey, useCart, type CartItem } from "@/components/cart-context";
import { ImageSlot } from "@/components/image-slot";
import { TermsConsent } from "@/components/terms-consent";
import { HeatWaves } from "@/components/ui/heat-waves";
import { useCheckout } from "@/components/use-checkout";
import { formatPrice, getPacks, getProductById, getSellableById, type Pack } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { TILE_CLASS, productTile } from "@/lib/tile";

// Briques communes au tiroir et à la page panier : mêmes lignes, même pack suggéré, même bloc de paiement.

// L'ombre de `.cutout` est réglée pour un grand visuel : réduite ici pour une vignette.
const THUMB_CUTOUT = "cutout [filter:drop-shadow(0_4px_3px_rgb(59_22_13/0.3))]";

/** Vignette d'une ligne : détouré sur l'aplat du produit ; pour un pack, ses deux premiers articles sur miel. */
function Thumb({ id, locale, roomy }: { id: string; locale: Locale; roomy: boolean }) {
  const product = getProductById(id, locale);
  const pack = product ? undefined : getPacks(locale).find((p) => p.id === id);
  const hasCutout = product?.cutout && product.cutout !== product.image;

  return (
    <span
      className={`relative block h-20 w-20 flex-none overflow-hidden rounded-2xl ${
        roomy ? "sm:h-28 sm:w-28 sm:rounded-3xl" : ""
      } ${product ? TILE_CLASS[productTile(id)] : "on-miel"}`}
    >
      {product && hasCutout ? (
        <Image src={product.cutout!} alt="" fill sizes="112px" className={`${THUMB_CUTOUT} p-1.5`} />
      ) : product?.image ? (
        <Image src={product.image} alt="" fill sizes="112px" className="object-cover" />
      ) : product ? (
        <ImageSlot />
      ) : pack ? (
        <span className="absolute inset-0 flex items-center gap-0.5 p-1.5">
          {pack.lines.slice(0, 2).map((line) =>
            line.cutout ? (
              <span key={line.id} className="relative h-full flex-1">
                <Image src={line.cutout} alt="" fill sizes="56px" className={THUMB_CUTOUT} />
              </span>
            ) : null,
          )}
        </span>
      ) : null}
    </span>
  );
}

const STEP_BUTTON =
  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full font-display text-[22px] leading-none font-semibold transition-colors duration-150 hover:bg-miel";

/** Lignes du panier. `roomy` : version aérée de la page panier (vignette et textes plus grands dès 640 px). */
export function CartLines({ roomy = false }: { roomy?: boolean }) {
  const t = useTranslations("Cart");
  const locale = useLocale() as Locale;
  const { items, removeItem, setQty } = useCart();

  return (
    <ul>
      {items.map((item) => {
        const key = lineKey(item);
        return (
          <li
            key={key}
            className={`flex gap-3 border-b border-choco/15 py-4 last:border-b-0 ${roomy ? "sm:gap-5 sm:py-6" : ""}`}
          >
            <Thumb id={item.id} locale={locale} roomy={roomy} />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-start gap-1">
                <p
                  className={`min-w-0 flex-1 font-display text-[17px] leading-snug font-semibold [overflow-wrap:anywhere] ${
                    roomy ? "sm:text-xl" : ""
                  }`}
                >
                  {item.name}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(key)}
                  aria-label={t("removeItem", { name: item.name })}
                  className="-mt-2.5 -mr-2.5 flex h-11 w-11 flex-none cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-cream-2 hover:text-choco"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                {item.variant ? <span className="chip chip-moutarde">{item.variant}</span> : null}
                <span className="tabular-nums">{t("perUnit", { price: formatPrice(item.price, locale) })}</span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-2">
                <div className="flex items-center rounded-full bg-cream-2">
                  <button
                    type="button"
                    onClick={() => setQty(key, item.qty - 1)}
                    aria-label={t("decrease", { name: item.name })}
                    className={STEP_BUTTON}
                  >
                    −
                  </button>
                  <span className="min-w-7 text-center font-display text-[17px] font-semibold tabular-nums">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(key, item.qty + 1)}
                    aria-label={t("increase", { name: item.name })}
                    className={STEP_BUTTON}
                  >
                    +
                  </button>
                </div>
                <span className={`ml-auto font-display text-lg font-bold tabular-nums ${roomy ? "sm:text-xl" : ""}`}>
                  {formatPrice(item.price * item.qty, locale)}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// Pack qui contient le plus d'articles déjà au panier, absent du panier et ajoutable sans choix de variante.
function suggestPack(items: CartItem[], locale: Locale): Pack | undefined {
  const ids = new Set(items.map((i) => i.id));
  let best: { pack: Pack; hits: number } | undefined;
  for (const pack of getPacks(locale)) {
    if (ids.has(pack.id) || !pack.available || getSellableById(pack.id, locale)?.variant) continue;
    const hits = pack.items.filter((id) => ids.has(id)).length;
    if (hits && (!best || hits > best.hits)) best = { pack, hits };
  }
  return best?.pack;
}

/** Pack suggéré : contenu, total « achetés séparément » barré, prix du pack, bascule en un geste. */
export function PackSuggestion({ className = "" }: { className?: string }) {
  const t = useTranslations("Ux");
  const tPacks = useTranslations("Packs");
  const locale = useLocale() as Locale;
  const { items, setQty, addItem } = useCart();
  const pack = items.length ? suggestPack(items, locale) : undefined;
  if (!pack) return null;

  return (
    <section aria-label={pack.name} className={`tile on-miel p-4 sm:p-5 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-[22px]">{pack.name}</h3>
          <p className="mt-1.5 text-[15px] leading-snug">{pack.lines.map((line) => line.name).join(" + ")}</p>
        </div>
        <div className="flex flex-none -space-x-2">
          {pack.lines.slice(0, 2).map((line) =>
            line.cutout ? (
              <span key={line.id} className="relative h-14 w-14">
                <Image src={line.cutout} alt="" fill sizes="56px" className={THUMB_CUTOUT} />
              </span>
            ) : null,
          )}
        </div>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="price">{formatPrice(pack.price, locale)}</span>
        <span className="text-sm">
          {tPacks("separately")} <span className="strike">{formatPrice(pack.compareAt, locale)}</span>
        </span>
      </p>
      <button
        type="button"
        onClick={() => {
          // Le pack remplace les articles déjà au panier, sinon le client les paierait deux fois.
          for (const id of pack.items) {
            const line = items.find((i) => i.id === id);
            if (line) setQty(lineKey(line), line.qty - 1);
          }
          addItem({ id: pack.id, name: pack.name, price: pack.price }, { silent: true });
        }}
        className="btn btn-block mt-4 px-5 py-2.5"
      >
        {t("packSuggestCta", { save: formatPrice(pack.save, locale) })}
      </button>
    </section>
  );
}

/** Progression vers la livraison offerte : moutarde sur chocolat clair, à poser sur un bloc `.on-choco`. */
export function FreeShippingBar({ className = "" }: { className?: string }) {
  const t = useTranslations("Ux");
  const locale = useLocale() as Locale;
  const { total } = useCart();
  const left = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const progress = Math.min(1, total / FREE_SHIPPING_THRESHOLD);

  return (
    <div className={className}>
      <p aria-live="polite" className={`font-display text-base font-semibold ${left > 0 ? "" : "text-moutarde"}`}>
        {left > 0 ? t("freeShipLeft", { amount: formatPrice(left, locale) }) : t("freeShipDone")}
      </p>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-choco-2">
        <div
          className="h-full origin-left bg-moutarde transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}

/** Consentement aux CGV, bouton de paiement et messages d'erreur. `amount` : montant affiché sur le bouton. */
export function CartCheckout({ amount }: { amount: number }) {
  const t = useTranslations("Cart");
  const locale = useLocale() as Locale;
  const { state, busy, startCheckout } = useCheckout(locale);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const alert = "on-tomate mt-3 rounded-2xl px-4 py-3 text-center text-[15px] leading-snug font-semibold";

  return (
    <>
      <TermsConsent checked={termsAccepted} onChange={setTermsAccepted} />
      <button
        type="button"
        onClick={startCheckout}
        disabled={busy || !termsAccepted}
        data-state={state}
        aria-busy={busy}
        className="btn btn-braise btn-lg btn-block mt-3 tabular-nums"
      >
        {t("checkout")} · {formatPrice(amount, locale)}
      </button>
      <PaymentIcons className="mt-3 justify-center" />
      {state === "unavailable" ? (
        <p role="alert" className={alert}>
          {t("checkoutSoon")}
        </p>
      ) : null}
      {state === "error" ? (
        <p role="alert" className={alert}>
          {t("checkoutError")}
        </p>
      ) : null}
    </>
  );
}

/** Panier vide : message court et retour vers la collection. */
export function CartEmpty({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("Cart");

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="on-miel flex h-24 w-24 items-center justify-center rounded-full">
        <HeatWaves className="h-12 w-12" />
      </span>
      <h2 className="text-[28px]">{t("emptyTitle")}</h2>
      <p className="max-w-[28ch]">{t("empty")}</p>
      <Link href="/collection" onClick={onNavigate} className="btn btn-braise mt-2">
        {t("emptyCta")}
      </Link>
    </div>
  );
}
