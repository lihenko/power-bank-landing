import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "@/app/components/ProductCard";
import CategoryPagination from "./CategoryPagination";
import {
  getCategoryIdBySlug,
} from "@/app/lib/category-slugs";

import Footer from "@/app/components/Footer";

import { db } from "@/lib/db";
import { getCategoryProducts } from "@/lib/categories/get-category-products";


/*
 * ============================================================
 * PAGE PARAMS
 * ============================================================
 */

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    page?: string;
  }>;
}


/*
 * ============================================================
 * CATEGORY
 * ============================================================
 */

interface Category {
  id: number;
  name: string;
}


/*
 * ============================================================
 * GET CATEGORY
 * ============================================================
 *
 * Отримуємо категорію по ID.
 *
 * ID отримуємо через:
 *
 * slug → category-slugs.ts → ID
 *
 * ============================================================
 */

async function getCategory(
  id: number
): Promise<Category | null> {

  const [rows] =
    await db.query(
      `
      SELECT
        id,
        name
      FROM categories
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

  const categories =
    rows as Category[];

  return (
    categories[0] ??
    null
  );
}


/*
 * ============================================================
 * METADATA
 * ============================================================
 */

export async function generateMetadata(
  {
    params,
  }: CategoryPageProps
): Promise<Metadata> {

  const { slug } =
    await params;


  /*
   * ----------------------------------------------------------
   * SLUG → CATEGORY ID
   * ----------------------------------------------------------
   */

  const categoryId =
    getCategoryIdBySlug(
      slug
    );


  /*
   * Якщо slug не існує
   */

  if (
    categoryId === null
  ) {

    return {
      title:
        "Категорія не знайдена",

      robots: {
        index: false,
        follow: false,
      },
    };

  }


  /*
   * ----------------------------------------------------------
   * GET CATEGORY
   * ----------------------------------------------------------
   */

  const category =
    await getCategory(
      categoryId
    );


  if (!category) {

    return {
      title:
        "Категорія не знайдена",

      robots: {
        index: false,
        follow: false,
      },
    };

  }


  /*
   * ----------------------------------------------------------
   * METADATA
   * ----------------------------------------------------------
   */

  return {

    title:
      `${category.name} — купити в HitMarket`,

    description:
      `Купити товари категорії «${category.name}» в HitMarket. Актуальні ціни та товари в наявності.`,

    alternates: {

      canonical:
        `/category/${slug}`,

    },

    openGraph: {

      title:
        `${category.name} — купити в HitMarket`,

      description:
        `Купити товари категорії «${category.name}» в HitMarket. Актуальні ціни та товари в наявності.`,

      type:
        "website",

      locale:
        "uk_UA",

    },

  };

}


/*
 * ============================================================
 * PAGE
 * ============================================================
 */

export default async function CategoryPage(
  {
    params,
    searchParams,
  }: CategoryPageProps
) {

  const { slug } =
    await params;

  const { page } =
    await searchParams;


  /*
   * ----------------------------------------------------------
   * SLUG → CATEGORY ID
   * ----------------------------------------------------------
   */

  const categoryId =
    getCategoryIdBySlug(
      slug
    );


  /*
   * Невідомий slug
   */

  if (
    categoryId === null
  ) {

    notFound();

  }


  /*
   * ----------------------------------------------------------
   * CATEGORY
   * ----------------------------------------------------------
   */

  const category =
    await getCategory(
      categoryId
    );


  if (!category) {

    notFound();

  }


  /*
   * ----------------------------------------------------------
   * PAGE
   * ----------------------------------------------------------
   */

  const requestedPage =
    Number(page);


  const currentPage =
    Number.isInteger(
      requestedPage
    ) &&
    requestedPage > 0
      ? requestedPage
      : 1;


  /*
   * ----------------------------------------------------------
   * PRODUCTS
   * ----------------------------------------------------------
   *
   * getCategoryProducts працює з category_id.
   *
   * Він повинен повертати тільки:
   *
   * available = 1
   *
   * і максимум 16 товарів
   * на одну сторінку.
   *
   * ----------------------------------------------------------
   */

  const {
    products,
    total,
    totalPages,
  } =
    await getCategoryProducts(
      categoryId,
      currentPage
    );


  /*
   * ----------------------------------------------------------
   * RENDER
   * ----------------------------------------------------------
   */

  return (
    <>

      <main className="min-h-screen bg-white">

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

          {/* ================================================== */}
          {/* HEADER */}
          {/* ================================================== */}

          <header className="mb-10">

            <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
              {category.name}
            </h1>

            <p className="mt-3 text-sm text-slate-500">

              {total}{" "}

              {total === 1
                ? "товар"
                : total < 5
                  ? "товари"
                  : "товарів"}

            </p>

          </header>


          {/* ================================================== */}
          {/* PRODUCTS */}
          {/* ================================================== */}

          {products.length > 0 ? (

            <>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

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


              {/* ================================================== */}
              {/* PAGINATION */}
              {/* ================================================== */}

              {totalPages > 1 && (

                <CategoryPagination
                  categorySlug={
                    slug
                  }

                  currentPage={
                    currentPage
                  }

                  totalPages={
                    totalPages
                  }
                />

              )}

            </>

          ) : (

            /* ================================================== */
            /* EMPTY CATEGORY */
            /* ================================================== */

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-20 text-center">

              <h2 className="text-2xl font-bold text-slate-900">
                У цій категорії немає товарів
              </h2>

              <p className="mt-3 text-slate-500">
                Наразі в категорії немає доступних товарів.
              </p>

            </div>

          )}

        </div>

      </main>


      {/* ================================================== */}
      {/* FOOTER */}
      {/* ================================================== */}

      <Footer />

    </>
  );

}