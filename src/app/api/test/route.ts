import { appwriteUrl } from "@lms/utilities/url/api-url";
import { Client, Storage } from "appwrite";
import { nanoid } from "nanoid";
import sdk from "node-appwrite";

async function createFile(files: File[]) {
  try {
    const client = new Client();
    const storage = new Storage(client);
    client.setEndpoint(appwriteUrl!).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_LND!);

    let tempIds: Array<string> = [];

    const test = await Promise.all(
      files.map(async (file) => {
        const result = await storage.createFile("1231238908", nanoid(), file);
        tempIds.push(result.$id);
      })
    );
    // setBucketStrings(tempIds);
    return Response.json({ Data: test });
  } catch (error) {
    console.log("ERROR");
    return Response.json({ Error: "Route not working" });
  }
}

async function createBucketFile(id: string, name: string) {
  try {
    const client = new sdk.Client();
    const storage = new sdk.Storage(client);

    client.setEndpoint(appwriteUrl!).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_LND!);

    const data = await storage.createBucket(id, name);

    return Response.json({ Data: data });
  } catch (error) {
    console.log("ERROR");
    return Response.json({ Error: "Route not working" });
  }
}

// export async function POST(response: Request, files: File[]) {
//   await createFile(files);
// }

export async function GET(request: Request, id: string, name: string) {
  // await createBucketFile(id, name);
  return Response.json({ ASDS: "ASDAS" });
}
