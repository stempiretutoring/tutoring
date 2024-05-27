"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Button,
  Input,
  Link,
  CheckboxGroup,
  Checkbox,
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState<string[]>([]);
  const [good, setGood] = useState<boolean>(false);
  const [savedStartTime, setSavedStartTime] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [savedEndTime, setSavedEndTime] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const setTime = (formData: FormData) => {
    formData.append("noDays", selected.toString());
    fetch(`/api/tutors?email=${user?.email}`, {
      method: "POST",
      body: formData,
    });
    setGood(true);
  };

  const handleEndChange = (value: string, idx: number) => {
    setSavedEndTime((prev) => [
      ...prev.slice(0, idx),
      value,
      ...prev.slice(idx + 1),
    ]);
  };

  const handleStartChange = (value: string, idx: number) => {
    setSavedStartTime((prev) => [
      ...prev.slice(0, idx),
      value,
      ...prev.slice(idx + 1),
    ]);
  };

  useEffect(() => {
    fetch(`/api/tutors?email=${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        setSavedStartTime(data["document"]["startTime"]);
        setSavedEndTime(data["document"]["endTime"]);
      });
  }, [user?.email]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error)
    return (
      <div>Uh oh! Something went wrong! Error message: {error.message}</div>
    );

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
            ].map((day, index) => (
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
                  value={savedStartTime[index].toString()}
                  onValueChange={(value) => handleStartChange(value, index)}
                />
                <h1 className="text-2xl inline whitespace-nowrap col-span-1 mx-0 text-gray-400">
                  -
                </h1>
                <Input
                  type="time"
                  name={`${day.toLowerCase()}-end-time`}
                  className="block w-full rounded-md shadow-sm border-gray-300 col-span-1 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ml-2"
                  value={savedEndTime[index]}
                  onValueChange={(value) => handleEndChange(value, index)}
                />
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <Button
                onPress={onOpen}
                color="primary"
                type="submit"
                className="text-xl font-bold p-5"
              >
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
      {good && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Sucess!
                </ModalHeader>
                <ModalBody>Your schedule has been updated! Refresh to double check all changes saved properly!</ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
