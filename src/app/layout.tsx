import "../styles/tailwind.css";
import { Poppins } from "next/font/google";
import { RootContainer } from "@lms/components/osprey/root-container/view/RootContainer";
import { PageContent } from "@lms/components/osprey/page-content/view/PageContent";
import { Sidebar } from "@lms/components/osprey/navigations/side/sidebar/view/Sidebar";
import { AppwriteClientContainer } from "@lms/components/osprey/appwrite/view/AppwriteContainer";
import { PageWrapper } from "@lms/components/osprey/page-content/view/PageWrapper";
import axios from "axios";
import { url } from "@lms/utilities/url/api-url";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { createFakeCookie } from "./functions/call";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Learning Management System",
};

async function getUserFromHrmsDashboard() {
  const res = await axios.get(`${url}/hrms/lnd`);
  return res;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  try {
    const user = await getUserFromHrmsDashboard();
  } catch (error) {
    // redirect(`${process.env.NEXT_PUBLIC_HRMS_DASHBOARD_URL}`);
  }

  return (
    <html lang="en">
      <body className={poppins.className}>
        <RootContainer>
          <AppwriteClientContainer>
            <Sidebar />
            <PageContent>
              <PageWrapper>{children}</PageWrapper>
            </PageContent>
          </AppwriteClientContainer>
        </RootContainer>
      </body>
    </html>
  );
}
