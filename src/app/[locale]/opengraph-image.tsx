import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { isLocale, routing } from "@/i18n/routing";
import { loadOgFonts, OgFrame, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "OBFLO";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: requested } = await params;
  const locale = isLocale(requested) ? requested : routing.defaultLocale;
  const [t, tProduct, fonts] = await Promise.all([
    getTranslations({ locale, namespace: "HomeV2" }),
    getTranslations({ locale, namespace: "ProductPage" }),
    loadOgFonts(),
  ]);

  const title = `${t("heroTitle1")}${t("heroAccent1")}${t("heroTitle2")}${t("heroAccent2")}${t("heroTitle3")}`;

  return new ImageResponse(
    (
      <OgFrame kicker={tProduct("kicker")} footerLeft={tProduct("reassurance")}>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            color: "#F2F5F8",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 30,
            fontWeight: 500,
            color: "#9AA9B8",
            maxWidth: 860,
          }}
        >
          {t("heroSubtitle")}
        </div>
      </OgFrame>
    ),
    { ...size, fonts },
  );
}
