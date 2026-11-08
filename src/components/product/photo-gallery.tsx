"use client";

import Image from "next/image";
import { useState } from "react";

// Galerie de fiche produit : photo principale + vignettes cliquables.
export function PhotoGallery({ photos, alt }: { photos: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div className="relative aspect-square overflow-hidden rounded-[22px] bg-espresso shadow-[0_40px_90px_-50px_rgba(22,17,12,0.7)]">
        <Image
          key={photos[current]}
          src={photos[current]}
          alt={alt}
          fill
          priority={current === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-5 gap-2.5">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`${alt} — photo ${i + 1}`}
            aria-pressed={i === current}
            className={`relative aspect-square overflow-hidden rounded-[12px] bg-espresso-2 outline-none transition-[box-shadow,opacity] focus-visible:ring-2 focus-visible:ring-ember ${
              i === current ? "ring-2 ring-ember" : "opacity-70 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </>
  );
}
