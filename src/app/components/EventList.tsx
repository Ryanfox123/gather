"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CardEventList from "./CardEventList";

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

function EventList() {
  const [allEvents, setAllEvents] = useState<EventType[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        const sortedData = data.sort((a: EventType, b: EventType) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        setAllEvents(sortedData);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, [session]);

  return (
    <div className="w-2/3 mx-auto mt-7">
      <h2 className="text-black font-extrabold">Browse new events</h2>

      <ul className="flex flex-col gap-4">
        {allEvents.map((event: EventType) => (
          <CardEventList event={event} key={event._id} sessionInfo={session} />
        ))}
      </ul>
    </div>
  );
}

export default EventList;
