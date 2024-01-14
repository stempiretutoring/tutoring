import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { CartItem } from "../types";
import stripe from "@/app/config/stripe";

export async function POST(req: NextRequest, res: NextResponse) {
  const headersList = headers();
  const item: CartItem = await req.json();

  const lineItems = {
    price_data: {
      currency: item.currency,
      product_data: {
        name: item.name,
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
      return_url: `${headersList.get("origin")}/`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error creating checkout session" });
  }
}

export const runtime = 'edge'
