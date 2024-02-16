import { cookies } from "next/headers";

export async function createFakeCookie() {
  "use server";
  return cookies().set({ name: "ssid_lnd", value: "lnd", httpOnly: true, path: "/" });
}
