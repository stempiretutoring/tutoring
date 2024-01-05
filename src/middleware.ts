import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminMiddleware, isTutorMiddleware } from "./app/api/user";

// DOC: middleware to only allow whitelisted tutors to view the freetime set page
export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest,
) {
  if (req.nextUrl.pathname.startsWith("/user/set-time")) {
    const res = NextResponse.next();

    if (!(await isTutorMiddleware(req, res))) {
      return NextResponse.rewrite(new URL("/not-allowed", req.url));
    }
    return res;
  }

  if (req.nextUrl.pathname.startsWith("/user/admin")) {
    const res = NextResponse.next();
    if (!(await isAdminMiddleware(req, res))) {
      return NextResponse.rewrite(new URL("/not-allowed", req.url));
    }
    return res;
  }
});

