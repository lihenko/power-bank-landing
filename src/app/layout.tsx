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
  "Hitmarket — інтернет-магазин товарів для дому, електроніки, авто, саду, відпочинку та щоденного використання. Купуйте онлайн з доставкою по Україні.",

  keywords: [
    "Hitmarket",
    "інтернет-магазин",
    "товари для дому",
    "електроніка",
    "товари для авто",
    "товари для саду",
    "товари для відпочинку",
    "купити онлайн",
    "інтернет магазин товарів",
    "доставка по Україні",
  ],

  openGraph: {
  title: "Hitmarket — інтернет-магазин товарів",
  description:
    "Hitmarket — інтернет-магазин товарів для дому, електроніки, авто, саду, відпочинку та щоденного використання. Купуйте онлайн з доставкою по Україні.",
  type: "website",
  locale: "uk_UA",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  siteName: "Hitmarket",
  images: [
    {
      url: "/og.webp",
      width: 1200,
      height: 630,
      alt: "Hitmarket — інтернет-магазин товарів",
    },
  ],
},

twitter: {
  card: "summary_large_image",
  title: "Hitmarket — інтернет-магазин товарів",
  description:
    "Товари для дому, електроніка, авто, сад, відпочинок та багато іншого. Замовляйте онлайн з доставкою по Україні.",
  images: ["/og.webp"],
  creator: "@vladlihenko",
},

  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "U85hdMhTK1ExKFzQuEkd2uZTDwWSJ1mDE_PKYBnyPdk",
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