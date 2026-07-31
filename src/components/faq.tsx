import { useTranslations } from "next-intl";
import { getFaqItems } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";

export function Faq({ locale }: { locale: Locale }) {
  const t = useTranslations("Faq");
  const faqItems = getFaqItems(locale);

  return (
    <section id="faq" className="scroll-mt-24 bg-cream py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[60px] px-8">
        <div className="flex max-w-[420px] flex-col gap-3.5">
          <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.01em] text-ink-warm">
            {t("title")}
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-warm text-pretty">
            {t("subtitle")}
          </p>
        </div>
        <div className="border-t border-black/10">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group border-b border-black/10"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-5 py-5">
                <span className="text-[15.5px] font-semibold text-ink-warm">
                  {item.question}
                </span>
                <span className="flex-none font-mono text-xl text-accent transition-transform duration-[250ms] group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pr-10 pb-5 text-[14px] leading-[1.7] text-muted-warm text-pretty">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
