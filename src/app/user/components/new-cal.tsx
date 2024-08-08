"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Calendar,
  TimeInput,
  Spacer,
  Button,
  Tooltip,
} from "@nextui-org/react";
import type { DateValue } from "@nextui-org/react";
import {
  today,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  parseDateTime,
  toZoned,
  ZonedDateTime,
} from "@internationalized/date";
import { FiPlusCircle } from "react-icons/fi";
import { FaTrashAlt, FaCheck } from "react-icons/fa";

export default function CalTime() {
  const { user, error, isLoading } = useUser();

  let [date, setDate] = useState<DateValue>(today(getLocalTimeZone()));
  let [times, setTimes] = useState<ZonedDateTime[][]>([
    [
      toZoned(parseDateTime(`${date}T00:00:22`), getLocalTimeZone()),
      toZoned(parseDateTime(`${date}T00:00:22`), getLocalTimeZone()),
    ],
  ]);

  const timeValidator = (time: string): string => {
    // Split the time string into its components based on colons
    const parts = time.split(":");

    // Map over the parts and pad each with leading zeros if necessary
    const formattedParts = parts.map((part) => part.padStart(2, "0"));

    // Join the formatted parts back into a time string
    return formattedParts.join(":");
  };

  useEffect(() => {
    fetch(`/api/tutors?email=${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        for (const time of data["document"]["schedule"]) {
          if (time["date"] === date.toString().replaceAll(/-/g, "")) {
            console.log(times);
            let newTimes: ZonedDateTime[][] = [];
            for (const t of time["times"]) {
              newTimes = [
                ...newTimes,
                [
                  toZoned(
                    parseDateTime(`${date}T${timeValidator(t.split("-")[0])}`),
                    getLocalTimeZone(),
                  ),
                  toZoned(
                    parseDateTime(`${date}T${timeValidator(t.split("-")[1])}`),
                    getLocalTimeZone(),
                  ),
                ],
              ];
              setTimes(newTimes);
            }
            break;
          } else {
            setTimes([
              [
                toZoned(parseDateTime(`${date}T00:00:22`), getLocalTimeZone()),
                toZoned(parseDateTime(`${date}T00:00:22`), getLocalTimeZone()),
              ],
            ]);
          }
        }
      });
  }, [date]);

  const handleTimesChange = (
    row: number,
    col: number,
    value: ZonedDateTime,
  ) => {
    const newTimes = [...times];
    newTimes[row][col] = value;
    setTimes(newTimes);
  };

  const handleSubmit = () => {
    fetch(
      `/api/tutors?email=${user?.email}&date=${date.toString().replaceAll(/-/g, "")}`,
      {
        method: "POST",
        body: JSON.stringify(times),
      },
    );
  };

  return (
    <div>
      <div className="w-1/2 mx-auto">
        <Calendar
          aria-label="Date (Controlled)"
          value={date}
          onChange={setDate}
          visibleMonths={1}
          minValue={today(getLocalTimeZone())}
        />
      </div>
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
                  toZoned(
                    parseDateTime(`${date}T00:00:22`),
                    getLocalTimeZone(),
                  ),
                  toZoned(
                    parseDateTime(`${date}T00:00:22`),
                    getLocalTimeZone(),
                  ),
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
