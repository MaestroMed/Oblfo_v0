import Image from "next/image";
import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { VariantPicker } from "@/components/variant-picker";
import { formatPrice, getSellableById, type Pack } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { TILE_CLASS, productTile } from "@/lib/tile";

const button = "btn btn-moutarde btn-block px-4 py-2";

/** Un pack se lit comme un ticket : ses articles et leur prix, le total à l'unité barré, le prix du pack. */
export function PackCard({ pack, locale }: { pack: Pack; locale: Locale }) {
  const t = useTranslations("Packs");
  const variant = getSellableById(pack.id, locale)?.variant;
  const add = t("add", { price: formatPrice(pack.price, locale) });
  const visuals = pack.lines.filter((line) => line.cutout ?? line.image);

  return (
    <article className="tile on-choco flex h-full flex-col gap-5 p-5 sm:p-7">
      <header className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <h3 className="text-[24px] sm:text-[28px]">{pack.name}</h3>
        {pack.featured ? <span className="chip chip-moutarde">{t("bestDeal")}</span> : null}
      </header>

      {/* Les articles du pack, chacun sur son aplat, reliés par « + ». Décoratif : la liste dessous les nomme. */}
      <div aria-hidden className="flex items-center gap-1.5 sm:gap-2">
        {visuals.map((line, i) => (
          <Fragment key={line.id}>
            {i > 0 ? (
              <span className="flex-none font-display text-[24px] leading-none font-bold text-moutarde sm:text-[28px]">+</span>
            ) : null}
            {/* Largeur partagée : quatre articles tiennent sur une ligne, même dans une carte étroite. */}
            <span
              className={`relative block aspect-square min-w-0 flex-1 max-w-[68px] overflow-hidden rounded-2xl sm:max-w-24 ${TILE_CLASS[productTile(line.id)]} ${productTile(line.id) === "choco" ? "bg-choco-2" : ""}`}
            >
              {line.cutout ? (
                <Image src={line.cutout} alt="" fill sizes="96px" className="cutout p-[8%]" />
              ) : line.image ? (
                <Image src={line.image} alt="" fill sizes="96px" className="object-cover" />
              ) : null}
            </span>
          </Fragment>
        ))}
      </div>

      <ul className="flex flex-col divide-y-2 divide-cream/15">
        {pack.lines.map((line) => (
          <li key={line.id} className="flex min-h-11 items-center justify-between gap-3 py-1.5">
            <Link
              href={{ pathname: "/produits/[slug]", params: { slug: line.slug } }}
              className="min-w-0 py-1.5 text-[16px] leading-snug font-semibold decoration-2 underline-offset-4 hover:underline"
            >
              {line.name}
            </Link>
            <span className="flex-none text-[16px] tabular-nums">
              {formatPrice(line.price, locale)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-auto flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3 text-[16px]">
          <dt>{t("separately")}</dt>
          <dd className="strike text-[18px]">{formatPrice(pack.compareAt, locale)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="font-display text-[18px] font-semibold">{t("packPrice")}</dt>
          <dd className="price price-lg">{formatPrice(pack.price, locale)}</dd>
        </div>
      </dl>
      <p className="chip chip-moutarde self-start text-[16px]">
        {t("youSave", { amount: formatPrice(pack.save, locale) })}
      </p>

      {variant ? (
        <VariantPicker
          id={pack.id}
          name={pack.name}
          price={pack.price}
          label={variant.label}
          options={variant.options}
          layout="select"
          light
          buttonLabel={add}
          buttonClassName={button}
        />
      ) : (
        <AddToCartButton id={pack.id} name={pack.name} price={pack.price} className={button}>
          {add}
        </AddToCartButton>
      )}
    </article>
  );
}

/**
 * Liste de packs : en mobile ils défilent côte à côte (le suivant dépasse), sinon trois packs font trois écrans.
 * `cols` = classes de grille à partir de `md`.
 */
export function PackRail({ packs, locale, cols }: { packs: Pack[]; locale: Locale; cols: string }) {
  if (packs.length === 1) {
    return (
      <div className="max-w-[640px]">
        <PackCard pack={packs[0]} locale={locale} />
      </div>
    );
  }
  return (
    <ul
      className={`-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden ${cols}`}
    >
      {packs.map((pack) => (
        <li key={pack.id} className="w-[86%] flex-none snap-center md:w-auto">
          <PackCard pack={pack} locale={locale} />
        </li>
      ))}
    </ul>
  );
}
