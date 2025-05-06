import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";

//get all events for a user
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userID: string; eventID: string }> }
) {
  try {
    connectDB();
    const { userID } = await context.params;

    const userEvents = await Events.find({
      attendees: userID,
    });

    return NextResponse.json(userEvents);
  } catch (error) {
    console.error("Error fetching users events:", error);
    return NextResponse.json(
      { error: "Failed to fetch users events" },
      { status: 500 }
    );
  }
}
