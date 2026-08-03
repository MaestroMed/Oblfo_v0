import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InfoPage } from "@/components/info-page";
import { SearchContent, type SearchEntry } from "@/components/search-content";
import {
  CATEGORY_ORDER,
  formatPrice,
  getProducts,
} from "@/data/catalog";
import { getCategoryContent } from "@/data/categories";
import { getGuides } from "@/data/guides";
import { getPathname } from "@/i18n/navigation";
import { hreflangAlternates, isLocale, type Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

function alternates(locale: Locale) {
  const path = (l: Locale) => getPathname({ locale: l, href: "/recherche" });
  return hreflangAlternates(path, locale);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "SearchPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternates(locale),
  };
}

/** Index léger construit côté serveur : produits, catégories, guides. */
function buildEntries(locale: Locale): SearchEntry[] {
  const products: SearchEntry[] = getProducts(locale).map((p) => ({
    kind: "product",
    title: p.name,
    subtitle: p.tagline,
    price: formatPrice(p.price, locale),
    url: getPathname({
      locale,
      href: { pathname: "/produits/[slug]", params: { slug: p.slug } },
    }),
  }));
  const categories: SearchEntry[] = CATEGORY_ORDER.map((c) => {
    const content = getCategoryContent(c, locale);
    return {
      kind: "category" as const,
      title: content.title,
      subtitle: content.metaDescription,
      url: getPathname({
        locale,
        href: {
          pathname: "/collection/[category]",
          params: { category: content.slug },
        },
      }),
    };
  });
  const guides: SearchEntry[] = getGuides(locale).map((g) => ({
    kind: "guide",
    title: g.title,
    subtitle: g.metaDescription,
    url: getPathname({
      locale,
      href: { pathname: "/guides/[slug]", params: { slug: g.slug } },
    }),
  }));
  return [...products, ...categories, ...guides];
}

export default async function SearchPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("SearchPage");

  return (
    <InfoPage kicker={t("kicker")} title={t("title")} intro={t("intro")}>
      <SearchContent entries={buildEntries(locale)} />
    </InfoPage>
  );
}
