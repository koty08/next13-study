import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next 13 App Test",
  description: "App Router 공부",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-locator-target="vscode">
      <body className={open_sans.className}>
        <div id="main" className="h-screen px-5">
          <NavBar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
