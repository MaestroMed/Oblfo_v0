"use client";

import { MotionConfig } from "motion/react";

// reducedMotion="user" : Motion coupe transforms et layout si l'OS demande moins d'animation.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
