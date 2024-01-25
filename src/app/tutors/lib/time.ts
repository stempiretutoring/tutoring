export function getTimes(startTime: string, endTime: string): string {
  if (!startTime || !endTime) {
    return "No times available";
  }
  
  const newStart: string = new Date(
    "1970-01-01T" + startTime + "Z",
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  
  const newEnd: string = new Date(
    "1970-01-01T" + endTime + "Z",
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  return `${newStart} - ${newEnd}`
}
