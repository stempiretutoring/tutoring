"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { CartItem } from "../api/types";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

interface payProps {
  id: string,
  name: string,
  price: number,
  currency: string,
  quantity: number
}

export default function Pay(item: payProps) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    let body: CartItem = {
      id: "price_1OXttRG3TD0P1W4H5qwdMPp7",
      name: "tutoring",
      price: parseInt("50"),
      currency: "USD",
      quantity: 1,
    };
    fetch("/api/checkout_session", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}
