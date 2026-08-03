import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";
import { INDEXNOW_ENDPOINT, INDEXNOW_KEY } from "@/lib/indexnow";
import { SITE_URL } from "@/lib/site";

// Soumet toutes les URLs du sitemap à IndexNow (Bing/Copilot notamment).
// À appeler après un déploiement significatif : `POST /api/indexnow`.
// Sans effet tant que public/<clé>.txt n'est pas servi en prod (le moteur
// vérifie la clé avant de crawler) — inoffensif donc en local/préprod.
// INDEXNOW_SUBMIT_SECRET (optionnel) verrouille l'endpoint par Bearer.
export async function POST(request: Request) {
  const secret = process.env.INDEXNOW_SUBMIT_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Le sitemap est déjà la liste canonique (124 URLs ×4 locales) — on la
  // réutilise telle quelle, aucune seconde source de vérité à maintenir.
  const urlList = [...new Set(sitemap().map((entry) => entry.url))];

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    // 200 = reçu, 202 = reçu (clé pas encore validée) — les deux sont OK.
    if (!res.ok && res.status !== 202) {
      return NextResponse.json(
        { error: "indexnow_error", status: res.status },
        { status: 502 },
      );
    }
    return NextResponse.json({ submitted: urlList.length, status: res.status });
  } catch (error) {
    console.error("[indexnow] soumission échouée :", error);
    return NextResponse.json({ error: "indexnow_unreachable" }, { status: 502 });
  }
}
