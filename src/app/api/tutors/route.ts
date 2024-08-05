import { ZonedDateTime } from "@internationalized/date";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const headers = new Headers();

    headers.append("Access-Control-Request-Headers", "*");
    headers.append("api-key", process.env.MONGO_API_KEY || "");
    headers.append("Content-Type", "application/json");

    if (searchParams.size > 0) {
      const body = {
        collection: process.env.MONGO_COLLECTION,
        database: process.env.MONGO_DATABASE,
        dataSource: process.env.MONGO_DATA_SOURCE,
        filter: {},
        projection: {},
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

      const data = await res.json();

      return NextResponse.json(data, { status: res.status });
    } else {
      const body = {
        collection: process.env.MONGO_COLLECTION,
        database: process.env.MONGO_DATABASE,
        dataSource: process.env.MONGO_DATA_SOURCE,
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
    const req: ZonedDateTime[][] = await request.json();

    const email = searchParams.get("email");
    const date = (searchParams.get("date") || "").toString();

    const headers = new Headers();
    headers.append("Access-Control-Request-Headers", "*");
    headers.append("api-key", process.env.MONGO_API_KEY || "");
    headers.append("Content-Type", "application/json");

    const findBody = {
      collection: process.env.MONGO_COLLECTION,
      database: process.env.MONGO_DATABASE,
      dataSource: process.env.MONGO_DATA_SOURCE,
      filter: {
        email: email,
        schedule: {
          $elemMatch: {
            date: date,
          },
        },
      },
    };

    const findRes = await fetch(process.env.MONGO_URI + "/action/find", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(findBody),
    });

    const findData = await findRes.json();

    const exists = findData["documents"].length === 0;

    const scheduleBuilder = (schedule: ZonedDateTime[][]) => {
      let mongoSchedule: string[] = [];
      for (let row of schedule) {
        mongoSchedule.push(
          `${row[0].hour}:${row[0].minute}:${row[0].second}-${row[1].hour}:${row[1].minute}:${row[1].second}`,
        );
      }

      return mongoSchedule;
    };

    let schedule = scheduleBuilder(req);

    if (!exists) {
      const body = {
        userEmail: email,
        date: date,
        schedule: schedule,
      };

      const res = await fetch(`${process.env.MONGO_ARRAY}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    } else {
      const body = {
        collection: process.env.MONGO_COLLECTION,
        database: process.env.MONGO_DATABASE,
        dataSource: process.env.MONGO_DATA_SOURCE,
        filter: {
          email: email,
        },
        update: {
          $push: {
            schedule: {
              date: date,
              times: schedule,
            },
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
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const headers = new Headers();
  headers.append("Access-Control-Request-Headers", "*");
  headers.append("api-key", process.env.MONGO_API_KEY || "");
  headers.append("Content-Type", "application/json");

  const email = (await request.json())["email"];

  const body = {
    collection: process.env.MONGO_COLLECTION,
    database: process.env.MONGO_DATABASE,
    dataSource: process.env.MONGO_DATA_SOURCE,
    filter: {
      email: email,
    },
  };

  const res = await fetch(process.env.MONGO_URI + "/action/deleteOne", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(request: NextRequest) {
  const headers = new Headers();
  headers.append("Access-Control-Request-Headers", "*");
  headers.append("api-key", process.env.MONGO_API_KEY || "");
  headers.append("Content-Type", "application/json");

  const req = await request.json();

  const email = req["email"];
  const active = req["active"];

  const body = {
    collection: process.env.MONGO_COLLECTION,
    database: process.env.MONGO_DATABASE,
    dataSource: process.env.MONGO_DATA_SOURCE,
    filter: {
      email: email,
    },
    update: {
      $set: {
        active: active,
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
}
export const runtime = "edge";
