import type { Metadata } from "next";
import { productsA } from "@/data/catalog-products-a";
import { productsB } from "@/data/catalog-products-b";
import { productsC } from "@/data/catalog-products-c";
import { packSources } from "@/data/catalog-packs";
import { OVERRIDES } from "@/data/overrides";
import { applyProductOverride } from "@/data/overrides";
import { routing, type Locale } from "@/i18n/routing";
import { readStock, defaultStock } from "@/lib/stock";
import { storeReady } from "@/lib/store";
import { publish, readPublished, saveStock } from "./actions";
import { EDITABLE_MESSAGES, baseMessages } from "./editable";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Obflo · back-office", robots: { index: false, follow: false } };

const LOCALES = routing.locales as readonly Locale[];
const LABEL: Record<string, string> = {
  "HomeV2.heroKicker": "Accueil : ligne au-dessus du titre (H1, mots-clés)",
  "HomeV2.heroHeadline": "Accueil : grand titre",
  "HomeV2.heroLead": "Accueil : phrase sous le titre",
  "Announcement.msg1": "Bandeau du haut : message 1",
  "Announcement.msg2": "Bandeau du haut : message 2",
  "Announcement.msg3": "Bandeau du haut : message 3",
};

const box = "tile on-paper flex flex-col gap-4 p-4 sm:p-6";
const h2 = "font-display text-display font-semibold";
const label = "flex flex-col gap-1 text-caption font-semibold";

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const { ok, erreur } = await searchParams;
  // Valeurs de départ : la dernière publication enregistrée (même si le site n'est pas encore reconstruit), sinon le site en ligne.
  const published = (await readPublished().catch(() => null)) ?? OVERRIDES;
  const products = [...productsA, ...productsB, ...productsC].map((p) => {
    const o = published.products?.[p.id];
    return o ? { ...applyProductOverride(p), ...(o.price ? { price: o.price } : {}) } : p;
  });
  const stock = (await readStock().catch(() => null)) ?? defaultStock();
  const msg = (locale: Locale, ns: string, key: string) =>
    published.messages?.[locale]?.[ns]?.[key] ?? baseMessages(locale)[ns]?.[key] ?? "";
  const featured = published.featured ?? ["gilet-chauffant", "plaid-chauffant"];

  return (
    <main className="mx-auto flex max-w-[960px] flex-col gap-6 px-4 py-8">
      <h1 className="font-display text-display font-semibold">Back-office Obflo</h1>
      {ok ? (
        <p role="status" className="tile on-moutarde p-4 text-caption font-semibold">
          {ok === "stock" ? "Stock enregistré : il est en ligne tout de suite." : ok === "publie" ? "Publié : le site se met à jour dans 2 à 3 minutes." : "Enregistré. La mise en ligne automatique n'est pas branchée (DEPLOY_HOOK_URL) : les changements partiront à la prochaine mise à jour du site."}
        </p>
      ) : null}
      {erreur ? <p role="alert" className="tile on-tomate p-4 text-caption font-semibold">{erreur}</p> : null}
      {!storeReady() ? (
        <p role="alert" className="tile on-tomate p-4 text-caption font-semibold">Stockage non branché (BLOB_READ_WRITE_TOKEN) : rien ne peut être enregistré.</p>
      ) : null}

      <form action={saveStock} className={box}>
        <h2 className={h2}>Stock réservé (en direct)</h2>
        <p className="text-caption">Affiché « Plus que X en stock » sur chaque fiche, baisse tout seul à chaque vente payée. À 0, le produit ne peut plus être commandé.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {products.map((p) => (
            <label key={p.id} className={label}>
              {p.name.fr}
              <input name={`stock:${p.id}`} type="number" inputMode="numeric" min={0} defaultValue={stock[p.id] ?? 0} className="field" />
            </label>
          ))}
        </div>
        <button className="btn btn-braise btn-lg self-start">Enregistrer le stock</button>
      </form>

      <form action={publish} className="flex flex-col gap-6">
        <section className={box}>
          <h2 className={h2}>Produits</h2>
          {products.map((p) => (
            <details key={p.id} className="tile on-cream-2 p-4">
              <summary className="cursor-pointer font-display text-body font-semibold">
                {p.name.fr} · {p.price.toFixed(2).replace(".", ",")} €{p.available === false ? " · retiré de la vente" : ""}
              </summary>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <label className={label}>
                  Prix TTC (€)
                  <input name={`price:${p.id}`} type="text" inputMode="decimal" defaultValue={p.price.toFixed(2)} className="field" required />
                </label>
                <label className="flex min-h-12 items-center gap-2 text-caption font-semibold">
                  <input name={`available:${p.id}`} type="checkbox" defaultChecked={p.available !== false} className="h-6 w-6" />
                  En vente
                </label>
                <label className="flex min-h-12 items-center gap-2 text-caption font-semibold">
                  <input name={`badge:${p.id}`} type="checkbox" defaultChecked={p.badge === "new"} className="h-6 w-6" />
                  Pastille « Nouveau »
                </label>
              </div>
              {LOCALES.map((locale) => (
                <div key={locale} className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className={label}>
                    Nom ({locale})
                    <input name={`name:${p.id}:${locale}`} defaultValue={p.name[locale as "fr"] ?? p.name.en} className="field" />
                  </label>
                  <label className={label}>
                    Accroche ({locale})
                    <input name={`tagline:${p.id}:${locale}`} defaultValue={p.tagline[locale as "fr"] ?? p.tagline.en} className="field" />
                  </label>
                </div>
              ))}
            </details>
          ))}
        </section>

        <section className={box}>
          <h2 className={h2}>Packs</h2>
          {packSources.map((pack) => {
            const o = published.packs?.[pack.id];
            return (
              <div key={pack.id} className="grid gap-3 sm:grid-cols-3">
                <span className="text-caption font-semibold">{pack.name.fr}</span>
                <label className={label}>
                  Prix TTC (€)
                  <input name={`packprice:${pack.id}`} type="text" inputMode="decimal" defaultValue={(o?.price ?? pack.price).toFixed(2)} className="field" required />
                </label>
                <label className="flex min-h-12 items-center gap-2 text-caption font-semibold">
                  <input name={`packavailable:${pack.id}`} type="checkbox" defaultChecked={(o?.available ?? pack.available) !== false} className="h-6 w-6" />
                  En vente
                </label>
              </div>
            );
          })}
        </section>

        <section className={box}>
          <h2 className={h2}>Accueil et bandeau</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <label key={i} className={label}>
                Produit mis en avant sur la photo n° {i + 1}
                <select name={`featured:${i}`} defaultValue={featured[i]} className="field">
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name.fr}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          {EDITABLE_MESSAGES.map(([ns, key]) => (
            <fieldset key={`${ns}.${key}`} className="flex flex-col gap-2">
              <legend className="mb-2 text-caption font-bold">{LABEL[`${ns}.${key}`]}</legend>
              {LOCALES.map((locale) => (
                <label key={locale} className={label}>
                  {locale}
                  <input name={`msg:${locale}:${ns}.${key}`} defaultValue={msg(locale, ns, key)} className="field" />
                </label>
              ))}
            </fieldset>
          ))}
        </section>

        <button className="btn btn-braise btn-lg self-start">Enregistrer et publier</button>
      </form>
    </main>
  );
}
