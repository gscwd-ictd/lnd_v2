import { appwriteUrl } from "@lms/utilities/url/api-url";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import sdk from "node-appwrite";
import { v4 as uuidv4 } from "uuid";
import { InputFile } from "node-appwrite";

type MyError = Omit<AxiosResponse, "data"> & {
  data: { error: { message: string; status: number; step: number } };
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { files, bucketId } = body;

  try {
    const client = new sdk.Client();
    const storage = new sdk.Storage(client);

    client
      .setEndpoint(appwriteUrl!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_BENCHMARKING!)
      .setKey(process.env.NEXT_PUBLIC_APPWRITE_BENCHMARKING_SECRET_KEY!);

    // map all files to upload as we call the storage.createFile function to save it in appwrite
    const allFiles = await Promise.all(
      files.map(async (file: File) => {
        const result = await storage.createFile(bucketId, uuidv4(), file);
      })
    );

    // // map all files to upload as we call the storage.createFile function to save it in appwrite
    // const allFiles = await Promise.all(
    //   files.map(async (file: any) => {
    //     const _file = InputFile.fromBuffer(file.fromBuffer, file.originalname);
    //     console.log("FROM BACKEND: ", _file);
    //     const result = await storage.createFile(bucketId, uuidv4(), _file);
    //     return result;
    //   })
    // );

    return NextResponse.json(allFiles);
  } catch (error) {
    const myError = error as MyError;
    console.log(error);
    return NextResponse.json({ error: { ...myError, step: 3 } }, { status: 400 });
  }
}
