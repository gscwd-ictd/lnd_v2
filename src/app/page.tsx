import { redirect } from "next/navigation";

export default function Index() {
  redirect("/dashboard/insights");
  // redirect("/trainings/notice");
}
