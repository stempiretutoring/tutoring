"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableColumn,
  TableBody,
  TableRow,
  TableHeader,
  Divider,
} from "@nextui-org/react";
import ProfileClient from "./set-time";

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

      {!isTutor && (
        <>
          <Table aria-label="Purchase History" className="mx-auto my-5 w-5/6">
            <TableHeader>
              <TableColumn> Date </TableColumn>
              <TableColumn> Price </TableColumn>
              <TableColumn> Item </TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No purchase history found"}>
              {[]}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
