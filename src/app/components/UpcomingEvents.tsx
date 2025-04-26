"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CardUpcomingEvent from "./CardUpcomingEvent";

function UpcomingEvents() {
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const EVENTS_PER_PAGE = 4;

  useEffect(() => {
    const fetchEvents = async () => {
      if (!session) return;

      try {
        const res = await fetch(`/api/users/${session.user?.id}/events`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

        const sortedData = data.sort((a: any, b: any) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        setUserEvents(sortedData);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
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
    <div className="mx-auto w-fill ml-14">
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
