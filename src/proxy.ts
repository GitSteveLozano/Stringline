import { NextResponse, type NextRequest } from "next/server";

// App areas that require a session. Auth pages and assets are excluded by the matcher.
const PROTECTED = ["/owner", "/estimator", "/foreman", "/worker", "/project", "/takeoff", "/approvals"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsAuth = PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (!needsAuth) return NextResponse.next();

  // Presence check only (Edge runtime); signature is verified server-side.
  const hasSession = Boolean(req.cookies.get("sl_session")?.value);
  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/signin";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/owner/:path*", "/estimator/:path*", "/foreman/:path*", "/worker/:path*", "/project/:path*", "/takeoff/:path*", "/approvals/:path*"],
};
