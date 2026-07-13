"use client";

import { useCart } from "@/components/cart-context";

const navLinks = [
  { href: "/#gamme", label: "La gamme" },
  { href: "/#moments", label: "Moments" },
  { href: "/#packs", label: "Packs" },
  { href: "/#techno", label: "Technologie" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const { count, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-[60] border-b border-white/[0.06] bg-[rgba(8,10,14,0.78)] backdrop-blur-[14px]">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-8">
        <a
          href="/"
          className="text-[21px] font-bold tracking-[0.05em] text-ink no-underline"
        >
          OBFLO<span className="text-accent">°</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13.5px] text-[#A7B4C2] no-underline transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={openDrawer}
          className="flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-white/12 bg-white/[0.04] px-3.5 py-[9px] font-mono text-[11.5px] tracking-[0.12em] text-[#EDF1F5] transition-colors hover:border-accent/60"
        >
          PANIER
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-accent px-[5px] font-medium text-[#14100C]">
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}
