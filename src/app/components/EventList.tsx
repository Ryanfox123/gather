"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CardEventList from "./CardEventList";

function EventList() {
  const [allEvents, setAllEvents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const EVENTS_PER_PAGE = 10;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!session) return;

      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        setAllEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [session]);

  const handleNext = () => {
    if ((currentPage + 1) * EVENTS_PER_PAGE < allEvents.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const startIndex = currentPage * EVENTS_PER_PAGE;
  const visibleEvents = allEvents.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  );

  return (
    <div className="w-2/3 mx-auto mt-7">
      <h2 className="text-black font-extrabold">Browse new events</h2>
      <div className="flex flex-col gap-4">
        {visibleEvents.map((event) => (
          <CardEventList event={event} key={event._id} />
        ))}
      </div>
    </div>
  );
}

export default EventList;
