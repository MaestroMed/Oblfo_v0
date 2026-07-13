import { SectionHeading } from "@/components/section-heading";
import { reviews } from "@/data/catalog";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="text-[15px] tracking-[3px]">
      <span className="text-accent">{"★".repeat(rating)}</span>
      <span className="text-[#3A4655]">{"★".repeat(5 - rating)}</span>
    </div>
  );
}

export function Avis() {
  return (
    <section
      id="avis"
      className="scroll-mt-20 border-y border-white/5 bg-night-2 py-[110px]"
    >
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHeading
          index="06"
          label="AVIS CLIENTS"
          title="Ils ont déjà coupé le froid."
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {reviews.map((review) => (
            <div
              key={review.author}
              className="flex flex-col gap-4 rounded-[18px] border border-white/7 bg-card p-[26px]"
            >
              <Stars rating={review.rating} />
              <p className="text-base leading-relaxed text-[#C9D4DF] text-pretty">
                «&nbsp;{review.text}&nbsp;»
              </p>
              <div className="mt-auto flex items-center gap-3">
                <span className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cold/25 bg-cold/10 text-sm font-semibold text-[#AFC9DE]">
                  {review.author[0]}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-[#EDF1F5]">
                    {review.author} — {review.city}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-[#66788A]">
                    ACHAT VÉRIFIÉ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
