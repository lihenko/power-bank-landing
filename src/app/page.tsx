import { allProducts } from '@/app/lib/products/index';
import { ProductCardOld } from '@/app/components/ProductCardOld';
import LatestProducts from "@/app/components/LatestProducts";
import CategoriesSection from "@/app/components/CategoriesSection";
import Footer from '@/app/components/Footer';


export default function Home() {

  return (
    <>
      <div className="max-w-3xl mx-auto text-center px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Товари для дому та здоров'я з доставкою по Україні
        </h1>
        <p className="text-gray-600">
          Обираємо перевірені товари, які реально працюють — від побутової техніки
          до товарів для здоров'я. Швидка доставка, оплата при отриманні, гарантія якості.
        </p>
      </div>
      <LatestProducts />
      <CategoriesSection />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {allProducts.map((product) => (
            <ProductCardOld key={product.productSlug} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
