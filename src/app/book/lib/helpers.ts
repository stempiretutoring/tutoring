import { Selection } from "@nextui-org/react";
import { timeGET } from "../../api/types";

export function getCost(students: string, duration: Selection): string {
  const studentAmt = parseInt(students);
  const durationAmt = parseInt(Array.from(duration).toString().substring(0, 1));

  switch (studentAmt) {
    case 1:
      return (50 * durationAmt).toString();
    case 2:
    case 3:
    case 4:
      return (40 * durationAmt * studentAmt).toString();
    case 5:
    case 6:
    case 7:
      return (35 * durationAmt * studentAmt).toString();
    default:
      return studentAmt >= 8 ? (30 * durationAmt * studentAmt).toString() : "";
  }
}

export function getTimes(times: timeGET, day: string): string[] {
  switch (day) {
    case "1":
      return times.monday;
    case "2":
      return times.tuesday;
    case "3":
      return times.wednesday;
    case "4":
      return times.thursday;
    case "5":
      return times.friday;
    case "6":
      return times.saturday;
    case "0":
      return times.sunday;
    default:
      return [];
  }
}

export function findDisabledKeys(times: timeGET | undefined): string[] {
  let disabledTimes: string[] = [];

  if (times === undefined) {
    return disabledTimes;
  }

  if (!times.monday.length) {
    disabledTimes.push("Monday");
  }
  if (!times.tuesday.length) {
    disabledTimes.push("Tuesday");
  }
  if (!times.wednesday.length) {
    disabledTimes.push("Wednesday");
  }
  if (!times.thursday.length) {
    disabledTimes.push("Thursday");
  }
  if (!times.friday.length) {
    disabledTimes.push("Friday");
  }
  if (!times.saturday.length) {
    disabledTimes.push("Saturday");
  }
  if (!times.sunday.length) {
    disabledTimes.push("Sunday");
  }

  return disabledTimes;
}

export const columns = [
  {
    key: "name",
    label: "TUTOR",
  },
  {
    key: "subject",
    label: "SUBJECT",
  },
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "students",
    label: "STUDENTS",
  },
  {
    key: "duration",
    label: "DURATION",
  },
];

export const subjects = [
  "pre-algebra",
  "algebra 1",
  "geometry",
  "algebra 2",
  "pre-calculus",
  "calculus 1",
  "calculus 2",
  "calculus 3",
  "differential equations",
  "real analysis",
  "linear algebra",
  "physics 1",
  "physics: mechanics",
  "physics: electricity and magnetism",
  "computer programming",
  "computer science",
];
