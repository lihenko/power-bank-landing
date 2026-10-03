import LatestProducts from "@/app/components/LatestProducts";
import CategoriesSection from "@/app/components/CategoriesSection";
import Footer from '@/app/components/Footer';
import SearchForm from "@/app/components/SearchForm";
import LatestBlogPosts from "@/app/components/LatestBlogPosts";
import type { Metadata } from "next";


export const metadata: Metadata = {
  alternates: {
    canonical: "https://hitmarket.pp.ua",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function Home() {

  return (
    <>
      <div className="max-w-3xl mx-auto text-center px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Товари для дому та здоров'я з доставкою по Україні
        </h1>
        <p className="text-gray-600">
          Обираємо перевірені товари, які реально працюють — від побутової техніки
          до товарів для здоров'я. Швидка доставка.
        </p>
      </div>
      <section className="py-8">
      <div className="container mx-auto px-4">
        <SearchForm />
      </div>
    </section>
      <LatestProducts />
      <CategoriesSection />
      <LatestBlogPosts/>
      <Footer />
    </>
  );
}
