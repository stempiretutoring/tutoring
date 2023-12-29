import { client } from "../connect";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await client.connect();

    const { searchParams } = new URL(request.url);
    const databse = client.db("Tutoring");
    const tutors = databse.collection("Tutors");

    if (searchParams.has("name")) {
      const name = searchParams.get("name");
      const tutor = tutors.find({ name: name });

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

export async function POST(request: NextRequest) {
  try {
    await client.connect();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    console.log(name)
    
    const database = client.db("Tutoring");
    const tutors = database.collection("Tutors");

    const data = await request.formData()

    tutors.updateOne(
      { name: name}, 
      {
        $set: {
          'startTime': [
            data.get('monday-start-time'),
            data.get('tuesday-start-time'),
            data.get('wednesday-start-time'),
            data.get('thursday-start-time'),
            data.get('friday-start-time'),
            data.get('saturday-start-time'),
            data.get('sunday-start-time'),
          ], 
          'endTime': [
            data.get('monday-end-time'),
            data.get('tuesday-end-time'),
            data.get('wednesday-end-time'),
            data.get('thursday-end-time'),
            data.get('friday-end-time'),
            data.get('saturday-end-time'),
            data.get('sunday-end-time'),
          ]
        }
      }
    )
    console.log(data.get("monday-start-time"))
    return NextResponse.json( {message: "submitted"}, { status: 200 })
    
  } catch (e) {
    console.error(e);
  }
}
