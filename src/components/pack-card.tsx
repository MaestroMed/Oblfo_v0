import Image from "next/image";
import { useTranslations } from "next-intl";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { VariantPicker } from "@/components/variant-picker";
import { formatPrice, getSellableById, type Pack } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { TILE_CLASS, productTile } from "@/lib/tile";

const button = "btn btn-braise btn-block px-4 py-2";

/** Un pack se lit comme un ticket : ses articles et leur prix, le total à l'unité barré, le prix du pack. */
export function PackCard({ pack, locale }: { pack: Pack; locale: Locale }) {
  const t = useTranslations("Packs");
  const variant = getSellableById(pack.id, locale)?.variant;
  const add = t("add", { price: formatPrice(pack.price, locale) });

  return (
    <article
      className={`tile on-paper flex h-full flex-col gap-4 border-2 p-4 sm:p-6 ${pack.featured ? "border-braise" : "border-choco/10"}`}
    >
      <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <h3 className="text-[21px] sm:text-[24px]">{pack.name}</h3>
        {pack.featured ? <span className="chip chip-moutarde">{t("bestDeal")}</span> : null}
      </header>

      <ul className="flex flex-col gap-2">
        {pack.lines.map((line) => (
          <li key={line.id} className="flex items-center gap-3">
            <span
              aria-hidden
              className={`relative block h-12 w-12 flex-none overflow-hidden rounded-xl ${TILE_CLASS[productTile(line.id)]}`}
            >
              {line.cutout ? (
                <Image src={line.cutout} alt="" fill sizes="48px" className="cutout p-[6%]" />
              ) : null}
            </span>
            <Link
              href={{ pathname: "/produits/[slug]", params: { slug: line.slug } }}
              className="flex min-h-11 min-w-0 flex-1 items-center text-[16px] leading-snug font-semibold decoration-2 underline-offset-4 hover:underline"
            >
              {line.name}
            </Link>
            <span className="flex-none text-[16px] tabular-nums">{formatPrice(line.price, locale)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-auto flex flex-col gap-1.5 border-t-2 border-choco/10 pt-3">
        <div className="flex items-baseline justify-between gap-3 text-[16px]">
          <dt>{t("separately")}</dt>
          <dd className="strike">{formatPrice(pack.compareAt, locale)}</dd>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <dt className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[18px] font-semibold">
            {t("packPrice")}
            <span className="chip chip-moutarde">
              {t("youSave", { amount: formatPrice(pack.save, locale) })}
            </span>
          </dt>
          <dd className="ml-auto flex-none font-display text-[30px] leading-none font-bold whitespace-nowrap text-braise tabular-nums">
            {formatPrice(pack.price, locale)}
          </dd>
        </div>
      </dl>

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
