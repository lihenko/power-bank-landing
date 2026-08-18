import { db } from "@/lib/db";


/**
 * ============================================================
 * CONSTANTS
 * ============================================================
 */

const PRODUCTS_PER_PAGE = 16;


/**
 * ============================================================
 * PRODUCT
 * ============================================================
 */

export interface SearchProduct {
  id: number;

  name: string;

  slug: string;

  price: number;

  oldPrice: number | null;

  available: boolean;

  categoryId: number | null;

  vendor: string | null;

  vendorCode: string | null;

  image: string | null;

  imageAlt: string;
}


/**
 * ============================================================
 * RESULT
 * ============================================================
 */

export interface SearchProductsResult {
  products: SearchProduct[];

  total: number;

  totalPages: number;

  currentPage: number;
}


/**
 * ============================================================
 * NORMALIZE QUERY
 * ============================================================
 */

function normalizeSearchQuery(
  query: string
): string {

  return query
    .trim()
    .replace(/\s+/g, " ");
}


/**
 * ============================================================
 * CREATE BOOLEAN SEARCH QUERY
 * ============================================================
 */

function createBooleanSearchQuery(
  query: string
): string {

  const words =
    query
      .split(/\s+/)
      .map(
        (word) =>
          word
            .replace(
              /[+\-<>()~*"@]+/g,
              ""
            )
            .trim()
      )
      .filter(
        (word) =>
          word.length > 0
      );


  if (
    words.length === 0
  ) {
    return "";
  }


  return words
    .map(
      (word) =>
        `+${word}*`
    )
    .join(" ");
}


/**
 * ============================================================
 * GET SEARCH PRODUCTS
 * ============================================================
 */

export async function getSearchProducts(
  query: string,
  page: number = 1
): Promise<SearchProductsResult> {

  /**
   * ----------------------------------------------------------
   * NORMALIZE QUERY
   * ----------------------------------------------------------
   */

  const searchQuery =
    normalizeSearchQuery(
      query
    );


  /**
   * ----------------------------------------------------------
   * PAGE
   * ----------------------------------------------------------
   */

  const currentPage =
    Number.isInteger(page) &&
    page > 0
      ? page
      : 1;


  /**
   * ----------------------------------------------------------
   * EMPTY SEARCH
   * ----------------------------------------------------------
   */

  if (
    searchQuery.length === 0
  ) {

    return {
      products: [],
      total: 0,
      totalPages: 0,
      currentPage: 1,
    };

  }


  /**
   * ----------------------------------------------------------
   * BOOLEAN QUERY
   * ----------------------------------------------------------
   */

  const booleanQuery =
    createBooleanSearchQuery(
      searchQuery
    );


  if (
    booleanQuery.length === 0
  ) {

    return {
      products: [],
      total: 0,
      totalPages: 0,
      currentPage: 1,
    };

  }


  /**
   * ----------------------------------------------------------
   * OFFSET
   * ----------------------------------------------------------
   */

  const offset =
    (
      currentPage - 1
    ) *
    PRODUCTS_PER_PAGE;


  /**
   * ==========================================================
   * TOTAL
   * ==========================================================
   */

  const [
    countRows
  ] =
    await db.query(
      `
      SELECT
        COUNT(*) AS total

      FROM products

      WHERE
        available = 1

        AND

        (
          MATCH(
            name,
            description,
            seo_title,
            seo_description,
            vendor,
            vendor_code
          )
          AGAINST(
            ?
            IN BOOLEAN MODE
          )

          OR

          LOWER(vendor_code) = LOWER(?)
        )
      `,
      [
        booleanQuery,
        searchQuery,
      ]
    );


  const countResult =
    countRows as Array<{
      total: number | string;
    }>;


  const total =
    Number(
      countResult[0]?.total ?? 0
    );


  /**
   * ----------------------------------------------------------
   * TOTAL PAGES
   * ----------------------------------------------------------
   */

  const totalPages =
    Math.ceil(
      total /
      PRODUCTS_PER_PAGE
    );


  /**
   * ----------------------------------------------------------
   * PAGE OUT OF RANGE
   * ----------------------------------------------------------
   */

  if (
    totalPages > 0 &&
    currentPage > totalPages
  ) {

    return {
      products: [],
      total,
      totalPages,
      currentPage,
    };

  }


  /**
   * ==========================================================
   * PRODUCTS
   * ==========================================================
   *
   * Беремо перше зображення товару.
   *
   * sort_order ASC
   * LIMIT 1
   *
   * Це відповідає product_images[0].
   * ==========================================================
   */

  const [
    productRows
  ] =
    await db.query(
      `
      SELECT

        p.id,

        p.name,

        p.slug,

        p.price,

        p.old_price,

        p.available,

        p.category_id,

        p.vendor,

        p.vendor_code,


        /*
         * ----------------------------------------------------
         * MAIN IMAGE
         * ----------------------------------------------------
         */

        (
          SELECT
            pi.local_path

          FROM product_images pi

          WHERE
            pi.product_id = p.id

          ORDER BY
            pi.sort_order ASC,
            pi.id ASC

          LIMIT 1
        ) AS image,


        /*
         * ----------------------------------------------------
         * FULLTEXT RELEVANCE
         * ----------------------------------------------------
         */

        MATCH(
          p.name,
          p.description,
          p.seo_title,
          p.seo_description,
          p.vendor,
          p.vendor_code
        )
        AGAINST(
          ?
          IN BOOLEAN MODE
        ) AS relevance,


        /*
         * ----------------------------------------------------
         * EXACT VENDOR CODE
         * ----------------------------------------------------
         */

        CASE
          WHEN LOWER(p.vendor_code) =
               LOWER(?)
          THEN 1000
          ELSE 0
        END AS vendor_code_match,


        /*
         * ----------------------------------------------------
         * NAME MATCH
         * ----------------------------------------------------
         */

        CASE
          WHEN LOWER(p.name) LIKE CONCAT(
            '%',
            LOWER(?),
            '%'
          )
          THEN 500
          ELSE 0
        END AS name_match,


        /*
         * ----------------------------------------------------
         * VENDOR MATCH
         * ----------------------------------------------------
         */

        CASE
          WHEN LOWER(p.vendor) LIKE CONCAT(
            '%',
            LOWER(?),
            '%'
          )
          THEN 100
          ELSE 0
        END AS vendor_match


      FROM products p


      WHERE

        p.available = 1

        AND

        (

          MATCH(
            p.name,
            p.description,
            p.seo_title,
            p.seo_description,
            p.vendor,
            p.vendor_code
          )
          AGAINST(
            ?
            IN BOOLEAN MODE
          )

          OR

          LOWER(p.vendor_code) =
          LOWER(?)

        )


      ORDER BY

        vendor_code_match DESC,

        name_match DESC,

        vendor_match DESC,

        relevance DESC,

        p.id DESC


      LIMIT ?

      OFFSET ?
      `,
      [
        /*
         * relevance
         */
        booleanQuery,

        /*
         * exact vendor code
         */
        searchQuery,

        /*
         * name match
         */
        searchQuery,

        /*
         * vendor match
         */
        searchQuery,

        /*
         * WHERE FULLTEXT
         */
        booleanQuery,

        /*
         * WHERE exact vendor code
         */
        searchQuery,

        /*
         * LIMIT
         */
        PRODUCTS_PER_PAGE,

        /*
         * OFFSET
         */
        offset,
      ]
    );


  /**
   * ----------------------------------------------------------
   * TYPE
   * ----------------------------------------------------------
   */

  const rows =
    productRows as Array<{
      id: number;

      name: string;

      slug: string;

      price: number | string;

      old_price:
        | number
        | string
        | null;

      available: number;

      category_id:
        | number
        | null;

      vendor:
        | string
        | null;

      vendor_code:
        | string
        | null;

      image:
        | string
        | null;
    }>;


  /**
   * ==========================================================
   * MAP PRODUCTS
   * ==========================================================
   */

  const products: SearchProduct[] =
    rows.map(
      (row) => ({

        id:
          Number(
            row.id
          ),

        name:
          row.name,

        slug:
          row.slug,

        price:
          Number(
            row.price
          ),

        oldPrice:
          row.old_price !== null
            ? Number(
                row.old_price
              )
            : null,

        available:
          Boolean(
            row.available
          ),

        categoryId:
          row.category_id !== null
            ? Number(
                row.category_id
              )
            : null,

        vendor:
          row.vendor,

        vendorCode:
          row.vendor_code,

        image:
          row.image,

        imageAlt:
          row.name,

      })
    );


  /**
   * ==========================================================
   * RETURN
   * ==========================================================
   */

  return {

    products,

    total,

    totalPages,

    currentPage,

  };
}