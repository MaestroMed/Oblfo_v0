import { useTranslations } from "next-intl";
import { ImageSlot } from "@/components/image-slot";
import { SectionHeading } from "@/components/section-heading";
import { getMoments } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";

export function Moments({ locale }: { locale: Locale }) {
  const t = useTranslations("Moments");
  const moments = getMoments(locale);

  return (
    <section
      id="moments"
      className="scroll-mt-20 border-y border-white/5 bg-night-2 py-[110px]"
    >
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHeading
          index="02"
          label={t("label")}
          title={t("title")}
          description={t("description")}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(380px,1fr))] gap-5">
          {moments.map((moment) => (
            <div
              key={moment.kicker}
              className="relative aspect-16/10 overflow-hidden rounded-[18px] border border-white/7 bg-media"
            >
              <ImageSlot label={moment.imageLabel} />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0)_42%,rgba(8,10,14,0.9))]" />
              <div className="pointer-events-none absolute right-6 bottom-[22px] left-6 flex flex-col gap-2">
                <div className="font-mono text-[10.5px] tracking-[0.22em] text-accent">
                  {moment.kicker}
                </div>
                <div className="text-[22px] font-semibold tracking-[-0.01em] text-ink">
                  {moment.title}
                </div>
                <div className="font-mono text-[11px] tracking-[0.1em] text-[#93A2B1]">
                  {moment.productLine}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
