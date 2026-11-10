import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { isLocale, routing } from "@/i18n/routing";
import { loadOgFonts, OgFrame, OgLogo, ogSize, ogTone } from "@/lib/og";

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
  const [t, fonts] = await Promise.all([
    getTranslations({ locale, namespace: "Og" }),
    loadOgFonts(),
  ]);

  return new ImageResponse(
    (
      <OgFrame tone="braise" footer={t("footer")} logo={false}>
        <OgLogo width={560} color={ogTone("braise").fg} />
        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 60,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          {t("title")}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 30,
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          {t("subtitle")}
        </div>
      </OgFrame>
    ),
    { ...size, fonts },
  );
}
