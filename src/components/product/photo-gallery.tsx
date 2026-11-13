"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { HeatWaves } from "@/components/ui/heat-waves";
import { TILE_CLASS, type Tile } from "@/lib/tile";

/**
 * Galerie de fiche produit : le détouré posé sur l'aplat du produit, puis les photos d'usage.
 * Bande à défilement natif (balayage au doigt) + vignettes. Sans visuel : l'aplat et les ondes.
 */
export function PhotoGallery({
  photos,
  cutout,
  tile,
  alt,
}: {
  photos: string[];
  cutout?: string;
  tile: Tile;
  alt: string;
}) {
  const t = useTranslations("ProductPage");
  const strip = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  // Le détouré vient du packshot : inutile de montrer les deux.
  const slides = cutout
    ? [cutout, ...photos.filter((src) => !src.endsWith("02-packshot.jpg"))]
    : photos;

  if (slides.length === 0) {
    return (
      <div className={`tile flex aspect-square items-center justify-center ${TILE_CLASS[tile]}`}>
        <HeatWaves className="h-28 w-28 sm:h-40 sm:w-40" />
      </div>
    );
  }

  const go = (i: number) => {
    const el = strip.current;
    // Sans `behavior` : suit le scroll-behavior CSS (fluide, sauf mouvement réduit).
    el?.scrollTo({ left: i * el.clientWidth });
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <div className={`keep-light tile aspect-square ${TILE_CLASS[tile]}`}>
        <div
          ref={strip}
          onScroll={(e) =>
            setCurrent(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))
          }
          className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((src, i) => (
            <div key={src} className="relative h-full w-full flex-none snap-center">
              <Image
                src={src}
                alt={i === 0 ? alt : `${alt} (${i + 1}/${slides.length})`}
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : undefined}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={src === cutout ? "cutout p-8 sm:p-12 lg:p-16" : "object-cover"}
              />
              {src === cutout ? (
                <HeatWaves className="absolute top-4 right-4 h-12 w-12 sm:top-8 sm:right-8 sm:h-16 sm:w-16" />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 ? (
        <div role="group" aria-label={t("galleryLabel")} className="grid grid-cols-5 gap-2 sm:gap-4">
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => go(i)}
              aria-label={t("galleryPhoto", { index: i + 1, total: slides.length })}
              aria-pressed={i === current}
              className={`relative aspect-square cursor-pointer overflow-hidden rounded border-3 ${
                i === current ? "border-choco" : "border-transparent"
              } ${src === cutout ? `keep-light ${TILE_CLASS[tile]}` : "bg-cream-2"}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="120px"
                className={src === cutout ? "object-contain p-2" : "object-cover"}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
