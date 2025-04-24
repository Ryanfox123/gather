import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";
import { getToken } from "next-auth/jwt";
import Users from "@/models/Users";

//post a new event
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const body = await req.json();
    const newEvent = await Events.create(body);

    if (newEvent) {
      await Events.findByIdAndUpdate(
        newEvent._id,
        { $addToSet: { attendees: newEvent.createdBy } },
        { new: true }
      );
    }
    const [updatedUser, updatedEvent] = await Promise.all([
      Events.findByIdAndUpdate(
        newEvent._id,
        { $addToSet: { attendees: newEvent.createdBy } },
        { new: true }
      ),
      Users.findByIdAndUpdate(
        newEvent.createdBy,
        { $addToSet: { events: newEvent._id } },
        { new: true }
      ),
    ]);
    if (!updatedUser || !updatedEvent || !newEvent) {
      return NextResponse.json(
        { error: "error posting your event" },
        { status: 404 }
      );
    }
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

//get all events
export async function GET() {
  await connectDB();
  const allEvents = await Events.find();
  return NextResponse.json(allEvents);
}
