import Image from "next/image";
import Link from "next/link";

import { getCategories } from "@/lib/categories/get-categories";

export default async function CategoriesSection() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
            Каталог
          </p>

          <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Популярні категорії
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Оберіть категорію та знайдіть потрібні товари в нашому каталозі.
          </p>
        </div>

        {/* ================================================== */}
        {/* CATEGORIES */}
        {/* ================================================== */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => {

            const image =
              `/categories/${category.slug}.webp`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl"
              >

                {/* ================================================== */}
                {/* IMAGE */}
                {/* ================================================== */}

                <div className="relative aspect-1536/1024 overflow-hidden bg-slate-100">

                  <img
                    src={image}
                    alt={category.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="
                      (max-width: 640px) 50vw,
                      (max-width: 1024px) 33vw,
                      25vw
                    "
                  />

                </div>

                {/* ================================================== */}
                {/* CONTENT */}
                {/* ================================================== */}

                <div className="p-4 sm:p-5">

                  <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                    {category.name}
                  </h3>

                  <span className="mt-3 inline-flex items-center text-sm font-semibold text-green-600 transition-transform duration-300 group-hover:translate-x-1">
                    Перейти
                    <span className="ml-1">
                      →
                    </span>
                  </span>

                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}