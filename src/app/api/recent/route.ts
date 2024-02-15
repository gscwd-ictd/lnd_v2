import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log({ items: [] });
  return NextResponse.json({ items: [] });
}
