"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * « Plus que X en stock » : stock réservé chez le fournisseur, réglé dans le back-office
 * et qui baisse à chaque vente payée (/api/stock). Rien ne s'affiche tant que le chiffre n'est pas connu.
 */
export function StockLine({ id }: { id: string }) {
  const t = useTranslations("Ux");
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/stock")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { stock?: Record<string, number> | null } | null) => {
        const n = d?.stock?.[id];
        if (typeof n === "number") setLeft(n);
      })
      .catch(() => {});
  }, [id]);

  // Hauteur réservée : la ligne arrive sans décaler le bouton d'achat.
  return (
    <p className="flex min-h-6 items-center gap-2 font-semibold" aria-live="polite">
      {left !== null ? (
        <>
          <span aria-hidden="true" className={`h-2 w-2 flex-none rounded-full ${left > 0 ? "bg-braise" : "bg-choco"}`} />
          {left > 0 ? t("stockLow", { count: left }) : t("stockOut")}
        </>
      ) : null}
    </p>
  );
}
