import "../styles/tailwind.css";
import { Poppins } from "next/font/google";
import { RootContainer } from "@lms/components/osprey/root-container/view/RootContainer";
import { PageContent } from "@lms/components/osprey/page-content/view/PageContent";
import { Sidebar } from "@lms/components/osprey/navigations/side/sidebar/view/Sidebar";
import { AppwriteClientContainer } from "@lms/components/osprey/appwrite/view/AppwriteContainer";
import localFont from "next/dist/compiled/@next/font/dist/local";
import { PageWrapper } from "@lms/components/osprey/page-content/view/PageWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// const poppins= localFont({src:'next/font/google'})

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
            <PageContent>
              <PageWrapper>{children}</PageWrapper>
            </PageContent>
          </AppwriteClientContainer>
        </RootContainer>
      </body>
    </html>
  );
}
