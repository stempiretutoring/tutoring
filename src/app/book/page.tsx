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
  Link,
  Tooltip,
} from "@nextui-org/react";
import { columns, findDisabledKeys, getTimes } from "./lib/helpers";
import { timeGET } from "../api/types";

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
  const [selectedStudents, setSelectedStudents] = useState<Selection>(
    new Set(["Select how many students"]),
  );
  const [selectedLength, setSelectedLength] = useState<Selection>(
    new Set(["Select a duration"]),
  );

  const selectedDate = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const selectedTime = useMemo(
    () => Array.from(selectedTimeKey).join(", ").replace(/^.*_/, ""),
    [selectedTimeKey],
  );

  useEffect(() => {
    fetch(`/api/tutors/book?name=${params.get("name")}`)
      .then((response) => response.json())
      .then((data) => setFreeTime(data));
  }, [params]);

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
                    <Tooltip
                      showArrow={true}
                      content="Grayed out items mean no times are available that day"
                    >
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
                        <DropdownItem key="Thursday">Thursday</DropdownItem>
                        <DropdownItem key="Friday">Friday</DropdownItem>
                        <DropdownItem key="Saturday">Saturday</DropdownItem>
                        <DropdownItem key="Sunday">Sunday</DropdownItem>
                      </DropdownMenu>
                    </Tooltip>
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
                          {freeTime !== undefined ? (
                            getTimes(freeTime, selectedDate.toLowerCase()).map(
                              (time: string, idx: number) => (
                                <DropdownItem key={`${idx}_${time}`}>
                                  {time}
                                </DropdownItem>
                              ),
                            )
                          ) : (
                            <DropdownItem key="No times available">
                              No times available
                            </DropdownItem>
                          )}
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered">{selectedStudents}</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="flat"
                      aria-label="day dropdown"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedStudents}
                      onSelectionChange={setSelectedStudents}
                    >
                      <DropdownItem key="1 student">1 student</DropdownItem>
                      <DropdownItem key="2-4 students">
                        2-4 students
                      </DropdownItem>
                      <DropdownItem key="5-7 students">
                        5-7 students
                      </DropdownItem>
                      <DropdownItem key="8+ students">8+ students</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>

                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered">{selectedLength}</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="flat"
                      aria-label="day dropdown"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedLength}
                      onSelectionChange={setSelectedLength}
                    >
                      <DropdownItem key="1 hour">1 hour</DropdownItem>
                      <DropdownItem key="2 hours">2 hours</DropdownItem>
                      <DropdownItem key="3 hours">3 hours</DropdownItem>
                      <DropdownItem key="4+  hours">4+ hours</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>

                <TableCell>
                  <p>cost</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex align-center">
          <Link href="/cart">
            <Button color="primary">Checkout</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
