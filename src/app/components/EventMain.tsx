"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { formatDate } from "@/app/utils/dateformat";
import formatTo12HourTime from "@/app/utils/timeFormat";
import GoBackBtn from "@/app/components/GoBackBtn";
import EventSignUpBtns from "@/app/components/EventSignUpBtns";

type Props = {
  eventID: string;
  event: {
    _id: string;
    title: string;
    description?: string;
    location: string;
    date: string;
    startTime: string;
    duration: number;
    attendees: string[];
    createdBy: string;
    imageUrl?: string;
  };
};

export default function EventMain({ eventID, event }: Props) {
  const { data: session, status } = useSession();
  const date = formatDate(event.date);
  const time = formatTo12HourTime(event.startTime);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 py-10 flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <GoBackBtn />
      <div className="w-11/12 md:w-2/3 mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={event.imageUrl || "/dog.jpg"}
            alt="Event"
            width={300}
            height={300}
            className="rounded-xl object-cover"
          />
          <div className="flex flex-col justify-between flex-grow">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-lightViolet">
                {event.title}
              </h1>
              <p className="text-gray-600">{event.location}</p>
              <p className="text-gray-500">
                {date} • {event.duration} hours
              </p>
              <p className="text-gray-500">Start Time: {time}</p>
            </div>
            <EventSignUpBtns
              eventID={eventID}
              eventInfo={event}
              sessionInfo={session}
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-gray-700">{event.description}</p>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-2 text-lightViolet">
            Attendees
          </h2>
          <p className="text-gray-700">{event.attendees.length}</p>
        </div>
      </div>
    </div>
  );
}
