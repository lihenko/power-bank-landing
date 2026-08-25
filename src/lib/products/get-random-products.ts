import { db } from "@/lib/db";
import type { ProductConfig } from "@/app/lib/product-config";
import {
  mapProduct,
  type DatabaseProduct,
} from "@/lib/categories/get-category-products";


/**
 * ============================================================
 * GET RANDOM PRODUCTS
 * ============================================================
 *
 * Використовується на сторінці успіху замовлення.
 *
 * Мапінг товару ідентичний getCategoryProducts,
 * щоб ProductCard отримував однакову форму даних.
 * ============================================================
 */

export async function getRandomProducts(
  limit = 8
): Promise<ProductConfig[]> {

  const safeLimit =
    Math.max(
      1,
      Math.floor(limit)
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
            AND pi.local_path IS NOT NULL
            AND pi.local_path != ''
          ORDER BY pi.sort_order ASC, pi.id ASC
          LIMIT 1
        ) AS image

      FROM products p

      WHERE p.available = 1

      ORDER BY RAND()

      LIMIT ?
      `,
      [
        safeLimit,
      ]
    );

  return (
    rows as DatabaseProduct[]
  ).map(
    mapProduct
  );

}