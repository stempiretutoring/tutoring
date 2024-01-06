"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  Button,
  Spacer,
} from "@nextui-org/react";
import { columns } from "./lib/data";
import { timeGET } from "../api/types";

function findDisabledKeys(times: timeGET): string[] {
  let disabledTimes: string[] = [];

  if (times === undefined) {
    return disabledTimes;
  }

  if (times.monday === []) {
    disabledTimes.push("Monday");
  }
  if (times.tuesday === []) {
    disabledTimes.push("Tuesday ");
  }
  if (times.wednesday === []) {
    disabledTimes.push("Wednesday");
  }
  if (times.thursday === []) {
    disabledTimes.push("Thursday");
  }
  if (times.friday === []) {
    disabledTimes.push("Friday");
  }
  if (times.saturday === []) {
    disabledTimes.push("Saturday");
  }
  if (times.sunday === []) {
    disabledTimes.push("Sunday");
  }

  return disabledTimes;
}

export default function App() {
  const params = useSearchParams();
  const [freeTime, setFreeTime] = useState<timeGET>();
  const [disabledKeys, setDisabledKeys] = useState<string[]>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(["Select a date"]),
  );
  const [selectedTimeKey, setSelectedTimeKey] = useState<Selection>(
    new Set(["Select a time"]),
  );

  const selectedDate = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const selectedTime = useMemo(
    () => Array.from(selectedTimeKey).join(", ").replaceAll("_", " "),
    [selectedTimeKey],
  );

  useEffect(() => {
    fetch(`/api/tutors/book?name=${params.get("name")}`)
      .then((response) => response.json())
      .then((data) => setFreeTime(data));
  }, []);

  useEffect(() => setDisabledKeys(findDisabledKeys(freeTime)), [freeTime]);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 m-3">
          <Table aria-label="Purchase table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody>
              <TableRow key="NAME">
                <TableCell>{params.get("name")}</TableCell>

                <TableCell>
                  <Chip color="success">{params.get("subject")}</Chip>
                </TableCell>

                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered">{selectedDate}</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="flat"
                      aria-label="day dropdown"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedKeys}
                      onSelectionChange={setSelectedKeys}
                      disabledKeys={disabledKeys}
                    >
                      <DropdownItem key="Monday">Monday</DropdownItem>
                      <DropdownItem key="Tuesday">Tuesday</DropdownItem>
                      <DropdownItem key="Wednesday">Wednesday</DropdownItem>
                      <DropdownItem key="thurday">Thursday</DropdownItem>
                      <DropdownItem key="Friday">Friday</DropdownItem>
                      <DropdownItem key="Saturday">Saturday</DropdownItem>
                      <DropdownItem key="Sunday">Sunday</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  {selectedDate !== "Select a date" && (
                    <div>
                      <Spacer x={1} />
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered">{selectedTime}</Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          variant="flat"
                          aria-label="time dropdown"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={selectedTimeKey}
                          onSelectionChange={setSelectedTimeKey}
                        >
                          {freeTime[selectedDate.toLowerCase()].map(
                            (time, idx) => (
                              <DropdownItem key={`${idx+1}). ${time}`}>
                                {time}
                              </DropdownItem>
                            ),
                          )}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <p>duration</p>
                </TableCell>

                <TableCell>
                  <p>cost</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <p>Col 2</p>
        </div>
      </div>
    </>
  );
}
