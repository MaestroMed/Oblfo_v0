import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { guideTone } from "@/components/guide-card";
import { toCardProduct } from "@/components/product-card";
import { SearchContent } from "@/components/search-content";
import { CATEGORY_ORDER, getListedProducts } from "@/data/catalog";
import { getCategoryContent } from "@/data/categories";
import { getGuides } from "@/data/guides";
import { getPathname } from "@/i18n/navigation";
import { hreflangAlternates, isLocale, type Locale, pageOpenGraph } from "@/i18n/routing";

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
    openGraph: pageOpenGraph(locale, alternates(locale).canonical),
  };
}

export default async function SearchPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const tCat = await getTranslations("Categories");

  // Index léger construit côté serveur : produits, familles, guides.
  return (
    <SearchContent
      products={getListedProducts(locale).map(toCardProduct)}
      families={CATEGORY_ORDER.map((category) => {
        const c = getCategoryContent(category, locale);
        return { category, text: `${tCat(category)} ${c.title} ${c.metaDescription}` };
      })}
      guides={getGuides(locale).map((g, i) => ({
        slug: g.slug,
        title: g.title,
        metaDescription: g.metaDescription,
        readMinutes: g.readMinutes,
        images: g.images.slice(0, 1),
        tone: guideTone(i),
      }))}
    />
  );
}
