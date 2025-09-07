import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./lib/cookies";

const PUBLIC_PATHS = ["/login", "/register", "/"];
const PRIVATE_PATHS = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;

  if (
        pathname.startsWith("/_next/") ||
        pathname.includes(".") ||
        pathname.startsWith("/api/auth/")
    ) {
        return NextResponse.next();
    }

    const token = await getToken("access_token");
    const isExpired = token === null;

    if (PUBLIC_PATHS.includes(pathname) && !isExpired) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (PRIVATE_PATHS.includes(pathname) && isExpired) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};