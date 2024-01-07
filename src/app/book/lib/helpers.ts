import { timeGET } from "../../api/types";

export function getTimes(times: timeGET, day: string): string[] {
  switch (day) {
    case "monday":
      return times.monday;
    case "tuesday":
      return times.tuesday;
    case "wednesday":
      return times.wednesday;
    case "thursday":
      return times.thursday;
    case "friday":
      return times.friday;
    case "saturday":
      return times.saturday;
    case "sunday":
      return times.sunday;
    default:
      return [];
  }
}

export function findDisabledKeys(times: timeGET | undefined): string[] {
  let disabledTimes: string[] = [];

  console.log(times);

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
    label: "STUDENTS"
  },
  {
    key: "duration",
    label: "DURATION",
  },
  {
    key: "amount",
    label: "AMOUNT",
  },
];
