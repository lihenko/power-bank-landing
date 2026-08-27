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
import Features from "@/app/components/Features";
import ProductGallery from "@/app/components/ProductGallery";
import { getCategorySlug } from "@/app/lib/category-slugs";
import OutOfStockActions from "@/app/components/OutOfStockActions";
import getAverageRating from "@/app/lib/reviews";
import ProductPurchaseFlow from "@/app/components/ProductPurchaseFlow";
import DiscountNotice from "@/app/components/DiscountNotice";

import { getProductBySlug } from "@/lib/products/get-product";

import type {
  ProductConfig,
  FeatureItem,
} from "@/app/lib/product-config";


const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://hitmarket.pp.ua";


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
 * HELPERS
 * ============================================================
 */

/**
 * CONFIG у MySQL може прийти:
 *
 * - як JSON string
 * - як вже розпарсений object
 * - null
 */
function getConfig(
  value: unknown
): ProductConfig {

  if (!value) {
    return {} as ProductConfig;
  }

  if (typeof value === "string") {

    try {

      return JSON.parse(
        value
      ) as ProductConfig;

    } catch {

      return {} as ProductConfig;

    }

  }

  return value as ProductConfig;
}


/**
 * ============================================================
 * PRODUCT IMAGE
 * ============================================================
 *
 * Вибирає різні зображення для різних блоків.
 *
 * Якщо зображень достатньо:
 *
 * 0 -> Hero
 * 1 -> Compact
 * 2 -> Ports
 * 3 -> Package
 *
 * Якщо зображень недостатньо —
 * починаємо повторно використовувати доступні.
 *
 * Наприклад:
 *
 * 1 фото:
 * Hero    -> 0
 * Compact -> 0
 * Ports   -> 0
 * Package -> 0
 *
 * 2 фото:
 * Hero    -> 0
 * Compact -> 1
 * Ports   -> 0
 * Package -> 1
 *
 * 3 фото:
 * Hero    -> 0
 * Compact -> 1
 * Ports   -> 2
 * Package -> 0
 */
function getSectionImage(
  images: Array<{
    local_path: string;
  }>,
  index: number
): string {

  if (images.length === 0) {
    return "/products/placeholder.webp";
  }

  return images[
    index % images.length
  ]?.local_path ??
    images[0]?.local_path ??
    "/products/placeholder.webp";
}


/**
 * ============================================================
 * REQUIRED CONFIG HELPERS
 * ============================================================
 *
 * ProductSchema і компоненти магазину очікують
 * повністю сформовані конфіги.
 */


/**
 * Features
 */
function buildFeatures(
  config: ProductConfig
) {

  if (
    !config.features
  ) {
    return undefined;
  }

  const features =
    config.features;

  if (
    !features.items ||
    features.items.length === 0
  ) {
    return undefined;
  }

  /**
   * icon у JSON — це string.
   *
   * Features.tsx сам перетворює
   * назву іконки у Lucide компонент.
   */
  const items: FeatureItem[] =
    features.items
      .filter(
        (
          item
        ): item is typeof item & {
          icon: string;
        } =>
          typeof item.icon === "string" &&
          item.icon.length > 0
      )
      .map(
        item => ({
          title:
            item.title,

          text:
            item.text,

          large:
            item.large ?? false,

          icon:
            item.icon,
        })
      );

  if (
    items.length === 0
  ) {
    return undefined;
  }

  return {
    eyebrow:
      features.eyebrow ?? "",

    title:
      features.title ?? "Основні переваги",

    description:
      features.description ?? "",

    items,
  };
}


/**
 * Package
 */
function buildPackage(
  config: ProductConfig,
  image: string,
  productName: string
) {

  if (
    !config.package
  ) {
    return undefined;
  }

  const source =
    config.package;

  return {

    eyebrow:
      source.eyebrow,

    title:
      source.title ??
      "Комплектація",

    description:
      source.description ??
      "",

    items:
      source.items ??
      [],

    image:
      image,

    imageAlt:
      source.imageAlt ??
      productName,

  };
}


/*
 * ============================================================
 * METADATA
 * ============================================================
 */

