import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Users from "@/models/Users";

export async function GET(_request: Request, context: any) {
  try {
    await connectDB();
    const { userId } = context.params;

    const user = await Users.findById(userId);

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
