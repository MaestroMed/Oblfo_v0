import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { heatProofs, type HeatProof } from "@/lib/heat";

type Best = { value: number; product: string; slug: string; cutout?: string };

// Le meilleur chiffre de chaque type sur le catalogue, avec le produit qui le porte.
function bestOf(locale: Locale) {
  const best: Partial<Record<HeatProof["kind"], Best>> = {};
  for (const p of getProducts(locale)) {
    for (const proof of heatProofs(p.specs, p.highlights)) {
      const cur = best[proof.kind];
      const better = proof.kind === "seconds" ? !cur || proof.value < cur.value : !cur || proof.value > cur.value;
      if (better) best[proof.kind] = { value: proof.value, product: p.name, slug: p.slug, cutout: p.cutout };
    }
  }
  return best;
}

export async function HeatProofs({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Ux" });
  const best = bestOf(locale);
  const rows = [
    best.temp && { ...best.temp, unit: t("unitTemp"), caption: t("heatTemp", { product: best.temp.product }) },
    best.seconds && { ...best.seconds, unit: t("unitSeconds"), caption: t("heatSeconds", { product: best.seconds.product }) },
    best.levels && { ...best.levels, unit: t("unitLevels"), caption: t("heatLevels", { product: best.levels.product }) },
  ].filter((r): r is Best & { unit: string; caption: string } => Boolean(r));
  if (!rows.length) return null;

  return (
    <section className="defer pb-12 sm:pb-16">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <h2 className="reveal mb-6 text-display sm:mb-8">{t("heatTitle")}</h2>
        {/* Chaque chiffre est posé à côté du produit qui le porte : la carte entière mène à sa fiche. */}
        <ul className={`reveal-kids grid gap-4 sm:gap-6 ${rows.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {rows.map((row) => (
            <li key={row.unit}>
              <Link
                href={{ pathname: "/produits/[slug]", params: { slug: row.slug } }}
                className="tile on-moutarde group flex h-full items-center gap-4 p-4 no-underline sm:p-8"
              >
                <span className="flex min-w-0 flex-1 flex-col gap-2">
                  <span className="flex flex-wrap items-baseline gap-x-2 font-display font-bold">
                    <span className="text-display tabular-nums">{row.value}</span>
                    <span className="text-display">{row.unit}</span>
                  </span>
                  <span className="text-caption">{row.caption}</span>
                </span>
                {row.cutout ? (
                  <span className="float relative block h-28 w-28 flex-none sm:h-40 sm:w-40">
                    <Image
                      src={row.cutout}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 160px, 112px"
                      className="cutout transition-transform duration-300 group-hover:scale-105"
                    />
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-caption text-muted">{t("heatNote")}</p>
      </div>
    </section>
  );
}
