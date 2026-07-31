import Image from "next/image";
import { useTranslations } from "next-intl";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatPrice, getPacks } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";

const featureKeys = [
  ["packFeat1Title", "packFeat1Text"],
  ["packFeat2Title", "packFeat2Text"],
  ["packFeat3Title", "packFeat3Text"],
  ["packFeat4Title", "packFeat4Text"],
] as const;

export function PackFeature({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");
  const pack = getPacks(locale).find((p) => p.id === "pack-full-obflo");
  if (!pack) return null;

  return (
    <section id="pack" className="scroll-mt-24 bg-cream pb-20">
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="relative flex flex-wrap items-stretch overflow-hidden rounded-[24px] bg-espresso-2 shadow-[0_40px_90px_-40px_rgba(22,17,12,0.8)]">
          <div className="relative min-h-[300px] flex-[1_1_380px]">
            <Image
              src="/images/home/pack.jpg"
              alt={pack.name}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,24,18,0)_55%,#201812_100%)] max-md:bg-[linear-gradient(180deg,rgba(32,24,18,0)_55%,#201812_100%)]" />
            <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 font-mono text-[10px] tracking-[0.18em] text-[#EDE4D7] backdrop-blur-sm">
              {t("packKicker")}
            </span>
          </div>
          <div className="flex flex-[1_1_420px] flex-col justify-center gap-6 p-9 md:p-12">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-[clamp(30px,3.2vw,42px)] font-medium tracking-[-0.01em] text-[#F5EFE6]">
                {t("packTitle")}
              </h2>
              <p className="text-[15px] text-[#B7AA99]">{t("packSubtitle")}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-white/8 py-5 sm:grid-cols-4">
              {featureKeys.map(([titleKey, textKey]) => (
                <div key={titleKey} className="flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#EDE4D7]">
                    <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
                    {t(titleKey)}
                  </span>
                  <span className="text-[11.5px] leading-snug text-[#8F8171]">
                    {t(textKey)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[38px] font-medium text-[#F5EFE6]">
                    {formatPrice(pack.price, locale)}
                  </span>
                  <span className="text-[17px] text-[#8F8171] line-through">
                    {formatPrice(pack.compareAt, locale)}
                  </span>
                </div>
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-accent">
                  ◆ {t("packSave", { amount: formatPrice(pack.compareAt - pack.price, locale) })}
                </span>
              </div>
              <AddToCartButton
                id={pack.id}
                name={pack.name}
                price={pack.price}
                className="cursor-pointer rounded-lg bg-accent px-7 py-[15px] text-[15px] font-semibold text-[#14100C] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(240,123,46,0.6)]"
              >
                {t("packCta")}
              </AddToCartButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
