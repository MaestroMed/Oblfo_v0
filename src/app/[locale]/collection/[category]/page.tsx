import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { toCardProduct } from "@/components/product-card";
import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/data/catalog";
import type { Category } from "@/data/catalog-types";
import { getCategoryContent } from "@/data/categories";
import { CATEGORY_SLUGS, categoryFromSlug } from "@/data/category-slugs";
import { getGuides } from "@/data/guides";
import { getPathname, Link } from "@/i18n/navigation";
import { isLocale, ogLocale, routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

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
  const tGuides = await getTranslations("Guides");
  const products = getProducts(locale).filter((p) => p.category === category);
  const guides = getGuides(locale).filter((g) => c.guideIds.includes(g.id));

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
          { "@type": "ListItem", position: 3, name: c.title },
        ],
      },
    ],
  };

  return (
    <main className="bg-cream py-16">
      <div className="mx-auto max-w-[1280px] px-8">
        <nav className="mb-8">
          <Link
            href="/collection"
            className="font-mono text-[10.5px] tracking-[0.16em] text-muted-warm no-underline transition-colors hover:text-accent"
          >
            ← {t("backToCollection")}
          </Link>
        </nav>

        <div className="mb-12 flex max-w-[720px] flex-col gap-4">
          <h1 className="font-serif text-[clamp(36px,4.2vw,56px)] font-medium tracking-[-0.01em] text-ink-warm">
            {c.title}
          </h1>
          <p className="text-[16px] leading-relaxed text-muted-warm text-pretty">
            {c.intro}
          </p>
        </div>

        <ProductGrid
          products={products.map(toCardProduct)}
          locale={locale}
        />

        {guides.length > 0 ? (
          <section className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
              <h2 className="font-serif text-[22px] font-medium text-ink-warm">
                {t("guidesLabel")}
              </h2>
              <span className="h-px flex-1 bg-black/8" />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
              {guides.map((guide) => (
                <Link
                  key={guide.id}
                  href={{
                    pathname: "/guides/[slug]",
                    params: { slug: guide.slug },
                  }}
                  className="flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-white p-6 no-underline shadow-[0_18px_50px_-30px_rgba(36,28,20,0.35)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(36,28,20,0.45)]"
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] text-accent">
                    {tGuides("readTime", { minutes: guide.readMinutes })}
                  </span>
                  <span className="text-[17px] leading-snug font-semibold text-ink-warm">
                    {guide.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
