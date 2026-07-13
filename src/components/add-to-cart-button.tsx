"use client";

import { useCart } from "@/components/cart-context";

export function AddToCartButton({
  id,
  name,
  price,
  className,
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
