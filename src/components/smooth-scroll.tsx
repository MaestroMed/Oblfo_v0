"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

// Lenis seulement sur l'accueil et les pages éditoriales — jamais panier ni checkout.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.12, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
