"use client";
import React from "react";
import {
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { PiCursorClickFill } from "react-icons/pi";

interface subjectProps {
  subjects: string[];
}

export default function Subjects({ subjects }: subjectProps) {
  if (subjects.length <= 4) {
    return (
      <div>
        {subjects.map((subject, idx) => (
          <Chip key={idx} className="w-full m-1 capitalize">
            {subject}
          </Chip>
        ))}
      </div>
    );
  } else if (subjects.length > 4) {
    const firstSubs: string[] = subjects.slice(0, 3);
    const lastSubs: string[] = subjects.slice(4);
    return (
      <div>
        {firstSubs.map((subject, idx) => (
          <Chip key={idx} className="w-full m-1 capitalize">
            {subject}
          </Chip>
        ))}
        <Popover className="pr-2" placement="bottom">
          <PopoverTrigger>
            <Chip variant="bordered" endContent={<PiCursorClickFill />}>More</Chip>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              {lastSubs.map((subject, idx) => (
                <Chip key={idx} className="w-full m-1 capitalize">
                  {subject}
                </Chip>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
