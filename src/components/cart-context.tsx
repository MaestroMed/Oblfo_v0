"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocale } from "next-intl";
import { getSellableById } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";
import { MAX_QTY } from "@/lib/cart";

export type CartItem = {
  /** Slug produit ou pack — identifiant stable pour l'app de pilotage. */
  id: string;
  /** Déclinaison choisie (taille, pointure) — obligatoire si le produit en a. */
  variant?: string;
  name: string;
  price: number;
  qty: number;
};

/** Identité d'une ligne de panier : un même produit en 2 tailles = 2 lignes. */
export function lineKey(item: Pick<CartItem, "id" | "variant">): string {
  return item.variant ? `${item.id}::${item.variant}` : item.id;
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  hydrated: boolean;
  drawerOpen: boolean;
  toastLabel: string;
  toastVisible: boolean;
  addItem: (item: {
    id: string;
    name: string;
    price: number;
    variant?: string;
  }) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "obflo-cart-v1";

/**
 * Revalide un contenu de localStorage : structure saine + ids existants,
 * nom/prix resynchronisés depuis le catalogue (source de vérité, bonne locale).
 */
function sanitizeStoredItems(raw: string | null, locale: Locale): CartItem[] {
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const items: CartItem[] = [];
  for (const entry of parsed) {
    if (typeof entry !== "object" || entry === null) continue;
    const { id, qty, variant } = entry as {
      id?: unknown;
      qty?: unknown;
      variant?: unknown;
    };
    if (typeof id !== "string" || typeof qty !== "number") continue;
    if (!Number.isFinite(qty) || qty < 1) continue;
    const sellable = getSellableById(id, locale);
    if (!sellable) continue;
    // Une variante requise absente/invalide rend la ligne invendable : on la retire.
    if (sellable.variant) {
      if (
        typeof variant !== "string" ||
        !sellable.variant.options.includes(variant)
      ) {
        continue;
      }
    }
    items.push({
      id,
      variant: sellable.variant ? (variant as string) : undefined,
      name: sellable.name,
      price: sellable.price,
      qty: Math.min(Math.floor(qty), MAX_QTY),
    });
  }
  return items;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as Locale;
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastLabel, setToastLabel] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydratation du panier après montage : le setState synchrone est voulu —
  // une seule cascade au premier rendu client, et le state reste ensuite
  // possédé par React (useSyncExternalStore ne convient pas à du state
  // mutable qui n'est persisté que par effet de bord).
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(sanitizeStoredItems(window.localStorage.getItem(STORAGE_KEY), locale));
    } catch {
      // stockage indisponible — panier vide
    }
    setHydrated(true);
  }, [locale]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // stockage indisponible (navigation privée) — panier non persisté
    }
  }, [items, hydrated]);

  // Synchronisation entre onglets.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      setItems(sanitizeStoredItems(e.newValue, locale));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [locale]);

  const showToast = useCallback((label: string) => {
    if (timer.current) clearTimeout(timer.current);
    setToastLabel(label.toUpperCase());
    setToastVisible(true);
    timer.current = setTimeout(() => setToastVisible(false), 2400);
  }, []);

  const addItem = useCallback(
    (item: { id: string; name: string; price: number; variant?: string }) => {
      const key = lineKey(item);
      setItems((prev) => {
        const existing = prev.find((i) => lineKey(i) === key);
        if (existing) {
          return prev.map((i) =>
            lineKey(i) === key ? { ...i, qty: Math.min(i.qty + 1, MAX_QTY) } : i,
          );
        }
        return [...prev, { ...item, qty: 1 }];
      });
      showToast(item.variant ? `${item.name} · ${item.variant}` : item.name);
    },
    [showToast],
  );

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => lineKey(i) !== key));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    const clamped = Math.min(qty, MAX_QTY);
    setItems((prev) =>
      clamped <= 0
        ? prev.filter((i) => lineKey(i) !== key)
        : prev.map((i) => (lineKey(i) === key ? { ...i, qty: clamped } : i)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      window.localStorage.setItem(STORAGE_KEY, "[]");
    } catch {
      // stockage indisponible — rien à purger
    }
  }, []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        hydrated,
        drawerOpen,
        toastLabel,
        toastVisible,
        addItem,
        removeItem,
        setQty,
        clearCart,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
