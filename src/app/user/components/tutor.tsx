"use client";
import React, { useEffect, useState, useCallback, Key } from "react";
import {
  Table,
  TableColumn,
  TableBody,
  TableRow,
  TableHeader,
  Divider,
  Chip,
  Textarea,
  Button,
  Spacer,
} from "@nextui-org/react";
import CalTime from "./new-cal";
import Client from "./client";
//import { columns } from "./lib/data";
import { clientGET } from "@/app/api/types";
import { IoSend } from "react-icons/io5";

interface tutorProps {
  email: string;
}

export default function Tutor({ email }: tutorProps) {
  const [isTutor, setIsTutor] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("");
  const [tag, setTag] = useState<string>("");

  const handleTagSubmit = () => {
    fetch(`/api/tutors?email=${email}`, {
      method: "PATCH",
      body: JSON.stringify({
        occupation: tag,
      }),
    });
  };

  const handleBioSubmit = () => {
    fetch(`/api/tutors?email=${email}`, {
      method: "PATCH",
      body: JSON.stringify({
        bio: bio,
      }),
    });
  };

  useEffect(() => {
    fetch(`/api/tutors?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setTag(data["document"]["occupation"]);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, [email]);

  useEffect(() => {
    fetch(`/api/tutors?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setBio(data["document"]["bio"]);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, [email]);

  useEffect(() => {
    fetch(`/api/auth/tutors?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setIsTutor(data["res"].includes(email) ? true : false);
        console.log(data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, [email]);

  const renderCell = useCallback((rowValue: clientGET, columnKey: Key) => {
    switch (columnKey) {
      case "date":
        return rowValue.purchases[2];
      case "time":
        return rowValue.purchases[3];
      case "subject":
        return <Chip className="p-1 m-1 text-md">{rowValue.purchases[1]}</Chip>;
      case "desription":
        return rowValue.purchases[4];
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      {isTutor && (
        <div>
          <Divider className="my-2" />
          <h1 className="text-3xl font-bold mb-5 w-full flex justify-center content-center my-2 underline mx-auto">
            Profile Info
          </h1>
          <div className="w-full m-4 flex justify-center content-center">
            <div className="w-full flex flex-col gap-2 max-w-3xl mr-2">
              <div className="w-full flex">
                <div className="w-full flex flex-col">
                  <Textarea
                    variant="faded"
                    value={bio}
                    onValueChange={setBio}
                    label="Bio"
                    labelPlacement="inside"
                    placeholder="Write a small blurb about yourself!"
                    maxRows={3}
                  />
                  <Button
                    className="w-full mt-1"
                    isIconOnly
                    onClick={handleBioSubmit}
                    color="success"
                  >
                    <IoSend />
                  </Button>
                </div>
                <Spacer x={2} />
                <div className="w-full flex flex-col">
                  <Textarea
                    variant="faded"
                    value={tag}
                    onValueChange={setTag}
                    label="Occupation"
                    labelPlacement="inside"
                    placeholder="Quick tagline"
                    maxRows={3}
                  />
                  <Button
                    className="w-full mt-1"
                    isIconOnly
                    onClick={handleTagSubmit}
                    color="success"
                  >
                    <IoSend />
                  </Button>
                </div>
              </div>

              <CalTime />
            </div>
          </div>
        </div>
      )}
      {!isTutor && <Client email={email} />}
    </div>
  );
}
