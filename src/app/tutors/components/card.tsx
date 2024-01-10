"use client";
import React, { useState, useEffect, useMemo } from "react";
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
} from "@nextui-org/react";
import { Spinner, Chip } from "@nextui-org/react";
import styles from "./page.module.css";
import { tutorGET } from "@/app/api/types";

interface cardProps {
  name: string;
}

export default function TutorCard({ name }: cardProps) {
  const [info, setInfo] = useState<tutorGET>();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(["(click to select subject)"]),
  );
  const url = process.env.NEXT_PUBLIC_IMAGE_URL;

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  useEffect(() => {
    fetch(`/api/tutors?name=${name}`)
      .then((response) => response.json())
      .then((data) => setInfo(data["document"]));
  }, [name]);

  return (
    <>
      {info ? (
        <div className={styles.main}>
          <Popover showArrow placement="right" backdrop="blur" color="primary">
            <PopoverTrigger>
              <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <div className="container mx-full">
                    {info?.subjects.map((subject, idx) => (
                      <Chip key={idx} className="w-full m-1">
                        {subject}
                      </Chip>
                    ))}
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
              <div className="px-1 py-2 w-full whitespace-nowrap">
                <div>
                  <h2 className="font-bold text-red-400 ">
                    <Dropdown>
                      <DropdownTrigger>
                        <p className="text-red-500">
                          Click here to book an appointment for{" "}
                          <p className="text-blue-300 underline">
                            {selectedValue}
                          </p>
                        </p>
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
                            href={`/book/${info.name}?subject=${subject}`}
                          >
                            {subject}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </h2>
                </div>
                <Divider />
                <div className="text-tiny text-black">{info?.bio}</div>
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
