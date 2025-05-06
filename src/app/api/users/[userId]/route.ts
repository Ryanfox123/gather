import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Users from "@/models/Users";

//Get a users info
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userID: string }> }
) {
  try {
    await connectDB();
    const { userID } = await context.params;

    const user = await Users.findById(userID);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
