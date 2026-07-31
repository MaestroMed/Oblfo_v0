import type { MetadataRoute } from "next";
import { getProducts } from "@/data/catalog";
import { getGuides } from "@/data/guides";
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

  const guideEntries = getGuides(routing.defaultLocale).flatMap((guide) =>
    entries(
      (locale) => ({
        pathname: "/guides/[slug]",
        params: { slug: guide.slugs[locale] },
      }),
      0.7,
      "monthly",
    ),
  );

  return [
    ...entries(() => "/", 1, "weekly"),
    ...productEntries,
    ...entries(() => "/guides", 0.7, "weekly"),
    ...guideEntries,
    ...entries(() => "/livraison-retours", 0.4, "monthly"),
    ...entries(() => "/contact", 0.4, "monthly"),
  ];
}
