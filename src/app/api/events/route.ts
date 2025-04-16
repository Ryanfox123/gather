import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";

//post a new event
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  return await Events.create(body)
    .then((newDoc) => {
      return NextResponse.json(newDoc, { status: 201 });
    })
    .catch((err) => {
      console.error(err);
    });
}

//get all events
export async function GET() {
  await connectDB();
  const allEvents = await Events.find();
  return NextResponse.json(allEvents);
}
