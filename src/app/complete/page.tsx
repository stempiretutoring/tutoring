"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Input,
  Button,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
} from "@nextui-org/react";

export default function App() {
  const [preferredMeeting, setPreferredMeeting] = useState<Selection>(
    new Set(["In person"]),
  );

  const selectedMeeting = useMemo(
    () => Array.from(preferredMeeting).join(", ").replaceAll("_", " "),
    [preferredMeeting],
  );

  const handleForm = (formData: FormData) => {
    formData.append("meeting", selectedMeeting);
    console.log(formData);
  };

  return (
    <>
      <form action={handleForm}>
        <div className="flex justify-center align-items">
          <div className="w-1/2 grid gap-4 grid-cols-2">
            <div className="col-span-2 flex justify-center">
              <h1 className="font-bold text-xl">
                Thanks for booking a session with STEMpire Tutoring!
              </h1>
            </div>
            <div className="col-span-2 flex justify-center">
              <h3 className="font-underline text-md">
                Please fill out the following form to help us help you!
              </h3>
            </div>
            <div className="col-span-1">
              <Input
                type="email"
                label="Email"
                name="email"
                variant="underlined"
                description="Parent email"
                isRequired
              />
            </div>
            <div className="col-span-1">
              <Input
                type="text"
                label="Child Name"
                name="child"
                variant="underlined"
                isRequired
              />
            </div>
            <div className="col-span-2">
              <Textarea
                variant="bordered"
                label="Please tell us a little bit about your child and what they are struggling with."
                labelPlacement="outside"
                placeholder="Type here..."
                name="about"
                isRequired
              />
            </div>
            <div className="col-span-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="ghost">
                    Preferred Meeting Style: {selectedMeeting}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Meeting style dropdown"
                  disallowEmptySelection
                  selectionMode="single"
                  onSelectionChange={setPreferredMeeting}
                  selectedKeys={preferredMeeting}
                >
                  <DropdownItem key="In person">In person</DropdownItem>
                  <DropdownItem key="Virtual">Online/virtual</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="col-span-2">
              <Button type="submit" color="primary">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
