"use client";
import {
  Selection,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import React, { useState, useMemo, useEffect } from "react";
import { tutorGET } from "../api/types";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { subjects as subjectList } from "./lib/helpers";

export default function App() {
  const [tutors, setTutors] = useState<tutorGET[]>();
  const [book, setBook] = useState<boolean>(false);

  const [selectedTutors, setSelectedTutor] = useState<Selection>(
    new Set(["(Select a subject first)"]),
  );
  const [selectedSubjects, setSelectedSubject] = useState<Selection>(
    new Set(["(Select a subject)"]),
  );

  const selectedTutor = useMemo(
    () => Array.from(selectedTutors).join(", ").replaceAll("_", " "),
    [selectedTutors],
  );
  const selectedSubject = useMemo(
    () => Array.from(selectedSubjects).join(", ").replaceAll("_", " "),
    [selectedSubjects],
  );

  useEffect(() => {
    fetch(`/api/subjects?subject=${selectedSubject}`)
      .then((response) => response.json())
      .then((data) => setTutors(data["documents"]));
  }, [selectedSubject]);

  useEffect(
    () =>
      setBook(
        selectedSubject.toString() != "(Select a tutor first!)" &&
          selectedSubject.toString() !== "(Select a subject)" &&
          selectedTutor.toString() != "(Select a tutor)",
      ),
    [selectedSubject, selectedTutor],
  );

  return (
    <div className="h-dvh">
      {tutors && (
        <div className="md:flex justify-center items-center m-2 md:m-0">
          <pre>Book </pre>
          <Dropdown>
            <DropdownTrigger>
              <Button className="capitalize" variant="bordered">{selectedSubject}</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Tutor Selection"
              variant="bordered"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedSubject}
              onSelectionChange={setSelectedSubject}
            >
              {subjectList.map((subject) => (
                <DropdownItem className="capitalize" key={subject}>
                  {subject}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <pre> with </pre>
          <Dropdown>
            <DropdownTrigger>
              <Button className="capitalize" variant="bordered">
                {selectedTutor}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Tutor Selection"
              variant="bordered"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedTutor}
              onSelectionChange={setSelectedTutor}
            >
              {tutors?.map((tutor) => (
                <DropdownItem className="capitalize" key={tutor.name}>
                  {tutor.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {book && (
            <Link href={`/book/${selectedTutor}?subject=${selectedSubject}`}>
              {" "}
              <Button className="ml-3" color="success">
                Book your appointment!
              </Button>{" "}
            </Link>
          )}
        </div>
      )}
      <div className="flex justify-center items-center h-5/6">
        <Image
          alt="stempire logo"
          className="m-3"
          width={500}
          height={500}
          src="../../home2.png"
        />
      </div>
    </div>
  );
}
