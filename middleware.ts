import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define supported locales
const supportedLocales = ["en", "fr", "ar"];
const defaultLocale = "en";

// This middleware runs on every request to handle locale routing
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // Check if pathname already has a supported locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname doesn't have a locale, redirect to the appropriate locale
  if (!pathnameHasLocale) {
    // Check for locale in cookie
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    const locale =
      cookieLocale && supportedLocales.includes(cookieLocale)
        ? cookieLocale
        : defaultLocale;

    // Build the new URL with the locale prefix
    const newUrl = new URL(
      `/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
      request.url
    );

    // Preserve query parameters
    newUrl.search = request.nextUrl.search;

    // Return a redirect response
    return NextResponse.redirect(newUrl);
  }

  // Continue with the request if it already has a locale
  return NextResponse.next();
}

// Configure which paths this middleware applies to
export const config = {
  matcher: [
    // Match all request paths except for those starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico, robots.txt, manifest.json (static files)
    // - public folder or API routes
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|manifest.json|logo_white.png|logo_dark.png|icon-|images|og-image|twitter-image).*)",
  ],
};
