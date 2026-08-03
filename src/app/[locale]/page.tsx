import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Faq } from "@/components/faq";
import { About } from "@/components/home/about";
import { Categories } from "@/components/home/categories";
import { Essentials } from "@/components/home/essentials";
import { Hero } from "@/components/home/hero";
import { NewsletterBand } from "@/components/home/newsletter-band";
import { PackFeature } from "@/components/home/pack-feature";
import { Reassurance } from "@/components/home/reassurance";
import { getFaqItems, getProducts } from "@/data/catalog";
import { getPathname } from "@/i18n/navigation";
import {
  hreflangAlternates,
  isLocale,
  ogLocale,
  type Locale,
} from "@/i18n/routing";
import {
  MERCHANT_RETURN_POLICY,
  OFFER_SHIPPING_DETAILS,
} from "@/lib/shipping";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const path = (l: Locale) => getPathname({ locale: l, href: "/" });
  return {
    alternates: hreflangAlternates(path, locale),
    openGraph: {
      url: path(locale),
      siteName: "OBFLO",
      locale: ogLocale(locale),
      type: "website",
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
          image: [
            product.image
              ? `${SITE_URL}${product.image}`
              : `${SITE_URL}/${locale}/produits/${product.slug}/opengraph-image`,
          ],
          // `brand` était absent ici alors que la fiche produit le déclare :
          // c'était la cause du « aucun identifiant global fourni » sur 8
          // éléments dans le rapport Fiches de marchand.
          brand: { "@type": "Brand", name: "OBFLO" },
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "EUR",
            availability: product.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            hasMerchantReturnPolicy: MERCHANT_RETURN_POLICY,
            shippingDetails: OFFER_SHIPPING_DETAILS,
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
        <Categories />
        <Essentials locale={locale} />
        <PackFeature locale={locale} />
        <Reassurance />
        <About />
        <Faq locale={locale} />
        <NewsletterBand />
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
