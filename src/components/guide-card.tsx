import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isDarkTile, TILE_CLASS, type Tile } from "@/lib/tile";

// Pas de braise : le texte courant crème n'y passe pas le contraste.
const TONES: Tile[] = ["moutarde", "choco", "tomate", "brique"];
/** Couleur d'un guide d'après son rang dans `getGuides` : la même sur la liste, l'article, la famille et la recherche. */
export const guideTone = (index: number): Tile => TONES[Math.max(index, 0) % TONES.length];

export type GuideCardData = {
  slug: string;
  title: string;
  metaDescription: string;
  readMinutes: number;
};

/** Carte de guide en aplat : toute la carte est le lien. */
export function GuideCard({
  guide,
  tone,
  level = 2,
}: {
  guide: GuideCardData;
  tone: Tile;
  level?: 2 | 3;
}) {
  const t = useTranslations("Guides");
  const Heading = `h${level}` as const;
  return (
    <Link
      href={{ pathname: "/guides/[slug]", params: { slug: guide.slug } }}
      className={`tile ${TILE_CLASS[tone]} flex h-full flex-col items-start gap-3 p-5 transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none sm:p-7`}
    >
      <span className={`chip ${isDarkTile(tone) ? "chip-cream" : ""}`}>
        {t("readTime", { minutes: guide.readMinutes })}
      </span>
      <Heading className="text-[22px] leading-[1.1] text-balance hyphens-auto wrap-anywhere sm:text-[24px]">
        {guide.title}
      </Heading>
      <p className="text-[16px] leading-normal">{guide.metaDescription}</p>
      <span className="mt-auto pt-2 font-display text-[17px] font-semibold underline decoration-2 underline-offset-4">
        {t("read")}
      </span>
    </Link>
  );
}
