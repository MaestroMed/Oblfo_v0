import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSellableById } from "@/data/catalog";
import { getPathname } from "@/i18n/navigation";
import { isLocale, routing } from "@/i18n/routing";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from "@/lib/shipping";
import { SITE_URL } from "@/lib/site";

// Livraison offerte dès 60 € (cf. bandeau + CGV), sinon forfait standard.
const FREE_SHIPPING_THRESHOLD_CENTS = FREE_SHIPPING_THRESHOLD * 100;
const STANDARD_SHIPPING_CENTS = Math.round(STANDARD_SHIPPING * 100);

type CheckoutBody = {
  locale?: string;
  items?: { id?: string; qty?: number }[];
};

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "payment_not_configured" },
      { status: 503 },
    );
  }

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
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotalCents = 0;

  for (const item of body.items) {
    const qty = Math.floor(item.qty ?? 0);
    if (!item.id || qty < 1 || qty > 50) {
      return NextResponse.json({ error: "invalid_item" }, { status: 400 });
    }
    const sellable = getSellableById(item.id, locale);
    if (!sellable) {
      return NextResponse.json(
        { error: "unknown_item", id: item.id },
        { status: 400 },
      );
    }
    const unitAmount = sellable.price * 100;
    subtotalCents += unitAmount * qty;
    lineItems.push({
      quantity: qty,
      price_data: {
        currency: "eur",
        unit_amount: unitAmount,
        product_data: {
          name: sellable.name,
          metadata: { obflo_id: sellable.id },
        },
      },
    });
  }

  const origin = request.headers.get("origin") ?? SITE_URL;
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
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "LU", "MC", "CH", "DE", "ES", "IT", "NL", "PT"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name:
              shippingCents === 0
                ? locale === "fr"
                  ? "Livraison offerte"
                  : "Free shipping"
                : locale === "fr"
                  ? "Livraison standard"
                  : "Standard shipping",
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
        obflo_items: JSON.stringify(
          body.items.map((i) => ({ id: i.id, qty: i.qty })),
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session failed:", error);
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
