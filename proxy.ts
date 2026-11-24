import { NextResponse, type NextRequest } from "next/server";

/**
 * English lives at the root (`/about`), French under `/fr/about`.
 * The proxy rewrites root paths to the `[locale]` route and keeps
 * `/fr` untouched, so both locales are statically generated.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return NextResponse.next();
  }

  // Normalise an explicit /en prefix back to the clean root URL.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice(3) || "/";
    return NextResponse.redirect(new URL(rest, request.url));
  }

  const target = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.rewrite(new URL(target, request.url));
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
