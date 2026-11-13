import Image from "next/image";
import { useTranslations } from "next-intl";
import { HeatWaves } from "@/components/ui/heat-waves";
import { Link } from "@/i18n/navigation";
import { TILE_CLASS, type Tile } from "@/lib/tile";

type Href = React.ComponentProps<typeof Link>["href"];

/** Conteneur des pages intérieures : gouttière 16 px mobile, 32 px bureau, 1240 px au plus. */
export const PAGE = "mx-auto w-full max-w-[1240px] px-4 sm:px-8";
/** Titre de section de la charte. */
export const H2 = "text-[clamp(28px,5vw,44px)]";

/** Fil d'Ariane en texte normal, sur le crème au-dessus du bandeau. Un élément sans lien est la page courante. */
export function Crumbs({ items }: { items: { label: string; href?: Href }[] }) {
  const t = useTranslations("CategoryPage");
  return (
    <nav aria-label={t("breadcrumb")} className="text-[16px]">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-x-2">
            {i > 0 ? (
              <span aria-hidden className="text-muted">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link
                href={item.href}
                className="flex min-h-12 min-w-12 items-center justify-center text-muted underline-offset-4 transition-colors hover:text-choco hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="flex min-h-12 items-center font-semibold">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Bandeau d'aplat des pages intérieures : il porte le seul h1 de la page.
 * `image` attend une photo plein cadre (`deco()`), posée dans un cadre arrondi ; `compact` sert aux titres longs (articles).
 */
export function PageBanner({
  tone,
  title,
  lead,
  meta,
  image,
  waves,
  compact,
  children,
}: {
  tone: Tile;
  title: string;
  lead?: string;
  meta?: React.ReactNode;
  image?: string;
  waves?: boolean;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={`tile ${TILE_CLASS[tone]} px-5 py-7 sm:px-10 sm:py-12 lg:px-14 lg:py-16`}>
      <div
        className={
          image
            ? "grid items-center gap-x-10 gap-y-4 md:grid-cols-[minmax(0,1fr)_minmax(0,36%)]"
            : undefined
        }
      >
        <div className="max-w-[780px]">
          {waves ? (
            <HeatWaves className="mb-4 h-12 w-12 sm:mb-6 sm:h-16 sm:w-16" />
          ) : null}
          {meta}
          {/* Césure : « Geschäftsbedingungen » dépasse 288 px sans elle. */}
          <h1
            className={`display hyphens-auto wrap-anywhere ${compact ? H2 : "text-[clamp(32px,8.5vw,68px)]"}`}
          >
            {title}
          </h1>
          {lead ? (
            <p className="mt-4 max-w-[600px] text-[18px] leading-[1.45] sm:mt-5 sm:text-[20px]">
              {lead}
            </p>
          ) : null}
          {children}
        </div>
        {image ? (
          <div className="tile aspect-[3/2] bg-paper/50">
            <Image
              src={image}
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 768px) 420px, 90vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
