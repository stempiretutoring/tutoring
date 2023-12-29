import { client } from "../../connect";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await client.connect();
    const databse = client.db("Tutoring");
    const tutors = databse.collection("Tutors");

    const tutorEmails = await tutors.distinct("email");

    return NextResponse.json(tutorEmails, { status: 200 });
  } catch (e) {
    console.error(e);

    return NextResponse.json({ err: "Error fetching data" }, { status: 500 });
  }
}

export const runtime = 'experimental-edge'
