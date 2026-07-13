import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Routage des locales (préfixe /fr ou /en, négociation sur /).
export default createMiddleware(routing);

export const config = {
  // Tout sauf les API, les internes Next et les fichiers statiques.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
