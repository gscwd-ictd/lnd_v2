import { appwriteUrl } from "@lms/utilities/url/api-url";
import { NextRequest, NextResponse } from "next/server";
import sdk from "node-appwrite";

type Param = {
  params: {
    id: string;
  };
};

// delete a bucket by id
export async function DELETE(request: NextRequest, { params }: Param) {
  try {
    const client = new sdk.Client();
    const storage = new sdk.Storage(client);

    client
      .setEndpoint(appwriteUrl!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ORIENTATION!)
      .setKey(process.env.NEXT_PUBLIC_APPWRITE_ORIENTATION_SECRET_KEY!);

    const data = await storage.deleteBucket(params.id);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
