"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Selection,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Spinner, Chip } from "@nextui-org/react";
import styles from "./page.module.css";
import { tutorGET } from "@/app/api/types";
import { getTimes } from "../lib/time";
import Subjects from "./subjects";

interface cardProps {
  name: string;
}

export default function TutorCard({ name }: cardProps) {
  const [info, setInfo] = useState<tutorGET>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(["(select a subject)"]),
  );

  const url = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    fetch(`/api/tutors?name=${name}`)
      .then((response) => response.json())
      .then((data) => setInfo(data["document"]));
  }, [name]);

  return (
    <>
      {info ? (
        <div className={styles.main}>
          <Popover placement="right" backdrop="blur" color="primary">
            <PopoverTrigger>
              <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <div className="container mx-full">
                    <Subjects subjects={info.subjects} />
                  </div>
                  <small className="text-default-500">{info?.occupation}</small>
                  <h3 className="font-bold text-large">{info?.name}</h3>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl size-64"
                    src={`${url}/${info?.picture}`}
                    width={270}
                    height={190}
                  />
                </CardBody>
              </Card>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 w-full">
                <div>
                  <h2 className="font-bold text-red-400 ">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button className="text-red-500">
                          Click here to book an appointment
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="subject selection"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                      >
                        {info?.subjects.map((subject) => (
                          <DropdownItem
                            key={subject}
                            className="capitalize"
                            href={`/book/${info.name}?subject=${subject}`}
                          >
                            {subject}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </h2>
                </div>
                <Divider className="mt-3 mb-3" />
                <div className="text-base text-black w-[300px]">
                  {info?.bio}
                </div>
                <Divider className="mt-3 mb-3" />
                <div className="flex align-items ">
                  <Popover
                    className="mr-4"
                    color="secondary"
                    placement="left-end"
                  >
                    <PopoverTrigger>
                      <Button>View my schedule</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="p-2">
                        {[
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ].map((day: string, index: number) => (
                          <p key={day} className="text-tiny md:text-sm">
                            {day}:{" "}
                            {getTimes(
                              info["startTime"][index],
                              info["endTime"][index],
                            )}
                          </p>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Spinner color="primary" label="Loading" />
      )}
    </>
  );
}
