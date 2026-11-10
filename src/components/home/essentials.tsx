import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/product-card";
import { getListedProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function Essentials({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");
  const products = getListedProducts(locale);

  return (
    <section id="essentiels" className="scroll-mt-24 pb-14 sm:pb-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-1 sm:mb-10">
          <h2 className="text-[clamp(28px,5vw,44px)]">{t("essentialsTitle")}</h2>
          <Link
            href="/collection"
            className="link inline-flex min-h-11 items-center text-[17px] font-semibold"
          >
            {t("essentialsSeeAll")}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
