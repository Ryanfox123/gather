type CalendarEventParams = {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
};

function generateGoogleCalendarLink({
  title,
  description,
  location,
  startTime,
  endTime,
}: CalendarEventParams): string {
  const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
  const params = new URLSearchParams({
    text: title,
    details: description,
    location: location,
    dates: `${formatToGoogleDate(startTime)}/${formatToGoogleDate(endTime)}`,
  });

  return `${baseUrl}&${params.toString()}`;
}

function formatToGoogleDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
}
