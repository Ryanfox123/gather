import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.accessToken) {
    return NextResponse.json(
      { error: "No access token found" },
      { status: 401 }
    );
  }

  const eventDetails = await req.json();

  if (!eventDetails.startTime || !eventDetails.duration) {
    return NextResponse.json(
      { error: "Missing required fields: startDateTime or duration" },
      { status: 400 }
    );
  }

  const startDateTime = new Date(eventDetails.startTime);
  const endDateTime = new Date(
    startDateTime.getTime() + eventDetails.duration * 60 * 60 * 1000
  );

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: session.user.accessToken,
  });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const event = {
    summary: eventDetails.title,
    location: eventDetails.location,
    description: eventDetails.description,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: "Europe/London",
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: "Europe/London",
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });

    return NextResponse.json({ event: response.data });
  } catch (error) {
    console.error("Google Calendar API error:", error);
    return NextResponse.json(
      { error: "Failed to create calendar event" },
      { status: 500 }
    );
  }
}
