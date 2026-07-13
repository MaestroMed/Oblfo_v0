import { notFound } from "next/navigation";

// Toute route inconnue sous /[locale] déclenche la 404 localisée.
export default function CatchAllPage() {
  notFound();
}
