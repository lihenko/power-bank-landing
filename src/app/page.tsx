import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";
import CompactSection from "@/app/components/CompactSection";
import PortsSection from "@/app/components/PortsSection";
import PackageSection from "@/app/components/PackageSection";
import Faq from "@/app/components/Faq";
import OrderPage from "@/app/components/OrderPage";
import StickyButton from "@/app/components/StickyButton";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <CompactSection />
      <PortsSection />
      <PackageSection />
      <Faq />
      <OrderPage />
      <StickyButton />
    </>
  );
}
