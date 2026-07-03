import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import FacebookPixel from '@/app/components/FacebookPixel';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "Hitmarket - товари для всієї родини",
    template: "%s | Hitmarket",
  },

  description:
    "Компактний Power Bank Lenyes PX163 10000 mAh. Заряджайте два пристрої одночасно. Швидка доставка по Україні.",

  keywords: [
    "power bank",
    "повербанк",
    "Lenyes",
    "10000 mAh",
    "купити повербанк",
    "зовнішній акумулятор",
  ],

  openGraph: {
    title: "Power Bank Lenyes PX163",
    description:
      "Портативний акумулятор 10000 mAh із двома USB-портами.",
    type: "website",
    locale: "uk_UA",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Power Bank Lenyes",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Power Bank Lenyes PX163",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Power Bank Lenyes PX163",
    description: "Портативний акумулятор 10000 mAh",
    images: ["/images/og.webp"],
    creator: "@vladlihenko",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900`}>
        <FacebookPixel />
        {children}
      </body>
      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-XKEGRTR1D9" />
      )}
    </html>
  );
}