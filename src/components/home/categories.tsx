import Image from "next/image";
import { useTranslations } from "next-intl";
import { CATEGORY_ORDER, getListedProducts } from "@/data/catalog";
import { CATEGORY_SLUGS } from "@/data/category-slugs";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { deco } from "@/lib/tile";

// Une tuile par famille : sa photo d'ambiance en plein cadre, le libellé dessous.
export function Categories({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");
  const tCat = useTranslations("Categories");
  const products = getListedProducts(locale);
  const categories = CATEGORY_ORDER.filter((c) => products.some((p) => p.category === c));

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <h2 className="reveal mb-6 text-display sm:mb-8">{t("categoriesTitle")}</h2>
        <ul className="reveal-kids grid grid-cols-3 gap-x-4 gap-y-4 sm:gap-x-4 lg:grid-cols-6">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={{
                  pathname: "/collection/[category]",
                  params: { category: CATEGORY_SLUGS[category][locale] },
                }}
                className="group flex flex-col items-center gap-2 no-underline"
              >
                <span className="tile on-cream-2 block aspect-square w-full">
                  <Image
                    src={deco(category)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 190px, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <span className="text-center font-display text-body font-semibold [overflow-wrap:anywhere] hyphens-auto">
                  {tCat(category)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
