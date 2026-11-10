import { useTranslations } from "next-intl";
import { PackRail } from "@/components/pack-card";
import { SectionHeading } from "@/components/section-heading";
import { getPacks } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";

export function PackFeature({ locale }: { locale: Locale }) {
  const t = useTranslations("Packs");
  const packs = getPacks(locale)
    .filter((p) => p.available)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  if (packs.length === 0) return null;

  return (
    <section id="pack" className="scroll-mt-24 pb-14 sm:pb-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <SectionHeading title={t("title")} description={t("description")} />
        <PackRail packs={packs} locale={locale} cols="md:grid-cols-2" />
      </div>
    </section>
  );
}
