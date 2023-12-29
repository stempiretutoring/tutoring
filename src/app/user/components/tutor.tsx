"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface tutorProps {
  email: string;
}

export default function Tutor({ email }: tutorProps) {
  const [isTutor, setIsTutor] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`/api/tutors?email=${email}`)
      .then((response) => {
        setIsTutor(response.status === 200 ? true : false);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  return (
    <>
      {isTutor && (
        <div>
          <h1>Test</h1>
        </div>
      )}
      {!isTutor && (
        <div>
          <h1>Not allowed</h1>
        </div>
      )}
    </>
  );
}
