import { getTranslations } from "next-intl/server";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Reveal } from "@/components/ui/reveal";
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
    <section className="relative overflow-hidden bg-espresso py-20 text-[#F5EFE6]">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_15%_100%,rgba(232,69,31,0.22),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1280px] px-8">
        <Reveal className="mb-12 flex flex-col gap-3">
          <span className="font-mono text-[11px] tracking-[0.22em] text-copper">◈ {t("heatKicker")}</span>
          <h2 className="font-serif text-[clamp(28px,3.2vw,42px)] font-medium tracking-[-0.01em]">{t("heatTitle")}</h2>
        </Reveal>
        <dl className="grid gap-10 sm:grid-cols-3">
          {rows.map((row, i) => (
            <Reveal key={row.unit} delay={i * 0.08} className="flex flex-col gap-3 border-t border-white/10 pt-6">
              <dt className="sr-only">{row.caption}</dt>
              <dd className="flex items-baseline gap-2 font-serif leading-none">
                <NumberTicker
                  value={row.value}
                  className="bg-[linear-gradient(180deg,#ffb36b_0%,#f07b2e_45%,#e8451f_100%)] bg-clip-text text-[clamp(72px,9vw,124px)] font-medium text-transparent"
                />
                <span className="text-[clamp(22px,2.4vw,32px)] text-copper">{row.unit}</span>
              </dd>
              <p aria-hidden className="text-[13.5px] leading-snug text-[#B7AA99]">{row.caption}</p>
            </Reveal>
          ))}
        </dl>
        <p className="mt-10 font-mono text-[10.5px] tracking-[0.12em] text-[#8F8171]">{t("heatNote")}</p>
      </div>
    </section>
  );
}
