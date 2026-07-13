"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/components/cart-context";

export function CartToast() {
  const t = useTranslations("Cart");
  const { toastLabel, toastVisible } = useCart();

  if (!toastVisible) return null;

  return (
    <div className="pointer-events-none fixed bottom-7 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2.5 rounded-xl border border-accent/50 bg-[#121822] px-[18px] py-[13px] font-mono text-xs tracking-[0.1em] whitespace-nowrap text-[#EDF1F5] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
      <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_12px_rgba(255,106,43,1)]" />
      {t("toastAdded", { name: toastLabel })}
    </div>
  );
}
