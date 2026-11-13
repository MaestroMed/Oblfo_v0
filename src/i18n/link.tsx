"use client";

import type { ComponentProps } from "react";
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

const nav = createNavigation(routing);
type Props = ComponentProps<typeof nav.Link>;

// Brief perf : moins de 45 requêtes au chargement. Next préchargeait chaque lien visible ;
// ici la page suivante n'est préchargée qu'au survol, au focus ou au toucher.
export function Link({ prefetch, onPointerEnter, onFocus, onTouchStart, ...props }: Props) {
  const router = nav.useRouter();
  if (prefetch !== undefined) return <nav.Link prefetch={prefetch} {...{ onPointerEnter, onFocus, onTouchStart }} {...props} />;
  const warm = () => router.prefetch(props.href as Parameters<typeof router.prefetch>[0]);
  return (
    <nav.Link
      {...props}
      prefetch={false}
      onPointerEnter={(e) => {
        warm();
        onPointerEnter?.(e);
      }}
      onFocus={(e) => {
        warm();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        warm();
        onTouchStart?.(e);
      }}
    />
  );
}
