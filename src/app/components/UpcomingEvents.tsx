"use client";
import React from "react";
import { useEffect, useState } from "react";

function UpcomingEvents() {
  const [userEvents, setUserEvents] = useState(null);

  return (
    <div>
      <h2>Your upcoming events</h2>
      <ul></ul>
    </div>
  );
}

export default UpcomingEvents;
