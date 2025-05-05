import Image from "next/image";
import React, { useState } from "react";
import { formatDate } from "../utils/dateformat";
import { FaMapPin } from "react-icons/fa";
import Link from "next/link";
import formatTo12HourTime from "../utils/timeFormat";

type Props = {
  event: {
    _id: string;
    title: string;
    location: string;
    description: string;
    date: string;
    startTime: string;
    attendees: string[];
    duration: number;
    imageUrl: string;
  };
};

function CardEventList({ event }: Props) {
  const [imgError, setImgError] = useState(false);
  const date = formatDate(event.date);
  const time = formatTo12HourTime(event.startTime);
  return (
    <Link href={`/events/${event._id}`}>
      <li>
        <div className="flex flex-row">
          <div>
            {!imgError ? (
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={200}
                height={150}
                onError={() => setImgError(true)}
                className="rounded-lg h-[150px] w-[200px] object-cover"
              />
            ) : (
              <div className="h-[150px] w-[200px] flex items-center justify-center bg-emerald-800 rounded-lg text-gray-200 font-medium">
                {event.title}
              </div>
            )}
          </div>
          <div className="ml-2 flex flex-col justify-between h-[150px]">
            <div className="flex flex-col gap-1">
              <p className="text-emerald-600">
                {date} · {time}
              </p>
              <h3 className="text-black font-bold">{event.title}</h3>
              <p className="text-black flex flex-row text-sm">
                <FaMapPin className="m-1" />
                {event.location}
              </p>
            </div>
            <p className="text-gray-500 mb-2">
              {event.attendees.length} attendees
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default CardEventList;
