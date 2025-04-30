"use client";
import React, { useEffect, useState } from "react";
import GoogleCalendarBtn from "./GoogleCalendarBtn";
import { useSession } from "next-auth/react";

type Props = {
  eventID: string;
};

function EventSignUpBtns({ eventID }: Props) {
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchUserEvents = async () => {
        try {
          const response = await fetch(`/api/users/${session.user.id}/events`);
          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }
          const events = await response.json();

          const attending = events.some(
            (event: { _id: string }) => event._id === eventID
          );
          setIsAttending(attending);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };

      fetchUserEvents();
    }
  }, [status, session, eventID]);

  const handleEventSignUp = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch(
        `/api/users/${session?.user.id}/events/${eventID}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isAttending: !isAttending }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to sign up for event");
      }

      setIsAttending((prev) => !prev);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  if (isAttending === null) {
    return (
      <div className="mt-6 flex flex-row gap-2">
        <button
          className="bg-gray-300 text-white px-5 py-2 rounded-lg"
          disabled
        >
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-row gap-2">
      {status !== "authenticated" ? (
        <button
          className="bg-gray-400 text-white px-5 py-2 rounded-lg"
          disabled
        >
          Sign in to RSVP
        </button>
      ) : isAttending ? (
        <button
          className="w-full md:w-auto bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition"
          onClick={handleEventSignUp}
        >
          Cancel
        </button>
      ) : (
        <button
          className="w-full md:w-auto bg-green-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition"
          onClick={handleEventSignUp}
        >
          Attend Event
        </button>
      )}

      <GoogleCalendarBtn />
    </div>
  );
}

export default EventSignUpBtns;
