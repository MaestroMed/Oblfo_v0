import { NextResponse } from "next/server";

// Inscription newsletter. Sans NEWSLETTER_WEBHOOK_URL configurée (Brevo,
// Make, app de pilotage…), on répond 503 et le formulaire affiche
// « ouverture bientôt » — jamais de fausse confirmation.
export async function POST(request: Request) {
  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { email?: unknown; locale?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        locale: typeof body.locale === "string" ? body.locale : "fr",
        source: "obflo-footer",
      }),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch (error) {
    console.error("Newsletter webhook failed:", error);
    return NextResponse.json({ error: "webhook_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
