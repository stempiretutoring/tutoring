"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Spinner, Chip } from "@nextui-org/react";
import styles from "./page.module.css";
import axios from "axios";
import { tutorGET } from "@/app/api/types";
import Link from "next/link";

interface cardProps {
  name: string;
}

export default function TutorCard({ name }: cardProps) {
  const [info, setInfo] = useState<tutorGET>();
  const url = process.env.NEXT_PUBLIC_IMAGE_URL

  useEffect(() => {
    axios
      .get(`/api/tutors?name=${name}`)
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  return (
    <>
      {info ? (
        <div className={styles.main}>
          <Popover
            showArrow
            placement="right"
            backdrop="blur"
            color="primary"
          >
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
              <div className="px-1 py-2">
                <div>
                  <Link href={`/book/tutor?id=${info?._id}&who=${info?.name}`} target="_self">
                    <h2 className="font-bold text-underline text-red-400 underline">
                      Click here to book an appointment!
                    </h2>
                  </Link>
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
