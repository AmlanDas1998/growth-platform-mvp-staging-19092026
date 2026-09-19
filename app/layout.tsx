import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import your original Navbar (pointing one folder up)
import Navbar from "../components/Navbar"; 

// 2. Import the Bulletproof Brain we just made
import { UserProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Growth Platform MVP",
  description: "Boutique Career Ecosystem for Pune Professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        
        {/* 3. Wrap your entire platform in the Provider */}
        <UserProvider>
          
          {/* Your original, untouched Navbar */}
          <Navbar />
          
          {/* Your pages (Hub, Site Builder, etc.) will render here */}
          {children}
          
        </UserProvider>
        
      </body>
    </html>
  );
}