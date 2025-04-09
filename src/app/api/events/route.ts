import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newEvent = await Events.create(body);
  return NextResponse.json(newEvent, { status: 201 });
}

export async function GET() {
  await connectDB();
  const allEvents = await Events.find();
  return NextResponse.json(allEvents);
}
