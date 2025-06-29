import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miguel Angel Fernandez - Legal Professional & Software Engineer",
  description:
    "Bilingual legal tech specialist and software engineer with expertise in legal technology solutions, web development, and AI integration. Based in Miami-Dade County, Florida.",
  keywords: [
    "legal tech",
    "software engineer",
    "paralegal",
    "web development",
    "AI integration",
    "Miami",
    "Florida",
  ],
  authors: [{ name: "Miguel Angel Fernandez" }],
  creator: "Miguel Angel Fernandez",
  publisher: "Miguel Angel Fernandez",
  robots: "index, follow",
  openGraph: {
    title: "Miguel Angel Fernandez - Legal Professional & Software Engineer",
    description:
      "Bilingual legal tech specialist and software engineer with expertise in legal technology solutions, web development, and AI integration.",
    url: "https://miguelangelfernandez.com",
    siteName: "Miguel Angel Fernandez Portfolio",
    images: [
      {
        url: "/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Miguel Angel Fernandez - Legal Professional & Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miguel Angel Fernandez - Legal Professional & Software Engineer",
    description:
      "Bilingual legal tech specialist and software engineer with expertise in legal technology solutions, web development, and AI integration.",
    images: ["/profile.jpeg"],
    creator: "@miguelangelfernandez",
  },
  icons: {
    icon: "/profile.jpeg",
    apple: "/profile.jpeg",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#060ce9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
