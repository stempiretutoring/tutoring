"use client";
import React, { useState, useMemo, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
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
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Input,
} from "@nextui-org/react";
import { columns, getTimes, getCost } from "../lib/helpers";
import { timeGET, CartItem } from "../../api/types";
import { FaShoppingCart } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);

export default withPageAuthRequired(function App({
  params,
}: {
  params: { name: string };
}) {
  const searchParams = useSearchParams();

  const subject = searchParams.get("subject");
  const tutorName = decodeURIComponent(params.name);

  const [date, setDate] = useState<Date>();
  const [clientSecret, setClientSecret] = useState("");
  const [freeTime, setFreeTime] = useState<timeGET>();
  const [bookedTimes, setBookedTimes] = useState<string[]>();
  const [selectedStudents, setSelectedStudents] = useState<string>("1");
  const [price, setPrice] = useState<string>("");
  const [complete, setComplete] = useState<boolean>(true);
  const [disabledTimes, setDisabledTimes] = useState<string[]>([]);
  const [selectedTimeKey, setSelectedTimeKey] = useState<Selection>(
    new Set(["Select a time"]),
  );
  const [selectedLength, setSelectedLength] = useState<Selection>(
    new Set(["1 hour"]),
  );

  const selectedTime = useMemo(
    () => Array.from(selectedTimeKey).join(", ").replace(/^.*_/, ""),
    [selectedTimeKey],
  );

  const handlePress = () => {
    if (date && selectedTime !== "Select a time") {
      const bodyPrice = parseInt(price) * 100;
      let body: CartItem = {
        id: process.env.NEXT_PUBLIC_PRICE || "",
        name: "Tutoring",
        price: bodyPrice,
        currency: "USD",
        quantity: 1,
        metadata: {
          description: `Tutoring session with ${tutorName} for ${Array.from(
            selectedLength,
          ).join(", ")} with ${Array.from(selectedStudents).join(
            ", ",
          )} student(s) for \$${bodyPrice / 100} on ${date} at ${selectedTime}`,
          tutor: tutorName,
          subject: subject || "",
          date: date.toString(),
          time: selectedTime,
        },
      };
      fetch("/api/checkout_session", {
        method: "POST",
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    } else {
      setComplete(false);
    }
  };

  const isInvalid = useMemo(() => {
    return parseInt(selectedStudents) <= 0;
  }, [selectedStudents]);

  useEffect(() => {
    fetch(`/api/tutors/book?name=${tutorName}`)
      .then((response) => response.json())
      .then((data) => {
        setFreeTime(data["times"]);
        setBookedTimes(data["booked"]);
      });
  }, [searchParams, tutorName]);

  useEffect(() => {
    if (bookedTimes && selectedTime && date && freeTime) {
      for (let time of bookedTimes) {
        const bookedDate = time.split("@")[0];
        const bookedTime = time.split("@")[1];

        const times: string[] = getTimes(
          freeTime,
          date.getDay().toString().toLowerCase(),
        );

        if (bookedDate === format(date, "P") && times.includes(bookedTime)) {
          setDisabledTimes([...disabledTimes, bookedTime]);
        }
      }
    }
  }, [bookedTimes, selectedTime, date, freeTime, disabledTimes]);

  useEffect(
    () => setPrice(getCost(selectedStudents, selectedLength)),
    [selectedStudents, selectedLength],
  );

  return (
    <>
      {!clientSecret && (
        <div className="h-dvh grid grid-cols-3 gap-4">
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
                    <Chip color="success" className="capitalize">{subject}</Chip>
                  </TableCell>

                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="bordered"
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          showOutsideDays
                        />
                      </PopoverContent>
                    </Popover>{" "}
                    {date && (
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
                            disabledKeys={disabledTimes}
                          >
                            {freeTime !== undefined ? (
                              getTimes(
                                freeTime,
                                date.getDay().toString().toLowerCase(),
                              ).map((time: string) => (
                                <DropdownItem key={time}>{time}</DropdownItem>
                              ))
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
                      errorMessage={
                        isInvalid && "Amount must be greater than 0"
                      }
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
                      Tutoring session with {tutorName} for {selectedLength}{" "}
                      with {selectedStudents} student(s)
                    </p>
                  </li>
                </ul>
                <Divider className="mt-2 mb-2" />
                <p className="text-xl font-bold">Total: ${price}</p>
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
      )}
      <div id="checkout" className="h-dvh">
        {clientSecret && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout className="size-100%" />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    </>
  );
});

export const runtime = "edge";
