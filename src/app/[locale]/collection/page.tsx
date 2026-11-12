import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FamilyPills } from "@/components/family-pills";
import { PAGE, PageBanner } from "@/components/page-banner";
import { ProductCard } from "@/components/product-card";
import { CATEGORY_ORDER, getListedProducts } from "@/data/catalog";
import { CATEGORY_SLUGS } from "@/data/category-slugs";
import { getPathname, Link } from "@/i18n/navigation";
import { hreflangAlternates, isLocale, type Locale, pageOpenGraph } from "@/i18n/routing";
import { categoryTile, TILE_CLASS } from "@/lib/tile";

type Props = { params: Promise<{ locale: string }> };

function alternates(locale: Locale) {
  const path = (l: Locale) => getPathname({ locale: l, href: "/collection" });
  return hreflangAlternates(path, locale);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "Collection" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternates(locale),
    openGraph: pageOpenGraph(locale, alternates(locale).canonical),
  };
}

export default async function CollectionPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Collection");
  const tCat = await getTranslations("Categories");
  const products = getListedProducts(locale);

  const sections = CATEGORY_ORDER.map((category) => ({
    category,
    tone: categoryTile(category),
    items: products.filter((p) => p.category === category),
  })).filter((s) => s.items.length > 0);

  return (
    <main className={`${PAGE} pt-4 pb-14 sm:pt-6 sm:pb-24`}>
      <PageBanner tone="miel" waves title={t("title")} lead={t("intro")} />
      <FamilyPills current="all" className="mt-3 sm:mt-5" />

      <div className="mt-6 flex flex-col gap-12 sm:mt-10 sm:gap-20">
        {sections.map((section) => (
          <section key={section.category}>
            {/* Toute la bande mène à la famille : une seule cible, à la couleur de la famille. */}
            <Link
              href={{
                pathname: "/collection/[category]",
                params: { category: CATEGORY_SLUGS[section.category][locale] },
              }}
              className={`tile ${TILE_CLASS[section.tone]} mb-3 flex min-h-[72px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-4 sm:mb-6 sm:px-8 sm:py-6`}
            >
              <h2 className="text-[clamp(26px,5vw,40px)]">{tCat(section.category)}</h2>
              <span className="chip">
                {t("count", { count: section.items.length })}
              </span>
            </Link>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:gap-6">
              {section.items.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
