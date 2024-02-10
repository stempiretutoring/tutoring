"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { CartItem } from "@/app/api/types";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");

  const handlePress = () => {
    const bodyPrice = parseInt("1") * 100;
    let body: CartItem = {
      id: process.env.NEXT_PUBLIC_PRICE || "",
      name: "Tutoring",
      price: bodyPrice,
      currency: "USD",
      quantity: 1,
      metadata: {
        description: `Tutoring session with Danny Chris for 1 hour and 1 student(s) for $50 on 01/01/2000 at 12:00AM`,
        tutor: "Danny Chris",
        subject: "Math",
        date: "01/01/2000",
        time: "12:00AM",
      },
    };
    fetch("/api/checkout_session", {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  };

  return (
    <div>
      <Button onPress={handlePress} color="primary">
        Checkout
      </Button>
      <div id="checkout" className="h-dvh">
        {clientSecret && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout className="size-100%" />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    </div>
  );
}
