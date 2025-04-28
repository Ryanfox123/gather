import { notFound } from "next/navigation";

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

  return <div>{event.title}</div>;
}

export default Event;
