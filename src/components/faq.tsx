import { useTranslations } from "next-intl";
import { getFaqItems } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";

export function Faq({ locale }: { locale: Locale }) {
  const t = useTranslations("Faq");
  const faqItems = getFaqItems(locale);

  return (
    <section id="faq" className="on-cream-2 scroll-mt-24 py-14 sm:py-24">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 sm:px-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <div className="flex flex-col gap-3">
          <h2 className="text-[clamp(28px,5vw,44px)]">{t("title")}</h2>
          <p className="max-w-[420px] text-[17px] leading-relaxed">{t("subtitle")}</p>
        </div>
        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <details key={item.question} className="tile on-paper group">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-3 sm:px-6">
                <h3 className="text-[18px] leading-snug font-semibold sm:text-[20px]">
                  {item.question}
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 flex-none transition-transform duration-200 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-[16px] leading-relaxed sm:px-6 sm:pr-14">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
