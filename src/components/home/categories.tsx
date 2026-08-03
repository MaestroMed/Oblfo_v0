import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Category } from "@/data/catalog-types";
import { CATEGORY_SLUGS } from "@/data/category-slugs";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const cards: {
  category: Category;
  image: string;
  kickerKey: "catHands" | "catFeet" | "catDesk" | "catRoom";
  labelKey: "catHandsLabel" | "catFeetLabel" | "catDeskLabel" | "catRoomLabel";
}[] = [
  {
    category: "mains",
    image: "/images/home/cat-mains.jpg",
    kickerKey: "catHands",
    labelKey: "catHandsLabel",
  },
  {
    category: "pieds",
    image: "/images/home/cat-pieds.jpg",
    kickerKey: "catFeet",
    labelKey: "catFeetLabel",
  },
  {
    category: "bureau",
    image: "/images/home/cat-bureau.jpg",
    kickerKey: "catDesk",
    labelKey: "catDeskLabel",
  },
  {
    category: "piece",
    image: "/images/home/cat-piece.jpg",
    kickerKey: "catRoom",
    labelKey: "catRoomLabel",
  },
];

export function Categories() {
  const t = useTranslations("HomeV2");
  const locale = useLocale() as Locale;

  return (
    <section className="bg-cream">
      <div className="mx-auto -mt-[110px] max-w-[1280px] px-8">
        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          {cards.map((card) => {
            return (
              <Link
                key={card.category}
                href={{
                  pathname: "/collection/[category]",
                  params: { category: CATEGORY_SLUGS[card.category][locale] },
                }}
                className="group relative aspect-[4/3.4] overflow-hidden rounded-2xl border border-black/40 bg-espresso-2 no-underline shadow-[0_24px_60px_-28px_rgba(22,17,12,0.7)] transition-transform duration-[250ms] hover:-translate-y-1"
              >
                <Image
                  src={card.image}
                  alt={t(card.labelKey)}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,8,0)_35%,rgba(16,12,8,0.92)_100%)]" />
                <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-copper">
                      {t(card.kickerKey)}
                    </span>
                    <span className="text-[15px] font-semibold text-[#F5EFE6]">
                      {t(card.labelKey)}
                    </span>
                  </div>
                  <span className="text-lg text-accent transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
