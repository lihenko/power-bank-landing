// src/lib/products/get-product.ts

import { db } from "@/lib/db";

export interface ProductImage {
  id: number;
  product_id: number;
  source_url: string;
  local_path: string;
  source_hash: string | null;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: number;
  source: string;
  source_offer_id: string;
  vendor_code: string | null;

  name: string;
  slug: string;

  price: number;
  old_price: number | null;

  available: number;

  category_id: number | null;

  vendor: string | null;
  country_of_origin: string | null;

  description: string | null;

  config: Record<string, any> | null;

  content_status:
    | "pending"
    | "generated"
    | "error"
    | "skipped";

  content_error: string | null;
  content_generated_at: Date | null;

  created_at: Date;
  updated_at: Date;

  seo_title: string | null;
  seo_description: string | null;

  images: ProductImage[];
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  /*
   * ============================================================
   * PRODUCT
   * ============================================================
   */

  const [productRows] = await db.execute(
    `
      SELECT
        id,
        source,
        source_offer_id,
        vendor_code,
        name,
        slug,
        price,
        old_price,
        available,
        category_id,
        vendor,
        country_of_origin,
        description,
        config,
        content_status,
        content_error,
        content_generated_at,
        created_at,
        updated_at,
        seo_title,
        seo_description
      FROM products
      WHERE slug = ?
      LIMIT 1
    `,
    [slug]
  );

  const products = productRows as any[];

  const product = products[0];

  if (!product) {
    return null;
  }

  /*
   * ============================================================
   * CONFIG
   * ============================================================
   *
   * MySQL може повернути JSON:
   *
   * 1. вже як object
   * 2. як string
   */

  if (typeof product.config === "string") {
    try {
      product.config = JSON.parse(product.config);
    } catch {
      product.config = null;
    }
  }

  /*
   * ============================================================
   * IMAGES
   * ============================================================
   */

  const [imageRows] = await db.execute(
    `
      SELECT
        id,
        product_id,
        source_url,
        local_path,
        source_hash,
        sort_order,
        created_at,
        updated_at
      FROM product_images
      WHERE product_id = ?
      ORDER BY sort_order ASC, id ASC
    `,
    [product.id]
  );

  const images = imageRows as ProductImage[];

  /*
   * ============================================================
   * RESULT
   * ============================================================
   */

  return {
    ...product,
    images,
  } as Product;
}