import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog/blog";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Корисні статті, поради та огляди товарів від Hitmarket. Дізнавайтеся більше про товари для дому, авто, електроніку, відпочинок та щоденного використання.",
  alternates: {
    canonical: "/blog",
  },
};

const POSTS_PER_PAGE = 6;

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

function getPageNumber(value?: string): number {
  const page = Number(value);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getExcerpt(
  excerpt: string,
  content: string,
  maxLength = 180
): string {
  const source = excerpt || content;

  const text = source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}…`;
}

export default async function BlogPage({
  searchParams,
}: BlogPageProps) {
  const params = await searchParams;

  const page = getPageNumber(params.page);

  const {
    posts,
    total,
    totalPages,
  } = await getBlogPosts(page, POSTS_PER_PAGE);

  /*
   * Якщо користувач відкрив неіснуючу сторінку,
   * наприклад /blog?page=999
   */
  if (page > totalPages && totalPages > 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Сторінку не знайдено
          </h1>

          <p className="mt-4 text-slate-600">
            Такої сторінки блогу не існує.
          </p>

          <Link
            href="/blog"
            className="mt-8 inline-flex rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Перейти до блогу
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Блог Hitmarket
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Корисні поради, практичні інструкції та інформація про товари
          для дому, автомобіля, відпочинку та повсякденного використання.
        </p>
      </header>

      {/* Empty state */}
      {posts.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-12 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Статей поки немає
          </h2>

          <p className="mt-2 text-slate-600">
            Нові матеріали зʼявляться найближчим часом.
          </p>
        </div>
      ) : (
        <>
          {/* Posts */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const excerpt = getExcerpt(
                post.excerpt,
                post.content
              );

              return (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block overflow-hidden bg-slate-100"
                  >
                    {post.post_thumbnail ? (
                      <img
                        src={post.post_thumbnail}
                        alt={post.title}
                        className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center bg-slate-100 text-sm text-slate-400">
                        Hitmarket
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <time
                      dateTime={new Date(post.date).toISOString()}
                      className="text-sm text-slate-500"
                    >
                      {formatDate(post.date)}
                    </time>

                    <h2 className="mt-2 text-xl font-semibold leading-snug text-slate-900">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition hover:text-slate-600"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {excerpt}
                    </p>

                    <div className="mt-auto pt-5">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                      >
                        Читати статтю
                        <span
                          aria-hidden="true"
                          className="ml-1 transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              aria-label="Пагінація блогу"
              className="mt-12 flex items-center justify-center gap-2"
            >
              {/* Previous */}
              {page > 1 ? (
                <Link
                  href={
                    page === 2
                      ? "/blog"
                      : `/blog?page=${page - 1}`
                  }
                  aria-label="Попередня сторінка"
                  className="flex h-10 items-center rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  ←
                </Link>
              ) : (
                <span className="flex h-10 items-center rounded-lg border border-slate-100 px-4 text-sm text-slate-300">
                  ←
                </span>
              )}

              {/* Page numbers */}
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => {
                const isCurrent = pageNumber === page;

                return (
                  <Link
                    key={pageNumber}
                    href={
                      pageNumber === 1
                        ? "/blog"
                        : `/blog?page=${pageNumber}`
                    }
                    aria-current={
                      isCurrent ? "page" : undefined
                    }
                    className={`flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${
                      isCurrent
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}

              {/* Next */}
              {page < totalPages ? (
                <Link
                  href={`/blog?page=${page + 1}`}
                  aria-label="Наступна сторінка"
                  className="flex h-10 items-center rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  →
                </Link>
              ) : (
                <span className="flex h-10 items-center rounded-lg border border-slate-100 px-4 text-sm text-slate-300">
                  →
                </span>
              )}
            </nav>
          )}

          {/* Total */}
          <p className="mt-5 text-center text-sm text-slate-500">
            Всього статей: {total}
          </p>
        </>
      )}
    </main>
    <Footer/>
    </>
  );
}