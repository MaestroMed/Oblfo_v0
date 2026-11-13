import { basePackSources } from "@/data/catalog-packs";
import type { Locale } from "@/i18n/routing";
import de from "../../../messages/de.json";
import en from "../../../messages/en.json";
import es from "../../../messages/es.json";
import fr from "../../../messages/fr.json";

export const OVERRIDES_PATH = "obflo/overrides.json";

/** Textes du site modifiables depuis le back-office : [espace de noms, clé]. */
export const EDITABLE_MESSAGES = [
  ["HomeV2", "heroKicker"],
  ["HomeV2", "heroHeadline"],
  ["HomeV2", "heroLead"],
  ["Announcement", "msg1"],
  ["Announcement", "msg2"],
  ["Announcement", "msg3"],
] as const;

const ALL = { fr, en, de, es } as unknown as Record<Locale, Record<string, Record<string, string>>>;
export const baseMessages = (locale: Locale) => ALL[locale];

export const rawPack = (id: string) => basePackSources.find((p) => p.id === id)!;
