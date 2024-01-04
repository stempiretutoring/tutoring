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
        collection: process.env.MONGO_COLLECTION,
        database: process.env.MONGO_DATABASE,
        dataSource: process.env.MONGO_DATA_SOURCE,
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
    const form = await request.formData();
    const name = searchParams.get("name");

    const headers = new Headers();
    headers.append("Access-Control-Request-Headers", "*");
    headers.append("api-key", process.env.MONGO_API_KEY || "");
    headers.append("Content-Type", "application/json");

    const body = {
      collection: process.env.MONGO_COLLECTION,
      database: process.env.MONGO_DATABASE,
      dataSource: process.env.MONGO_DATA_SOURCE,
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
  // TODO : get the current active status and negate it
  // will need to change the request body so that instead of containing the 
  // actual update syntax it tells what value to update
  // maybe it's easier to just have an update button in which you can change any value?
  const headers = new Headers();
  headers.append("Access-Control-Request-Headers", "*");
  headers.append("api-key", process.env.MONGO_API_KEY || "");
  headers.append("Content-Type", "application/json");

  const email = (await request.json())["email"];
  const update = (await request.json())['update']

  const body = {
    collection: process.env.MONGO_COLLECTION,
    database: process.env.MONGO_DATABASE,
    dataSource: process.env.MONGO_DATA_SOURCE,
    filter: {
      email: email,
    },
    update: {
      update
    }
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
