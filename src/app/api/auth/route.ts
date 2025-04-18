import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import Users from "@/models/Users";
import bcrypt from "bcrypt";

//sign user in
export async function POST(req: NextRequest) {}
