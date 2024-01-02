import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const config = {
      method: "get",
      url: process.env.MONGO_DISTINCT + "?field=email",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": process.env.MONGO_API_KEY,
      },
    };

    return axios(config)
      .then((res) =>
        NextResponse.json(res.data, { status: 200 }),
      )
      .catch((err) => NextResponse.json({ error: err.data }, { status: 500 }));
  } catch (e) {
    console.error(e);

    return NextResponse.json({ err: "Error fetching data" }, { status: 500 });
  }
}

export const runtime = "edge";
