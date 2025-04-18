import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcrypt";

//create new user
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const saltRounds = 4;
    const hash = await bcrypt.hash(body.password, saltRounds);

    body.admin = false;
    body.passwordHash = hash;

    const emailExists = await Users.findOne({ email: body.email });

    if (emailExists) {
      return NextResponse.json(
        { msg: "Email already exists" },
        { status: 409 }
      );
    }

    const newUser = await Users.create(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
