import { notFound } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/app/utils/dateformat";
import { LuArrowBigLeftDash } from "react-icons/lu";
import EventSignUpBtns from "@/app/components/EventSignUpBtns";
import GoBackBtn from "@/app/components/GoBackBtn";

type Props = {
  params: {
    eventID: string;
  };
};

async function Event({ params }: Props) {
  const eventID = params.eventID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/events/${eventID}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const event = await res.json();
  const date = formatDate(event.date);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <GoBackBtn />
      <div className="w-11/12 md:w-2/3 mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={event.imageUrl}
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
              <p className="text-gray-500">Start Time: {event.startTime}</p>
            </div>
            <EventSignUpBtns eventID={eventID} />
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

export default Event;
