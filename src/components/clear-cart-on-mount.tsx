"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart-context";

/** Vide le panier à l'arrivée sur la page de confirmation de commande. */
export function ClearCartOnMount() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
