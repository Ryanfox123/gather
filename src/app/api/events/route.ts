import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";
import { getToken } from "next-auth/jwt";

//post a new event
export async function POST(req: NextRequest) {
  await connectDB();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
