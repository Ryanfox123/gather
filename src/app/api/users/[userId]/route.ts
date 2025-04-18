import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Users from "@/models/Users";

interface Context {
  params: {
    userID: string;
  };
}

//Get a users info
export async function GET(_request: NextRequest, context: Context) {
  try {
    await connectDB();
    const { userID } = context.params;

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

//Remove a user
export async function DELETE() {}
