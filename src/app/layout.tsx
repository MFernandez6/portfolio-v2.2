import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkyBackground from "@/components/ghibli/SkyBackground";
import FloatingLeaves from "@/components/ghibli/FloatingLeaves";
import PageBottomBronto from "@/components/ghibli/PageBottomBronto";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miguel Angel Fernandez — Licensed Claims Adjuster | Software Engineer | Legal Professional",
  description:
    "Florida-licensed claims adjuster combining legal expertise, cybersecurity, hospitality service, and policy analysis to advocate for insureds across the state.",
  keywords: [
    "claims adjuster",
    "Florida 6-20 license",
    "insurance",
    "legal professional",
    "cybersecurity",
    "Miami",
    "Florida",
    "Manatee Insurance",
    "SafePoint MGA",
  ],
  authors: [{ name: "Miguel Angel Fernandez" }],
  creator: "Miguel Angel Fernandez",
  publisher: "Miguel Angel Fernandez",
  robots: "index, follow",
  openGraph: {
    title:
      "Miguel Angel Fernandez — Licensed Claims Adjuster | Software Engineer | Legal Professional",
    description:
      "A deliberate career pivot: law, technology, hospitality, and insurance united to serve insureds with clarity and care.",
    url: "https://miguelangelfernandez.com",
    siteName: "Miguel Angel Fernandez",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Miguel Angel Fernandez — Licensed Claims Adjuster | Software Engineer | Legal Professional",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Miguel Angel Fernandez — Licensed Claims Adjuster | Software Engineer | Legal Professional",
    description:
      "Florida-licensed adjuster bridging legal analysis, technology, and white-glove service.",
    images: ["/og-image.png"],
    creator: "@miguelangelfernandez",
  },
  icons: {
    icon: "/profile.jpeg",
    apple: "/profile.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${nunito.variable} ${geistMono.variable} antialiased paper-texture`}
      >
        <SkyBackground />
        <FloatingLeaves />
        <Navbar />
        <main className="relative z-10 pb-16 sm:pb-[4.5rem]">{children}</main>
        <PageBottomBronto />
        <Footer />
      </body>
    </html>
  );
}
