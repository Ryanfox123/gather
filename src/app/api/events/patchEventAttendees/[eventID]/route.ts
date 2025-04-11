import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";
import mongoose from "mongoose";

export async function PATCH(req: Request, context: any) {
  try {
    await connectDB();
    const { eventID } = context.params;
    const body = await req.json();

    const userID = body.userID;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const updatedEvent = await Events.findByIdAndUpdate(
      eventID,
      { $addToSet: { attendees: userID } },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({
      msg: "Attendees successfully updated",
      data: updatedEvent,
    });
  } catch (e) {
    console.error("Error updating event attendees:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
