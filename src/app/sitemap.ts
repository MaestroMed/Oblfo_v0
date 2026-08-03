import type { MetadataRoute } from "next";
import { getProducts } from "@/data/catalog";
import { getGuides, GUIDE_LOCALES, type GuideLocale } from "@/data/guides";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

type Href = Parameters<typeof getPathname>[0]["href"];

function url(locale: Locale, href: Href): string {
  return `${SITE_URL}${getPathname({ locale, href })}`;
}

/** Une entrée par locale, avec les alternates hreflang croisées + x-default (fr). */
function entries(
  href: (locale: Locale) => Href,
  priority: number,
  changeFrequency: "weekly" | "monthly",
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries([
    ...routing.locales.map((l) => [l, url(l, href(l))]),
    ["x-default", url(routing.defaultLocale, href(routing.defaultLocale))],
  ]);

  return routing.locales.map((locale) => ({
    url: url(locale, href(locale)),
    priority,
    changeFrequency,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries = getProducts(routing.defaultLocale).flatMap((product) =>
    entries(
      (locale) => ({
        pathname: "/produits/[slug]",
        params: { slug: product.slugs[locale] },
      }),
      0.9,
      "weekly",
    ),
  );

  // Guides fr/en uniquement pour l'instant — pas d'entrées de/es.
  const guideUrl = (locale: GuideLocale, slug: string) =>
    url(locale, { pathname: "/guides/[slug]", params: { slug } });
  const guideEntries: MetadataRoute.Sitemap = getGuides(
    routing.defaultLocale,
  ).flatMap((guide) => {
    const languages = Object.fromEntries([
      ...GUIDE_LOCALES.map((l) => [l, guideUrl(l, guide.slugs[l])]),
      ["x-default", guideUrl("fr", guide.slugs.fr)],
    ]);
    return GUIDE_LOCALES.map((locale) => ({
      url: guideUrl(locale, guide.slugs[locale]),
      priority: 0.7,
      changeFrequency: "monthly" as const,
      alternates: { languages },
    }));
  });

  const guidesIndexLanguages = Object.fromEntries([
    ...GUIDE_LOCALES.map((l) => [l, url(l, "/guides")]),
    ["x-default", url("fr", "/guides")],
  ]);
  const guidesIndexEntries: MetadataRoute.Sitemap = GUIDE_LOCALES.map(
    (locale) => ({
      url: url(locale, "/guides"),
      priority: 0.7,
      changeFrequency: "weekly" as const,
      alternates: { languages: guidesIndexLanguages },
    }),
  );

  return [
    ...entries(() => "/", 1, "weekly"),
    ...entries(() => "/collection", 0.9, "weekly"),
    ...productEntries,
    ...guidesIndexEntries,
    ...guideEntries,
    ...entries(() => "/livraison-retours", 0.4, "monthly"),
    ...entries(() => "/contact", 0.4, "monthly"),
  ];
}
