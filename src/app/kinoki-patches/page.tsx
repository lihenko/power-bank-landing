import type { Metadata } from "next";
import Hero from "@/app/components/Hero";
import CountdownBanner from "@/app/components/CountdownBanner";
import BundlesSection from "@/app/components/BundlesSection";
import Features from "@/app/components/Features";
import CompactSection from "@/app/components/CompactSection";
import PortsSection from "@/app/components/PortsSection";
import PackageSection from "@/app/components/PackageSection";
import ReviewsSection from "@/app/components/ReviewsSection";
import Faq from "@/app/components/Faq";
import OrderPage from "@/app/components/OrderPage";
import Footer from "@/app/components/Footer";
import StickyButton from "@/app/components/StickyButton";
import LiveViewersBadge from "@/app/components/LiveViewersBadge";
import RecentOrderToast from "@/app/components/RecentOrderToast";
import HowToOrder from "@/app/components/HowToOrder";
import ProductPurchaseFlow from "@/app/components/ProductPurchaseFlow";

import { kinokiConfig } from "@/app/lib/products/kinoki-patches";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hitmarket.pp.ua";

export function generateMetadata(): Metadata {
  const p = kinokiConfig;
  const canonicalUrl = `${SITE_URL}${p.seo.canonicalPath}`;
  const ogImageUrl = `${SITE_URL}${p.seo.ogImage}`;

  return {
    title: p.seo.title,
    description: p.seo.description,
    keywords: p.seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: p.seo.title,
      description: p.seo.description,
      url: canonicalUrl,
      siteName: p.productName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: p.hero.imageAlt,
        },
      ],
      locale: "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: p.seo.title,
      description: p.seo.description,
      images: [ogImageUrl],
      creator: "@vladlihenko",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}


export default function Home() {
  const p = kinokiConfig;
  return (
    <>
      <Hero {...p.hero} price={p.price} oldPrice={p.oldPrice} />
      <CountdownBanner />
      {p.features && <Features {...p.features} />}
      {p.compact && <CompactSection {...p.compact} />}
      {p.ports && <PortsSection {...p.ports} />}
      {p.package && <PackageSection {...p.package} />}
      {p.reviews && p.reviews.length > 0 && <ReviewsSection reviews={p.reviews} />}
      {p.faq && p.faq.length > 0 && <Faq items={p.faq} />}
      <HowToOrder />
      <ProductPurchaseFlow
        productName={p.productName}
        price={p.price}
        stockCount={p.stockCount}
        bundles={p.bundles}
      />
      <Footer />
      <StickyButton price={p.price} />
      <LiveViewersBadge />
      <RecentOrderToast />
    </>
  );
}
