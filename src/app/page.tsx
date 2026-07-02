import Hero from "@/app/components/Hero";
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

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CompactSection />
      <PortsSection />
      <PackageSection />
      <ReviewsSection />
      <Faq />
      <OrderPage />
      <Footer />
      <StickyButton />
      <LiveViewersBadge />
      <RecentOrderToast />
    </>
  );
}
