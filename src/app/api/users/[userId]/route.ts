import { NextResponse } from "next/server";

type Params = {
  params: {
    userId: string;
  };
};

export async function GET(_request: Request, { params }: Params) {
  const { userId } = params;

  return NextResponse.json({ userId });
}
