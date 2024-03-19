import { appwriteUrl } from "@lms/utilities/url/api-url";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import sdk from "node-appwrite";
import { v4 as uuidv4 } from "uuid";

type MyError = Omit<AxiosResponse, "data"> & {
  data: { error: { message: string; status: number; step: number } };
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { fileToUpload, bucketId } = body;

  try {
    const client = new sdk.Client();
    const storage = new sdk.Storage(client);

    client
      .setEndpoint(appwriteUrl!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_LSP_EXTERNAL!)
      .setKey(process.env.NEXT_PUBLIC_APPWRITE_LSP_EXTERNAL_SECRET_KEY!);

    // map all files to upload as we call the storage.createFile function to save it in appwrite
    console.log("Bucket ID: ", bucketId);
    console.log("File to Upload: ", fileToUpload);

    const uploadedFile = await storage.createFile(bucketId, "5d13ee6a-4e02-4380-bd0f-a3627825261e", fileToUpload);

    return NextResponse.json(uploadedFile);
  } catch (error) {
    const myError = error as MyError;
    console.log(error);
    return NextResponse.json({ error: { ...myError, step: 3, error } }, { status: 400 });
  }
}
