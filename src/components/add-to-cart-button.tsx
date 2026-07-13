"use client";

import { useCart } from "@/components/cart-context";

export function AddToCartButton({
  product,
  className,
  children,
}: {
  product: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { addToCart } = useCart();

  return (
    <button type="button" onClick={() => addToCart(product)} className={className}>
      {children}
    </button>
  );
}
