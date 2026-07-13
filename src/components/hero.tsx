import { useTranslations } from "next-intl";
import { ImageSlot } from "@/components/image-slot";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#0B1119_0%,#0A0C10_70%)]">
      <div className="glow-cold pointer-events-none absolute -top-[180px] -left-40 h-[640px] w-[900px]" />
      <div className="glow-warm pointer-events-none absolute -top-[60px] -right-[220px] h-[820px] w-[1000px]" />
      <div className="relative mx-auto grid min-h-[82vh] max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(420px,1fr))] items-center gap-16 px-8 pt-20 pb-[110px]">
        <div className="flex flex-col gap-[26px]">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] text-[#8FA1B3]">
            <span className="h-2 w-2 rotate-45 bg-accent shadow-[0_0_14px_rgba(255,106,43,0.9)]" />
            {t("kicker")}
          </div>
          <h1 className="text-[clamp(54px,6.2vw,92px)] font-bold leading-[0.98] tracking-[-0.03em] text-ink">
            {t("titleLine1")}
            <br />
            <span className="text-accent">{t("titleLine2")}</span>
          </h1>
          <p className="max-w-[480px] text-[17.5px] leading-relaxed text-[#9AA9B8] text-pretty">
            {t("subtitle")}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-3.5">
            <a
              href="#gamme"
              className="rounded-xl bg-accent px-[26px] py-[15px] text-[15px] font-semibold text-[#14100C] no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(255,106,43,0.6)]"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#packs"
              className="rounded-xl border border-white/16 px-[26px] py-[15px] text-[15px] font-medium text-[#DCE4EC] no-underline transition-colors hover:border-accent/70 hover:text-white"
            >
              {t("ctaSecondary")}
            </a>
          </div>
          <div className="mt-2.5 font-mono text-[11px] tracking-[0.16em] text-[#66788A]">
            {t("reassurance")}
          </div>
        </div>
        <div className="relative aspect-[4/4.6] max-h-[640px] overflow-hidden rounded-[22px] border border-white/9 bg-media">
          <ImageSlot label="PHOTO HERO — gant chauffant porté, fond sombre, lueur orange" />
          <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 rounded-lg border border-white/10 bg-[rgba(8,10,14,0.72)] px-[11px] py-[7px] font-mono text-[10.5px] tracking-[0.16em] text-[#C4D2DE] backdrop-blur-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(255,106,43,1)]" />
            {t("thermalLive")}
          </div>
          <div className="pointer-events-none absolute right-4 bottom-4 rounded-lg border border-accent/40 bg-[rgba(8,10,14,0.72)] px-3 py-2 font-mono text-[15px] text-accent backdrop-blur-lg">
            +41,7°C
          </div>
          <div className="pointer-events-none absolute top-2.5 right-2.5 h-3.5 w-3.5 border-t-2 border-r-2 border-accent/80" />
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b-2 border-l-2 border-accent/80" />
        </div>
      </div>
    </section>
  );
}
