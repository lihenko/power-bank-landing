import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/blog/blog";
import Footer from "@/app/components/Footer";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function stripHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDescription(
  description: string | null,
  excerpt: string,
  content: string
): string {
  if (description?.trim()) {
    return description.trim();
  }

  const text = stripHtml(excerpt || content);

  if (text.length <= 160) {
    return text;
  }

  return `${text.slice(0, 157).trim()}...`;
}

function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Статтю не знайдено",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.seo_title?.trim() || post.title;

  const description = getDescription(
    post.seo_description,
    post.excerpt,
    post.content
  );

  return {
    title,
    description,

    alternates: {
      canonical: `/blog/${post.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: new Date(post.date).toISOString(),
      siteName: "Hitmarket",
      locale: "uk_UA",

      images: post.post_thumbnail
        ? [
            {
              url: post.post_thumbnail,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.post_thumbnail
        ? [post.post_thumbnail]
        : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.date).toISOString();
  const formattedDate = formatDate(post.date);

  const description = getDescription(
    post.seo_description,
    post.excerpt,
    post.content
  );

  const canonicalUrl = `https://hitmarket.pp.ua/blog/${post.slug}`;

  /*
   * Article structured data
   */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",

    "@id": `${canonicalUrl}#article`,

    headline: post.title,
    description,

    datePublished: publishedDate,
    dateModified: publishedDate,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },

    author: {
      "@type": "Organization",
      name: "Hitmarket",
      url: "https://hitmarket.pp.ua",
    },

    publisher: {
      "@type": "Organization",
      name: "Hitmarket",
      url: "https://hitmarket.pp.ua",
      logo: {
        "@type": "ImageObject",
        url: "https://hitmarket.pp.ua/og.webp",
      },
    },

    ...(post.post_thumbnail
      ? {
          image: [post.post_thumbnail],
        }
      : {}),
  };

  /*
   * Breadcrumb structured data
   */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Головна",
        item: "https://hitmarket.pp.ua/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Блог",
        item: "https://hitmarket.pp.ua/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
    <main className="bg-white">
      {/* Structured data */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}

        <nav
          aria-label="Хлібні крихти"
          className="mb-8"
        >
          <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <li>
              <Link
                href="/"
                className="transition hover:text-slate-900"
              >
                Головна
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li>
              <Link
                href="/blog"
                className="transition hover:text-slate-900"
              >
                Блог
              </Link>
            </li>

            <li aria-hidden="true">/</li>

            <li
              aria-current="page"
              className="max-w-[300px] truncate text-slate-700 sm:max-w-none"
            >
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Article */}

        <article className="mx-auto max-w-4xl">
          {/* Header */}

          <header>
            <time
              dateTime={publishedDate}
              className="text-sm font-medium text-slate-500"
            >
              {formattedDate}
            </time>

            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-5 text-lg leading-8 text-slate-600 sm:text-xl">
                {stripHtml(post.excerpt)}
              </p>
            )}
          </header>

          {/* Featured image */}

          {post.post_thumbnail && (
            <figure className="mt-8 overflow-hidden rounded-2xl">
              <img
                src={post.post_thumbnail}
                alt={post.title}
                className="block h-auto w-full"
              />
            </figure>
          )}

          {/* Content */}

          <div
            className="
              prose
              prose-slate
              mt-10
              max-w-none

              prose-p:my-6
              prose-p:text-[17px]
              prose-p:leading-[1.8]
              prose-p:text-slate-700

              prose-headings:font-bold
              prose-headings:tracking-tight
              prose-headings:text-slate-900

              prose-h2:mb-4
              prose-h2:mt-12
              prose-h2:text-2xl
              prose-h2:leading-tight

              prose-h3:mb-3
              prose-h3:mt-9
              prose-h3:text-xl
              prose-h3:leading-tight

              prose-ul:my-6
              prose-ol:my-6

              prose-li:my-2
              prose-li:text-[17px]
              prose-li:leading-7
              prose-li:text-slate-700

              prose-strong:font-semibold
              prose-strong:text-slate-900

              prose-a:font-medium
              prose-a:text-slate-900
              prose-a:underline
              prose-a:underline-offset-4

              prose-blockquote:my-8
              prose-blockquote:border-l-slate-300
              prose-blockquote:text-slate-600

              prose-img:my-8
              prose-img:rounded-xl
            "
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />

          {/* Bottom navigation */}

          <footer className="mt-14 border-t border-slate-200 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-semibold text-slate-900 transition hover:text-slate-600"
            >
              ← Повернутися до блогу
            </Link>
          </footer>
        </article>
      </div>
    </main>
    <Footer/>
    </>
  );
}