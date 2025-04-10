import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";

export async function GET(req: Request, context: any) {
  try {
    await connectDB();
    const { params } = context;

    const event = await Events.findById(params.eventID);

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

export async function DELETE(req: Request, context: any) {
  try {
    await connectDB();
    const { params } = context;
    await Events.deleteOne({ _id: params.eventID });
    return NextResponse.json({ msg: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
