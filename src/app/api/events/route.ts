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
    const { title, location, date, startTime, duration } = body;

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

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";

    const filter = query ? { title: { $regex: query, $options: "i" } } : {};

    const matchingEvents = await Events.find(filter);

    return NextResponse.json(matchingEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
