import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Avis } from "@/components/avis";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Moments } from "@/components/moments";
import { Packs } from "@/components/packs";
import { Pourquoi } from "@/components/pourquoi";
import { ProductGrid } from "@/components/product-grid";
import { Techno } from "@/components/techno";
import { getFaqItems, getProducts } from "@/data/catalog";
import { getPathname } from "@/i18n/navigation";
import { isLocale, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = (l: Locale) => getPathname({ locale: l, href: "/" });
  return {
    alternates: {
      canonical: path(locale),
      languages: { fr: path("fr"), en: path("en"), "x-default": path("fr") },
    },
  };
}

function buildStructuredData(locale: Locale) {
  const products = getProducts(locale);
  const faqItems = getFaqItems(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OnlineStore",
        name: "OBFLO",
        url: SITE_URL,
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
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <main>
        <Hero />
        <ProductGrid locale={locale} />
        <Moments locale={locale} />
        <Packs locale={locale} />
        <Techno />
        <Pourquoi />
        <Avis locale={locale} />
        <Faq locale={locale} />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildStructuredData(locale)),
        }}
      />
    </>
  );
}
