"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { CalendarPlus } from "lucide-react";

function GoogleCalendarBtn(eventInfo: any) {
  const { data: session } = useSession();
  console.log(eventInfo);

  const eventDetails = {
    title: eventInfo.title,
    description: eventInfo.description,
    location: eventInfo.location,
    date: eventInfo.date,
    startTime: eventInfo.startTime,
    duration: eventInfo.durations,
  };

  const handleAddToGoogleCalendar = async () => {
    if (!session?.user?.accessToken) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await fetch("/api/auth/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventInfo }),
      });

      if (!response.ok) {
        throw new Error("Failed to add event to Google Calendar");
      }

      const event = await response.json();
      console.log("Event added to Google Calendar:", event);
    } catch (error) {
      console.error("Error adding event to Google Calendar:", error);
    }
  };

  return (
    <button
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
      onClick={handleAddToGoogleCalendar}
    >
      <CalendarPlus className="w-5 h-5" />
      Add to Google Calendar
    </button>
  );
}

export default GoogleCalendarBtn;
