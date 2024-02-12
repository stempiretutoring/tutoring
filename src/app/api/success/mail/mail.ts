import { sendMailProps } from "../../types";

const MJ_APIKEY_PUBLIC = process.env.MJ_APIKEY_PUBLIC || "your-api-key";
const MJ_APIKEY_PRIVATE = process.env.MJ_APIKEY_PRIVATE || "your-api-secret";

export async function sendMail(recipient: sendMailProps) {
  const sender = process.env.MJ_SENDER || "";
  const data = {
    Messages: [
      {
        From: {
          Email: sender,
          Name: "STEMpire Tutoring",
        },
        To: [
          {
            Email: recipient.email,
            Name: recipient.name,
          },
        ],
        Subject: `Tutoring Session with ${recipient.child}`,
        TextPart: `${recipient.name} -\n you have been booked for a tutoring session with  ${recipient.child} for ${recipient.subject} on ${recipient.date} from ${recipient.time}. The parent has provided the below description about the child:\n${recipient.about}\nYou can contact the parent at ${recipient.parentEmail} and their preferred meeting style is ${recipient.meeting}`,
      },
    ],
  };

  await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(`${MJ_APIKEY_PUBLIC}:${MJ_APIKEY_PRIVATE}`).toString(
          "base64",
        ),
    },
    body: JSON.stringify(data),
  });

  const copyData = {
    Messages: [
      {
        From: {
          Email: sender,
          Name: "STEMpire Tutoring",
        },
        To: [
          {
            Email: recipient.parentEmail,
            Name: recipient.child,
          },
        ],
        Subject: `STEMpire Confirmation`,
        TextPart: `You have booked a tutoring session with  ${recipient.name} for ${recipient.subject} on ${recipient.date} from ${recipient.time}. You provided the below description about your child:\n${recipient.about}\nand set your preferred meeting style as ${recipient.meeting}\nYou can contact the tutor at ${recipient.email}`,
      },
    ],
  };

  await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(`${MJ_APIKEY_PUBLIC}:${MJ_APIKEY_PRIVATE}`).toString(
          "base64",
        ),
    },
    body: JSON.stringify(copyData),
  });
}
