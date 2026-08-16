import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Hero from "@/app/components/Hero";
import CountdownBanner from "@/app/components/CountdownBanner";
import CompactSection from "@/app/components/CompactSection";
import PortsSection from "@/app/components/PortsSection";
import PackageSection from "@/app/components/PackageSection";
import ReviewsSection from "@/app/components/ReviewsSection";
import Faq from "@/app/components/Faq";
import OrderPage from "@/app/components/OrderPage";
import Footer from "@/app/components/Footer";
import StickyButton from "@/app/components/StickyButton";
import LiveViewersBadge from "@/app/components/LiveViewersBadge";
import RecentOrderToast from "@/app/components/RecentOrderToast";
import HowToOrder from "@/app/components/HowToOrder";
import { ProductSchema } from "@/app/components/ProductSchema";
import Specifications from "@/app/components/Specifications";

import { getProductBySlug } from "@/lib/products/get-product";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hitmarket.pp.ua";

/*
 * ============================================================
 * PAGE PARAMS
 * ============================================================
 */

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/*
 * ============================================================
 * PRODUCT CONFIG
 * ============================================================
 *
 * Це НЕ ProductConfig з product-config.ts.
 *
 * Це структура config, яка реально зберігається
 * у JSON-полі products.config.
 */

interface ProductConfig {
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalPath?: string;
    ogImage?: string;
  };

  hero?: {
    title?: string;
    badgeText?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
  };

  features?: {
    title?: string;
    eyebrow?: string;
    items?: Array<{
      text: string;
      large?: boolean;
      title: string;
      icon?: string;
    }>;
  };

  compact?: {
    eyebrow?: string;
    title: string;
    description: string;
    bullets?: string[];
    image: string;
    imageAlt: string;
  };

  ports?: {
    eyebrow?: string;
    title: string;
    description: string;
    bullets?: string[];
    image: string;
    imageAlt: string;
  };

  package?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    items?: string[];
    image?: string;
    imageAlt?: string;
  };

  specifications?: {
    title: string;
    items: Array<{
      name: string;
      value: string;
    }>;
  };

  reviews?: Array<{
    name: string;
    city: string;
    rating: number;
    date: string;
    text: string;
  }>;

  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function getConfig(value: unknown): ProductConfig {
  if (!value) {
    return {};
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as ProductConfig;
    } catch {
      return {};
    }
  }

  return value as ProductConfig;
}

/*
 * ============================================================
 * METADATA
 * ============================================================
 */

export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Товар не знайдено",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const config = getConfig(product.config);

  const title =
    product.seo_title ||
    config.seo?.title ||
    product.name;

  const description =
    product.seo_description ||
    config.seo?.description ||
    product.description ||
    "";

  const canonicalUrl =
    `${SITE_URL}/product/${product.slug}`;

  /*
   * Головне зображення беремо з product_images,
   * а не з config.hero.image.
   */

  const mainImage =
    product.images?.[0]?.local_path;

  const ogImage = mainImage
    ? `${SITE_URL}${mainImage}`
    : undefined;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "HitMarket",
      locale: "uk_UA",
      type: "website",

      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      ...(ogImage && {
        images: [ogImage],
      }),
    },

    robots: {
      index: product.available === 1,
      follow: true,
    },
  };
}

/*
 * ============================================================
 * PAGE
 * ============================================================
 */

