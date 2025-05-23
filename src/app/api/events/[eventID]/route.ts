import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";
import mongoose from "mongoose";

// GET
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ eventID: string }> }
) {
  const { eventID } = await context.params;
  try {
    await connectDB();
    const event = await Events.findById(eventID);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ eventID: string }> }
) {
  const { eventID } = await context.params;
  try {
    await connectDB();
    await Events.deleteOne({ _id: eventID });

    return NextResponse.json({ msg: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}

// PATCH
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ eventID: string }> }
) {
  const { eventID } = await context.params;
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(eventID)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    return NextResponse.json({ msg: "Event found!" });
  } catch (e) {
    console.error("Error updating event information:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
