"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export type SearchEntry = {
  kind: "product" | "guide" | "category";
  title: string;
  subtitle: string;
  /** Chemin localisé complet (préfixe de locale inclus), construit côté serveur. */
  url: string;
  price?: string;
};

/** Insensible aux accents ET à la casse (« pièce » trouve « piece »). */
function normalize(value: string) {
  // NFD sépare les diacritiques (U+0300–U+036F), qu'on retire ensuite.
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/**
 * Recherche instantanée côté client — l'index (≈25 entrées) est construit
 * côté serveur et arrive en props. Requête vide = liste complète, rendue en
 * SSR : la page reste indexable avec tout son contenu.
 */
export function SearchContent({ entries }: { entries: SearchEntry[] }) {
  const t = useTranslations("SearchPage");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return entries;
    return entries.filter((e) =>
      normalize(`${e.title} ${e.subtitle}`).includes(q),
    );
  }, [entries, query]);

  const kindLabel = {
    product: t("kindProduct"),
    guide: t("kindGuide"),
    category: t("kindCategory"),
  } as const;

  return (
    <div className="flex flex-col gap-7">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("placeholder")}
        aria-label={t("placeholder")}
        autoFocus
        className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-5 py-4 text-[16px] text-ink outline-none transition-colors placeholder:text-[#66788A] focus:border-accent/70"
      />
      <p
        aria-live="polite"
        className="font-mono text-[11px] tracking-[0.16em] text-[#8FA1B3] uppercase"
      >
        {t("count", { count: results.length })}
      </p>
      {results.length === 0 ? (
        <p className="text-[15px] leading-relaxed text-[#9AA9B8]">
          {t("noResults")}
        </p>
      ) : (
        <ul className="flex list-none flex-col gap-3 p-0">
          {results.map((e) => (
            <li key={e.url}>
              <Link
                href={e.url}
                className="flex items-baseline justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4 no-underline transition-colors hover:border-accent/50"
              >
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="font-mono text-[9.5px] tracking-[0.18em] text-accent uppercase">
                    {kindLabel[e.kind]}
                  </span>
                  <span className="text-[16px] font-semibold text-ink">
                    {e.title}
                  </span>
                  <span className="truncate text-[13px] text-[#8FA1B3]">
                    {e.subtitle}
                  </span>
                </span>
                {e.price ? (
                  <span className="shrink-0 text-[15px] font-bold text-ink">
                    {e.price}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
