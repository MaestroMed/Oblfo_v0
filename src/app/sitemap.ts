import type { MetadataRoute } from "next";
import { getProducts } from "@/data/catalog";
import type { Category } from "@/data/catalog-types";
import { CATEGORY_SLUGS } from "@/data/category-slugs";
import { getGuides, guideLocales } from "@/data/guides";
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

  // Entrées guides limitées aux locales où chaque guide existe réellement.
  const guideUrl = (locale: Locale, slug: string) =>
    url(locale, { pathname: "/guides/[slug]", params: { slug } });
  const guideEntries: MetadataRoute.Sitemap = getGuides(
    routing.defaultLocale,
  ).flatMap((guide) => {
    const locales = guideLocales(guide.id);
    const languages = Object.fromEntries([
      ...locales.map((l) => [l, guideUrl(l, guide.slugs[l])]),
      ["x-default", guideUrl("fr", guide.slugs.fr)],
    ]);
    return locales.map((locale) => ({
      url: guideUrl(locale, guide.slugs[locale]),
      priority: 0.7,
      changeFrequency: "monthly" as const,
      alternates: { languages },
    }));
  });

  const guidesIndexEntries = entries(() => "/guides", 0.7, "weekly");

  const categoryEntries = (
    Object.keys(CATEGORY_SLUGS) as Category[]
  ).flatMap((category) =>
    entries(
      (locale) => ({
        pathname: "/collection/[category]",
        params: { category: CATEGORY_SLUGS[category][locale] },
      }),
      0.8,
      "weekly",
    ),
  );

  return [
    ...entries(() => "/", 1, "weekly"),
    ...entries(() => "/collection", 0.9, "weekly"),
    ...categoryEntries,
    ...productEntries,
    ...guidesIndexEntries,
    ...guideEntries,
    ...entries(() => "/recherche", 0.3, "monthly"),
    ...entries(() => "/livraison-retours", 0.4, "monthly"),
    ...entries(() => "/contact", 0.4, "monthly"),
  ];
}
