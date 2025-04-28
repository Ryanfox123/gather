const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const dayName = date.getDay();
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${days[dayName]}, ${day}${suffix} ${month}`;
}
