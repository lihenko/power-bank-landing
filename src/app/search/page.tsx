import Link from "next/link";

import { ProductCard } from "@/app/components/ProductCard";

import {
  getSearchProducts,
  type SearchProduct,
} from "@/app/lib/search/search-products";

import SearchForm from "@/app/components/SearchForm";
import SearchPagination from "./SearchPagination";
import Footer from "@/app/components/Footer";


interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}


/**
 * ============================================================
 * SEARCH PAGE
 * ============================================================
 */

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {

  const params =
    await searchParams;


  const query =
    typeof params.q === "string"
      ? params.q.trim()
      : "";


  const rawPage =
    typeof params.page === "string"
      ? Number(params.page)
      : 1;


  const page =
    Number.isInteger(rawPage) &&
    rawPage > 0
      ? rawPage
      : 1;


  /**
   * ----------------------------------------------------------
   * SEARCH
   * ----------------------------------------------------------
   */

  const result =
    query.length > 0
      ? await getSearchProducts(
          query,
          page
        )
      : {
          products: [] as SearchProduct[],
          total: 0,
          totalPages: 0,
          currentPage: 1,
        };


  const {
    products,
    total,
    totalPages,
    currentPage,
  } = result;


  /**
   * ==========================================================
   * RENDER
   * ==========================================================
   */

  return (
    <>
    <main
      className="
        min-h-screen
        bg-base-200
      "
    >

      <div
        className="
          container
          mx-auto
          px-4
          py-8
          lg:py-12
        "
      >

        {/* ==================================================
            HEADER
            ================================================== */}

        <header className="mb-8">

          <h1
            className="
              text-3xl
              font-bold
              text-base-content
              md:text-4xl
            "
          >
            Пошук товарів
          </h1>


          <div
            className="
              mt-5
              max-w-3xl
            "
          >
            <SearchForm
              initialQuery={query}
            />
          </div>

        </header>


        {/* ==================================================
            EMPTY QUERY
            ================================================== */}

        {query.length === 0 && (

          <section
            className="
              rounded-2xl
              border
              border-base-300
              bg-base-100
              px-6
              py-12
              text-center
            "
          >

            <h2
              className="
                text-xl
                font-semibold
              "
            >
              Введіть пошуковий запит
            </h2>

            <p
              className="
                mt-2
                text-base-content/60
              "
            >
              Введіть назву товару,
              виробника або артикул.
            </p>

          </section>

        )}


        {/* ==================================================
            RESULTS
            ================================================== */}

        {query.length > 0 && (

          <>

            {/* RESULTS HEADER */}

            <div
              className="
                mb-6
                flex
                flex-col
                gap-2
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Результати пошуку
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-base-content/60
                  "
                >
                  За запитом:{" "}

                  <span
                    className="
                      font-medium
                      text-base-content
                    "
                  >
                    «{query}»
                  </span>

                </p>

              </div>


              {total > 0 && (

                <div
                  className="
                    text-sm
                    text-base-content/60
                  "
                >
                  Знайдено:{" "}

                  <span
                    className="
                      font-semibold
                      text-base-content
                    "
                  >
                    {total}
                  </span>
                </div>

              )}

            </div>


            {/* ==================================================
                NO RESULTS
                ================================================== */}

            {products.length === 0 && (

              <section
                className="
                  rounded-2xl
                  border
                  border-base-300
                  bg-base-100
                  px-6
                  py-12
                  text-center
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Нічого не знайдено
                </h2>

                <p
                  className="
                    mt-3
                    text-base-content/60
                  "
                >
                  За запитом «{query}»
                  товарів не знайдено.
                </p>

                <p
                  className="
                    mt-2
                    text-sm
                    text-base-content/50
                  "
                >
                  Спробуйте змінити пошуковий запит
                  або використати інші ключові слова.
                </p>

              </section>

            )}


            {/* ==================================================
                PRODUCTS
                ================================================== */}

            {products.length > 0 && (

              <>

                <section
                  aria-label="Результати пошуку"
                  className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                  "
                >

                  {products.map(
                    (
                      product: SearchProduct
                    ) => (

                      <ProductCard
                        key={product.id}
                        product={{
                          productName:
                            product.name,

                          productSlug:
                            product.slug,

                          category_id: product.categoryId,

                          price:
                            product.price,

                          ...(product.oldPrice !== null
                            ? {
                                oldPrice:
                                  product.oldPrice,
                              }
                            : {}),

                          seo: {
                            title:
                              product.name,

                            description:
                              "",

                            ogImage:
                              product.image ||
                              "/products/placeholder.webp",

                            canonicalPath:
                              `/product/${product.slug}`,
                          },

                          hero: {
                            title:
                              product.name,

                            description:
                              "",

                            image:
                              product.image ||
                              "/products/placeholder.webp",

                            imageAlt:
                              product.imageAlt ||
                              product.name,
                          },
                        }}
                      />

                    )
                  )}

                </section>


                {/* ==================================================
                    PAGINATION
                    ================================================== */}

                {totalPages > 1 && (

                  <div className="mt-10">

                    <SearchPagination
                      currentPage={
                        currentPage
                      }

                      totalPages={
                        totalPages
                      }

                      query={
                        query
                      }
                    />

                  </div>

                )}

              </>

            )}

          </>

        )}

      </div>

    </main>
    <Footer/>
    </>
  );
}