export default async function ProductPage(
  { params }: ProductPageProps
) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const config = getConfig(product.config);

  /*
   * ============================================================
   * IMAGES FROM DATABASE
   * ============================================================
   */

  const images = product.images ?? [];

  const mainImage =
    images[0]?.local_path ||
    "/products/placeholder.webp";

  /*
   * ============================================================
   * HERO
   * ============================================================
   *
   * Дані товару + config.
   *
   * Головне фото беремо саме з product_images.
   */

  const hero = {
    title:
      config.hero?.title ||
      product.name,

    badgeText:
      config.hero?.badgeText ||
      "⭐ Новинка в каталозі",

    description:
      config.hero?.description ||
      product.description ||
      "",

    image:
      mainImage,

    imageAlt:
      config.hero?.imageAlt ||
      product.name,
  };

  /*
   * ============================================================
   * REVIEWS
   * ============================================================
   */

  const reviews =
    config.reviews ?? [];

  /*
   * ============================================================
   * FAQ
   * ============================================================
   */

  const faq =
    config.faq ?? [];

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <>
      {/* ================================================== */}
      {/* PRODUCT SCHEMA */}
      {/* ================================================== */}

      <ProductSchema
        config={{
          productName: product.name,
          productSlug: product.slug,
          price: Number(product.price),
          oldPrice:
            product.old_price !== null
              ? Number(product.old_price)
              : undefined,

          stockCount:
            product.available === 1
              ? 1
              : 0,

          seo: {
            title:
              product.seo_title ||
              config.seo?.title ||
              product.name,

            description:
              product.seo_description ||
              config.seo?.description ||
              product.description ||
              "",

            canonicalPath:
              `/product/${product.slug}`,

            keywords:
              config.seo?.keywords ?? [],

            ogImage:
              mainImage,
          },

          hero: {
            ...hero,
          },

          reviews,
        }}
      />

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <Hero
        {...hero}
        price={Number(product.price)}
        oldPrice={
          product.old_price !== null
            ? Number(product.old_price)
            : undefined
        }
      />

      {/* ================================================== */}
      {/* COUNTDOWN */}
      {/* ================================================== */}

      <CountdownBanner />

      {/* ================================================== */}
      {/* FEATURES */}
      {/* ================================================== */}

      {/*
        Поки НЕ виводимо Features.

        У БД icon зараз може бути відсутній або
        не відповідати LucideIcon, тому блок
        тимчасово вимкнений.
      */}

      {/* ================================================== */}
      {/* COMPACT */}
      {/* ================================================== */}

      {config.compact && (
        <CompactSection
          {...config.compact}
        />
      )}

      {/* ================================================== */}
      {/* PORTS */}
      {/* ================================================== */}

      {config.ports && (
        <PortsSection
          {...config.ports}
        />
      )}

      {/* ================================================== */}
      {/* PACKAGE */}
      {/* ================================================== */}

      {config.package && (
        <PackageSection
          title={
            config.package.title ||
            "Комплектація"
          }

          items={
            config.package.items ?? []
          }

          description={
            config.package.description ?? ""
          }

          image={
            config.package.image ||
            mainImage
          }

          imageAlt={
            config.package.imageAlt ||
            product.name
          }

          eyebrow={
            config.package.eyebrow
          }
        />
      )}

      {config?.specifications && (
        <Specifications
            title={config.specifications.title}
            items={config.specifications.items}
        />
        )}

      {/* ================================================== */}
      {/* REVIEWS */}
      {/* ================================================== */}

      {reviews.length > 0 && (
        <ReviewsSection
          reviews={reviews}
        />
      )}

      {/* ================================================== */}
      {/* FAQ */}
      {/* ================================================== */}

      {faq.length > 0 && (
        <Faq
          items={faq}
        />
      )}

      {/* ================================================== */}
      {/* HOW TO ORDER */}
      {/* ================================================== */}

      <HowToOrder />

      {/* ================================================== */}
      {/* ORDER */}
      {/* ================================================== */}

      <OrderPage
        productName={product.name}
        price={Number(product.price)}
        stockCount={
          product.available === 1
            ? Math.floor(Math.random() * (50 - 5 + 1)) + 5
            : 0
        }
      />

      {/* ================================================== */}
      {/* FOOTER */}
      {/* ================================================== */}

      <Footer />

      {/* ================================================== */}
      {/* STICKY BUTTON */}
      {/* ================================================== */}

      <StickyButton
        price={Number(product.price)}
      />

      {/* ================================================== */}
      {/* LIVE VIEWERS */}
      {/* ================================================== */}

      <LiveViewersBadge />

      {/* ================================================== */}
      {/* RECENT ORDER */}
      {/* ================================================== */}

      <RecentOrderToast />
    </>
  );
}