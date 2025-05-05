import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";
import { getToken } from "next-auth/jwt";
import Users from "@/models/Users";

// Post a new event
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      location,
      date,
      startTime,
      duration,
      imageUrl,
    } = body;

    if (!title || !location || !date || !startTime || !duration) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEvent = await Events.create({
      ...body,
      createdBy: token.sub,
    });

    const updatedEvent = await Events.findByIdAndUpdate(
      newEvent._id,
      { $addToSet: { attendees: newEvent.createdBy } },
      { new: true }
    );

    const updatedUser = await Users.findByIdAndUpdate(
      newEvent.createdBy,
      { $addToSet: { events: newEvent._id } },
      { new: true }
    );

    if (!updatedUser || !updatedEvent) {
      return NextResponse.json(
        { error: "Error posting your event" },
        { status: 500 }
      );
    }

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get all events
export async function GET() {
  try {
    await connectDB();
    const allEvents = await Events.find();
    return NextResponse.json(allEvents);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
