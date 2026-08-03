"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ImageSlot } from "@/components/image-slot";
import { formatPrice, getProducts } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
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

/** Bandeau « récemment consultés » — absent du SSR, apparaît après hydratation. */
export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
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
      // historique corrompu — bandeau masqué
    }
    const byId = new Map(getProducts(locale).map((p) => [p.id, p]));
    return ids
      .filter((id) => id !== excludeId)
      .map((id) => byId.get(id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .slice(0, SHOWN_MAX);
  }, [raw, locale, excludeId]);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-white/5 bg-night py-[70px]">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="mb-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em]">
          <span className="text-accent">{t("title")}</span>
          <span className="h-px flex-1 bg-white/8" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
          {items.map((p) => (
            <Link
              key={p.id}
              href={{ pathname: "/produits/[slug]", params: { slug: p.slug } }}
              className="flex flex-col overflow-hidden rounded-[18px] border border-white/7 bg-card no-underline transition-[border-color,box-shadow,transform] duration-[250ms] hover:-translate-y-[3px] hover:border-accent/55 hover:shadow-[0_24px_70px_-30px_rgba(255,106,43,0.45)]"
            >
              <div className="relative aspect-[4/3] bg-media">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, 45vw"
                    className="object-cover"
                  />
                ) : (
                  <ImageSlot label={p.imageLabel} />
                )}
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <span className="text-[15px] font-semibold text-ink">
                  {p.name}
                </span>
                <span className="text-base font-bold text-accent">
                  {formatPrice(p.price, locale)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
