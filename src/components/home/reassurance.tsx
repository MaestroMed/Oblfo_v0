import { useTranslations } from "next-intl";

const items = [
  ["reassur1Title", "reassur1Text"],
  ["reassur2Title", "reassur2Text"],
  ["reassur3Title", "reassur3Text"],
  ["reassur4Title", "reassur4Text"],
  ["reassur5Title", "reassur5Text"],
  ["reassur6Title", "reassur6Text"],
] as const;

export function Reassurance() {
  const t = useTranslations("HomeV2");

  return (
    <section className="border-y border-black/[0.06] bg-cream-2 py-10">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-x-6 gap-y-7 px-8 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(([titleKey, textKey]) => (
          <div key={titleKey} className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-[13.5px] font-semibold text-ink-warm">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-accent/40 text-accent">
                <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
              </span>
              {t(titleKey)}
            </span>
            <span className="pl-8 text-[12px] leading-snug text-muted-warm">
              {t(textKey)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
