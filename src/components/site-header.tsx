"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCart } from "@/components/cart-context";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ObfloLogo } from "@/components/obflo-logo";
import type { Category } from "@/data/catalog-types";
import { CATEGORY_SLUGS } from "@/data/category-slugs";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const CATEGORIES = Object.keys(CATEGORY_SLUGS) as Category[];
// Le lien Black Friday quitte le menu après Cyber Monday (fin de l'offre le 30/11/2026).
const BLACK_FRIDAY_END = Date.parse("2026-12-01T00:00:00+01:00");

const ICON = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function SiteHeader() {
  const { count, openDrawer } = useCart();
  const t = useTranslations("Nav");
  const tCat = useTranslations("Categories");
  const tFooter = useTranslations("Footer");
  const locale = useLocale() as Locale;
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Menu plein écran : page figée, Échap ferme, Tab reste dans le menu,
  // le focus revient sur le bouton d'ouverture à la fermeture.
  useEffect(() => {
    if (!menuOpen) return;
    const burger = burgerRef.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
      burger?.focus();
    };
  }, [menuOpen]);

  // Menu ordinateur : 4 entrées (brief : 5 au plus). Le menu mobile plein écran garde les familles.
  const navLinks = (cls: string, full = true) => (
    <>
      <Link href="/collection" className={cls} onClick={closeMenu}>
        {t("collection")}
      </Link>
      {full && CATEGORIES.map((category) => (
        <Link
          key={category}
          onClick={closeMenu}
          href={{
            pathname: "/collection/[category]",
            params: { category: CATEGORY_SLUGS[category][locale] },
          }}
          className={cls}
        >
          {tCat(category)}
        </Link>
      ))}
      <a href={`/${locale}#pack`} className={cls} onClick={closeMenu}>
        {t("packs")}
      </a>
      <Link href="/guides" className={cls} onClick={closeMenu}>
        {t("guides")}
      </Link>
      {Date.now() < BLACK_FRIDAY_END ? (
        <Link href="/black-friday" className={cls} onClick={closeMenu}>
          {tFooter("blackFriday")}
        </Link>
      ) : null}
    </>
  );

  const iconButton =
    "relative flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 hover:bg-cream-2";

  const logo = (
    <a
      href={`/${locale}`}
      aria-label="OBFLO"
      onClick={closeMenu}
      className="flex h-12 shrink-0 items-center"
    >
      <ObfloLogo className="h-8 w-auto text-braise sm:h-9" />
    </a>
  );

  return (
    <header className="on-cream sticky top-0 z-[60] border-b border-choco/10">
      <div className="mx-auto flex h-(--header-h) max-w-[1240px] items-center justify-between gap-2 px-4 sm:px-8">
        {logo}
        <nav className="hidden items-center lg:flex">
          {navLinks(
            "flex min-h-12 items-center px-4 font-display text-body font-semibold whitespace-nowrap no-underline decoration-[3px] underline-offset-[6px] hover:underline",
            false,
          )}
        </nav>
        <div className="flex items-center">
          <Link
            href="/recherche"
            aria-label={t("search")}
            title={t("search")}
            className={iconButton}
          >
            <svg {...ICON} className="h-6 w-6">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5L21 21" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={() => {
              // Menu et tiroir ne sont jamais ouverts ensemble.
              closeMenu();
              openDrawer();
            }}
            aria-label={`${t("cart")} (${count})`}
            className={iconButton}
          >
            <svg {...ICON} className="h-6 w-6">
              <path d="M5 8h14l-1 12H6L5 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
            {count > 0 ? (
              <span className="keep-light absolute top-0 right-0 flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-braise px-1 font-display text-caption font-bold text-paper tabular-nums">
                {count}
              </span>
            ) : null}
          </button>
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t("menu")}
            className={`${iconButton} lg:hidden`}
          >
            <svg {...ICON} className="h-7 w-7">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
          className="on-cream fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain lg:hidden"
        >
          <div className="flex h-(--header-h) shrink-0 items-center justify-between px-4 sm:px-8">
            {logo}
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              aria-label={t("closeMenu")}
              className={iconButton}
            >
              <svg {...ICON} className="h-7 w-7">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col px-4 pt-2 pb-6 sm:px-8">
            {navLinks(
              "flex min-h-14 items-center font-display text-display font-semibold no-underline sm:min-h-16",
            )}
          </nav>
          <div className="tile on-choco mx-4 mt-auto mb-4 flex justify-center px-4 py-2 sm:mx-8 sm:mb-8">
            <LocaleSwitcher label={t("language")} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
