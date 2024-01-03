import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const headers = new Headers();

    headers.append("Access-Control-Request-Headers", "*");
    headers.append("api-key", process.env.MONGO_API_KEY || "");
    headers.append("Content-Type", "application/json");

    if (searchParams.has("name")) {
      const name = searchParams.get("name");

      const body = {
        collection: "Tutors",
        database: "Tutoring",
        dataSource: "stempireDB",
        filter: {
          name: name,
        },
      };

      const res = await fetch(process.env.MONGO_URI + "/action/findOne", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await res.json();

      return NextResponse.json(data, { status: res.status });
    } else {
      const body = {
        collection: "Tutors",
        databse: "Tutoring",
        dataSource: "stempireDB",
        filter: {},
      };

      const res = await fetch(process.env.MONGO_URI + "/action/find", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    }
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { message: "Error fetching data", error: e },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const form = await request.formData();
    const name = searchParams.get("name");

    const headers = new Headers();
    headers.append("Access-Control-Request-Headers", "*");
    headers.append("api-key", process.env.MONGO_API_KEY || "");
    headers.append("Content-Type", "application/json");

    const body = {
      dataSource: "stempireDB",
      database: "Tutoring",
      collection: "Tutors",
      filter: { name: name },
      update: {
        $set: {
          startTime: [
            form.get("monday-start-time"),
            form.get("tuesday-start-time"),
            form.get("wednesday-start-time"),
            form.get("thursday-start-time"),
            form.get("friday-start-time"),
            form.get("saturday-start-time"),
            form.get("sunday-start-time"),
          ],
          endTime: [
            form.get("monday-end-time"),
            form.get("tuesday-end-time"),
            form.get("wednesday-end-time"),
            form.get("thursday-end-time"),
            form.get("friday-end-time"),
            form.get("saturday-end-time"),
            form.get("sunday-end-time"),
          ],
        },
      },
    };

    const res = await fetch(process.env.MONGO_URI + "/action/updateOne", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export const runtime = "edge";
