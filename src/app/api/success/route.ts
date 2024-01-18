import { NextResponse, NextRequest } from "next/server";
import { sendMail } from "./mail";
import { sendMailProps } from "../types";

export async function POST(request: NextRequest) {
  const form: FormData = await request.formData();

  const headers = new Headers();

  headers.append("Access-Control-Request-Headers", "*");
  headers.append("api-key", process.env.MONGO_API_KEY || "");
  headers.append("Content-Type", "application/json");

  const email: sendMailProps = {
    parentEmail: form.get("email")?.toString() || "",
    email: "",
    about: form.get("about")?.toString() || "",
    child: form.get("child")?.toString() || "",
    meeting: form.get("meeting")?.toString() || "",
    name: form.get("tutor")?.toString() || "",
    subject: form.get("subject")?.toString() || "",
  };

  const body = {
    collection: process.env.MONGO_COLLECTION,
    database: process.env.MONGO_DATABASE,
    dataSource: process.env.MONGO_DATA_SOURCE,
    filter: {
      name: email.name,
    },
  };

  const res = await fetch(process.env.MONGO_URI + "/action/findOne", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const data = await res.json();

  email.email = data["document"]["email"];

  const mail = sendMail(email);

  return NextResponse.json(mail);
}

export const runtime = 'edge';
