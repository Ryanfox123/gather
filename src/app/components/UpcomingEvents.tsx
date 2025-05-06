"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CardUpcomingEvent from "./CardUpcomingEvent";
import { motion, AnimatePresence } from "framer-motion"; // Importing framer-motion

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
    <div className="mx-auto px-4 sm:px-6 md:px-8 my-10 border border-gray-200 max-w-6xl rounded-xl p-4">
      <h2 className="text-black text-xl font-semibold mb-6">
        Your upcoming events
      </h2>

      <div className="flex justify-between gap-4 mb-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="bg-lightViolet text-white px-4 py-2 rounded-lg hover:bg-darkViolet text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={(currentPage + 1) * EVENTS_PER_PAGE >= userEvents.length}
          className="bg-lightViolet text-white px-4 py-2 rounded-lg hover:bg-darkViolet text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {visibleEvents.length === 0 ? (
            <p className="text-black col-span-full">No upcoming events</p>
          ) : (
            visibleEvents.map((event) => (
              <CardUpcomingEvent event={event} key={event._id} />
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default UpcomingEvents;
