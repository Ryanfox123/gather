"use client";
import NavBar from "./NavBar";
import Welcome from "./Welcome";
import EventList from "./EventList";
import UpcomingEvents from "./UpcomingEvents";
import { useState } from "react";
import SignInForm from "./SignInForm";

export default function HomeClient() {
  const [loginPopup, setLoginPopup] = useState<boolean>(false);
  const [authMethod, setAuthMethod] = useState<string | null>(null);
  return (
    <div>
      <NavBar setLoginPopup={setLoginPopup} />
      <Welcome />
      <UpcomingEvents />
      {loginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p
              className="text-black underline"
              onClick={() => {
                setLoginPopup(false);
              }}
            >
              Close
            </p>
            <SignInForm setAuthMethod={setAuthMethod} />
          </div>
        </div>
      )}
      <EventList />
    </div>
  );
}
