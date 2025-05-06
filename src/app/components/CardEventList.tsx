import Image from "next/image";
import React, { useState } from "react";
import { formatDate } from "../utils/dateformat";
import { FaMapPin } from "react-icons/fa";
import Link from "next/link";
import formatTo12HourTime from "../utils/timeFormat";

type Props = {
  event: Event;
  sessionInfo?: SessionInfo | null;
};

type Event = {
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
};

type SessionInfo = {
  user: {
    name: string | null;
    email: string | null;
    image?: string | null;
    id: string;
    admin: boolean;
    events?: string[]; // Mark events as optional (events can be undefined)
  };
};

function CardEventList({ event, sessionInfo }: Props) {
  const [imgError, setImgError] = useState(false);
  const date = formatDate(event.date);
  const time = formatTo12HourTime(event.startTime);
  const validImageUrl = event.imageUrl && event.imageUrl !== "";

  // Provide a fallback (empty array) in case sessionInfo?.user.events is undefined
  const isAttending = sessionInfo?.user.events?.includes(event._id) ?? false;

  return (
    <Link href={`/events/${event._id}`}>
      <li className="flex p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col sm:flex-row w-full">
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            {validImageUrl && !imgError ? (
              <Image
                src={event.imageUrl || ".dog.jpg"}
                alt={event.title}
                width={200}
                height={150}
                onError={() => setImgError(true)}
                className="rounded-lg h-[150px] w-[200px] object-cover"
              />
            ) : (
              <div className="h-[150px] w-[200px] flex items-center justify-center bg-emerald-800 rounded-lg text-gray-200 font-medium">
                {validImageUrl ? "Image failed to load" : "No image available"}
              </div>
            )}
          </div>

          <div className="ml-0 sm:ml-4 flex flex-col justify-between w-full sm:w-2/3">
            <div className="flex flex-col gap-1">
              <p className="text-emerald-600">
                {date} · {time}
              </p>

              {isAttending && (
                <p className="text-black text-sm font-semibold">
                  Already attending
                </p>
              )}

              <h3 className="text-black font-bold text-lg sm:text-xl">
                {event.title}
              </h3>
              <p className="text-black flex flex-row text-sm">
                <FaMapPin className="m-1" />
                {event.location}
              </p>
            </div>
            <p className="text-gray-500 text-sm">
              {event.attendees.length} attendees
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
}

export default CardEventList;
