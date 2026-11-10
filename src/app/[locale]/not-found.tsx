"use client";

import { useTranslations } from "next-intl";
import { HeatWaves } from "@/components/ui/heat-waves";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="on-braise flex min-h-[70vh] flex-col items-center justify-center px-4 py-14 text-center sm:px-8 sm:py-24">
      <HeatWaves className="h-14 w-14 sm:h-20 sm:w-20" />
      <p className="chip chip-cream mt-6">{t("kicker")}</p>
      <h1 className="display mt-4 max-w-[1100px] text-[clamp(44px,12vw,104px)] wrap-anywhere uppercase hyphens-auto">
        {t("titleLine1")} {t("titleLine2")}
      </h1>
      {/* Crème sur braise : gras et 19 px au moins. */}
      <p className="mt-5 max-w-[520px] text-[19px] leading-[1.4] font-bold">{t("text")}</p>
      <div className="mt-8 flex w-full max-w-[520px] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
        <Link href="/" className="btn btn-cream btn-lg">
          {t("cta")}
        </Link>
        <Link href="/collection" className="btn btn-outline btn-lg">
          {t("ctaCollection")}
        </Link>
      </div>
    </main>
  );
}
