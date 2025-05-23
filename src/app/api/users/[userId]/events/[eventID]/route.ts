import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Users from "@/models/Users";
import mongoose from "mongoose";
import Events from "@/models/Events";

//Update a users events, also update that events attendees
export async function PATCH(
  req: Request,
  context: { params: Promise<{ userId: string; eventID: string }> }
) {
  try {
    await connectDB();
    const { userId, eventID } = await context.params;
    const body = await req.json();

    const isAttending = body.isAttending;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(eventID)
    ) {
      return NextResponse.json(
        { error: "Invalid user or event ID" },
        { status: 400 }
      );
    }

    const userUpdate = isAttending
      ? { $addToSet: { events: eventID } }
      : { $pull: { events: eventID } };

    const eventUpdate = isAttending
      ? { $addToSet: { attendees: userId } }
      : { $pull: { attendees: userId } };

    const [updatedUser, updatedEvent] = await Promise.all([
      Users.findByIdAndUpdate(userId, userUpdate, { new: true }),
      Events.findByIdAndUpdate(eventID, eventUpdate, { new: true }),
    ]);

    if (!updatedUser || !updatedEvent) {
      return NextResponse.json(
        { error: "User or event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      msg: `User ${isAttending ? "joined" : "left"} the event successfully`,
      user: updatedUser,
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error syncing user and event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
