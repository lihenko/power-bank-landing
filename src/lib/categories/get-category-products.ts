import { db } from "@/lib/db";
import type { ProductConfig } from "@/app/lib/product-config";

interface DatabaseProduct {
  id: number;

  name: string;
  slug: string;

  price: number;
  old_price: number | null;

  available: number;

  config: ProductConfig | string | null;

  image: string | null;
}

export interface CategoryProductsResult {
  products: ProductConfig[];
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

const PER_PAGE = 16;


/**
 * ============================================================
 * PARSE CONFIG
 * ============================================================
 */

function parseConfig(
  value: ProductConfig | string | null
): Partial<ProductConfig> {

  if (!value) {
    return {};
  }

  if (typeof value === "string") {

    try {

      return JSON.parse(
        value
      ) as Partial<ProductConfig>;

    } catch {

      return {};

    }

  }

  return value;
}


/**
 * ============================================================
 * MAP PRODUCT
 * ============================================================
 */

function mapProduct(
  product: DatabaseProduct
): ProductConfig {

  const config =
    parseConfig(
      product.config
    );

  const hero =
    config.hero;


  /*
   * Зображення беремо ПЕРШ ЗА ВСЕ
   * з product_images.
   *
   * Якщо його немає — використовуємо
   * image з config.
   *
   * Якщо немає і його — placeholder.
   */

  const image =
    product.image ||
    hero?.image ||
    "/products/placeholder.webp";


  return {

    productName:
      product.name,

    productSlug:
      product.slug,

    price:
      Number(
        product.price
      ),

    oldPrice:
      product.old_price !== null
        ? Number(
            product.old_price
          )
        : undefined,

    stockCount:
      1,


    seo:
      config.seo ?? {

        title:
          product.name,

        description:
          "",

        canonicalPath:
          `/product/${product.slug}`,

        keywords:
          [],

        ogImage:
          image,

      },


    hero: {

      title:
        hero?.title ||
        product.name,

      badgeText:
        hero?.badgeText ||
        "",

      description:
        hero?.description ||
        "",

      /*
       * Головне зображення
       * саме з product_images.
       */
      image,

      imageAlt:
        hero?.imageAlt ||
        product.name,

    },


    features:
      config.features,

    compact:
      config.compact,

    ports:
      config.ports,

    package:
      config.package,

    specifications:
      config.specifications,

    reviews:
      config.reviews,

    faq:
      config.faq,

  } as ProductConfig;
}


/**
 * ============================================================
 * GET CATEGORY PRODUCTS
 * ============================================================
 */

export async function getCategoryProducts(
  categoryId: number,
  page = 1
): Promise<CategoryProductsResult> {

  const safeCategoryId =
    Math.floor(
      categoryId
    );


  const safePage =
    Math.max(
      1,
      Math.floor(page)
    );


  /**
   * ==========================================================
   * TOTAL
   * ==========================================================
   */

  const [countRows] =
    await db.query(
      `
      SELECT COUNT(*) AS total
      FROM products
      WHERE category_id = ?
        AND available = 1
      `,
      [
        safeCategoryId,
      ]
    );


  const total =
    Number(
      (
        countRows as Array<{
          total: number;
        }>
      )[0]?.total ?? 0
    );


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        total / PER_PAGE
      )
    );


  /*
   * Якщо сторінка більша за кількість
   * сторінок — показуємо останню.
   */

  const currentPage =
    Math.min(
      safePage,
      totalPages
    );


  const offset =
    (
      currentPage - 1
    ) * PER_PAGE;


  /**
   * ==========================================================
   * PRODUCTS
   * ==========================================================
   *
   * LEFT JOIN product_images потрібен для отримання
   * першого локального зображення товару.
   *
   * ВАЖЛИВО:
   *
   * image_sort_order = 1
   * означає головне зображення.
   *
   * Якщо його немає — беремо будь-яке перше
   * локальне зображення.
   */

  const [rows] =
    await db.query(
      `
      SELECT
        p.id,
        p.name,
        p.slug,
        p.price,
        p.old_price,
        p.available,
        p.config,

        (
          SELECT pi.local_path
          FROM product_images pi
          WHERE pi.product_id = p.id
            AND pi.local_path IS NOT NULL
            AND pi.local_path != ''
          ORDER BY pi.sort_order ASC, pi.id ASC
          LIMIT 1
        ) AS image

      FROM products p

      WHERE p.category_id = ?
        AND p.available = 1

      ORDER BY p.created_at DESC

      LIMIT ? OFFSET ?
      `,
      [
        safeCategoryId,
        PER_PAGE,
        offset,
      ]
    );


  const products =
    (
      rows as DatabaseProduct[]
    ).map(
      mapProduct
    );


  return {

    products,

    total,

    totalPages,

    currentPage,

    perPage:
      PER_PAGE,

  };
}