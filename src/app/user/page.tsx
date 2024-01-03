"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Link,
  User,
  Button,
  Spinner,
} from "@nextui-org/react";
import Tutor from "./components/tutor";

export default function App() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div className="center-all">
      <Spinner label="Loading..." />
    </div>;
  }
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {user && (
        <>
          <div className="flex justify-content">
            <h1 className="text-xl mx-5 italic">Current User:</h1>
            <User
              name={user.name}
              avatarProps={{ src: user.picture || "user" }}
              description={user.email}
            />
            <Button className="ml-4" color="danger">
              <Link color="foreground" href="/api/auth/logout">
              Log Out
              </Link>
            </Button>
          </div>
          <Tutor email={user.email || ""} />
        </>
      )}
      {!user && (
        <div>
          <h1>You&aposre not logged in!</h1>
          <Link href="/login" showAnchorIcon>
            Login Here!
          </Link>
        </div>
      )}
    </>
  );
}
