import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "द चेन फ्री प्रोजेक्ट | हात्ती संरक्षण अभियान",
  description: "हात्ती सफारी र सवारीको अन्त्य गर्न तथा हात्तीहरूलाई स्वतन्त्र र सम्मानजनक जीवन प्रदान गर्न सुरु गरिएको अभियानमा सहभागी हुनुहोस्।",
  keywords: ["हात्ती संरक्षण", "चेन फ्री प्रोजेक्ट", "हात्ती सफारी अन्त्य", "हात्ती आरक्ष", "स्वयंसेवक"],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
