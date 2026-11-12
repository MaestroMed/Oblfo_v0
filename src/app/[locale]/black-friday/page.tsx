import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PackFeature } from "@/components/home/pack-feature";
import { H2, PAGE, PageBanner } from "@/components/page-banner";
import { ProductCard } from "@/components/product-card";
import { getListedProducts } from "@/data/catalog";
import { getPathname, Link } from "@/i18n/navigation";
import { hreflangAlternates, pageOpenGraph, isLocale, type Locale } from "@/i18n/routing";
import { freeShippingPromoPhase } from "@/lib/shipping";

type Props = { params: Promise<{ locale: string }> };

// Idées cadeaux, dans l'ordre voulu ; un article indisponible ou sans photo est ignoré.
const GIFT_IDS = [
  "semelles-chauffantes",
  "gants-chauffants",
  "chaussons-chauffants",
  "plaid-chauffant",
  "chauffe-mains",
  "bonnet-chauffant",
  "chaussettes-chauffantes",
  "gilet-chauffant",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "BlackFriday" });
  const path = (l: Locale) => getPathname({ locale: l, href: "/black-friday" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: hreflangAlternates(path, locale),
    openGraph: pageOpenGraph(locale, path(locale)),
  };
}

export default async function BlackFridayPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("BlackFriday");
  const tHome = await getTranslations("HomeV2");

  // Trois états selon la date du rendu ; le layout régénère la page chaque heure.
  const phase = freeShippingPromoPhase(new Date());
  const after = phase === "after";
  const lead = t(({ before: "leadBefore", during: "leadDuring", after: "leadAfter" } as const)[phase]);

  const listed = getListedProducts(locale);
  const gifts = GIFT_IDS.flatMap((id) => listed.filter((p) => p.id === id && p.available));

  return (
    <main className="pt-4 sm:pt-6">
      <div className={`${PAGE} pb-14 sm:pb-24`}>
        <PageBanner tone="miel" waves title={t("title")} lead={lead}>
          {after ? (
            <Link href="/collection" className="btn btn-braise btn-lg mt-6">
              {tHome("heroCtaPrimary")}
            </Link>
          ) : null}
        </PageBanner>
        <p className="mt-6 max-w-[68ch] text-[17px] leading-[1.7] sm:mt-10">
          {t(after ? "deliveryAfter" : "delivery")}
        </p>
        <section className="mt-10 sm:mt-16">
          <h2 className={`${H2} mb-6 sm:mb-10`}>{t("giftsTitle")}</h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {gifts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </section>
      </div>
      <PackFeature locale={locale} />
    </main>
  );
}
