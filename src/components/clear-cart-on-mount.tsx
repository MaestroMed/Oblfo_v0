"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart-context";

/**
 * Vide le panier à l'arrivée sur la page de confirmation de commande.
 * Attend la fin de l'hydratation du CartProvider : les effets du parent
 * s'exécutent APRÈS ceux des enfants, un clearCart immédiat serait écrasé
 * par le rechargement du localStorage.
 */
export function ClearCartOnMount() {
  const { hydrated, clearCart } = useCart();

  useEffect(() => {
    if (hydrated) clearCart();
  }, [hydrated, clearCart]);

  return null;
}
