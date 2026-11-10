import { useTranslations } from "next-intl";
import { Icon, type IconName } from "@/components/home/icons";

const items = [
  ["reassur1Title", "reassur1Text", "flame"],
  ["reassur2Title", "reassur2Text", "levels"],
  ["reassur3Title", "reassur3Text", "heart"],
  ["reassur4Title", "reassur4Text", "lock"],
  ["reassur5Title", "reassur5Text", "truck"],
  ["reassur6Title", "reassur6Text", "returns"],
] as const satisfies readonly (readonly [string, string, IconName])[];

export function Reassurance() {
  const t = useTranslations("HomeV2");

  return (
    <section className="on-cream-2 py-14 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <h2 className="mb-8 text-[clamp(30px,6vw,52px)] sm:mb-12">{t("reassuranceTitle")}</h2>
        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {items.map(([titleKey, textKey, icon]) => (
            <li key={titleKey} className="tile on-paper flex items-center gap-4 p-4 sm:p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-moutarde">
                <Icon name={icon} className="h-6 w-6" />
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="text-[20px] leading-tight">{t(titleKey)}</h3>
                <p className="text-[16px] leading-snug">{t(textKey)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
