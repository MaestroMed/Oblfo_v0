import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/product-card";
import { getListedProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function Essentials({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");
  // Les semelles d'abord : c'est la recherche Google où le site ressort le plus (Search Console, 11/2026).
  const lead = "semelles-chauffantes";
  const products = getListedProducts(locale).sort((a, b) => Number(b.id === lead) - Number(a.id === lead));

  return (
    <section id="essentiels" className="anchor-below-header pb-12 sm:pb-16">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="reveal mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-1 sm:mb-8">
          <h2 className="text-display">{t("essentialsTitle")}</h2>
          <Link
            href="/collection"
            className="link inline-flex min-h-12 items-center text-body font-semibold"
          >
            {t("essentialsSeeAll")}
          </Link>
        </div>
        <div className="reveal-kids grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
