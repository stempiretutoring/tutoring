import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    if (searchParams.has("name")) {
      const name = searchParams.get("name");
      let config = {
        method: "post",
        url: process.env.MONGO_URI + "/action/findOne",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.MONGO_API_KEY,
        },
        data: {
          collection: "Tutors",
          database: "Tutoring",
          dataSource: "studyDB",
          filter: {
            name: name,
          },
        },
      };

      return axios(config)
        .then((res) =>
          NextResponse.json(JSON.stringify(res.data), { status: 200 }),
        )
        .catch((err) => NextResponse.json(err, { status: 500 }));
    } else {
      let config = {
        method: "post",
        url: process.env.MONGO_URI + "/action/find",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.MONGO_API_KEY,
        },
        data: {
          collection: "Tutors",
          databse: "Tutoring",
          dataSource: "studyDB",
          filter: {},
        },
      };
      return axios(config)
        .then((res) =>
          NextResponse.json(JSON.stringify(res.data), { status: 200 }),
        )
        .catch((err) => NextResponse.json(err, { status: 500 }));
    }
  } catch (e) {
    console.error(e);

    return NextResponse.json({ err: "Error fetching data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    const data = await request.formData();

    const config = {
      method: "post",
      url: process.env.MONGO_URI + "/action/updateOne",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": process.env.MONGO_API_KEY,
      },
      data: {
        dataSource: "studyDB",
        database: "Tutoring",
        collection: "Tutors",
        filter: { name: name },
        update: {
          $set: {
            startTime: [
              data.get("monday-start-time"),
              data.get("tuesday-start-time"),
              data.get("wednesday-start-time"),
              data.get("thursday-start-time"),
              data.get("friday-start-time"),
              data.get("saturday-start-time"),
              data.get("sunday-start-time"),
            ],
            endTime: [
              data.get("monday-end-time"),
              data.get("tuesday-end-time"),
              data.get("wednesday-end-time"),
              data.get("thursday-end-time"),
              data.get("friday-end-time"),
              data.get("saturday-end-time"),
              data.get("sunday-end-time"),
            ],
          },
        },
      },
    };

    return axios(config)
      .then((res) =>
        NextResponse.json(JSON.stringify(res.data), { status: 200 }),
      )
      .catch((err) => NextResponse.json(err, { status: 500 }));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
