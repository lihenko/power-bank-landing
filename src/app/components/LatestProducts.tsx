import { getLatestProducts } from "@/lib/products/get-latest-products";
import { ProductCard } from "./ProductCard";

export default async function LatestProducts() {

  const products =
    await getLatestProducts(8);

  if (
    products.length === 0
  ) {

    return null;

  }

  return (

    <section
      id="latest-products"
      className="py-16"
    >

      <div
        className="
          mx-auto
          container
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* Заголовок */}

        <div
          className="
            mb-10
            flex
            items-end
            justify-between
            gap-4
          "
        >

          <div>

            <p
              className="
                mb-2
                text-sm
                font-medium
                text-green-600
              "
            >
              Новинки каталогу
            </p>

            <h2
              className="
                text-3xl
                font-black
                text-gray-900
                sm:text-4xl
              "
            >
              Останні товари
            </h2>

          </div>

        </div>

        {/* Товари */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {products.map(
            (product) => (

              <ProductCard
                key={
                  product.productSlug
                }
                product={
                  product
                }
              />

            )
          )}

        </div>

      </div>

    </section>

  );
}