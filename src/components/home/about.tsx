import Image from "next/image";
import { useTranslations } from "next-intl";
import { Icon, type IconName } from "@/components/home/icons";
import { deco } from "@/lib/tile";

const lifestyle = [
  { id: "bureau", tone: "on-sable", kickerKey: "lifeDeskKicker", titleKey: "lifeDeskTitle" },
  { id: "maison", tone: "on-miel", kickerKey: "lifeHomeKicker", titleKey: "lifeHomeTitle" },
  { id: "corps", tone: "on-peche", kickerKey: "lifeOutKicker", titleKey: "lifeOutTitle" },
] as const;

const trust = [
  ["trust1Title", "trust1Text", "shield"],
  ["trust2Title", "trust2Text", "returns"],
  ["trust3Title", "trust3Text", "lock"],
] as const satisfies readonly (readonly [string, string, IconName])[];

export function About() {
  const t = useTranslations("HomeV2");

  return (
    <section id="apropos" className="defer scroll-mt-24 py-14 sm:py-24">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div className="reveal flex flex-col gap-5">
          <h2 className="text-[clamp(28px,5vw,44px)] text-balance">{t("aboutTitle")}</h2>
          <p className="max-w-[52ch] text-[17px] leading-relaxed">{t("aboutText")}</p>
          <ul className="mt-2 flex flex-col gap-4">
            {trust.map(([titleKey, textKey, icon]) => (
              <li key={titleKey} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-miel">
                  <Icon name={icon} className="h-6 w-6" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-display text-[19px] leading-tight font-semibold">{t(titleKey)}</span>
                  <span className="text-[16px] leading-snug">{t(textKey)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* La légende dit déjà la scène : les photos restent décoratives. */}
        <ul className="reveal-kids grid gap-3 sm:grid-cols-3 sm:gap-4">
          {lifestyle.map((card) => (
            <li key={card.id} className={`tile ${card.tone} flex items-center sm:flex-col sm:items-stretch`}>
              <span className="relative block aspect-square w-2/5 shrink-0 self-stretch bg-paper/50 sm:aspect-[4/5] sm:w-auto">
                <Image
                  src={deco(card.id)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 40vw"
                  className="object-cover"
                />
              </span>
              <span className="flex min-w-0 flex-col gap-1.5 p-4 sm:pb-6">
                <span className="font-display text-[20px] leading-tight font-semibold">{t(card.kickerKey)}</span>
                <span className="text-[16px] leading-snug">{t(card.titleKey)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
