import { NextResponse } from "next/server";
import { readStock } from "@/lib/stock";

// Stock affiché sur les fiches (« Plus que X en stock »). Cache CDN 30 s : il suit les ventes de près.
export async function GET() {
  const stock = await readStock().catch(() => null);
  return NextResponse.json({ stock }, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=300" } });
}
