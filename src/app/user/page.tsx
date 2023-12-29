"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Link, Image } from "@nextui-org/react";
import Tutor from "./components/tutor";

export default function App() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {user && (
        <div>
          <Image src={user.picture || ""} alt={user.name || ""} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <Tutor email={user.email || ""} />
        </div>
      )}
      {!user && (
        <div>
          <h1>You&aposre not logged in!</h1>
          <Link href="/login" showAnchorIcon>
            {" "}
            Login Here!
          </Link>
        </div>
      )}
    </>
  );
}
