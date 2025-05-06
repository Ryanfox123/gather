import React from "react";
import { formatDate } from "../utils/dateformat";
import formatTo12HourTime from "../utils/timeFormat";
import Link from "next/link";

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
  const date = formatDate(event.date);
  const time = formatTo12HourTime(event.startTime);
  return (
    <Link href={`/events/${event._id}`}>
      <li className="bg-white shadow-md rounded-xl p-4 mb-3 flex flex-col gap-2 border border-gray-200 hover:shadow-md transition w-64">
        <div className="bg-lightViolet text-white text-xs font-semibold px-2 py-0.5 rounded-full w-fit mb-1">
          {date}
        </div>

        <h3 className="text-md font-bold text-black truncate">{event.title}</h3>

        <div className="text-gray-600 text-xs flex flex-col gap-0.5">
          <p>
            <span className="font-semibold">Time:</span> {time}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {event.location}
          </p>
        </div>

        <div className="flex items-center gap-1 mt-auto pt-2">
          <p className="text-[10px] text-gray-400">{event.duration} hr(s)</p>
          <p className="text-[10px] text-gray-400 ml-auto">
            {event.attendees.length} attending
          </p>
        </div>
      </li>
    </Link>
  );
}

export default CardUpcomingEvent;
