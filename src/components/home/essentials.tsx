import { useTranslations } from "next-intl";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function Essentials({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");
  const products = getProducts(locale);

  return (
    <section id="essentiels" className="scroll-mt-24 bg-cream py-20">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-serif text-[clamp(28px,3vw,38px)] font-medium tracking-[-0.01em] text-ink-warm">
            {t("essentialsTitle")}
          </h2>
          <Link
            href="/collection"
            className="text-[13.5px] font-medium text-muted-warm no-underline transition-colors hover:text-accent"
          >
            {t("essentialsSeeAll")} →
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
