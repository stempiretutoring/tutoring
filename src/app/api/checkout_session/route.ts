import { NextRequest, NextResponse } from "next/server";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0/edge";
import { headers } from "next/headers";
import { CartItem } from "../types";
import stripe from "@/app/config/stripe";

export const POST = withApiAuthRequired(async function checkout(
  req: NextRequest,
) {
  const res = new NextResponse();
  const { user } = await getSession(req, res);
  const headersList = headers();
  const item: CartItem = await req.json();

  const lineItems = {
    price_data: {
      currency: item.currency,
      product_data: {
        name: item.name,
        description: "Make sure to use the same email as when you signed up"
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItems],
      mode: "payment",
      ui_mode: "embedded",
      return_url: `${headersList.get("origin")}/complete?user=${user.name}`,
      payment_intent_data: {
        metadata: item.metadata,
      },
      submit_type: "book",
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error creating checkout session" });
  }
});

export const runtime = "edge";
