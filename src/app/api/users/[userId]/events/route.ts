import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Users from "@/models/Users";

interface Context {
  params: {
    userID: string;
    eventID: string;
  };
}

//get all events for a user
export async function GET(req: NextRequest, context: Context) {
  try {
    connectDB();
    const { userID } = context.params;

    const userEvents = await Users.findOne(
      { _id: userID },
      { events: 1, _id: 0 }
    );

    return NextResponse.json(userEvents);
  } catch (error) {
    console.error("Error fetching users events:", error);
    return NextResponse.json(
      { error: "Failed to fetch users events" },
      { status: 500 }
    );
  }
}
