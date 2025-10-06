import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "LEA JUICE - Pure Taste, Pure Life",
  description:
    "Handcrafted wellness in every bottle. 100% organic cold-pressed juice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="shortcut icon" href="logojus2.png" type="image/x-icon" />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans bg-stone-50 text-stone-900 overflow-x-hidden`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
