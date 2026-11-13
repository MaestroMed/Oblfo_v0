import Image from "next/image";
import { useTranslations } from "next-intl";
import { formatPrice, getProductById } from "@/data/catalog";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { deco } from "@/lib/tile";

// Les deux produits poussés en publicité, posés sur la photo d'ambiance.
const FEATURED = [
  { id: "gilet-chauffant", place: "left-3 bottom-3 sm:left-5 sm:bottom-5", delay: "0s" },
  { id: "plaid-chauffant", place: "right-3 top-3 sm:right-5 sm:top-5", delay: "-2.5s" },
] as const;

// Page crème : un titre, une phrase, deux boutons, et la photo d'ambiance dans un cadre arrondi.
export function Hero({ locale }: { locale: Locale }) {
  const t = useTranslations("HomeV2");
  const featured = FEATURED.flatMap((f) => {
    const p = getProductById(f.id, locale);
    return p?.available && p.cutout ? [{ ...f, p }] : [];
  });

  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-[1240px] items-center gap-7 px-4 pt-8 sm:px-8 sm:pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 lg:pt-14">
        <div className="flex flex-col items-start gap-4 sm:gap-6">
          {/* Le H1 porte ce que les gens tapent dans Google ; la phrase de marque reste en grand juste dessous. */}
          <h1 className="rise font-display text-[16px] font-bold tracking-wide text-braise-2 uppercase sm:text-[17px]">
            {t("heroKicker")}
          </h1>
          <p className="rise -mt-2 font-display text-[clamp(40px,10.5vw,76px)] leading-none font-semibold [text-wrap:balance] [--d:40ms] sm:-mt-3">
            {t("heroHeadline")}
          </p>
          <p className="rise max-w-[44ch] text-[18px] leading-relaxed [--d:90ms] sm:text-[20px]">{t("heroLead")}</p>
          <div className="rise mt-1 flex flex-wrap gap-3 [--d:180ms]">
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
                className={`float absolute ${place} flex max-w-[62%] items-center gap-2 rounded-full bg-paper/95 py-1.5 pr-4 pl-1.5 no-underline shadow-[0_10px_24px_rgb(59_22_13/0.22)] sm:gap-3 sm:pr-5`}
              >
                <span className="relative block h-10 w-10 flex-none rounded-full bg-miel sm:h-12 sm:w-12">
                  <Image src={p.cutout!} alt="" width={48} height={48} loading="lazy" fetchPriority="low" className="h-full w-full object-contain p-1" />
                </span>
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="truncate font-display text-[16px] font-semibold sm:text-[16px]">{p.name}</span>
                  <span className="text-[16px] font-bold text-braise-2 sm:text-[16px]">{formatPrice(p.price, locale)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
