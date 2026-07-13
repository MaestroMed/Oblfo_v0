import { SectionKicker } from "@/components/section-heading";
import { faqItems } from "@/data/catalog";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-night py-[110px]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-[60px] px-8">
        <div className="flex max-w-[420px] flex-col gap-3.5">
          <SectionKicker index="07" label="FAQ" />
          <h2 className="text-[clamp(34px,4vw,52px)] font-bold leading-[1.04] tracking-[-0.02em] text-ink">
            Questions fréquentes.
          </h2>
          <p className="text-base leading-relaxed text-[#93A2B1] text-pretty">
            Une autre question&nbsp;? Écris-nous, on répond sous 24&nbsp;h.
          </p>
        </div>
        <div className="border-t border-white/8">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group border-b border-white/8"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-5 py-5">
                <span className="text-[16.5px] font-medium text-[#EDF1F5]">
                  {item.question}
                </span>
                <span className="flex-none font-mono text-xl text-accent transition-transform duration-[250ms] group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pr-10 pb-5 text-[14.5px] leading-[1.65] text-[#8FA0B0] text-pretty">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
