"use client";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import EventList from "./EventList";
import UpcomingEvents from "./UpcomingEvents";

export default function HomeClient() {
  return (
    <div>
      <NavBar />
      <Welcome />
      <UpcomingEvents />
      <EventList />
    </div>
  );
}
