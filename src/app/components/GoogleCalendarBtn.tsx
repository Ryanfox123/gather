"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { CalendarPlus } from "lucide-react";

function GoogleCalendarBtn({ eventInfo }: any) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddToGoogleCalendar = async () => {
    if (!session?.user?.accessToken) {
      console.error("User is not authenticated");
      setErrorMessage("User is not authenticated");
      return;
    }

    const { title, description, location, startTime, duration } = eventInfo;

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
      console.log("Event added to Google Calendar:", event);

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

export default GoogleCalendarBtn;
