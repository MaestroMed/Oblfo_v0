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
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <label className="flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.14em] text-muted-warm uppercase">
          {t("sortLabel")}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="cursor-pointer rounded-lg border border-black/12 bg-white px-3 py-2 font-sans text-[13px] normal-case tracking-normal text-ink-warm outline-none focus:border-accent/70"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex cursor-pointer items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-muted-warm uppercase">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 cursor-pointer accent-[#F07B2E]"
          />
          {t("inStockOnly")}
        </label>
        <span
          aria-live="polite"
          className="ml-auto font-mono text-[10.5px] tracking-[0.14em] text-muted-warm uppercase"
        >
          {t("count", { count: visible.length })}
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} locale={locale} />
        ))}
      </div>
    </div>
  );
}
