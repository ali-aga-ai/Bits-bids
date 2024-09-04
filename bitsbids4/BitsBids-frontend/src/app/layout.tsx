import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Import the Inter font from Google Fonts.
 */
const inter = Inter({ subsets: ["latin"] });

/**
 * Define the metadata for the application.
 */
export const metadata: Metadata = {
  title: "BITS BIDS",
  description: "Auction Website",
};

/**
 * The RootLayout component.
 * @param children The child components to render.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Render the Navbar component */}
        <Navbar />
        {/* Render the child components */}
        {children}
        {/* Render the Footer component */}
        <Footer />
      </body>
    </html>
  );
}