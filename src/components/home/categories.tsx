import Image from "next/image";
import { useTranslations } from "next-intl";
import { HeatWaves } from "@/components/ui/heat-waves";
import { CATEGORY_ORDER, getProducts } from "@/data/catalog";
import { CATEGORY_SLUGS } from "@/data/category-slugs";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { CATEGORY_HERO, TILE_CLASS, categoryTile } from "@/lib/tile";

// Une tuile par famille : sa couleur et son produit viennent de `src/lib/tile.ts`.
export function Categories({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");
  const tCat = useTranslations("Categories");
  const products = getProducts(locale);
  const categories = CATEGORY_ORDER.filter((c) => products.some((p) => p.category === c));

  return (
    <section className="py-14 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <h2 className="mb-8 text-[clamp(30px,6vw,52px)] sm:mb-12">{t("categoriesTitle")}</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {categories.map((category) => {
            const cutout = products.find((p) => p.id === CATEGORY_HERO[category])?.cutout;
            return (
              <li key={category}>
                <Link
                  href={{
                    pathname: "/collection/[category]",
                    params: { category: CATEGORY_SLUGS[category][locale] },
                  }}
                  className={`tile group flex h-full flex-col no-underline ${TILE_CLASS[categoryTile(category)]}`}
                >
                  <span className="relative block aspect-[4/3]">
                    {cutout ? (
                      <Image
                        src={cutout}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 190px, (min-width: 640px) 33vw, 50vw"
                        className="cutout p-3 transition-transform duration-300 group-hover:scale-105 sm:p-4"
                      />
                    ) : null}
                    {category === "piece" ? (
                      <HeatWaves className="absolute top-2 right-2 h-8 w-8" />
                    ) : null}
                  </span>
                  <span className="px-3 pt-1 pb-3 font-display text-[20px] leading-[1.05] font-bold [overflow-wrap:anywhere] hyphens-auto sm:px-4 sm:pb-4 sm:text-[24px]">
                    {tCat(category)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
