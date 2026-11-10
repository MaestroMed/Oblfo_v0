"use client";

import { useCart } from "@/components/cart-context";

// Sans className : pilule chocolat, qui passe en crème posée sur un aplat sombre
// (et revient au chocolat dans une carte claire elle-même posée sur du sombre).
// Classes écrites en toutes lettres pour que Tailwind les génère.
const DEFAULT_CLASS =
  "btn [:is(.on-choco,.on-tomate)_&]:bg-cream [:is(.on-choco,.on-tomate)_&]:text-choco [:is(.on-choco,.on-tomate)_:is(.on-cream,.on-cream-2,.on-paper,.on-moutarde,.on-miel,.on-peche,.on-sable,.on-argile)_&]:bg-choco [:is(.on-choco,.on-tomate)_:is(.on-cream,.on-cream-2,.on-paper,.on-moutarde,.on-miel,.on-peche,.on-sable,.on-argile)_&]:text-cream";

export function AddToCartButton({
  id,
  name,
  price,
  className = DEFAULT_CLASS,
  children,
}: {
  id: string;
  name: string;
  price: number;
  className?: string;
  children: React.ReactNode;
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem({ id, name, price })}
      className={className}
    >
      {children}
    </button>
  );
}
