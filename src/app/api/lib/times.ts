export function splitTime(startTime: string, endTime: string): string[] {
  const intervals: string[] = [];

  startTime = startTime + ":00";
  endTime = endTime + ":00";

  // Convert start and end times to Date objects for easier manipulation
  const startDate = new Date(`2000-01-01T${startTime}`);
  const endDate = new Date(`2000-01-01T${endTime}`);

  console.log(startDate);
  console.log(startTime);

  // Loop through the intervals and add each hour-long interval to the result
  while (startDate < endDate) {
    const nextHour = new Date(startDate);
    nextHour.setHours(startDate.getHours() + 1);

    if (nextHour > endDate) {
      break;
    }

    // Format the interval with 12-hour time and push it to the result array
    intervals.push(
      `${format12HourTime(startDate)}-${format12HourTime(nextHour)}`,
    );

    // Move to the next hour
    startDate.setHours(startDate.getHours() + 1);
  }

  return intervals;
}

// Helper function to format hours and minutes with leading zeros
function formatTime(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

// Helper function to format time in 12-hour format
function format12HourTime(date: Date): string {
  const hours = date.getHours() % 12 || 12;
  const minutes = formatTime(date.getMinutes());
  const ampm = date.getHours() < 12 ? "AM" : "PM";
  return `${formatTime(hours)}:${minutes} ${ampm}`;
}
