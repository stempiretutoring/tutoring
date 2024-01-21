import { NextResponse, NextRequest } from "next/server";
import { timeGET, tutorGET } from "../../types";
import { splitTime } from "../../lib/times";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const headers = new Headers();

  headers.append("Access-Control-Request-Headers", "*");
  headers.append("api-key", process.env.MONGO_API_KEY || "");
  headers.append("Content-Type", "application/json");

  const body = {
    collection: process.env.MONGO_COLLECTION,
    database: process.env.MONGO_DATABASE,
    dataSource: process.env.MONGO_DATA_SOURCE,
    filter: {},
  };

  if (searchParams.has("name")) {
    const name = searchParams.get("name");
    body.filter = { name: name, active: true };
  } else if (searchParams.has("email")) {
    const email = searchParams.get("email");
    body.filter = { email: email, active: true };
  }

  const res = await fetch(process.env.MONGO_URI + "/action/findOne", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const times: timeGET = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  const data: tutorGET = (await res.json())["document"];

  const booked: string[] = data["booked"];

  for (let i = 0; i < data.startTime.length; i++) {
    if (data.startTime[i] === "") {
      switch (i) {
        case 0:
          times.monday = [];
        case 1:
          times.tuesday = [];
        case 2:
          times.wednesday = [];
        case 3:
          times.thursday = [];
        case 4:
          times.friday = [];
        case 5:
          times.saturday = [];
        case 6:
          times.sunday = [];
      }
    } else {
      switch (i) {
        case 0:
          times.monday = splitTime(data.startTime[i], data.endTime[i]);
        case 1:
          times.tuesday = splitTime(data.startTime[i], data.endTime[i]);
        case 2:
          times.wednesday = splitTime(data.startTime[i], data.endTime[i]);
        case 3:
          times.thursday = splitTime(data.startTime[i], data.endTime[i]);
        case 4:
          times.friday = splitTime(data.startTime[i], data.endTime[i]);
        case 5:
          times.saturday = splitTime(data.startTime[i], data.endTime[i]);
        case 6:
          times.sunday = splitTime(data.startTime[i], data.endTime[i]);
      }
    }
  }

  return NextResponse.json({ times: times, booked: booked }, { status: 200 });
}

export const runtime = "edge";
