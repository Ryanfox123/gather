import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Users from "@/models/Users";
import mongoose from "mongoose";
import Events from "@/models/Events";

//Update a users events, also update that events attendees
export async function PATCH(req: Request, context: any) {
  try {
    await connectDB();
    const { userID } = context.params;
    const body = await req.json();

    const eventID = body.eventID;
    const isAttending = body.isAttending;

    if (
      !mongoose.Types.ObjectId.isValid(userID) ||
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
      ? { $addToSet: { attendees: userID } }
      : { $pull: { attendees: userID } };

    const [updatedUser, updatedEvent] = await Promise.all([
      Users.findByIdAndUpdate(userID, userUpdate, { new: true }),
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
