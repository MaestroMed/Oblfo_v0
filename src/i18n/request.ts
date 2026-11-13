import { getRequestConfig } from "next-intl/server";
import { isLocale, routing } from "./routing";
import { OVERRIDES } from "@/data/overrides";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && isLocale(requested) ? requested : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)).default as Record<string, Record<string, unknown>>;
  // Textes modifiés depuis le back-office : remplacent la valeur du fichier, clé par clé.
  for (const [ns, keys] of Object.entries(OVERRIDES.messages?.[locale] ?? {})) {
    messages[ns] = { ...messages[ns], ...keys };
  }
  return { locale, messages };
});
