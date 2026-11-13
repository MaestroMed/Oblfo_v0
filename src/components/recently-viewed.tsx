"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProductCard, toCardProduct } from "@/components/product-card";
import { getProducts } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";

// Personnalisation minimale et honnête : l'historique vit dans le navigateur
// (localStorage), rien ne part côté serveur. Le catalogue est déjà présent
// dans le bundle client (resync du panier) — aucune donnée supplémentaire
// n'est sérialisée pour ce bandeau.
const SEEN_KEY = "obflo-seen-v1";
const SEEN_EVENT = "obflo:seen-updated";
const SEEN_MAX = 8;
const SHOWN_MAX = 4;

function subscribe(onChange: () => void) {
  window.addEventListener(SEEN_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(SEEN_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// Snapshot = chaîne brute (stable) ; le parsing est mémoïsé plus bas.
function getSnapshot(): string {
  try {
    return window.localStorage.getItem(SEEN_KEY) ?? "";
  } catch {
    return "";
  }
}

/** À poser sur une fiche produit : enregistre la visite (après montage). */
export function TrackProductView({ id }: { id: string }) {
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SEEN_KEY);
      const list: unknown = raw ? JSON.parse(raw) : [];
      const ids = Array.isArray(list)
        ? list.filter((x): x is string => typeof x === "string")
        : [];
      const next = [id, ...ids.filter((x) => x !== id)].slice(0, SEEN_MAX);
      window.localStorage.setItem(SEEN_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(SEEN_EVENT));
    } catch {
      // stockage indisponible — pas d'historique
    }
  }, [id]);
  return null;
}

/** Section « vus récemment » — absente du SSR, apparaît après hydratation. */
export function RecentlyViewed({
  exclude,
  className = "py-12 sm:py-16",
}: {
  /** Produits à ne pas répéter (fiche en cours, vente croisée déjà affichée). */
  exclude?: string[];
  className?: string;
}) {
  const t = useTranslations("RecentlyViewed");
  const locale = useLocale() as Locale;
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "");

  const items = useMemo(() => {
    let ids: string[] = [];
    try {
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        ids = parsed.filter((x): x is string => typeof x === "string");
      }
    } catch {
      // historique corrompu — section masquée
    }
    const byId = new Map(getProducts(locale).map((p) => [p.id, p]));
    return ids
      .filter((id) => !exclude?.includes(id))
      .map((id) => byId.get(id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .slice(0, SHOWN_MAX);
  }, [raw, locale, exclude]);

  if (items.length === 0) return null;

  return (
    <section className={className}>
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        <h2 className="mb-6 text-display sm:mb-8">{t("title")}</h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={toCardProduct(p)} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
