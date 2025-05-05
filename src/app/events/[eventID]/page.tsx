import EventMain from "@/app/components/EventMain";
import SessionWrapper from "@/app/components/SessionWrapper";
import { notFound } from "next/navigation";

type Props = {
  params: { eventID: string };
};

export default async function Page({ params }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/events/${params.eventID}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const event = await res.json();

  return (
    <SessionWrapper>
      <EventMain eventID={params.eventID} event={event} />
    </SessionWrapper>
  );
}
