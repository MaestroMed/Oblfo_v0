"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/components/cart-context";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { PowerGlyph } from "@/components/power-glyph";
import type { Category } from "@/data/catalog-types";
import { CATEGORY_SLUGS } from "@/data/category-slugs";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function SiteHeader() {
  const { count, openDrawer } = useCart();
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const [heated, setHeated] = useState(false);

  const categoryLink = (category: Category, label: string) => (
    <Link
      key={category}
      href={{
        pathname: "/collection/[category]",
        params: { category: CATEGORY_SLUGS[category][locale] },
      }}
      className="text-[13px] font-medium tracking-[0.04em] text-[#C9BEB0] uppercase no-underline transition-colors hover:text-white"
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-[60] border-b border-white/[0.06] bg-[rgba(18,13,9,0.9)] backdrop-blur-[14px]">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-6 px-8">
        <span
          className="logo-power flex items-baseline font-serif text-[26px] leading-none font-semibold tracking-[0.05em] text-[#F5EFE6]"
          data-on={heated}
        >
          <a href={`/${locale}`} className="text-current no-underline">
            OBFL
          </a>
          {/* Le O final = bouton power : froid par défaut, chauffe au clic.
              Bas du glyphe = baseline, hauteur calée sur les capitales. */}
          <button
            type="button"
            onClick={() => setHeated((h) => !h)}
            aria-pressed={heated}
            aria-label="OBFLO ON/OFF"
            className="inline-block cursor-pointer text-current"
          >
            <PowerGlyph className="h-[0.72em] w-[0.74em]" />
          </button>
        </span>
        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="/collection"
            className="text-[13px] font-medium tracking-[0.04em] text-[#C9BEB0] uppercase no-underline transition-colors hover:text-white"
          >
            {t("news")}
          </Link>
          {categoryLink("mains", t("hands"))}
          {categoryLink("pieds", t("feet"))}
          {categoryLink("bureau", t("desk"))}
          {categoryLink("piece", t("room"))}
          <a
            href={`/${locale}#pack`}
            className="text-[13px] font-medium tracking-[0.04em] text-[#C9BEB0] uppercase no-underline transition-colors hover:text-white"
          >
            {t("packs")}
          </a>
          <Link
            href="/guides"
            className="text-[13px] font-medium tracking-[0.04em] text-[#C9BEB0] uppercase no-underline transition-colors hover:text-white"
          >
            {t("guides")}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/recherche"
            aria-label={t("search")}
            title={t("search")}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#C9BEB0] no-underline transition-colors hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[17px] w-[17px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <line x1="15.4" y1="15.4" x2="21" y2="21" />
            </svg>
          </Link>
          <LocaleSwitcher />
          <button
            type="button"
            onClick={openDrawer}
            className="flex cursor-pointer items-center gap-2.5 rounded-full border border-white/14 bg-white/[0.05] px-4 py-[9px] font-mono text-[11.5px] tracking-[0.12em] text-[#F5EFE6] transition-colors hover:border-accent/70"
          >
            {t("cart")}
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-[5px] font-medium text-[#14100C]">
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
