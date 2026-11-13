"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { productsA } from "@/data/catalog-products-a";
import { productsB } from "@/data/catalog-products-b";
import { productsC } from "@/data/catalog-products-c";
import { packSources } from "@/data/catalog-packs";
import type { Overrides, ProductOverride } from "@/data/overrides";
import { routing, type Locale } from "@/i18n/routing";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { writeStock, type Stock } from "@/lib/stock";
import { readJson, writeJson } from "@/lib/store";
import { EDITABLE_MESSAGES, OVERRIDES_PATH, baseMessages, rawPack } from "./editable";

const RAW_PRODUCTS = [...productsA, ...productsB, ...productsC];

async function assertAdmin() {
  // Le proxy filtre déjà /admin ; on revérifie ici car une action serveur reste un point d'entrée public.
  if (!isAdminAuthorized((await headers()).get("authorization"))) throw new Error("accès refusé");
}

const text = (form: FormData, key: string) => String(form.get(key) ?? "").trim().slice(0, 300);
const price = (form: FormData, key: string) => {
  const n = Number(String(form.get(key) ?? "").replace(",", "."));
  if (!Number.isFinite(n) || n < 1 || n > 999) throw new Error(`prix invalide : ${key}`);
  return Math.round(n * 100) / 100;
};

export async function saveStock(form: FormData) {
  await assertAdmin();
  const stock: Stock = {};
  for (const p of RAW_PRODUCTS) {
    const n = Math.floor(Number(form.get(`stock:${p.id}`)));
    stock[p.id] = Number.isFinite(n) && n >= 0 && n <= 100_000 ? n : 0;
  }
  await writeStock(stock);
  redirect("/admin?ok=stock");
}

/** Construit le fichier de réglages : seules les valeurs qui diffèrent du catalogue y entrent. */
export async function publish(form: FormData) {
  await assertAdmin();
  const out: Overrides = { products: {}, packs: {}, messages: {}, publishedAt: new Date().toISOString() };

  const prices: Record<string, number> = {};
  for (const p of RAW_PRODUCTS) {
    const o: ProductOverride = {};
    const pr = price(form, `price:${p.id}`);
    prices[p.id] = pr;
    if (pr !== p.price) o.price = pr;
    const available = form.get(`available:${p.id}`) === "on";
    if (available !== (p.available ?? true)) o.available = available;
    const isNew = form.get(`badge:${p.id}`) === "on";
    if (isNew !== (p.badge === "new")) o.badge = isNew ? "new" : null;
    for (const field of ["name", "tagline"] as const) {
      for (const locale of routing.locales) {
        const value = text(form, `${field}:${p.id}:${locale}`);
        const base = p[field][locale as keyof typeof p.name] ?? p[field].en;
        if (value && value !== base) o[field] = { ...o[field], [locale]: value };
      }
    }
    if (Object.keys(o).length) out.products![p.id] = o;
  }

  for (const pack of packSources) {
    const raw = rawPack(pack.id);
    const pr = price(form, `packprice:${pack.id}`);
    const available = form.get(`packavailable:${pack.id}`) === "on";
    // Un pack doit rester moins cher que ses produits achetés séparément (prix barré = somme réelle).
    const sum = pack.items.reduce((s, id) => s + (prices[id] ?? 0), 0);
    if (available && pr >= sum) redirect(`/admin?erreur=${encodeURIComponent(`pack ${pack.id} : ${pr} € n'est pas inférieur à ${sum.toFixed(2)} €`)}`);
    const o: { price?: number; available?: boolean } = {};
    if (pr !== raw.price) o.price = pr;
    if (available !== (raw.available ?? true)) o.available = available;
    if (Object.keys(o).length) out.packs![pack.id] = o;
  }

  for (const locale of routing.locales as readonly Locale[]) {
    const base = baseMessages(locale);
    for (const [ns, key] of EDITABLE_MESSAGES) {
      const value = text(form, `msg:${locale}:${ns}.${key}`);
      if (value && value !== base[ns]?.[key]) {
        out.messages![locale] = { ...out.messages![locale], [ns]: { ...out.messages![locale]?.[ns], [key]: value } };
      }
    }
  }

  const featured = [text(form, "featured:0"), text(form, "featured:1")].filter((id) => RAW_PRODUCTS.some((p) => p.id === id));
  if (featured.length) out.featured = featured;

  await writeJson(OVERRIDES_PATH, out);
  // Remise en ligne : le site est statique, une nouvelle version embarque les réglages (2 à 3 minutes).
  const hook = process.env.DEPLOY_HOOK_URL;
  if (hook) await fetch(hook, { method: "POST" }).catch(() => null);
  redirect(hook ? "/admin?ok=publie" : "/admin?ok=enregistre");
}

export async function readPublished() {
  return readJson<Overrides>(OVERRIDES_PATH);
}
