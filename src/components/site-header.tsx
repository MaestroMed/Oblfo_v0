"use client";

import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const linkClass =
    "text-[13px] font-medium tracking-[0.04em] text-[#C9BEB0] uppercase no-underline transition-colors hover:text-white";
  // Panneau mobile : cibles de 48 px de haut.
  const mobileClass =
    "block border-b border-white/[0.06] py-3.5 text-[15px] font-medium tracking-[0.04em] text-[#F5EFE6] uppercase no-underline";

  const navLinks = (cls: string) => (
    <>
      <Link href="/collection" className={cls} onClick={closeMenu}>
        {t("news")}
      </Link>
      {categoryLink("mains", t("hands"), cls)}
      {categoryLink("pieds", t("feet"), cls)}
      {categoryLink("bureau", t("desk"), cls)}
      {categoryLink("piece", t("room"), cls)}
      <a href={`/${locale}#pack`} className={cls} onClick={closeMenu}>
        {t("packs")}
      </a>
      <Link href="/guides" className={cls} onClick={closeMenu}>
        {t("guides")}
      </Link>
    </>
  );

  function categoryLink(category: Category, label: string, cls: string) {
    return (
    <Link
      key={category}
      onClick={closeMenu}
      href={{
        pathname: "/collection/[category]",
        params: { category: CATEGORY_SLUGS[category][locale] },
      }}
      className={cls}
    >
      {label}
    </Link>
    );
  }

  return (
    <header className="sticky top-0 z-[60] border-b border-white/[0.06] bg-[rgba(18,13,9,0.9)] backdrop-blur-[14px]">
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-8">
        <span
          className="logo-power flex items-baseline font-serif text-[26px] leading-none font-semibold tracking-[0.05em] text-[#F5EFE6]"
          data-on={heated}
        >
          <a href={`/${locale}`} className="text-current no-underline">
            OBFL
          </a>
          {/* Le O final = bouton power : froid par défaut, chauffe au clic.
              Bas du glyphe = baseline, hauteur calée sur les capitales.

              La zone tactile est agrandie par padding, annulé par une marge
              négative de même valeur : le glyphe ne bouge pas d'un pixel et
              le mot-symbole garde exactement sa largeur, mais la cible passe
              de 19 × 19 à 25 × 25 — le minimum est de 24. L'agrandissement
              est mis à DROITE, où il n'y a rien : symétrique, il aurait
              chevauché le lien « OBFL » et la règle serait retombée sur
              l'espacement entre cibles voisines. */}
          <button
            type="button"
            onClick={() => setHeated((h) => !h)}
            aria-pressed={heated}
            aria-label="OBFLO ON/OFF"
            className="-my-[3px] -mr-[6px] inline-block cursor-pointer py-[3px] pr-[6px] text-current"
          >
            <PowerGlyph className="h-[0.72em] w-[0.74em]" />
          </button>
        </span>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks(linkClass)}
        </nav>
        <div className="flex items-center gap-1 sm:gap-4">
          <Link
            href="/recherche"
            aria-label={t("search")}
            title={t("search")}
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#C9BEB0] sm:h-8 sm:w-8 no-underline transition-colors hover:text-white"
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
          <div className="hidden lg:block">
            <LocaleSwitcher />
          </div>
          <button
            type="button"
            onClick={() => {
              // Menu et tiroir ne sont jamais ouverts ensemble.
              closeMenu();
              openDrawer();
            }}
            aria-label={t("cart")}
            className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-white/14 bg-white/[0.05] px-3 py-[9px] sm:min-h-0 sm:px-4 font-mono text-[11.5px] tracking-[0.12em] text-[#F5EFE6] transition-colors hover:border-accent/70"
          >
            <span className="hidden sm:inline">{t("cart")}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-[17px] w-[17px] sm:hidden"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-[5px] font-medium text-[#14100C]">
              {count}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            data-state={menuOpen ? "open" : "closed"}
            aria-label={menuOpen ? t("closeMenu") : t("menu")}
            className="flex h-11 w-11 cursor-pointer items-center justify-center text-[#F5EFE6] lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[22px] w-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav
          id="mobile-menu"
          className="max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-white/[0.06] px-5 pb-6 lg:hidden"
        >
          {navLinks(mobileClass)}
          <div className="pt-5 text-[13px] [&_a]:inline-block [&_a]:px-2 [&_a]:py-2.5">
            <LocaleSwitcher />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
