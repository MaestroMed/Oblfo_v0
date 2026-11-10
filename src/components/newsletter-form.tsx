"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

/** idle → loading → (subscribed | soon | error) ; soon/error → loading au nouvel envoi. */
type FormState = "idle" | "loading" | "subscribed" | "soon" | "error";

export function NewsletterForm() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const [state, setState] = useState<FormState>("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  // Verrou synchrone : Entrée + clic avant re-rendu ne doublent pas l'inscription.
  const busy = useRef(false);

  const subscribe = async () => {
    const email = inputRef.current?.value.trim() ?? "";
    if (!email || busy.current) return;
    busy.current = true;
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
    } finally {
      busy.current = false;
    }
  };

  if (state === "subscribed") {
    return (
      <p data-state={state} role="status" className="font-display text-[18px] leading-snug font-semibold">
        {t("subscribed")}
      </p>
    );
  }

  return (
    <div data-state={state} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          type="email"
          autoComplete="email"
          aria-label={t("newsletterLabel")}
          placeholder={t("newsletterPlaceholder")}
          onKeyDown={(e) => {
            if (e.key === "Enter") subscribe();
          }}
          className="field min-w-0 sm:flex-1"
        />
        <button
          type="button"
          onClick={subscribe}
          disabled={state === "loading"}
          className="btn shrink-0"
        >
          {t("subscribe")}
        </button>
      </div>
      {state === "soon" || state === "error" ? (
        <p role="alert" className="text-[16px] leading-snug font-semibold">
          {t(state === "soon" ? "newsletterSoon" : "newsletterError")}
        </p>
      ) : null}
    </div>
  );
}
