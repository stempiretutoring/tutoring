import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAdminMiddleware, isTutorMiddleware } from "./app/api/user";

// DOC: middleware to only allow whitelisted tutors to view the freetime set page
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = req.nextUrl.clone();

  if (req.nextUrl.pathname.startsWith("/user")) {
    url.pathname = "/not-allowed";

    if (!(await isTutorMiddleware(req, res))) {
      return NextResponse.rewrite(url);
    }
    return res;
  }

  if (req.nextUrl.pathname.startsWith("/user/admin")) {
    if (!(await isAdminMiddleware(req, res))) {
      return NextResponse.rewrite(url);
    }
    return res;
  }
}
