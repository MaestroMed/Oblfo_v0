"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Category } from "@/data/catalog-types";
import { CATEGORY_SLUGS } from "@/data/category-slugs";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

// Même ordre que CATEGORY_ORDER, sans tirer le catalogue dans le bundle client.
const FAMILIES = Object.keys(CATEGORY_SLUGS) as Category[];

const pill =
  "flex min-h-11 shrink-0 items-center rounded-full px-5 font-display text-[16px] font-semibold transition-colors duration-150";
const idle = `${pill} bg-cream-2 text-choco hover:bg-moutarde`;
const active = `${pill} bg-choco text-cream`;

/**
 * Familles en pilules : défilement horizontal en mobile, retour à la ligne dès 640 px.
 * `current` ajoute la pilule « Tout » et marque la page courante ; `only` restreint la liste.
 */
export function FamilyPills({
  current,
  only,
  className = "",
}: {
  current?: Category | "all";
  only?: Category[];
  className?: string;
}) {
  const t = useTranslations("CategoryPage");
  const tCat = useTranslations("Categories");
  const locale = useLocale() as Locale;
  const ref = useRef<HTMLElement>(null);

  // Amène la pilule courante dans le champ sans faire défiler la page (scrollIntoView la ferait sauter).
  useEffect(() => {
    const nav = ref.current;
    const el = nav?.querySelector<HTMLElement>("[aria-current]");
    if (nav && el) nav.scrollLeft = el.offsetLeft - 16;
  }, [current]);

  return (
    <nav
      ref={ref}
      aria-label={t("otherCategories")}
      className={`relative -mx-4 flex gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {current ? (
        <Link
          href="/collection"
          aria-current={current === "all" ? "page" : undefined}
          className={current === "all" ? active : idle}
        >
          {t("all")}
        </Link>
      ) : null}
      {FAMILIES.filter((c) => !only || only.includes(c)).map((c) => (
        <Link
          key={c}
          href={{ pathname: "/collection/[category]", params: { category: CATEGORY_SLUGS[c][locale] } }}
          aria-current={c === current ? "page" : undefined}
          className={c === current ? active : idle}
        >
          {tCat(c)}
        </Link>
      ))}
    </nav>
  );
}
