"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/components/cart-context";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { PowerGlyph } from "@/components/power-glyph";
import { getProductById } from "@/data/catalog";
import { isGuideLocale } from "@/data/guides";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function SiteHeader() {
  const { count, openDrawer } = useCart();
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const [heated, setHeated] = useState(false);

  const productLink = (id: string, label: string) => {
    const product = getProductById(id, locale);
    if (!product) return null;
    return (
      <Link
        key={id}
        href={{ pathname: "/produits/[slug]", params: { slug: product.slug } }}
        className="text-[13px] font-medium tracking-[0.04em] text-[#C9BEB0] uppercase no-underline transition-colors hover:text-white"
      >
        {label}
      </Link>
    );
  };

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
          {productLink("gants-chauffants", t("hands"))}
          {productLink("chaussons-chauffants", t("feet"))}
          {productLink("mini-chauffe-tasse", t("desk"))}
          {productLink("chauffage-appoint", t("room"))}
          <a
            href={`/${locale}#pack`}
            className="text-[13px] font-medium tracking-[0.04em] text-[#C9BEB0] uppercase no-underline transition-colors hover:text-white"
          >
            {t("packs")}
          </a>
          {isGuideLocale(locale) ? (
            <Link
              href="/guides"
              className="text-[13px] font-medium tracking-[0.04em] text-[#C9BEB0] uppercase no-underline transition-colors hover:text-white"
            >
              {t("guides")}
            </Link>
          ) : null}
        </nav>
        <div className="flex items-center gap-4">
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
