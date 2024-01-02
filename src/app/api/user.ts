import { getSession } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function isTutor(req: NextRequest, res: NextResponse) {
  const user = await getSession(req, res);

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
