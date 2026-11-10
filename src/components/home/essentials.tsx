import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function Essentials({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");
  const products = getProducts(locale);

  return (
    <section id="essentiels" className="scroll-mt-24 pb-14 sm:pb-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 sm:mb-12">
          <h2 className="text-[clamp(30px,6vw,52px)]">{t("essentialsTitle")}</h2>
          <Link
            href="/collection"
            className="link inline-flex min-h-11 items-center text-[17px] font-semibold"
          >
            {t("essentialsSeeAll")}
          </Link>
        </div>
        {/* Mobile : cartes en large, une par ligne, comme sur la maquette. */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} wide />
          ))}
        </div>
      </div>
    </section>
  );
}
