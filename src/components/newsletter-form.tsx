"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

export function NewsletterForm() {
  const t = useTranslations("Footer");
  const [subscribed, setSubscribed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const subscribe = () => {
    const value = inputRef.current?.value.trim() ?? "";
    if (value) setSubscribed(true);
  };

  if (subscribed) {
    return (
      <div className="rounded-[10px] border border-accent/40 px-3.5 py-3 font-mono text-xs tracking-[0.08em] text-accent">
        {t("subscribed")}
      </div>
    );
  }

  return (
    <div className="flex gap-2.5">
      <input
        ref={inputRef}
        type="email"
        placeholder={t("newsletterPlaceholder")}
        onKeyDown={(e) => {
          if (e.key === "Enter") subscribe();
        }}
        className="min-w-0 flex-1 rounded-[10px] border border-white/12 bg-media px-3.5 py-3 font-sans text-sm text-[#EDF1F5] outline-none transition-colors focus:border-accent/70"
      />
      <button
        type="button"
        onClick={subscribe}
        className="cursor-pointer rounded-[10px] bg-accent px-5 py-3 font-sans text-sm font-semibold text-[#14100C] transition-transform duration-200 hover:-translate-y-0.5"
      >
        {t("subscribe")}
      </button>
    </div>
  );
}
