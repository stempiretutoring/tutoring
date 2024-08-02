"use client";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Calendar,
  TimeInput,
  Spacer,
  TimeInputValue,
  Button,
  Tooltip,
} from "@nextui-org/react";
import type { DateValue } from "@nextui-org/react";
import {
  today,
  ZonedDateTime,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from "@internationalized/date";
import { FiPlusCircle } from "react-icons/fi";
import { FaTrashAlt, FaCheck } from "react-icons/fa";

export default function CalTime() {
  const { user, error, isLoading } = useUser();

  let [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
  let [times, setTimes] = useState<TimeInputValue[][]>([
    [
      parseAbsoluteToLocal(`${date}T18:45:22Z`),
      parseAbsoluteToLocal(`${date}T19:45:22Z`),
    ],
  ]);

  const handleTimesChange = (
    row: number,
    col: number,
    value: TimeInputValue,
  ) => {
    const newTimes = [...times];
    newTimes[row][col] = value;
    setTimes(newTimes);
    console.log(date.toString().replaceAll(/-/g, ''));
  };

  const handleSubmit = () => {
    fetch(`/api/tutors?email=${user?.email}&date=${date.toString().replaceAll(/-/g, '')}`, {
      method: "POST",
      body: JSON.stringify(times),
    });
  };

  return (
    <div>
      <Calendar
        aria-label="Date (Controlled)"
        value={date}
        onChange={setDate}
        visibleMonths={1}
        minValue={today(getLocalTimeZone())}
      />
      <div>
        {times.map((input, index) => (
          <div className="flex items-center my-2" key={index}>
            <TimeInput
              value={input[0]}
              onChange={(e) => handleTimesChange(index, 0, e)}
              label="Start Time"
            />
            <Spacer x={3} />
            <TimeInput
              value={input[1]}
              onChange={(e) => handleTimesChange(index, 1, e)}
              label="End Time"
            />
            <Tooltip content="Click to remove this block" placement="right">
              <Button
                className="ml-2"
                isIconOnly
                color="danger"
                radius="full"
                onPress={() => setTimes(times.filter((_, i) => i !== index))}
              >
                <FaTrashAlt />
              </Button>
            </Tooltip>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <Tooltip
          placement="bottom"
          content="Click to add another block of time"
        >
          <Button
            isIconOnly
            color="secondary"
            radius="full"
            onPress={() =>
              setTimes([
                ...times,
                [
                  parseAbsoluteToLocal(`${date}T18:45:22Z`),
                  parseAbsoluteToLocal(`${date}T19:45:22Z`),
                ],
              ])
            }
          >
            <FiPlusCircle />
          </Button>
        </Tooltip>

        <Spacer x={2} />

        <Tooltip content="Click to submit" placement="bottom">
          <Button
            onPress={handleSubmit}
            isIconOnly
            radius="full"
            color="success"
          >
            <FaCheck />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
