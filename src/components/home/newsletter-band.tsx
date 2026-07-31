import { useTranslations } from "next-intl";
import { NewsletterForm } from "@/components/newsletter-form";

export function NewsletterBand() {
  const t = useTranslations("HomeV2");

  return (
    <section className="bg-espresso py-16">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-10 px-8">
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full border border-accent/50 bg-accent/15 text-2xl text-accent shadow-[0_0_40px_rgba(240,123,46,0.35)]">
          ✉
        </div>
        <div className="flex min-w-[260px] flex-[1_1_320px] flex-col gap-2">
          <h2 className="font-serif text-[clamp(24px,2.6vw,34px)] font-medium tracking-[-0.01em] text-[#F5EFE6]">
            {t("newsletterTitle")}
          </h2>
          <p className="max-w-[480px] text-[13.5px] leading-relaxed text-[#B7AA99]">
            {t("newsletterText")}
          </p>
        </div>
        <div className="w-full max-w-[420px] flex-[1_1_320px]">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
