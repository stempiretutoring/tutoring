import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import styles from "./page.module.css";

interface cardProps {
  subjects: string;
  name: string;
  occupation: string;
  path: string;
}

export default function TutorCard({
  subjects,
  name,
  occupation,
  path,
}: cardProps) {
  return (
    <>
      <div className={styles.main}>
        <Popover placement="right">
          <PopoverTrigger>
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">{subjects}</p>
              <small className="text-default-500">{occupation}</small>
              <h3 className="font-bold text-large">{name}</h3>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={path}
                width={270}
              />
            </CardBody>
          </Card>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-2">
              <div className="text-small text-black font-bold">Popover content</div>
              <div className="text-tiny text-black">This is the popover content</div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
