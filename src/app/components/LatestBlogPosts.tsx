import Link from "next/link";
import { getBlogPosts } from "@/lib/blog/blog";

function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function stripHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(text: string, maxLength = 140): string {
  const cleanText = stripHtml(text);

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  return `${cleanText.slice(0, maxLength).trim()}...`;
}

export default async function LatestBlogPosts() {
  const { posts } = await getBlogPosts(1, 3);

  if (!posts.length) {
    return null;
  }

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Корисно знати
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Останні статті
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Корисні поради, інструкції та відповіді на популярні запитання
              про товари та їх використання.
            </p>
          </div>

          <Link
            href="/blog"
            className="shrink-0 text-sm font-semibold text-slate-900 transition hover:text-slate-600"
          >
            Усі статті →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {post.post_thumbnail && (
                <Link href={`/blog/${post.slug}`}>
                  <img
                    src={post.post_thumbnail}
                    alt={post.title}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </Link>
              )}

              <div className="p-6">
                <time
                  dateTime={new Date(post.date).toISOString()}
                  className="text-sm text-slate-500"
                >
                  {formatDate(post.date)}
                </time>

                <h3 className="mt-2 text-xl font-bold leading-tight text-slate-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition hover:text-slate-600"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {getExcerpt(post.excerpt || post.content)}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                >
                  Читати статтю →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}