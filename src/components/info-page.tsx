import { useTranslations } from "next-intl";
import { PAGE, PageBanner } from "@/components/page-banner";
import type { Tile } from "@/lib/tile";

/** Gabarit des pages éditoriales (aide, légal) : bandeau d'aplat, puis texte long sur crème. */
export function InfoPage({
  title,
  intro,
  tone = "sable",
  children,
}: {
  title: string;
  intro?: string;
  /** Sable pour le légal, miel pour l'aide. */
  tone?: Tile;
  children: React.ReactNode;
}) {
  return (
    <main className={`${PAGE} pt-4 pb-12 sm:pt-6 sm:pb-16`}>
      <PageBanner tone={tone} title={title} lead={intro} />
      {/* Marge et non padding : le texte s'aligne sur celui du bandeau sans rogner les 68ch. */}
      <div className="prose-obflo mt-8 sm:mt-12 sm:ml-8 lg:ml-12 [&>section:first-child>h2]:mt-0">
        {children}
      </div>
    </main>
  );
}

export function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/** Marqueur visible des informations légales à compléter avant mise en ligne. */
export function ToComplete({ children }: { children: React.ReactNode }) {
  const t = useTranslations("ToComplete");
  return (
    <span className="chip chip-moutarde whitespace-normal">
      {t("prefix")}
      {children}
    </span>
  );
}
