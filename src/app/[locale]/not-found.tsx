"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-night px-8 text-center">
      <div className="font-mono text-[11px] tracking-[0.24em] text-[#8FA1B3]">
        {t("kicker")}
      </div>
      <h1 className="text-[clamp(38px,5vw,64px)] font-bold leading-[1.02] tracking-[-0.025em] text-ink">
        {t("titleLine1")}
        <br />
        <span className="text-accent">{t("titleLine2")}</span>
      </h1>
      <p className="max-w-[420px] text-[15px] leading-relaxed text-[#93A2B1]">
        {t("text")}
      </p>
      <Link
        href="/"
        className="rounded-xl bg-accent px-[26px] py-[15px] text-[15px] font-semibold text-[#14100C] no-underline transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-12px_rgba(255,106,43,0.6)]"
      >
        {t("cta")}
      </Link>
    </main>
  );
}
