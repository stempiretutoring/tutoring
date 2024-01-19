import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function isTutorMiddleware(req: NextRequest, res: NextResponse) {
  const session = await getSession(req, res);
  const user = session?.user;

  const emails: string[] = (await (
    await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/tutors")
  ).json())['res'];

  if (user) {
    const userEmail = JSON.stringify(user["user"]["email"]).replace(/"/g, "");

    return emails.includes(userEmail);
  } else {
    return false;
  }
}

export async function isAdminMiddleware(req: NextRequest, res: NextResponse) {
  const user = await getSession(req, res);

  if (user) {
    const userEmail = JSON.stringify(user["user"]["email"]).replace(/"/g, "");

    return userEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL
  } else {
    return false;
  }
}
