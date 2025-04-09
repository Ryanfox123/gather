import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    events: [{ id: 1, name: "yoga session" }],
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({
    data,
  });
}

export async function PATCH() {
  return NextResponse.json({
    events: [{ id: 1, name: "yoga session" }],
  });
}

export async function DELETE() {
  return NextResponse.json({
    events: [{ id: 1, name: "yoga session" }],
  });
}
