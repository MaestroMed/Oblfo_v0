"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type FormState = "idle" | "loading" | "subscribed" | "soon" | "error";

export function NewsletterForm() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const [state, setState] = useState<FormState>("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const subscribe = async () => {
    const email = inputRef.current?.value.trim() ?? "";
    if (!email || state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      if (res.ok) setState("subscribed");
      else if (res.status === 503) setState("soon");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  if (state === "subscribed") {
    return (
      <div className="rounded-[10px] border border-accent/40 px-3.5 py-3 font-mono text-xs tracking-[0.08em] text-accent">
        {t("subscribed")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
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
          disabled={state === "loading"}
          className="cursor-pointer rounded-[10px] bg-accent px-5 py-3 font-sans text-sm font-semibold text-[#14100C] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {t("subscribe")}
        </button>
      </div>
      {state === "soon" ? (
        <p className="font-mono text-[10px] tracking-[0.12em] text-accent">
          {t("newsletterSoon")}
        </p>
      ) : null}
      {state === "error" ? (
        <p className="font-mono text-[10px] tracking-[0.12em] text-accent">
          {t("newsletterError")}
        </p>
      ) : null}
    </div>
  );
}
