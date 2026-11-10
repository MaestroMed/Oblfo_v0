import { getTranslations } from "next-intl/server";
import { getProducts } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";
import { heatProofs, type HeatProof } from "@/lib/heat";

type Best = { value: number; product: string };

// Le meilleur chiffre de chaque type sur le catalogue, avec le produit qui le porte.
function bestOf(locale: Locale) {
  const best: Partial<Record<HeatProof["kind"], Best>> = {};
  for (const p of getProducts(locale)) {
    for (const proof of heatProofs(p.specs, p.highlights)) {
      const cur = best[proof.kind];
      const better = proof.kind === "seconds" ? !cur || proof.value < cur.value : !cur || proof.value > cur.value;
      if (better) best[proof.kind] = { value: proof.value, product: p.name };
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
    <section className="pb-14 sm:pb-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <div className="tile on-moutarde px-5 py-8 sm:px-10 sm:py-12">
          <h2 className="mb-8 text-[clamp(30px,6vw,52px)] sm:mb-10">{t("heatTitle")}</h2>
          <dl className={`grid gap-8 sm:gap-6 ${rows.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
            {rows.map((row) => (
              <div key={row.unit} className="flex flex-col-reverse justify-end gap-2">
                <dt className="max-w-[30ch] text-[16px] leading-snug">{row.caption}</dt>
                <dd className="flex flex-wrap items-baseline gap-x-2 font-display leading-none font-bold">
                  <span className="text-[clamp(64px,9vw,112px)] tabular-nums">{row.value}</span>
                  <span className="text-[clamp(24px,3vw,36px)]">{row.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-[14px] leading-snug sm:mt-10">{t("heatNote")}</p>
        </div>
      </div>
    </section>
  );
}
