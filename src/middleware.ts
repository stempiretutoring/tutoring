import {
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTutorMiddleware } from "./app/api/user";

// DOC: middleware to only allow whitelisted tutors to view the freetime set page
export default withMiddlewareAuthRequired(async function middleware(
  req: NextRequest,
) {
  const res = NextResponse.next();

  if (!(await isTutorMiddleware(req, res))) {
    return NextResponse.rewrite(new URL("/not-allowed", req.url));
  }
  return res;
});

export const config = {
  matcher: "/user/set-time",
};
