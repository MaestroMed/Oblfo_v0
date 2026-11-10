import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { formatPrice, getProductBySlug } from "@/data/catalog";
import { isLocale, routing } from "@/i18n/routing";
import { loadOgFonts, OgFrame, OgLogo, ogSize, ogTone } from "@/lib/og";
import { productTile } from "@/lib/tile";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "OBFLO";

// shortcut: photo lue sur disque, absente si l'hébergeur ne trace pas `public/` dans la fonction ;
// l'image retombe alors sur le disque aux ondes. Passer par `outputFileTracingIncludes` si ça manque en production.
async function packshot(image?: string) {
  if (!image) return null;
  try {
    const file = join(process.cwd(), "public", image);
    return `data:image/${image.endsWith(".png") ? "png" : "jpeg"};base64,${(await readFile(file)).toString("base64")}`;
  } catch {
    return null;
  }
}

/** Corps du nom selon sa longueur : un mot allemand de 21 lettres doit tenir sur 640 px. */
function nameSize(name: string) {
  const longestWord = Math.max(...name.split(/\s+/).map((w) => w.length));
  if (longestWord >= 17 || name.length > 34) return 52;
  return name.length > 24 ? 60 : 76;
}

export default async function ProductOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: requested, slug } = await params;
  const locale = isLocale(requested) ? requested : routing.defaultLocale;
  const product = getProductBySlug(locale, slug);
  const [t, fonts] = await Promise.all([
    getTranslations({ locale, namespace: "Og" }),
    loadOgFonts(),
  ]);

  if (!product) {
    // Slug inconnu : le visuel de marque plutôt qu'une erreur.
    return new ImageResponse(
      (
        <OgFrame tone="peche" footer={t("footer")} logo={false}>
          <OgLogo width={560} color={ogTone("peche").pop} />
        </OgFrame>
      ),
      { ...size, fonts },
    );
  }

  const tone = productTile(product.id);
  const c = ogTone(tone);

  return new ImageResponse(
    (
      <OgFrame tone={tone} footer={t("footer")} image={await packshot(product.image)}>
        <div
          style={{
            display: "flex",
            fontSize: nameSize(product.name),
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            wordBreak: "break-word",
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 28,
            fontWeight: 500,
            lineHeight: 1.3,
          }}
        >
          {product.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 30 }}>
          <div
            style={{
              display: "flex",
              padding: "8px 30px",
              borderRadius: 999,
              backgroundColor: c.pop,
              color: c.onPop,
              fontSize: 46,
              fontWeight: 700,
            }}
          >
            {formatPrice(product.price, locale)}
          </div>
        </div>
      </OgFrame>
    ),
    { ...size, fonts },
  );
}
