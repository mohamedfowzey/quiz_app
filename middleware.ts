import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("role")?.value;

  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/instructor") && role !== "Instructor") {
    return NextResponse.redirect(new URL("/learner/dashboard", request.url));
  }

  if (pathname.startsWith("/learner") && role !== "Student") {
    return NextResponse.redirect(
      new URL("/instructor/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/instructor/:path*", "/learner/:path*",'/change_password'],
};