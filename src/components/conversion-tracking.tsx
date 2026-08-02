"use client";

import { useEffect } from "react";
import { trackEvent } from "@/components/ga4";

/**
 * Suivi des trois conversions de contact : clic téléphone, clic e-mail,
 * envoi de formulaire.
 *
 * Écouteur délégué posé sur `document` plutôt que des handlers ajoutés
 * composant par composant : tout `tel:` ou `mailto:` ajouté plus tard est
 * mesuré sans intervention.
 *
 * Chaque événement porte un paramètre `source` qui dit *d'où* vient le clic
 * (header, footer, barre collante, section…) — sans lui on sait qu'on a reçu
 * dix contacts, mais pas quel emplacement les a produits.
 *
 * Les noms d'événements sont ceux du reste du parc : phone_click, email_click,
 * form_submit.
 */

/** Remonte les ancêtres pour nommer l'emplacement, du plus précis au plus vague. */
function resolveSource(start: Element | null): string {
  for (let node: Element | null = start; node; node = node.parentElement) {
    const explicit = node.getAttribute("data-analytics-source");
    if (explicit) return explicit;

    const tag = node.tagName.toLowerCase();
    if (tag === "header") return "header";
    if (tag === "footer") return "footer";
    if (tag === "nav") return "nav";

    // `className` n'est une chaîne que sur les éléments HTML — sur un SVG
    // c'est un SVGAnimatedString, d'où le contrôle de type.
    const cls = typeof node.className === "string" ? node.className : "";
    if (/\b(sticky|fixed)\b/.test(cls)) return "sticky";

    if (tag === "section" && node.id) return node.id;
  }
  return "page";
}

export function ConversionTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const source = resolveSource(link);

      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { source });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { source });
      }
    };

    const onSubmit = (event: Event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      trackEvent("form_submit", {
        source: resolveSource(form),
        form: form.getAttribute("name") || form.id || "sans-nom",
      });
    };

    // En phase de capture : l'événement est compté même si un handler en aval
    // appelle stopPropagation ou remplace la navigation.
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return null;
}
