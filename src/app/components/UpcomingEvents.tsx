"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CardUpcomingEvent from "./CardUpcomingEvent";

export interface EventType {
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
}

function UpcomingEvents() {
  const [userEvents, setUserEvents] = useState<EventType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: session, status } = useSession();

  const EVENTS_PER_PAGE = 4;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!session) return;

      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(
          `${baseUrl}/api/users/${session.user?.id}/events`
        );
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        const sortedData = data.sort((a: EventType, b: EventType) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        setUserEvents(sortedData);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [session]);

  const handleNext = () => {
    if ((currentPage + 1) * EVENTS_PER_PAGE < userEvents.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const startIndex = currentPage * EVENTS_PER_PAGE;
  const visibleEvents = userEvents.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  );

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not signed in</p>;

  return (
    <div className="mx-auto w-fill ml-14 my-10">
      <h2 className="text-black text-xl mb-4">Your upcoming events</h2>

      <div className="flex gap-2 mb-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="bg-lightViolet text-white px-3 py-1 rounded hover:bg-darkViolet text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={(currentPage + 1) * EVENTS_PER_PAGE >= userEvents.length}
          className="bg-lightViolet text-white px-3 py-1 rounded hover:bg-darkViolet text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="flex flex-row gap-1.5">
        {visibleEvents.length === 0 ? (
          <p className="text-black">No upcoming events</p>
        ) : (
          visibleEvents.map((event) => (
            <CardUpcomingEvent event={event} key={event._id} />
          ))
        )}
      </div>
    </div>
  );
}

export default UpcomingEvents;
