import React from "react";
import { CalendarPlus } from "lucide-react";

function GoogleCalendarBtn() {
  return (
    <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition">
      <CalendarPlus className="w-5 h-5" />
      Add to Google Calendar
    </button>
  );
}

export default GoogleCalendarBtn;
