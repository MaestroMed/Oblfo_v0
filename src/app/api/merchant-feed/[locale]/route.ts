import { NextResponse } from "next/server";
import { getProducts, type Product } from "@/data/catalog";
import { getPathname } from "@/i18n/navigation";
import { isLocale, routing, type Locale } from "@/i18n/routing";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from "@/lib/shipping";
import { SITE_URL } from "@/lib/site";

// Flux Google Merchant Center (RSS 2.0, namespace g:) — un flux par locale :
// /api/merchant-feed/fr … Un produit à déclinaison sort en N items reliés par
// item_group_id + g:size (exigence Google Shopping). Produits sans photo ou
// indisponibles exclus. Généré au build, revalidé à chaque déploiement.
export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function money(value: number): string {
  return `${value.toFixed(2)} EUR`;
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function itemXml(
  product: Product,
  locale: Locale,
  variantOption?: string,
): string {
  const link = `${SITE_URL}${getPathname({
    locale,
    href: { pathname: "/produits/[slug]", params: { slug: product.slug } },
  })}`;
  const id = variantOption
    ? `${product.id}-${slugify(variantOption)}`
    : product.id;
  // Frais réels pour un achat de cet article seul (offert dès 60 €).
  const shipping =
    product.price >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;

  const lines = [
    `<g:id>${esc(id)}</g:id>`,
    `<g:title>${esc(variantOption ? `${product.name} — ${variantOption}` : product.name)}</g:title>`,
    `<g:description>${esc(product.description.join(" "))}</g:description>`,
    `<g:link>${esc(link)}</g:link>`,
    `<g:image_link>${esc(`${SITE_URL}${product.image}`)}</g:image_link>`,
    `<g:availability>in_stock</g:availability>`,
    `<g:price>${money(product.price)}</g:price>`,
    `<g:brand>OBFLO</g:brand>`,
    `<g:condition>new</g:condition>`,
    // Pas de GTIN fabricant sur ces références marque propre.
    `<g:identifier_exists>no</g:identifier_exists>`,
    `<g:shipping><g:country>FR</g:country><g:service>Standard</g:service><g:price>${money(shipping)}</g:price></g:shipping>`,
  ];
  if (variantOption) {
    lines.push(
      `<g:item_group_id>${esc(product.id)}</g:item_group_id>`,
      `<g:size>${esc(variantOption)}</g:size>`,
    );
  }
  return `<item>${lines.join("")}</item>`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return NextResponse.json({ error: "unknown_locale" }, { status: 404 });
  }

  const items = getProducts(locale)
    .filter((p) => p.available && p.image)
    .flatMap((p) =>
      p.variant
        ? p.variant.options.map((option) => itemXml(p, locale, option))
        : [itemXml(p, locale)],
    );

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel>` +
    `<title>OBFLO (${locale})</title>` +
    `<link>${esc(`${SITE_URL}/${locale}`)}</link>` +
    `<description>OBFLO product feed</description>` +
    items.join("") +
    `</channel></rss>`;

  return new NextResponse(xml, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
