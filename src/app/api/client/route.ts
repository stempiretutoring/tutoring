import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const headers = new Headers();

    headers.append("Access-Control-Request-Headers", "*");
    headers.append("api-key", process.env.MONGO_API_KEY || "");
    headers.append("Content-Type", "application/json");

    const body = {
      collection: process.env.MONGO_CLIENT_COLLECTION,
      database: process.env.MONGO_DATABASE,
      dataSource: process.env.MONGO_DATA_SOURCE,
      filter: {
        email: searchParams.get("email") || "",
      },
    };

    const res = await fetch(process.env.MONGO_URI + "/action/findOne", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { message: "Error fetching data", error: e },
      { status: 500 },
    );
  }
}

export const runtime = 'edge';