export async function generateMetadata(
  {
    params,
  }: ProductPageProps
): Promise<Metadata> {

  const {
    slug,
  } = await params;

  const product =
    await getProductBySlug(
      slug
    );

  if (!product) {

    return {

      title:
        "Товар не знайдено",

      robots: {
        index: false,
        follow: false,
      },

    };

  }

  const config =
    getConfig(
      product.config
    );


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
   * OG використовуємо перше
   * реальне зображення товару.
   */

  const mainImage =
    product.images?.[0]?.local_path;


  const ogImage =
    mainImage
      ? `${SITE_URL}${mainImage}`
      : undefined;


  return {

    title,

    description,

    alternates: {
      canonical:
        canonicalUrl,
    },

    openGraph: {

      title,

      description,

      url:
        canonicalUrl,

      siteName:
        "HitMarket",

      locale:
        "uk_UA",

      type:
        "website",

      ...(ogImage && {

        images: [
          {
            url:
              ogImage,

            width:
              1200,

            height:
              630,

            alt:
              product.name,
          },
        ],

      }),

    },

    twitter: {

      card:
        "summary_large_image",

      title,

      description,

      ...(ogImage && {
        images: [
          ogImage,
        ],
      }),

    },

    robots: {

      index:
        product.available === 1,

      follow:
        true,

    },

  };
}


/*
 * ============================================================
 * PAGE
 * ============================================================
 */

