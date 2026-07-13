"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type CartItem = {
  /** Slug produit ou pack — identifiant stable pour l'app de pilotage. */
  id: string;
  name: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  drawerOpen: boolean;
  toastLabel: string;
  toastVisible: boolean;
  addItem: (item: { id: string; name: string; price: number }) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "obflo-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastLabel, setToastLabel] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // stockage corrompu ou indisponible — on repart d'un panier vide
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // stockage indisponible (navigation privée) — panier non persisté
    }
  }, [items, hydrated]);

  const showToast = useCallback((label: string) => {
    if (timer.current) clearTimeout(timer.current);
    setToastLabel(label.toUpperCase());
    setToastVisible(true);
    timer.current = setTimeout(() => setToastVisible(false), 2400);
  }, []);

  const addItem = useCallback(
    (item: { id: string; name: string; price: number }) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
          );
        }
        return [...prev, { ...item, qty: 1 }];
      });
      showToast(item.name);
    },
    [showToast],
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        drawerOpen,
        toastLabel,
        toastVisible,
        addItem,
        removeItem,
        setQty,
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
