import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FamilyPills } from "@/components/family-pills";
import { GuideCard, guideTone } from "@/components/guide-card";
import { PackRail } from "@/components/pack-card";
import { Crumbs, H2, PAGE, PageBanner } from "@/components/page-banner";
import { toCardProduct } from "@/components/product-card";
import { ProductGrid } from "@/components/product-grid";
import { getPacks, getListedProducts } from "@/data/catalog";
import type { Category } from "@/data/catalog-types";
import { getCategoryContent } from "@/data/categories";
import { CATEGORY_SLUGS, categoryFromSlug } from "@/data/category-slugs";
import { getGuides } from "@/data/guides";
import { getPathname } from "@/i18n/navigation";
import { isLocale, ogLocale, routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { categoryTile, deco } from "@/lib/tile";

type Props = { params: Promise<{ locale: string; category: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    (Object.keys(CATEGORY_SLUGS) as Category[]).map((category) => ({
      locale,
      category: CATEGORY_SLUGS[category][locale],
    })),
  );
}

function categoryAlternates(locale: Locale, slugs: Record<Locale, string>) {
  const path = (l: Locale) =>
    getPathname({
      locale: l,
      href: { pathname: "/collection/[category]", params: { category: slugs[l] } },
    });
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = path(l);
  languages["x-default"] = path(routing.defaultLocale);
  return { canonical: path(locale), languages };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: slug } = await params;
  if (!isLocale(locale)) return {};
  const category = categoryFromSlug(locale, slug);
  if (!category) return {};
  const c = getCategoryContent(category, locale);

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: categoryAlternates(locale, c.slugs),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: getPathname({
        locale,
        href: { pathname: "/collection/[category]", params: { category: c.slug } },
      }),
      siteName: "OBFLO",
      locale: ogLocale(locale),
      type: "website",
      images: [`/${locale}/opengraph-image`],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category: slug } = await params;
  if (!isLocale(locale)) notFound();
  const category = categoryFromSlug(locale, slug);
  if (!category) notFound();
  setRequestLocale(locale);

  const c = getCategoryContent(category, locale);
  const t = await getTranslations("CategoryPage");
  const tCat = await getTranslations("Categories");
  const label = tCat(category);
  const products = getListedProducts(locale).filter((p) => p.category === category);
  const ids = new Set(products.map((p) => p.id));
  const packs = getPacks(locale).filter(
    (pack) => pack.available && pack.lines.some((line) => ids.has(line.id)),
  );
  const guides = getGuides(locale)
    .map((guide, i) => ({ guide, tone: guideTone(i) }))
    .filter(({ guide }) => c.guideIds.includes(guide.id));

  const pageUrl = `${SITE_URL}${getPathname({
    locale,
    href: { pathname: "/collection/[category]", params: { category: c.slug } },
  })}`;
  const collectionUrl = `${SITE_URL}${getPathname({ locale, href: "/collection" })}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: c.metaTitle,
        description: c.metaDescription,
        url: pageUrl,
        inLanguage: locale,
      },
      {
        "@type": "ItemList",
        itemListElement: products.map((product, i) => ({
          "@type": "Product",
          position: i + 1,
          name: product.name,
          description: product.tagline,
          url: `${SITE_URL}${getPathname({
            locale,
            href: {
              pathname: "/produits/[slug]",
              params: { slug: product.slug },
            },
          })}`,
          image: [
            product.image
              ? `${SITE_URL}${product.image}`
              : `${SITE_URL}/${locale}/produits/${product.slug}/opengraph-image`,
          ],
          brand: { "@type": "Brand", name: "OBFLO" },
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "EUR",
            availability: product.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "OBFLO",
            item: `${SITE_URL}${getPathname({ locale, href: "/" })}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("backToCollection"),
            item: collectionUrl,
          },
          { "@type": "ListItem", position: 3, name: label },
        ],
      },
    ],
  };

  return (
    <main>
      <div className={`${PAGE} pt-1 pb-12 sm:pt-4 sm:pb-16`}>
        <Crumbs
          items={[
            { label: t("home"), href: "/" },
            { label: t("backToCollection"), href: "/collection" },
            { label },
          ]}
        />
        {/* Même couleur et même produit que la tuile de la famille sur l'accueil (src/lib/tile.ts). */}
        <PageBanner
          tone={categoryTile(category)}
          title={c.h1}
          lead={c.lead}
          image={deco(category)}
        />
        <FamilyPills current={category} className="mt-4 sm:mt-6" />
        <div className="mt-4 sm:mt-6">
          <ProductGrid products={products.map(toCardProduct)} locale={locale} />
        </div>
      </div>

      {packs.length > 0 ? (
        <section className="on-cream-2 py-12 sm:py-16">
          <div className={PAGE}>
            <h2 className={H2}>{t("packsTitle")}</h2>
            <p className="mt-4 text-body">{t("packsText")}</p>
            <div className="mt-6 sm:mt-8">
              <PackRail packs={packs} locale={locale} cols="md:grid-cols-2 lg:grid-cols-3" />
            </div>
          </div>
        </section>
      ) : null}

      <section
        className={`${PAGE} grid gap-x-16 gap-y-12 pb-12 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] ${packs.length > 0 ? "pt-12 sm:pt-16" : ""}`}
      >
        <div>
          <h2 className={H2}>{t("aboutLabel")}</h2>
          <p className="mt-4 max-w-[68ch] text-body">{c.intro}</p>
        </div>
        {guides.length > 0 ? (
          <div>
            <h2 className="text-display">{t("guidesLabel")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {guides.map(({ guide, tone }) => (
                <GuideCard key={guide.id} guide={guide} tone={tone} level={3} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
