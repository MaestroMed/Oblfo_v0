import { useTranslations } from "next-intl";

export function AnnouncementBar() {
  const t = useTranslations("Announcement");

  return (
    <div className="border-b border-accent/20 bg-[linear-gradient(90deg,rgba(255,106,43,0.14),rgba(255,106,43,0.04)_30%,rgba(255,106,43,0.04)_70%,rgba(255,106,43,0.14))] px-4 py-[9px] text-center font-mono text-[11px] tracking-[0.18em] text-accent/95">
      {t("text")}
    </div>
  );
}
