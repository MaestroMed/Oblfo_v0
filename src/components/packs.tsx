import { AddToCartButton } from "@/components/add-to-cart-button";
import { ImageSlot } from "@/components/image-slot";
import { SectionHeading } from "@/components/section-heading";
import { formatPrice, packs } from "@/data/catalog";

export function Packs() {
  return (
    <section id="packs" className="scroll-mt-20 bg-night py-[110px]">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHeading
          index="03"
          label="PACKS"
          title="Plus de chaleur. Moins cher."
          description="Des duos pensés pour des moments réels — pas des bundles au hasard."
        />
        <div className="flex flex-col gap-5">
          {packs.map((pack) => (
            <div
              key={pack.slug}
              className={`relative flex flex-wrap items-stretch overflow-hidden rounded-[20px] border transition-[border-color,box-shadow] duration-[250ms] ${
                pack.featured
                  ? "border-accent/35 bg-[linear-gradient(120deg,#141017_0%,#0D1016_55%)] hover:border-accent/70 hover:shadow-[0_30px_90px_-40px_rgba(255,106,43,0.6)]"
                  : "border-white/8 bg-pack hover:border-accent/50 hover:shadow-[0_30px_90px_-40px_rgba(255,106,43,0.5)]"
              }`}
            >
              <div
                className={`pointer-events-none absolute -top-[130px] -right-[70px] h-[450px] w-[690px] ${pack.featured ? "glow-warm-strong" : "glow-warm"}`}
              />
              {pack.featured ? (
                <div className="absolute top-[18px] right-[18px] z-[2] rounded-md bg-accent px-[9px] py-[5px] font-mono text-[10px] font-medium tracking-[0.18em] text-[#14100C]">
                  MEILLEURE AFFAIRE
                </div>
              ) : null}
              <div className="relative min-h-[210px] flex-[0_0_280px] border-r border-white/6 bg-media max-sm:flex-[1_1_100%]">
                <ImageSlot label={pack.imageLabel} />
              </div>
              <div className="relative flex flex-[1_1_320px] flex-col justify-center gap-2.5 px-[34px] py-[30px]">
                <div className="font-mono text-[10.5px] tracking-[0.22em] text-[#8FA1B3]">
                  PACK
                </div>
                <div className="text-[27px] font-bold tracking-[-0.015em] text-ink">
                  {pack.name}
                </div>
                <div className="text-[15px] text-[#93A2B1]">{pack.contents}</div>
                <div className="mt-1">
                  <span className="rounded-md border border-accent/40 px-[9px] py-1 font-mono text-[10.5px] tracking-[0.14em] text-accent">
                    TU ÉCONOMISES {formatPrice(pack.compareAt - pack.price)}
                  </span>
                </div>
              </div>
              <div className="relative flex flex-none flex-col items-end justify-center gap-3 px-[34px] py-[30px]">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[15px] text-[#66788A] line-through">
                    {formatPrice(pack.compareAt)}
                  </span>
                  <span className="text-[34px] font-bold text-accent">
                    {formatPrice(pack.price)}
                  </span>
                </div>
                <AddToCartButton
                  product={pack.name}
                  className="cursor-pointer rounded-[11px] bg-[linear-gradient(135deg,#FF6A2B,#E8451F)] px-6 py-[13px] text-[15px] font-semibold text-[#14100C] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-12px_rgba(255,106,43,0.7)]"
                >
                  Choisir mon pack
                </AddToCartButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
