import { useTranslations } from "next-intl";
import { SectionKicker } from "@/components/section-heading";

export function Pourquoi() {
  const t = useTranslations("Pourquoi");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section id="pourquoi" className="scroll-mt-20 bg-night py-24">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="mb-11">
          <SectionKicker index="05" label={t("label")} />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-0 gap-y-7">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-2.5 border-l border-white/8 px-6 py-1.5"
            >
              <span className="mb-1.5 h-[9px] w-[9px] rotate-45 bg-accent shadow-[0_0_14px_rgba(255,106,43,0.8)]" />
              <div className="text-base font-semibold text-ink">{item.title}</div>
              <p className="text-[13.5px] leading-[1.55] text-[#8595A5]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
