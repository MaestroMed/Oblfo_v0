import Image from "next/image";
import { useTranslations } from "next-intl";
import { HeatWaves } from "@/components/ui/heat-waves";
import { getProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { CATEGORY_HERO } from "@/lib/tile";

// Aplat braise dans la continuité de l'en-tête : un titre, un produit détouré, un bouton.
export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");
  const product = getProducts(locale).find((p) => p.id === CATEGORY_HERO.mains);

  return (
    <section className="on-braise overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] items-center gap-6 px-4 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10 lg:py-20">
        <div className="flex flex-col items-start gap-6 sm:gap-8">
          <h1 className="text-[clamp(44px,12vw,104px)] leading-[0.95] uppercase lg:text-[clamp(64px,7.2vw,104px)]">
            {t("heroHeadline")}
          </h1>
          <Link href="/collection" className="btn btn-lg no-underline">
            {t("heroCtaPrimary")}
          </Link>
        </div>
        {product?.cutout ? (
          <div className="relative ml-auto h-[min(74vw,360px)] w-[min(80%,360px)] lg:h-[500px] lg:w-full">
            <Image
              src={product.cutout}
              alt={t("heroImageAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 480px, 80vw"
              className="cutout"
            />
            <HeatWaves className="absolute top-0 -left-[22%] h-14 w-14 sm:h-20 sm:w-20 lg:-left-[8%] lg:h-24 lg:w-24" />
            <HeatWaves className="absolute right-0 bottom-[8%] hidden h-20 w-20 lg:block" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
