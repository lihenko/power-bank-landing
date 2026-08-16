import { db } from "@/lib/db";

import type {
  ProductConfig,
} from "@/app/lib/product-config";


interface DatabaseProduct {

  id: number;

  name: string;

  slug: string;

  price: number;

  old_price: number | null;

  available: number;

  config:
    ProductConfig |
    string |
    null;

  image:
    string |
    null;
}


/**
 * ============================================================
 * GET LATEST PRODUCTS
 * ============================================================
 *
 * Повертає останні 8 доступних товарів.
 *
 * available = 1
 *
 * Головне зображення беремо
 * з product_images, а не з config.hero.image.
 */
export async function getLatestProducts(
  limit = 8
): Promise<ProductConfig[]> {

  const safeLimit =
    Math.max(
      1,
      Math.min(
        Math.floor(limit),
        20
      )
    );


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
          ORDER BY pi.sort_order ASC
          LIMIT 1
        ) AS image

      FROM products p

      WHERE p.available = 1

      ORDER BY p.created_at DESC

      LIMIT ?
      `,
      [
        safeLimit,
      ]
    );


  const products =
    rows as DatabaseProduct[];


  return products.map(
    (product) => {

      /**
       * --------------------------------------------------------
       * CONFIG
       * --------------------------------------------------------
       */

      let config:
        Partial<ProductConfig> = {};


      if (
        typeof product.config ===
        "string"
      ) {

        try {

          config =
            JSON.parse(
              product.config
            ) as Partial<ProductConfig>;

        } catch {

          config = {};

        }

      } else if (
        product.config
      ) {

        config =
          product.config;

      }


      /**
       * --------------------------------------------------------
       * IMAGE
       * --------------------------------------------------------
       *
       * Пріоритет:
       *
       * 1. product_images.local_path
       * 2. placeholder
       *
       * config.hero.image тут НЕ використовується.
       */

      const image =
        product.image ||
        "/products/placeholder.webp";


      /**
       * --------------------------------------------------------
       * HERO
       * --------------------------------------------------------
       */

      const hero =
        config.hero;


      /**
       * --------------------------------------------------------
       * RESULT
       * --------------------------------------------------------
       */

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
  );
}