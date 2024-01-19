import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "./mail";
import { sendMailProps } from "../../types";

export async function POST(request: NextRequest) {
  const formData: FormData = await request.formData();
  const props: sendMailProps = {
    child: formData.get("child")?.toString() || "",
    email: "",
    about: formData.get("about")?.toString() || "",
    meeting: formData.get("meeting")?.toString() || "",
    name: formData.get("tutor")?.toString() || "",
    subject: formData.get("subject")?.toString() || "",
    date: formData.get("date")?.toString() || "",
    time: formData.get("time")?.toString() || "",
    parentEmail: formData.get("parentEmail")?.toString() || "",
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Request-Headers", "*");
  headers.append("api-key", process.env.MONGO_API_KEY || "");

  const body = {
    collection: process.env.MONGO_COLLECTION,
    database: process.env.MONGO_DATABASE,
    dataSource: process.env.MONGO_DATA_SOURCE,
    filter: {
      name: props.name,
    },
  };

  const res = await fetch(process.env.MONGO_URI + "/action/findOne", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  props.email = data["document"]["email"];

  const mail = await sendMail(props);

  return NextResponse.json({ body: mail }, { status: 200 });
}

export const runtime = 'edge';
