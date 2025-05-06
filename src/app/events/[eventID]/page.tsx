import EventMain from "@/app/components/EventMain";
import SessionWrapper from "@/app/components/SessionWrapper";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ eventID: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/events/${resolvedParams.eventID}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const event = await res.json();

  return (
    <SessionWrapper>
      <EventMain eventID={resolvedParams.eventID} event={event} />
    </SessionWrapper>
  );
}
