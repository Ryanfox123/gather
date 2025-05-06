"use client";
import React, { useEffect, useState } from "react";
import CardEventList from "./CardEventList";
import { useSession } from "next-auth/react";

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

function SearchResults({ query }: { query: string }) {
  const [eventResults, setEventResults] = useState<EventType[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams({ q: query });
        const res = await fetch(`/api/events?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        const sortedData = data.sort((a: EventType, b: EventType) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        setEventResults(sortedData);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    if (query.trim()) fetchEvents();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Search Results for: <span className="text-emerald-600">"{query}"</span>
      </h2>

      {eventResults.length > 0 ? (
        <ul className="space-y-4">
          {eventResults.map((event: EventType) => (
            <CardEventList
              event={event}
              key={event._id}
              sessionInfo={session}
            />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">
          No events found matching your search.
        </p>
      )}
    </div>
  );
}

export default SearchResults;
