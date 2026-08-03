"use client";

import { useLocale } from "next-intl";
import { usePathname as useRawPathname } from "next/navigation";
import { translateProductSlug } from "@/data/catalog";
import { translateGuideSlug } from "@/data/guides";
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
      // Guide indisponible dans la locale cible (de/es) → accueil.
      if (!translated) return `/${to}`;
      param = translated;
    }
    const target = param
      ? toPattern.replace(/\[([^\]]+)\]/g, param)
      : toPattern;
    return `/${to}${target === "/" ? "" : target}`;
  }

  return `/${to}`;
}

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const rawPathname = useRawPathname();

  return (
    <div className="flex items-center gap-1 font-mono text-[10.5px] tracking-[0.14em]">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 ? <span className="text-[#3A4655]">/</span> : null}
          {l === locale ? (
            <span className="text-accent">{l.toUpperCase()}</span>
          ) : (
            <a
              href={alternateHref(rawPathname, locale, l)}
              className="text-[#66788A] no-underline transition-colors hover:text-white"
            >
              {l.toUpperCase()}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
