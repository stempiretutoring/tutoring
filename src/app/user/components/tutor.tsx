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
} from "@nextui-org/react";
import ProfileClient from "./set-time";
import Client from "./client";
import { columns } from "./lib/data";
import { clientGET } from "@/app/api/types";

interface tutorProps {
  email: string;
}
export default function Tutor({ email }: tutorProps) {
  const [isTutor, setIsTutor] = useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/auth/tutors?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setIsTutor(data["res"].includes(email) ? true : false);
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
          <h1 className="text-lg w-full flex justify-center content-center my-2 underline mx-auto">
            Set your schedule
          </h1>
          <ProfileClient />
        </div>
      )}
      {!isTutor && <Client email={email} />}
    </div>
  );
}