export default async function ProductPage(
  {
    params,
  }: ProductPageProps
) {

  const {
    slug,
  } = await params;


  const product =
    await getProductBySlug(
      slug
    );


  if (!product) {
    notFound();
  }

  /*
   * ============================================================
   * PRICE
   * ============================================================
   */
  const isDiscounted = product.category_id === 47;
  const isCheap = product.price < 200 && !isDiscounted;
  const displayPrice = isCheap ? Math.round(product.price * 1.2) : product.price;
  const displayOldPrice = product.old_price
  ? isCheap
    ? Math.round(product.old_price * 1.2)
    : product.old_price
  : undefined;

  const product_bandles = {
    eyebrow: "Заощаджуйте прямо зараз",
    title: "Оберіть вигідний комплект",
    unitLabel: "шт",
    options: [
      { quantity: 1, bonus: 0 },
      { quantity: 2, bonus: 0, discountPercent: 5, label: "Економний" },
      { quantity: 3, bonus: 0, discountPercent: 10, label: "Популярний" },
      { quantity: 4, bonus: 0, discountPercent: 15, label: "Найвигідніше" },
    ],
  };

  /*
   * ============================================================
   * CONFIG
   * ============================================================
   */

  const config =
    getConfig(
      product.config
    );


  /*
   * ============================================================
   * PRODUCT IMAGES
   * ============================================================
   */

  const images =
    product.images ?? [];

  /*
   * ============================================================
   * AVAILABILITY
   * ============================================================
   */

  const isAvailable =
    product.available === 1;

  const categorySlug =
    product.category_id !== null
      ? getCategorySlug(
          product.category_id
        )
      : null;


  /*
   * ------------------------------------------------------------
   * Розподіляємо реальні картинки товару.
   * ------------------------------------------------------------
   */

  const heroImage =
    getSectionImage(
      images,
      0
    );


  const compactImage =
    getSectionImage(
      images,
      1
    );


  const portsImage =
    getSectionImage(
      images,
      2
    );


  const packageImage =
    getSectionImage(
      images,
      3
    );



  /*
   * ============================================================
   * HERO
   * ============================================================
   */

  const hero = {

    title:
      config.hero?.title ||
      product.name,

    badgeText:
      config.hero?.badgeText ||
      "Практичне рішення",

    description:
      config.hero?.description ||
      product.description ||
      "",

    /*
     * ВАЖЛИВО:
     *
     * Тут НЕ беремо config.hero.image.
     *
     * Використовуємо перше реальне
     * зображення товару з БД.
     */

    image:
      heroImage,

    imageAlt:
      config.hero?.imageAlt ||
      product.name,

  };


  /*
   * ============================================================
   * FEATURES
   * ============================================================
   */

  const features =
    buildFeatures(
      config
    );


  /*
   * ============================================================
   * COMPACT
   * ============================================================
   *
   * Якщо блок існує —
   * даємо йому друге зображення.
   */

  const compact =
    config.compact
      ? {

          eyebrow:
            config.compact.eyebrow,

          title:
            config.compact.title,

          description:
            config.compact.description,

          bullets:
            config.compact.bullets,

          image:
            compactImage,

          imageAlt:
            config.compact.imageAlt ||
            product.name,

        }
      : undefined;


  /*
   * ============================================================
   * PORTS
   * ============================================================
   */

  const ports =
    config.ports
      ? {

          eyebrow:
            config.ports.eyebrow,

          title:
            config.ports.title,

          description:
            config.ports.description,

          bullets:
            config.ports.bullets,

          image:
            portsImage,

          imageAlt:
            config.ports.imageAlt ||
            product.name,

        }
      : undefined;


  /*
   * ============================================================
   * PACKAGE
   * ============================================================
   */

  const packageConfig =
    buildPackage(
      config,
      packageImage,
      product.name
    );


  /*
   * ============================================================
   * SPECIFICATIONS
   * ============================================================
   */

  const specifications =
    config.specifications
      ? {

          title:
            config.specifications.title,

          items:
            config.specifications.items,

        }
      : undefined;


  /*
   * ============================================================
   * REVIEWS
   * ============================================================
   */

  const reviews =
    config.reviews ?? [];

  const avgRating = getAverageRating(reviews);


  /*
   * ============================================================
   * FAQ
   * ============================================================
   */

  const faq =
    config.faq ?? [];


  /*
   * ============================================================
   * PRODUCT SCHEMA CONFIG
   * ============================================================
   *
   * Передаємо вже нормалізовані
   * обов'язкові структури.
   */

  const schemaConfig = {

    productName:
      product.name,

    productSlug:
      product.slug,

    price:
      Number(
        displayPrice
      ),

    oldPrice:
      displayOldPrice !== null
        ? Number(
            displayOldPrice
          )
        : undefined,

    stockCount:
      product.available === 1
        ? 1
        : 0,

    category_id: product.category_id,

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
        config.seo?.keywords ??
        [],

      ogImage:
        heroImage,

    },

    hero,

    features,

    compact,

    ports,

    package:
      packageConfig,

    specifications,

    reviews,

    faq,

  };


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
        config={
          schemaConfig
        }
      />


      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <Hero
        {...hero}

        price={
          Number(
            displayPrice
          )
        }

        oldPrice={
          displayOldPrice != null
            ? Number(
                displayOldPrice
              )
            : undefined
        }

        isAvailable={isAvailable}

        categoryHref={
          categorySlug
            ? `/category/${categorySlug}`
            : "/"
        }
        rating={avgRating} reviewCount={reviews.length}
      />

      {isDiscounted && <DiscountNotice />}
      {/* ================================================== */}
      {/* COUNTDOWN */}
      {/* ================================================== */}

      <CountdownBanner />


      {/* ================================================== */}
      {/* FEATURES */}
      {/* ================================================== */}

      {features && (
        <Features
          {...features}
        />
      )}


      {/* ================================================== */}
      {/* COMPACT */}
      {/* ================================================== */}

      {compact && (
        <CompactSection
          {...compact}
        />
      )}


      {/* ================================================== */}
      {/* PORTS */}
      {/* ================================================== */}

      {ports && (
        <PortsSection
          {...ports}
        />
      )}


      {/* ================================================== */}
      {/* PACKAGE */}
      {/* ================================================== */}

      

      {packageConfig?.items && packageConfig.items.length > 0 && (
        <PackageSection
          {...packageConfig}
        />
      )}

      {images.length > 0 && (
        <ProductGallery
         images={images}
         productName={product.name}
        />
      )}


      {/* ================================================== */}
      {/* SPECIFICATIONS */}
      {/* ================================================== */}

      {specifications && (
        <Specifications
          title={
            specifications.title
          }

          items={
            specifications.items
          }
        />
      )}


      {/* ================================================== */}
      {/* REVIEWS */}
      {/* ================================================== */}

      {reviews.length > 0 && (
        <ReviewsSection
          reviews={
            reviews
          }
        />
      )}


      {/* ================================================== */}
      {/* FAQ */}
      {/* ================================================== */}

      {faq.length > 0 && (
        <Faq
          items={
            faq
          }
        />
      )}


      {/* ================================================== */}
      {/* HOW TO ORDER */}
      {/* ================================================== */}

      {isAvailable && (
        <HowToOrder />
      )}


      {/* ================================================== */}
      {/* ORDER */}
      {/* ================================================== */}



      {isAvailable ? (

        isCheap ? (
          <ProductPurchaseFlow
            productName={product.name}
            price={displayPrice}
            stockCount={
            Math.floor(
                Math.random() * (50 - 5 + 1)
              ) + 5
            }
            bundles={product_bandles}
          />
        ) : (
        <OrderPage
          productName={product.name}
          price={Number(displayPrice)}
          stockCount={
            Math.floor(
              Math.random() * (50 - 5 + 1)
            ) + 5
          }
        />
        )

      ) : (

        <OutOfStockActions
          categoryHref={
            categorySlug
              ? `/category/${categorySlug}`
              : "/"
          }
        />

      )}


      {/* ================================================== */}
      {/* FOOTER */}
      {/* ================================================== */}

      <Footer />


      {/* ================================================== */}
      {/* STICKY BUTTON */}
      {/* ================================================== */}

      {isAvailable && (
        <StickyButton
          price={
            Number(
              product.price
            )
          }
        />
      )}


      {/* ================================================== */}
      {/* LIVE VIEWERS */}
      {/* ================================================== */}
      {isAvailable && (
        <LiveViewersBadge />
      )}

      {/* ================================================== */}
      {/* RECENT ORDER */}
      {/* ================================================== */}
      {isAvailable && (
        <RecentOrderToast />
      )}
    </>
  );
}