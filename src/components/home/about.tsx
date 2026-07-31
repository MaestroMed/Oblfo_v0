import Image from "next/image";
import { useTranslations } from "next-intl";

const lifestyle = [
  {
    image: "/images/home/life-bureau.jpg",
    kickerKey: "lifeDeskKicker",
    titleKey: "lifeDeskTitle",
  },
  {
    image: "/images/home/life-maison.jpg",
    kickerKey: "lifeHomeKicker",
    titleKey: "lifeHomeTitle",
  },
  {
    image: "/images/home/life-exterieur.jpg",
    kickerKey: "lifeOutKicker",
    titleKey: "lifeOutTitle",
  },
] as const;

const trust = [
  ["trust1Title", "trust1Text"],
  ["trust2Title", "trust2Text"],
  ["trust3Title", "trust3Text"],
] as const;

export function About() {
  const t = useTranslations("HomeV2");

  return (
    <section id="apropos" className="scroll-mt-24 bg-cream py-20">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-start gap-12 px-8">
        <div className="flex min-w-[300px] flex-[1_1_340px] flex-col gap-6">
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] leading-[1.12] font-medium tracking-[-0.01em] text-ink-warm text-pretty">
            {t("aboutTitle")}
          </h2>
          <p className="max-w-[440px] text-[15px] leading-relaxed text-muted-warm text-pretty">
            {t("aboutText")}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-10 gap-y-5">
            {trust.map(([titleKey, textKey]) => (
              <div key={titleKey} className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-[14.5px] font-bold text-ink-warm">
                  <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
                  {t(titleKey)}
                </span>
                <span className="text-[12px] text-muted-warm">
                  {t(textKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid min-w-[300px] flex-[1_1_560px] grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4">
          {lifestyle.map((card) => (
            <div
              key={card.kickerKey}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-espresso-2"
            >
              <Image
                src={card.image}
                alt={t(card.titleKey)}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,8,0)_45%,rgba(16,12,8,0.9)_100%)]" />
              <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#F5EFE6]">
                  {t(card.kickerKey)}
                </span>
                <span className="text-[11.5px] leading-snug text-[#C9BEB0]">
                  {t(card.titleKey)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
