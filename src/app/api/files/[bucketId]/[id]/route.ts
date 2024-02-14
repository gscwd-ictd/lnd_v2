import { NextRequest, NextResponse } from "next/server";
import sdk from "node-appwrite";

type Param = {
  params: {
    bucketId: string;
    fileId: string;
  };
};

// delete a file by bucket_id and file_id
export async function DELETE(request: NextRequest, { params }: Param) {
  console.log(params);
  try {
    const client = new sdk.Client();
    const storage = new sdk.Storage(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setKey(process.env.NEXT_PUBLIC_APPWRITE_SECRET_KEY!);

    const data = await storage.deleteFile(params.bucketId, params.fileId);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
