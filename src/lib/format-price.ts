import type { Locale } from "@/i18n/routing";

/** Prix affiché : sans dépendance au catalogue, pour rester léger dans le JavaScript du navigateur. */
export function formatPrice(value: number, locale: Locale): string {
  const formatted = Number.isInteger(value)
    ? String(value)
    : value.toFixed(2).replace(".", locale === "en" ? "." : ",");
  return locale === "en" ? `€${formatted}` : `${formatted} €`;
}
