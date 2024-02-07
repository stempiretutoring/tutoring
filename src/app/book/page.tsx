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

export default function App() {
  const [tutors, setTutors] = useState<tutorGET[]>();
  const [subjects, setSubjects] = useState<string[]>([]);
  const [book, setBook] = useState<boolean>(false);

  const [selectedTutors, setSelectedTutor] = useState<Selection>(
    new Set(["(Select a tutor)"]),
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
    fetch(`/api/tutors`)
      .then((response) => response.json())
      .then((data) => setTutors(data["documents"]));
  }, []);

  useEffect(() => {
    fetch(`/api/tutors?name=${selectedTutor}`)
      .then((response) => response.json())
      .then((data) =>
        data["document"] !== null
          ? setSubjects(data["document"]["subjects"])
          : setSubjects([]),
      );
  }, [selectedTutor]);

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
              <Button variant="bordered">{selectedTutor}</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Tutor Selection"
              variant="bordered"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedTutors}
              onSelectionChange={setSelectedTutor}
            >
              {tutors?.map((tutor) => (
                <DropdownItem className="capitalize" key={tutor.name}>
                  {tutor.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <pre> for </pre>
          <Dropdown>
            <DropdownTrigger>
              <Button className="capitalize" variant="bordered">{selectedSubject}</Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Tutor Selection"
              variant="bordered"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedSubjects}
              onSelectionChange={setSelectedSubject}
            >
              {subjects?.map((subject) => (
                <DropdownItem className="capitalize" key={subject}>{subject}</DropdownItem>
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
    </div>
  );
}
