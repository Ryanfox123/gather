import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Events from "@/models/Events";
import mongoose from "mongoose";

interface Context {
  params: {
    eventID: string;
    userID: string;
  };
}

//remove a user from attending an event
export async function PATCH() {}
