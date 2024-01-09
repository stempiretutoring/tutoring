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
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Input,
} from "@nextui-org/react";
import { columns, findDisabledKeys, getTimes, getCost } from "./lib/helpers";
import { timeGET } from "../api/types";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";

export default function App() {
  const params = useSearchParams();
  const router = useRouter();

  const subject = params.get("subject");
  const tutorName = params.get("name");

  const [freeTime, setFreeTime] = useState<timeGET>();
  const [disabledKeys, setDisabledKeys] = useState<string[]>();
  const [selectedStudents, setSelectedStudents] = useState<string>("1");
  const [complete, setComplete] = useState<boolean>(true);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(["Select a date"]),
  );
  const [selectedTimeKey, setSelectedTimeKey] = useState<Selection>(
    new Set(["Select a time"]),
  );
  const [selectedLength, setSelectedLength] = useState<Selection>(
    new Set(["1 hour"]),
  );

  const selectedDate = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  const selectedTime = useMemo(
    () => Array.from(selectedTimeKey).join(", ").replace(/^.*_/, ""),
    [selectedTimeKey],
  );

  const handlePress = () => {
    if (selectedDate !== "Select a date" && selectedTime !== "Select a time") {
      router.push("/pay");
    } else {
      setComplete(false);
    }
  };

  const isInvalid = useMemo(() => {
    return parseInt(selectedStudents) <= 0;
  }, [selectedStudents]);

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
                <TableCell>{tutorName}</TableCell>

                <TableCell>
                  <Chip color="success">{subject}</Chip>
                </TableCell>

                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        color={complete ? "default" : "danger"}
                        variant="bordered"
                      >
                        {selectedDate}
                      </Button>
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
                          <Button
                            color={complete ? "default" : "danger"}
                            variant="bordered"
                          >
                            {selectedTime}
                          </Button>
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
                  <Input
                    label="Amount of students"
                    type="number"
                    value={selectedStudents}
                    onValueChange={setSelectedStudents}
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "default"}
                    errorMessage={isInvalid && "Amount must be greater than 0"}
                  />
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
                      <DropdownItem key="4 hours">4 hours</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div>
          <Card className="mr-3 mt-3">
            <CardHeader className="flex gap-3">
              <FaShoppingCart />
              <div className="flex flex-col">
                <p className="text-lg">Cart</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <ul className="ml-3 list-disc">
                <li>
                  <p>
                    Tutoring session with {tutorName} for {selectedLength} with{" "}
                    {selectedStudents} student(s)
                  </p>
                </li>
              </ul>
              <Divider className="mt-2 mb-2" />
              <p className="text-xl font-bold">
                Total: ${getCost(selectedStudents, selectedLength)}
              </p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button onPress={handlePress} color="primary">
                Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
