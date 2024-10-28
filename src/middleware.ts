import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Authenticated from "./app/(auth)/authenticated";
import { unauthenticatedRoutes } from "./constants";
import { getProfile } from "./actions/user";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fetch user data
  const profile = await getProfile();
  const isAuthenticated = Authenticated();
  const isUnauthenticatedRoute = unauthenticatedRoutes.some((route) =>
    pathname.startsWith(route.path)
  );

  // Handle redirections based on path, authentication, and role
  if (pathname === "/admin")
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  if (pathname === "/admin/dashboard" && profile.role.name !== "admin")
    return NextResponse.error();

  if (isUnauthenticatedRoute) {
    if (isAuthenticated)
      return NextResponse.redirect(new URL("/", request.url));
  } else {
    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/login", request.url));
    if (pathname === "/quizzes" || pathname === "/quiz")
      return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
