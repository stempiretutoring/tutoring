import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const headers = new Headers();
  const { searchParams } = new URL(request.url);

  headers.append("Access-Control-Request-Headers", "*");
  headers.append("api-key", process.env.MONGO_API_KEY || "");
  headers.append("Content-Type", "application/json");

  const body = {
    collection: process.env.MONGO_CLIENT_COLLECTION,
    database: process.env.MONGO_DATABASE,
    dataSource: process.env.MONGO_DATA_SOURCE,
    filter: {
      email: decodeURIComponent(searchParams.get("user") || ""),
    },
  };

  const res = await fetch(process.env.MONGO_URI + "/action/findOne", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  const fin = data["document"]["purchases"];

  return NextResponse.json(fin);
}

export const runtime = "edge";
