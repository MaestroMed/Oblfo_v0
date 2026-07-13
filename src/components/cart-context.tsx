"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type CartContextValue = {
  count: number;
  toastLabel: string;
  toastVisible: boolean;
  addToCart: (label: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [toastLabel, setToastLabel] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addToCart = useCallback((label: string) => {
    if (timer.current) clearTimeout(timer.current);
    setCount((c) => c + 1);
    setToastLabel(label.toUpperCase());
    setToastVisible(true);
    timer.current = setTimeout(() => setToastVisible(false), 2400);
  }, []);

  return (
    <CartContext.Provider value={{ count, toastLabel, toastVisible, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans <CartProvider>");
  return ctx;
}
