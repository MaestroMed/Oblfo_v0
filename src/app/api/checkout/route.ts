import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSellableById } from "@/data/catalog";
import { getPathname } from "@/i18n/navigation";
import { isLocale, routing } from "@/i18n/routing";
import { MAX_QTY } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from "@/lib/shipping";
import { SITE_URL } from "@/lib/site";

// Livraison offerte dès 60 € (cf. bandeau + CGV), sinon forfait standard.
const FREE_SHIPPING_THRESHOLD_CENTS = FREE_SHIPPING_THRESHOLD * 100;
const STANDARD_SHIPPING_CENTS = Math.round(STANDARD_SHIPPING * 100);

type CheckoutBody = {
  locale?: string;
  items?: { id?: unknown; qty?: unknown; variant?: unknown }[];
};

/**
 * Les URLs de retour Stripe ne doivent jamais pointer vers un domaine
 * arbitraire fourni par le client (vecteur de phishing post-paiement).
 * On n'accepte l'Origin de la requête qu'en dev local.
 */
function trustedOrigin(request: Request): string {
  const origin = request.headers.get("origin");
  if (!origin) return SITE_URL;
  try {
    const url = new URL(origin);
    if (url.host === new URL(SITE_URL).host) return SITE_URL;
    if (
      process.env.NODE_ENV !== "production" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1")
    ) {
      return origin;
    }
  } catch {
    // origin illisible — on retombe sur le domaine canonique
  }
  return SITE_URL;
}

export async function POST(request: Request) {
  // La validation du panier précède volontairement le contrôle de la clé
  // Stripe : le contrat d'API (400 variante manquante, 409 indisponible…)
  // reste testable même sans paiement configuré.
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const locale =
    body.locale && isLocale(body.locale) ? body.locale : routing.defaultLocale;

  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "empty_cart" }, { status: 400 });
  }

  // Les prix viennent exclusivement du catalogue serveur — jamais du client.
  // normalizedItems est la seule représentation qui part en metadata :
  // elle reflète exactement ce qui est facturé.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const normalizedItems: { id: string; qty: number; variant?: string }[] = [];
  let subtotalCents = 0;

  for (const item of body.items) {
    if (typeof item.id !== "string" || typeof item.qty !== "number") {
      return NextResponse.json({ error: "invalid_item" }, { status: 400 });
    }
    const qty = Math.floor(item.qty);
    if (!Number.isFinite(qty) || qty < 1 || qty > MAX_QTY) {
      return NextResponse.json({ error: "invalid_item" }, { status: 400 });
    }
    const sellable = getSellableById(item.id, locale);
    if (!sellable) {
      return NextResponse.json(
        { error: "unknown_item", id: item.id },
        { status: 400 },
      );
    }
    if (!sellable.available) {
      return NextResponse.json(
        { error: "item_unavailable", id: item.id },
        { status: 409 },
      );
    }
    // Un produit à déclinaison ne part JAMAIS sans elle (et jamais avec une
    // valeur hors liste) ; un produit sans déclinaison en refuse une.
    if (sellable.variant) {
      if (
        typeof item.variant !== "string" ||
        !sellable.variant.options.includes(item.variant)
      ) {
        return NextResponse.json(
          { error: "invalid_variant", id: item.id },
          { status: 400 },
        );
      }
    } else if (item.variant !== undefined) {
      return NextResponse.json(
        { error: "invalid_variant", id: item.id },
        { status: 400 },
      );
    }
    const variant = sellable.variant ? (item.variant as string) : undefined;
    const unitAmount = Math.round(sellable.price * 100);
    subtotalCents += unitAmount * qty;
    normalizedItems.push({ id: item.id, qty, variant });
    lineItems.push({
      quantity: qty,
      price_data: {
        currency: "eur",
        unit_amount: unitAmount,
        product_data: {
          name: variant ? `${sellable.name} — ${variant}` : sellable.name,
          metadata: {
            obflo_id: sellable.id,
            ...(variant ? { obflo_variant: variant } : {}),
          },
        },
      },
    });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "payment_not_configured" },
      { status: 503 },
    );
  }

  const origin = trustedOrigin(request);
  const successPath = getPathname({ locale, href: "/merci" });
  const homePath = getPathname({ locale, href: "/" });
  const shippingCents =
    subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS
      ? 0
      : STANDARD_SHIPPING_CENTS;

  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale,
      line_items: lineItems,
      // FR uniquement au lancement — étendre en même temps que CGV + grille
      // de frais de port (l'audit a relevé l'incohérence CGV vs pays permis).
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name:
              shippingCents === 0
                ? {
                    fr: "Livraison offerte",
                    en: "Free shipping",
                    de: "Gratisversand",
                    es: "Envío gratis",
                  }[locale]
                : {
                    fr: "Livraison standard",
                    en: "Standard shipping",
                    de: "Standardversand",
                    es: "Envío estándar",
                  }[locale],
            type: "fixed_amount",
            fixed_amount: { amount: shippingCents, currency: "eur" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 5 },
            },
          },
        },
      ],
      success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${homePath}`,
      metadata: {
        obflo_items: JSON.stringify(normalizedItems),
        obflo_locale: locale,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session failed:", error);
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
