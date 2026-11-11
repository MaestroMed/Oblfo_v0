"use client";

import { useSyncExternalStore } from "react";
import { isFreeShippingPromo } from "@/lib/shipping";

const subscribe = () => () => {};

/**
 * La promo de port, lue sur l'horloge du navigateur. À l'hydratation le hook
 * rend `server` (l'état connu du rendu serveur), puis se corrige : pas de
 * décalage, et une page en cache ne ment pas plus longtemps que son chargement.
 * L'API checkout fait foi dans tous les cas.
 */
export function useFreeShippingPromo(server = false): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isFreeShippingPromo(new Date()),
    () => server,
  );
}
