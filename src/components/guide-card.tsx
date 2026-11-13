import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TILE_CLASS, type Tile } from "@/lib/tile";

const TONES: Tile[] = ["miel", "sable", "peche", "argile"];
/** Couleur d'un guide d'après son rang dans `getGuides` : la même sur la liste, l'article, la famille et la recherche. */
export const guideTone = (index: number): Tile => TONES[Math.max(index, 0) % TONES.length];

export type GuideCardData = {
  slug: string;
  title: string;
  metaDescription: string;
  readMinutes: number;
  images?: { src: string; alt: string }[];
};

/** Carte de guide en aplat : toute la carte est le lien. */
export function GuideCard({
  guide,
  tone,
  level = 2,
  priority = false,
}: {
  guide: GuideCardData;
  priority?: boolean;
  tone: Tile;
  level?: 2 | 3;
}) {
  const t = useTranslations("Guides");
  const Heading = `h${level}` as const;
  const photo = guide.images?.[0];
  return (
    <Link
      href={{ pathname: "/guides/[slug]", params: { slug: guide.slug } }}
      className={`tile ${TILE_CLASS[tone]} group flex h-full flex-col items-start gap-4 p-4 transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none sm:p-8`}
    >
      {photo ? (
        <span className="relative -mx-4 -mt-4 mb-1 block aspect-[16/10] w-[calc(100%+2rem)] overflow-hidden rounded-t-[inherit] sm:-mx-8 sm:-mt-8 sm:w-[calc(100%+4rem)]">
          <Image
            src={photo.src}
            alt=""
            fill
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
          />
        </span>
      ) : null}
      <span className="chip">
        {t("readTime", { minutes: guide.readMinutes })}
      </span>
      <Heading className="text-body text-balance hyphens-auto wrap-anywhere">
        {guide.title}
      </Heading>
      <p className="text-caption">{guide.metaDescription}</p>
      <span className="mt-auto pt-2 font-display text-body font-semibold underline decoration-2 underline-offset-4">
        {t("read")}
      </span>
    </Link>
  );
}
