"use client";

import { createContext, useContext } from "react";
import type { LiteCatalog } from "@/data/catalog-lite";

const CatalogContext = createContext<LiteCatalog | null>(null);

export function CatalogProvider({ value, children }: { value: LiteCatalog; children: React.ReactNode }) {
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): LiteCatalog {
  const value = useContext(CatalogContext);
  if (!value) throw new Error("useCatalog hors de <CatalogProvider>");
  return value;
}
