import Hero from "@/app/components/Hero";
import CountdownBanner from "@/app/components/CountdownBanner";
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

import { lenyesConfig } from "@/app/lib/products/lenyes-px163";


export default function Home() {
  const p = lenyesConfig;
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
      <OrderPage productName={p.productName} price={p.price} stockCount={p.stockCount} />
      <Footer />
      <StickyButton price={p.price} />
      <LiveViewersBadge />
      <RecentOrderToast />
    </>
  );
}
