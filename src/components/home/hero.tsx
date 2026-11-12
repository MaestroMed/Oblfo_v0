import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { deco } from "@/lib/tile";

// Page crème : un titre, une phrase, deux boutons, et la photo d'ambiance dans un cadre arrondi.
export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");

  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] items-center gap-7 px-4 pt-8 sm:px-8 sm:pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 lg:pt-14">
        <div className="flex flex-col items-start gap-4 sm:gap-6">
          <h1 className="text-[clamp(40px,10.5vw,76px)] leading-none">{t("heroHeadline")}</h1>
          <p className="max-w-[44ch] text-[18px] leading-relaxed sm:text-[20px]">{t("heroLead")}</p>
          <div className="mt-1 flex flex-wrap gap-3">
            <Link href="/collection" className="btn btn-braise btn-lg no-underline">
              {t("heroCtaPrimary")}
            </Link>
            <a href={`/${locale}#pack`} className="btn btn-outline btn-lg no-underline">
              {t("heroCtaSecondary")}
            </a>
          </div>
        </div>
        <div className="tile on-cream-2 aspect-[3/2] lg:aspect-[4/3]">
          <Image
            src={deco("hero")}
            alt={t("heroImageAlt")}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 620px, calc(100vw - 32px)"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
