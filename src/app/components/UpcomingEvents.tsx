"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function UpcomingEvents() {
  const [userEvents, setUserEvents] = useState<any[]>([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!session) return;

      try {
        const res = await fetch(`/api/users/${session.user.id}/events`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        console.log(data, "here");
        setUserEvents(data.events);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [session]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not signed in</p>;
  console.log(session);
  return (
    <div className="mx-auto">
      <h2 className="text-black">Your upcoming events</h2>
      <ul>
        {userEvents.length === 0 ? (
          <li className="text-black">No upcoming events</li>
        ) : (
          userEvents.map((event, index) => (
            <li key={index} className="text-black">
              {event}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default UpcomingEvents;
