import { NextResponse } from "next/server";
import Stripe from "stripe";

// Réception des événements Stripe. Pour l'instant : accusé de réception + log.
// Le traitement des commandes (transmission CJDropshipping / app de pilotage)
// se branchera ici sur checkout.session.completed.
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
    console.log(
      `[stripe] commande payée — session ${session.id}, total ${session.amount_total} ${session.currency}, items ${session.metadata?.obflo_items ?? "?"}`,
    );
  }

  return NextResponse.json({ received: true });
}
