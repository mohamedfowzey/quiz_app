import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("role")?.value;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/instructor")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    else if (role == 'Student'){
      return NextResponse.redirect(new URL("/learner", request.url));
    }
  }
  else if (pathname.startsWith("/learner")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    else if (role == 'Instructor'){
      return NextResponse.redirect(new URL("/instructor", request.url));
    }
  }
  else if (pathname === "/" || pathname === '/login' || pathname === '/reset_password' || pathname === '/forget_password' || pathname === '/register') {
    if (token) {
      if (role === "Instructor") {
      return NextResponse.redirect(new URL("/instructor/dashboard", request.url));
    }
    else if (role === "Student") {
      return NextResponse.redirect(new URL("/learner/dashboard", request.url));
    }
  }
}
  

  
  

  return NextResponse.next();
}

export const config = {
  matcher: ["/instructor/:path*", "/learner/:path*", '/login', '/reset_password', '/forget_password', '/register'],

};