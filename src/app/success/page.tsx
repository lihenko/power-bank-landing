import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/app/components/ProductCard";
import { getRandomProducts } from "@/lib/products/get-random-products";


export default async function OrderSuccessPage() {

  const randomProducts =
    await getRandomProducts(8);


  return (

    <>

      <div className="mx-auto max-w-lg py-20 text-center space-y-6">

        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Дякуємо за замовлення!</h1>
          <p className="text-muted-foreground">
            Ми зв&apos;яжемося з вами найближчим часом для підтвердження деталей.
          </p>
        </div>

        <Button render={<Link href="/">На головну</Link>} />

      </div>


      {/* ================================================== */}
      {/* RANDOM PRODUCTS */}
      {/* ================================================== */}

      {randomProducts.length > 0 && (

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">

          <h2 className="mb-6 text-center text-xl font-bold text-slate-900">
            Можливо, вас зацікавить
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {randomProducts.map(
              (product) => (

                <ProductCard
                  key={product.productSlug}
                  product={product}
                />

              )
            )}

          </div>

        </div>

      )}

    </>

  );

}