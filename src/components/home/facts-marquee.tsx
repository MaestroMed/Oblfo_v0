import { getTranslations } from "next-intl/server";
import { Marquee } from "@/components/ui/marquee";
import type { Locale } from "@/i18n/routing";

// Des faits vérifiables, pas des avis : la boutique n'a pas encore d'avis réels.
const keys = ["fact1", "fact2", "fact3", "fact4", "fact5", "fact6"] as const;

export async function FactsMarquee({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Ux" });
  return (
    <Marquee
      items={keys.map((k) => t(k))}
      className="border-y border-white/8 bg-espresso-2 py-4 font-mono text-[12px] tracking-[0.16em] text-[#D9CBB8] uppercase"
    />
  );
}
