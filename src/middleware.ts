// middleware.js
import {
  withMiddlewareAuthRequired,
  getSession,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// DOC: middleware to only allow whitelisted tutors to view the freetime set page
export default withMiddlewareAuthRequired(async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const user = await getSession(req, res);

  const emails: string[] = await (await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/tutors')).json();

  console.log(emails);
  
  if (user) {
    const userEmail = (JSON.stringify(user['user']['email'])).replace(/"/g, '');
    console.log(userEmail);
    console.log(userEmail === emails[0]);
    if (!emails.includes(userEmail)) {
       return NextResponse.rewrite(new URL('/not-allowed', req.url)) 
    }
    return res;
  }
});

export const config = {
  matcher: '/user/tutor' 
}
