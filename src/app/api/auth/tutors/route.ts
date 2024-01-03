import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Request-Headers", "*");
    headers.append("api-key", process.env.MONGO_API_KEY || "");

    const res = await fetch(process.env.MONGO_DISTINCT + "?field=email", {
      method: "GET",
      headers: headers,
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    console.error(e);

    return NextResponse.json({ err: "Error fetching data" }, { status: 500 });
  }
}

export const runtime = "edge";
