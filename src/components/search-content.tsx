"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { FamilyPills } from "@/components/family-pills";
import { GuideCard, type GuideCardData } from "@/components/guide-card";
import { PAGE, PageBanner } from "@/components/page-banner";
import { ProductCard, type CardProduct } from "@/components/product-card";
import type { Category } from "@/data/catalog-types";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Tile } from "@/lib/tile";

export type SearchIndex = {
  products: CardProduct[];
  /** `text` : ce sur quoi la famille est trouvée (nom, titre, description). */
  families: { category: Category; text: string }[];
  guides: (GuideCardData & { tone: Tile })[];
};

/** Insensible aux accents ET à la casse (« pièce » trouve « piece »). */
function normalize(value: string) {
  // NFD sépare les diacritiques (U+0300 à U+036F), qu'on retire ensuite.
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const GRID = "grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:gap-6";

/**
 * Recherche instantanée côté client : l'index (une trentaine d'entrées) est construit
 * côté serveur et arrive en props. Requête vide = tout le contenu, rendu en SSR :
 * la page reste indexable.
 */
export function SearchContent({ products, families, guides }: SearchIndex) {
  const t = useTranslations("SearchPage");
  const tPage = useTranslations("CategoryPage");
  const locale = useLocale() as Locale;
  const [query, setQuery] = useState("");

  const q = normalize(query.trim());
  const match = (text: string) => !q || normalize(text).includes(q);
  const foundProducts = products.filter((p) => match(`${p.name} ${p.tagline}`));
  const foundFamilies = families.filter((f) => match(f.text)).map((f) => f.category);
  const foundGuides = guides.filter((g) => match(`${g.title} ${g.metaDescription}`));
  const count = foundProducts.length + foundFamilies.length + foundGuides.length;

  return (
    <main className={`${PAGE} pt-4 pb-12 sm:pt-6 sm:pb-16`}>
      <PageBanner tone="sable" title={t("title")} lead={t("intro")}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("placeholder")}
          aria-label={t("title")}
          autoFocus
          className="field mt-6 min-h-14 max-w-[560px]"
        />
      </PageBanner>

      <p
        aria-live="polite"
        className={`mt-6 font-display sm:mt-8 ${count > 0 ? "text-body font-semibold" : "text-display font-bold wrap-anywhere"}`}
      >
        {count > 0 ? t("count", { count }) : t("noResultsTitle", { query: query.trim() })}
      </p>

      {count === 0 ? (
        <div className="mt-4 flex flex-col items-start gap-4">
          <p className="text-body">{t("noResults")}</p>
          <FamilyPills className="self-stretch" />
          <Link href="/collection" className="btn">
            {tPage("backToCollection")}
          </Link>
        </div>
      ) : null}

      {foundProducts.length > 0 ? (
        <section className="mt-8 sm:mt-12">
          <h2 className="mb-4 text-display sm:mb-6">{t("groupProducts")}</h2>
          <div className={GRID}>
            {foundProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      {foundFamilies.length > 0 ? (
        <section className="mt-12 sm:mt-16">
          <h2 className="mb-2 text-display sm:mb-4">{t("groupCategories")}</h2>
          <FamilyPills only={foundFamilies} />
        </section>
      ) : null}

      {foundGuides.length > 0 ? (
        <section className="mt-12 sm:mt-16">
          <h2 className="mb-4 text-display sm:mb-6">{t("groupGuides")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {foundGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} tone={guide.tone} level={3} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
