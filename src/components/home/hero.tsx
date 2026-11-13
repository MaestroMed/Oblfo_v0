import Image from "next/image";
import { useTranslations } from "next-intl";
import { formatPrice, getProductById } from "@/data/catalog";
import { OVERRIDES } from "@/data/overrides";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { deco } from "@/lib/tile";

// Les deux produits poussés en publicité, posés sur la photo d'ambiance (choisis dans le back-office).
const [FIRST, SECOND] = OVERRIDES.featured ?? ["gilet-chauffant", "plaid-chauffant"];
const FEATURED = [
  { id: FIRST, place: "left-4 bottom-4 sm:left-6 sm:bottom-6", delay: "0s" },
  { id: SECOND ?? "plaid-chauffant", place: "right-4 top-4 sm:right-6 sm:top-6", delay: "-2.5s" },
];

// Page crème : un titre, une phrase, deux boutons, et la photo d'ambiance dans un cadre arrondi.
export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");
  const featured = FEATURED.flatMap((f) => {
    const p = getProductById(f.id, locale);
    return p?.available && p.cutout ? [{ ...f, p }] : [];
  });

  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] items-center gap-8 px-4 pt-8 sm:px-8 sm:pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 lg:pt-12">
        <div className="flex flex-col items-start gap-4 sm:gap-6">
          {/* Le H1 porte ce que les gens tapent dans Google ; la phrase de marque reste en grand juste dessous. */}
          <h1 className="rise font-display text-caption font-bold tracking-wide text-braise-2 uppercase">
            {t("heroKicker")}
          </h1>
          <p className="rise -mt-2 font-display text-display font-semibold [text-wrap:balance] [--d:40ms] sm:-mt-4">
            {t("heroHeadline")}
          </p>
          <p className="rise max-w-[44ch] text-body [--d:90ms]">{t("heroLead")}</p>
          <div className="rise mt-1 flex flex-wrap gap-4 [--d:180ms]">
            <Link href="/collection" className="btn btn-braise btn-lg no-underline">
              {t("heroCtaPrimary")}
            </Link>
            <a href={`/${locale}#pack`} className="btn btn-outline btn-lg no-underline">
              {t("heroCtaSecondary")}
            </a>
          </div>
        </div>
        <div className="relative">
          <span aria-hidden="true" className="hero-glow pointer-events-none absolute -inset-8 sm:-inset-12" />
          <div className="tile on-cream-2 aspect-[3/2] lg:aspect-[4/3]">
            <Image
              src={deco("hero")}
              alt={t("heroImageAlt")}
              fill
              priority
              fetchPriority="high"
              quality={60}
              sizes="(min-width: 1024px) 620px, calc(100vw - 32px)"
              className="kenburns object-cover"
            />
            {featured.map(({ id, place, delay, p }) => (
              <Link
                key={id}
                href={{ pathname: "/produits/[slug]", params: { slug: p.slug } }}
                prefetch={false}
                style={{ animationDelay: delay }}
                className={`keep-light float absolute ${place} flex max-w-[62%] items-center gap-2 rounded bg-paper/95 py-2 pr-4 pl-2 no-underline shadow-elevated sm:gap-4 sm:pr-6`}
              >
                <span className="relative block h-10 w-10 flex-none rounded-full bg-miel sm:h-12 sm:w-12">
                  <Image src={p.cutout!} alt="" width={48} height={48} loading="lazy" fetchPriority="low" className="h-full w-full object-contain p-1" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-display text-caption font-semibold">{p.name}</span>
                  <span className="text-caption font-bold text-braise-2">{formatPrice(p.price, locale)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
