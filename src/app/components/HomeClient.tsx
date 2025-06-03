"use client";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import EventList from "./EventList";
import UpcomingEvents from "./UpcomingEvents";
import { useState } from "react";
import LoginForms from "./LoginForms";

export default function HomeClient() {
  const [loginPopup, setLoginPopup] = useState<boolean>(false);

  return (
    <div>
      <NavBar setLoginPopup={setLoginPopup} />
      <Welcome />
      <UpcomingEvents />
      <EventList />
    </div>
  );
}
