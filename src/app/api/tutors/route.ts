import { client } from "../connect";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await client.connect();

    const { searchParams } = new URL(request.url);
    const databse = client.db("Tutoring");
    const tutors = databse.collection("Tutors");

    console.log(searchParams.has("name"));
    if (searchParams.has("name")) {
      const name = searchParams.get("name");
      const tutor = tutors.find({ name: name });
      
      console.log("has name");
      const all = await tutor.toArray();

      return NextResponse.json(all[0], { status: 200 });
    } else {
      const tutor = tutors.find({});

      const all = await tutor.toArray();

      return NextResponse.json(all, { status: 200 });
    }
  } catch (e) {
    console.error(e);

    return NextResponse.json({ err: "Error fetching data" }, { status: 500 });
  }
}
