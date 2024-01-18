import Mailjet from "node-mailjet";
import { sendMailProps } from "../types";

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || "your-api-key",
  apiSecret: process.env.MJ_APIKEY_PRIVATE || "your-api-secret",
});

export async function sendMail(recipient: sendMailProps) {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "jedimaster3284@gmail.com",
          Name: "Mailjet Pilot",
        },
        To: [
          {
            Email: recipient.email,
            Name: recipient.name,
          },
        ],
        Subject: `Tutoring Session with ${recipient.child}`,
        TextPart: `${recipient.name} -\n you have been booked for a tutoring session with  ${recipient.child} for ${recipient.subject} on date. The parent has provided the below description about the child:\n${recipient.about}\nYou can contact the parent at ${recipient.parentEmail} and their preferred meeting style is ${recipient.meeting}`,
      },
    ],
  });

  request
    .then((result) => {
      return result.body;
    })
    .catch((err) => {
      return err.statusCode;
    });
}
