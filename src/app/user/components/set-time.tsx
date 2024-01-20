"use client";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Button,
  Input,
  Link,
  CheckboxGroup,
  Checkbox,
  Tooltip,
} from "@nextui-org/react";

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const [selected, setSelected] = useState<string[]>([]);

  const setTime = (formData: FormData) => {
    formData.append('noDays', selected.toString());
    fetch(`/api/tutors?email=${user?.email}`, {
      method: "POST",
      body: formData,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {user && (
        <form action={setTime}>
          <div className="grid grid-col-4 gap-4 justify-center">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <div key={day} className="flex items-center">
                <Tooltip
                  content={`Select if you do not wish to tutor on ${day}`}
                >
                  <CheckboxGroup
                    color="danger"
                    value={selected}
                    onValueChange={setSelected}
                  >
                    <Checkbox value={day}></Checkbox>
                  </CheckboxGroup>
                </Tooltip>
                <label
                  htmlFor={`${day.toLowerCase()}-start-time`}
                  className="block text-xl font-medium text-gray-700 mr-2"
                >
                  {day}
                </label>
                <Input
                  type="time"
                  name={`${day.toLowerCase()}-start-time`}
                  className="block w-full rounded-md col-span-1 shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                />
                <h1 className="text-2xl inline whitespace-nowrap col-span-1 mx-0 text-gray-400">
                  -
                </h1>
                <Input
                  type="time"
                  name={`${day.toLowerCase()}-end-time`}
                  className="block w-full rounded-md shadow-sm border-gray-300 col-span-1 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ml-2"
                />
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <Button color="primary" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
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
