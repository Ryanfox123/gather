export default function formatTo12HourTime(dateString: string) {
  const date = new Date(dateString);

  const formattedTime = date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedTime;
}
