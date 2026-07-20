// Règles de livraison — partagées entre l'API checkout (serveur) et le panier (client).
export const FREE_SHIPPING_THRESHOLD = 60;
export const STANDARD_SHIPPING = 4.9;

export function shippingCostFor(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
}
