import { NextResponse } from "next/server";
import Stripe from "stripe";

// Réception des événements Stripe. Sur checkout.session.completed, la
// commande est normalisée puis transmise à ORDERS_WEBHOOK_URL (app de
// pilotage / automatisation CJDropshipping). Tant que la transmission
// échoue, on répond 500 : Stripe réessaie avec backoff pendant 3 jours,
// c'est notre garantie de durabilité en attendant une vraie base.
export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const stripe = new Stripe(secretKey);
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // obflo_items est écrit par /api/checkout (source de vérité serveur) ;
    // un échec de parsing ne doit pas faire perdre la commande, on transmet
    // avec items vide et le sessionId permet de retrouver le détail Stripe.
    let items: { id: string; qty: number; variant?: string }[] = [];
    try {
      const parsed: unknown = JSON.parse(session.metadata?.obflo_items ?? "[]");
      if (Array.isArray(parsed)) {
        items = parsed.filter(
          (it): it is { id: string; qty: number; variant?: string } =>
            typeof it === "object" &&
            it !== null &&
            typeof (it as { id?: unknown }).id === "string" &&
            typeof (it as { qty?: unknown }).qty === "number",
        );
      }
    } catch {
      // metadata corrompue — la commande part quand même, cf. commentaire
    }

    const shipping = session.collected_information?.shipping_details ?? null;
    const order = {
      source: "obflo",
      event: "order.paid",
      sessionId: session.id,
      paymentIntentId:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : (session.payment_intent?.id ?? null),
      paidAt: new Date(event.created * 1000).toISOString(),
      currency: session.currency,
      amountSubtotal: session.amount_subtotal,
      amountShipping: session.total_details?.amount_shipping ?? null,
      amountTotal: session.amount_total,
      locale: session.metadata?.obflo_locale ?? null,
      email: session.customer_details?.email ?? null,
      customerName: session.customer_details?.name ?? null,
      shippingName: shipping?.name ?? null,
      shippingAddress: shipping?.address ?? null,
      items,
    };

    // Trace structurée systématique : c'est le filet minimal consultable
    // dans les logs Vercel même sans ORDERS_WEBHOOK_URL configurée.
    console.log(`[obflo:order] ${JSON.stringify(order)}`);

    const forwardUrl = process.env.ORDERS_WEBHOOK_URL;
    if (forwardUrl) {
      try {
        const res = await fetch(forwardUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            // Le destinataire déduplique sur cette clé : Stripe peut
            // livrer le même événement plusieurs fois.
            "x-idempotency-key": session.id,
          },
          body: JSON.stringify(order),
          signal: AbortSignal.timeout(10_000),
        });
        if (!res.ok) {
          throw new Error(`forward_status_${res.status}`);
        }
      } catch (error) {
        console.error(
          `[obflo:order] transmission échouée (session ${session.id}), Stripe va réessayer :`,
          error,
        );
        return NextResponse.json({ error: "forward_failed" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
