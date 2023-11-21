import "../styles/tailwind.css";
import { Poppins } from "next/font/google";
import { RootContainer } from "@lms/components/osprey/root-container/view/RootContainer";
import { PageContent } from "@lms/components/osprey/page-content/view/PageContent";
import { Sidebar } from "@lms/components/osprey/navigations/side/sidebar/view/Sidebar";
import { AppwriteClientContainer } from "@lms/components/osprey/appwrite/view/AppwriteContainer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Learning Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <RootContainer>
          <AppwriteClientContainer>
            <Sidebar />
            <PageContent>{children}</PageContent>
          </AppwriteClientContainer>
        </RootContainer>
      </body>
    </html>
  );
}
