"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ProductCard, type CardProduct } from "@/components/product-card";
import type { Locale } from "@/i18n/routing";

type SortKey = "featured" | "priceAsc" | "priceDesc" | "newest";

/**
 * Grille produits triable/filtrable (pages catégorie). La liste complète est
 * rendue en SSR dans l'ordre éditorial — le tri/filtre ne fait que réordonner
 * côté client, le SEO ne voit jamais une grille vide.
 */
export function ProductGrid({
  products,
  locale,
}: {
  products: CardProduct[];
  locale: Locale;
}) {
  const t = useTranslations("Plp");
  const tSearch = useTranslations("SearchPage");
  const [sort, setSort] = useState<SortKey>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);

  const visible = useMemo(() => {
    const list = inStockOnly ? products.filter((p) => p.available) : products;
    switch (sort) {
      case "priceAsc":
        return [...list].sort((a, b) => a.price - b.price);
      case "priceDesc":
        return [...list].sort((a, b) => b.price - a.price);
      case "newest":
        // Tri stable : les nouveautés d'abord, ordre éditorial préservé ensuite.
        return [...list].sort(
          (a, b) => Number(b.badge === "new") - Number(a.badge === "new"),
        );
      default:
        return list;
    }
  }, [products, sort, inStockOnly]);

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "featured", label: t("sortFeatured") },
    { value: "priceAsc", label: t("sortPriceAsc") },
    { value: "priceDesc", label: t("sortPriceDesc") },
    { value: "newest", label: t("sortNewest") },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Les cartes sont des h3 : il leur faut un h2 au-dessus (ordre des titres). */}
      <h2 className="sr-only">{tSearch("groupProducts")}</h2>
      <div className="flex flex-wrap items-center justify-between gap-x-4 border-b-2 border-choco/15 pb-2 font-display text-caption font-semibold">
        <span aria-live="polite">{t("count", { count: visible.length })}</span>
        {/* Trier un seul produit n'a pas de sens ; filtrer le stock non plus si tout est en stock. */}
        {products.length > 1 ? (
          <div className="flex flex-wrap items-center gap-x-4">
            {products.some((p) => !p.available) ? (
              <label className="flex min-h-12 cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="h-5 w-5 cursor-pointer accent-choco"
                />
                {t("inStockOnly")}
              </label>
            ) : null}
            <label className="flex items-center gap-2">
              <span className="max-sm:sr-only">{t("sortLabel")}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label={t("sortLabel")}
                className="field min-h-12 w-auto cursor-pointer py-2 font-sans font-normal"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : (
          <span className="min-h-12" />
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:gap-6">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </div>
  );
}
