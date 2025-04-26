import React from "react";

type Props = {
  event: {
    _id: string;
    title: string;
    location: string;
    date: string;
    startTime: string;
    attendees: string[];
    duration: number;
  };
};

function CardUpcomingEvent({ event }: Props) {
  return (
    <li key={event._id}>
      <p>{event.title}</p>
    </li>
  );
}

export default CardUpcomingEvent;
