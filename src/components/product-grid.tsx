import { AddToCartButton } from "@/components/add-to-cart-button";
import { ImageSlot } from "@/components/image-slot";
import { SectionHeading } from "@/components/section-heading";
import { formatPrice, products } from "@/data/catalog";

export function ProductGrid() {
  return (
    <section id="gamme" className="scroll-mt-20 bg-night py-[110px]">
      <div className="mx-auto max-w-[1240px] px-8">
        <SectionHeading
          index="01"
          label="LA GAMME"
          title="Toute la gamme."
          description="Quatre produits. Un seul objectif : couper le froid, tout de suite."
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(255px,1fr))] gap-5">
          {products.map((product) => (
            <div
              key={product.slug}
              className="flex flex-col overflow-hidden rounded-[18px] border border-white/7 bg-card transition-[border-color,box-shadow,transform] duration-[250ms] hover:-translate-y-[3px] hover:border-accent/55 hover:shadow-[0_24px_70px_-30px_rgba(255,106,43,0.45)]"
            >
              <div className="relative aspect-square bg-media">
                <div
                  className={`${product.glow === "warm" ? "glow-warm" : "glow-cold"} pointer-events-none absolute inset-0 z-[1]`}
                />
                <ImageSlot label={product.imageLabel} />
              </div>
              <div className="flex flex-col gap-3 px-5 pt-5 pb-[22px]">
                <div className="flex gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-cold/25 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-[#9FB3C4]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-[19px] font-semibold text-ink">
                  {product.name}
                </div>
                <p className="text-[13.5px] leading-normal text-[#8595A5]">
                  {product.tagline}
                </p>
                <div className="mt-1.5 flex items-center justify-between">
                  <div className="text-[25px] font-bold text-ink">
                    {formatPrice(product.price)}
                  </div>
                  <AddToCartButton
                    product={product.name}
                    className="cursor-pointer rounded-[10px] bg-accent px-5 py-[11px] text-sm font-semibold text-[#14100C] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-10px_rgba(255,106,43,0.7)]"
                  >
                    Ajouter
                  </AddToCartButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
