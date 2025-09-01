import type { Metadata } from "next";
import { Ubuntu_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "./_components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "./_components/Footer";

const ubuntu = Ubuntu_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "SchoolShelf",
  description: "SchoolShelf - A simple platform to add, store, and browse schools with ease. Built using Next.js and MySQL, responsive on all devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={ubuntu.className}
        >
          <Navbar />
          {children}
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
