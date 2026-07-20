import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { formatPrice, getProductBySlug } from "@/data/catalog";
import { isLocale, routing } from "@/i18n/routing";
import { loadOgFonts, OgFrame, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "OBFLO";

export default async function ProductOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: requested, slug } = await params;
  const locale = isLocale(requested) ? requested : routing.defaultLocale;
  const product = getProductBySlug(locale, slug);
  const [t, tHero, fonts] = await Promise.all([
    getTranslations({ locale, namespace: "ProductPage" }),
    getTranslations({ locale, namespace: "Hero" }),
    loadOgFonts(),
  ]);

  if (!product) {
    // Slug inconnu — on sert le visuel générique plutôt qu'une erreur.
    return new ImageResponse(
      (
        <OgFrame kicker={tHero("kicker")} footerLeft={tHero("reassurance")}>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#F2F5F8",
            }}
          >
            OBFLO<span style={{ color: "#FF6A2B" }}>°</span>
          </div>
        </OgFrame>
      ),
      { ...size, fonts },
    );
  }

  return new ImageResponse(
    (
      <OgFrame kicker={tHero("kicker")} footerLeft={t("reassurance")}>
        <div style={{ display: "flex", gap: 14 }}>
          {product.tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontFamily: "IBM Plex Mono",
                fontSize: 19,
                letterSpacing: "0.14em",
                color: "#9FB3C4",
                border: "2px solid rgba(143,193,227,0.3)",
                borderRadius: 10,
                padding: "8px 16px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.02,
            color: "#F2F5F8",
            maxWidth: 980,
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            fontWeight: 500,
            color: "#9AA9B8",
            maxWidth: 860,
          }}
        >
          {product.tagline}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 700,
              color: "#FF6A2B",
            }}
          >
            {formatPrice(product.price, locale)}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "IBM Plex Mono",
              fontSize: 20,
              letterSpacing: "0.14em",
              color: "#C4D2DE",
              border: "2px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "10px 20px",
            }}
          >
            {locale === "fr" ? "+41,7°C" : "+41.7°C"}
          </div>
        </div>
      </OgFrame>
    ),
    { ...size, fonts },
  );
}
