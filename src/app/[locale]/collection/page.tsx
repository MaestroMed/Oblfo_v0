import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductCard } from "@/components/product-card";
import { CATEGORY_ORDER, getProducts } from "@/data/catalog";
import { getPathname } from "@/i18n/navigation";
import { hreflangAlternates, isLocale, type Locale } from "@/i18n/routing";

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
  };
}

export default async function CollectionPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Collection");
  const tCat = await getTranslations("Categories");
  const products = getProducts(locale);

  const sections = CATEGORY_ORDER.map((category) => ({
    category,
    items: products.filter((p) => p.category === category),
  })).filter((s) => s.items.length > 0);

  return (
    <main className="bg-cream py-16">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="mb-12 flex max-w-[680px] flex-col gap-3">
          <h1 className="font-serif text-[clamp(32px,3.6vw,48px)] font-medium tracking-[-0.01em] text-ink-warm">
            {t("title")}
          </h1>
          <p className="text-[15.5px] leading-relaxed text-muted-warm text-pretty">
            {t("intro")}
          </p>
        </div>
        <div className="flex flex-col gap-14">
          {sections.map((section) => (
            <section key={section.category}>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
                <h2 className="font-serif text-[22px] font-medium text-ink-warm">
                  {tCat(section.category)}
                </h2>
                <span className="h-px flex-1 bg-black/8" />
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
                {section.items.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
