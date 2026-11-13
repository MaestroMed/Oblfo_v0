import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminAuthorized } from "./lib/admin-auth";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

// Routage des locales (préfixe /fr ou /en, négociation sur /) ; /admin passe par le mot de passe.
export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!process.env.ADMIN_PASSWORD) return new NextResponse("Not found", { status: 404 });
    if (!isAdminAuthorized(request.headers.get("authorization"))) {
      return new NextResponse("Accès réservé", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Obflo admin", charset="UTF-8"' },
      });
    }
    return NextResponse.next();
  }
  return intl(request);
}

export const config = {
  // Tout sauf les API, les internes Next et les fichiers statiques.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
