import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import sdk, { Permission, Role } from "node-appwrite";

// create a bucket
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, name } = body;

  try {
    const client = new sdk.Client();
    const storage = new sdk.Storage(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setKey(process.env.NEXT_PUBLIC_APPWRITE_SECRET_KEY!);

    const data = await storage.updateBucket(body.id, body.name);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
