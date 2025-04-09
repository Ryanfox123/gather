import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = await context;
  const usersId = await params.userId;
  return NextResponse.json({
    usersId,
  });
}
