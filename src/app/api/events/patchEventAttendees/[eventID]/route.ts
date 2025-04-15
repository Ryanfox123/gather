import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";
import mongoose from "mongoose";

interface Context {
  params: {
    eventID: string;
  };
}

export async function PATCH(req: Request, context: Context) {
  try {
    await connectDB();
    const { eventID } = context.params;
    const body = await req.json();

    const userID = body.userID;
    const isUserAttending = body.isUserAttending;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(eventID)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    const updateOperation = isUserAttending
      ? { $addToSet: { attendees: userID } }
      : { $pull: { attendees: userID } };

    const updatedEvent = await Events.findByIdAndUpdate(
      eventID,
      updateOperation,
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({
      msg: "Attendees successfully updated",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event attendees:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
