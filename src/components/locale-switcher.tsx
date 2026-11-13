"use client";

import { useLocale } from "next-intl";
import { usePathname as useRawPathname } from "next/navigation";
import { translateProductSlug } from "@/data/catalog";
import { translateCategorySlug } from "@/data/category-slugs";
import { translateGuideSlug } from "@/data/guides-slugs";
import { routing, type Locale } from "@/i18n/routing";

type PathnameValue = string | Record<Locale, string>;

function externalPattern(value: PathnameValue, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}

/**
 * Reconstruit l'URL courante dans l'autre locale à partir de la config de
 * routage (chemins localisés + slugs produits localisés). Fallback : accueil.
 */
function alternateHref(rawPathname: string, from: Locale, to: Locale): string {
  const stripped = rawPathname.replace(new RegExp(`^/${from}(?=/|$)`), "") || "/";

  for (const [internal, value] of Object.entries(routing.pathnames)) {
    const fromPattern = externalPattern(value as PathnameValue, from);
    const toPattern = externalPattern(value as PathnameValue, to);
    const regex = new RegExp(
      `^${fromPattern.replace(/\[([^\]]+)\]/g, "([^/]+)")}$`,
    );
    const match = stripped.match(regex);
    if (!match) continue;

    let param = match[1];
    if (param && internal === "/produits/[slug]") {
      param = translateProductSlug(param, from, to) ?? param;
    }
    if (param && internal === "/guides/[slug]") {
      const translated = translateGuideSlug(param, from, to);
      // Guide indisponible dans la locale cible → accueil.
      if (!translated) return `/${to}`;
      param = translated;
    }
    if (param && internal === "/collection/[category]") {
      param = translateCategorySlug(param, from, to) ?? param;
    }
    const target = param
      ? toPattern.replace(/\[([^\]]+)\]/g, param)
      : toPattern;
    return `/${to}${target === "/" ? "" : target}`;
  }

  return `/${to}`;
}

export function LocaleSwitcher({ label }: { label?: string }) {
  const locale = useLocale() as Locale;
  const rawPathname = useRawPathname();

  return (
    <nav aria-label={label} className="flex items-center gap-1 font-display text-[16px] font-semibold">
      {routing.locales.map((l) =>
        l === locale ? (
          <span
            key={l}
            aria-current="true"
            className="flex h-12 min-w-12 items-center justify-center rounded-full bg-moutarde px-3 text-choco"
          >
            {l.toUpperCase()}
          </span>
        ) : (
          <a
            key={l}
            href={alternateHref(rawPathname, locale, l)}
            hrefLang={l}
            className="flex h-12 min-w-12 items-center justify-center rounded-full px-3 no-underline hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            {l.toUpperCase()}
          </a>
        ),
      )}
    </nav>
  );
}
