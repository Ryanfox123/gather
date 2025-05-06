"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { CalendarPlus } from "lucide-react";

type EventInfo = {
  eventInfo: {
    _id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    startTime: string;
    duration: number;
    attendees: string[];
    createdBy: string;
    imageUrl?: string;
  };
};

function GoogleCalendarBtn({ eventInfo }: EventInfo) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddToGoogleCalendar = async () => {
    const { title, description, location, startTime, duration } = eventInfo;

    if (!session?.user?.accessToken) {
      const endTime = new Date(
        new Date(startTime).getTime() + duration * 60 * 60 * 1000
      );
      const googleCalendarLink = generateGoogleCalendarLink({
        title,
        description,
        location,
        startTime,
        endTime: endTime.toISOString(),
      });
      window.open(googleCalendarLink, "_blank");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          startTime,
          duration,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add event to Google Calendar");
      }

      const event = await response.json();

      setSuccessMessage("Event successfully added to Google Calendar!");
    } catch (error) {
      console.error("Error adding event to Google Calendar:", error);
      setErrorMessage(
        "Failed to add event to Google Calendar. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
        onClick={handleAddToGoogleCalendar}
        disabled={loading}
      >
        <CalendarPlus className="w-5 h-5" />
        {loading ? "Adding to Google Calendar..." : "Add to Google Calendar"}
      </button>

      {successMessage && (
        <div className="mt-2 text-green-600 font-semibold">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mt-2 text-red-600 font-semibold">{errorMessage}</div>
      )}
    </div>
  );
}

function generateGoogleCalendarLink({
  title,
  description,
  location,
  startTime,
  endTime,
}: {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
}) {
  const format = (dateStr: string) =>
    new Date(dateStr).toISOString().replace(/[-:]|\.\d{3}/g, "");

  const params = new URLSearchParams({
    text: title,
    details: description,
    location,
    dates: `${format(startTime)}/${format(endTime)}`,
  });

  return `https://www.google.com/calendar/render?action=TEMPLATE&${params.toString()}`;
}

export default GoogleCalendarBtn;
