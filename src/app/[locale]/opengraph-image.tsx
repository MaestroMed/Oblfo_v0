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
  const [tHero, fonts] = await Promise.all([
    getTranslations({ locale, namespace: "Hero" }),
    loadOgFonts(),
  ]);

  return new ImageResponse(
    (
      <OgFrame kicker={tHero("kicker")} footerLeft={tHero("reassurance")}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 116,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "#F2F5F8",
          }}
        >
          <span>{tHero("titleLine1")}</span>
          <span style={{ color: "#FF6A2B" }}>{tHero("titleLine2")}</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 30,
            fontWeight: 500,
            color: "#9AA9B8",
            maxWidth: 820,
          }}
        >
          {tHero("subtitle")}
        </div>
      </OgFrame>
    ),
    { ...size, fonts },
  );
}
