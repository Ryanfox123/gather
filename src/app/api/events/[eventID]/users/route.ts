import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";

interface Context {
  params: {
    eventID: string;
  };
}

//Get all attendees for an event
export async function GET(req: NextRequest, context: Context) {
  try {
    connectDB();
    const { eventID } = context.params;

    const eventAttendees = await Events.findOne(
      { _id: eventID },
      { attendees: 1, _id: 0 }
    );

    return NextResponse.json(eventAttendees);
  } catch (error) {
    console.error("Error fetching attendees:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendees" },
      { status: 500 }
    );
  }
}
