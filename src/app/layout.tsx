import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Toaster } from "react-hot-toast";

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
  icons: "./logojus2.png",
  description:
    "Handcrafted wellness in every bottle. 100% organic cold-pressed juice.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getServerSession(authOptions);
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/logojus2.png" type="image/x-icon" />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} font-sans bg-stone-50 text-white overflow-x-hidden`}
      >
        <Providers>
          <Toaster />
          <Navbar token={token} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
