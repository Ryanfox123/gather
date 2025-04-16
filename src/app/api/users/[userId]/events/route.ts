import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";
import mongoose from "mongoose";

interface Context {
  params: {
    userID: string;
    eventID: string;
  };
}

//get all events for a user
export async function GET() {}
