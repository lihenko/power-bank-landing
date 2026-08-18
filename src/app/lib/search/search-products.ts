/**
 * ============================================================
 * SEARCH PRODUCTS
 * ============================================================
 */

import { db } from "@/lib/db";

import {
  getSearchVariants,
  normalizeSearchQuery,
} from "./search-normalizer";


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
 * ESCAPE REGEXP
 * ============================================================
 */

function escapeRegexp(
  value: string
): string {

  return value.replace(
    /[\\^$.*+?()[\]{}|]/g,
    "\\$&"
  );

}


/**
 * ============================================================
 * CREATE REGEXP
 * ============================================================
 *
 * Головне правило:
 *
 * шукаємо слово з початку слова.
 *
 * "душ"
 *
 * знаходить:
 *
 * душ
 * душова
 * душовий
 * душем
 *
 * НЕ знаходить:
 *
 * подушка
 *
 * ============================================================
 */

function createSearchRegexp(
  variant: string
): string {

  const value =
    variant
      .trim()
      .toLowerCase();


  if (
    value.length === 0
  ) {

    return "";

  }


  /*
   * ----------------------------------------------------------
   * Фраза
   *
   * power bank
   * ----------------------------------------------------------
   */

  if (
    value.includes(" ")
  ) {

    const words =
      value
        .split(/\s+/)
        .filter(Boolean)
        .map(
          escapeRegexp
        );


    if (
      words.length === 0
    ) {

      return "";

    }


    return (
      `(^|[^[:alnum:]_])` +
      words.join(
        "[[:space:]]+"
      )
    );

  }


  /*
   * ----------------------------------------------------------
   * Одне слово
   * ----------------------------------------------------------
   */

  return (
    `(^|[^[:alnum:]_])` +
    escapeRegexp(
      value
    )
  );

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
   * NORMALIZE
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
   * EMPTY
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
   * ==========================================================
   * VARIANTS
   * ==========================================================
   */

  const variants =
    getSearchVariants(
      searchQuery
    );


  if (
    variants.length === 0
  ) {

    return {

      products: [],

      total: 0,

      totalPages: 0,

      currentPage: 1,

    };

  }


  /**
   * ==========================================================
   * SEARCH CONDITIONS
   * ==========================================================
   */

  const conditions: string[] = [];

  const conditionParams: string[] = [];


  for (
    const variant of variants
  ) {

    const regexp =
      createSearchRegexp(
        variant
      );


    if (
      regexp.length === 0
    ) {

      continue;

    }


    /*
     * --------------------------------------------------------
     * NAME
     * --------------------------------------------------------
     */

    conditions.push(
      `
      LOWER(p.name) REGEXP ?
      `
    );

    conditionParams.push(
      regexp
    );


    /*
     * --------------------------------------------------------
     * DESCRIPTION
     * --------------------------------------------------------
     */

    conditions.push(
      `
      LOWER(p.description) REGEXP ?
      `
    );

    conditionParams.push(
      regexp
    );


    /*
     * --------------------------------------------------------
     * SEO TITLE
     * --------------------------------------------------------
     */

    conditions.push(
      `
      LOWER(p.seo_title) REGEXP ?
      `
    );

    conditionParams.push(
      regexp
    );


    /*
     * --------------------------------------------------------
     * SEO DESCRIPTION
     * --------------------------------------------------------
     */

    conditions.push(
      `
      LOWER(p.seo_description) REGEXP ?
      `
    );

    conditionParams.push(
      regexp
    );


    /*
     * --------------------------------------------------------
     * VENDOR
     * --------------------------------------------------------
     */

    conditions.push(
      `
      LOWER(p.vendor) REGEXP ?
      `
    );

    conditionParams.push(
      regexp
    );


    /*
     * --------------------------------------------------------
     * VENDOR CODE
     * --------------------------------------------------------
     */

    conditions.push(
      `
      LOWER(p.vendor_code) REGEXP ?
      `
    );

    conditionParams.push(
      regexp
    );

  }


  const searchWhere =
    conditions.join(
      "\nOR\n"
    );


  /**
   * ==========================================================
   * OFFSET
   * ==========================================================
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
    countRows,
  ] =
    await db.query(
      `
      SELECT

        COUNT(*) AS total

      FROM products p

      WHERE

        p.available = 1

        AND

        (
          ${searchWhere}
        )
      `,
      conditionParams
    );


  const countResult =
    countRows as Array<{
      total:
        | number
        | string;
    }>;


  const total =
    Number(
      countResult[0]?.total ?? 0
    );


  /**
   * ==========================================================
   * TOTAL PAGES
   * ==========================================================
   */

  const totalPages =
    Math.ceil(
      total /
      PRODUCTS_PER_PAGE
    );


  /**
   * ==========================================================
   * OUT OF RANGE
   * ==========================================================
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
   * RANKING
   * ==========================================================
   */

  const rankingParts: string[] = [];

  const rankingParams: string[] = [];


  for (
    const variant of variants
  ) {

    const regexp =
      createSearchRegexp(
        variant
      );


    if (
      regexp.length === 0
    ) {

      continue;

    }


    const normalizedVariant =
      normalizeSearchQuery(
        variant
      );


    /*
     * --------------------------------------------------------
     * EXACT NAME
     * --------------------------------------------------------
     */

    rankingParts.push(
      `
      CASE

        WHEN LOWER(p.name) = ?

        THEN 1000

        ELSE 0

      END
      `
    );

    rankingParams.push(
      normalizedVariant
    );


    /*
     * --------------------------------------------------------
     * NAME START / WORD
     * --------------------------------------------------------
     */

    rankingParts.push(
      `
      CASE

        WHEN LOWER(p.name) REGEXP ?

        THEN 500

        ELSE 0

      END
      `
    );

    rankingParams.push(
      regexp
    );


    /*
     * --------------------------------------------------------
     * EXACT VENDOR CODE
     * --------------------------------------------------------
     */

    rankingParts.push(
      `
      CASE

        WHEN LOWER(p.vendor_code) = ?

        THEN 400

        ELSE 0

      END
      `
    );

    rankingParams.push(
      normalizedVariant
    );


    /*
     * --------------------------------------------------------
     * VENDOR
     * --------------------------------------------------------
     */

    rankingParts.push(
      `
      CASE

        WHEN LOWER(p.vendor) REGEXP ?

        THEN 200

        ELSE 0

      END
      `
    );

    rankingParams.push(
      regexp
    );


    /*
     * --------------------------------------------------------
     * DESCRIPTION
     * --------------------------------------------------------
     */

    rankingParts.push(
      `
      CASE

        WHEN LOWER(p.description) REGEXP ?

        THEN 50

        ELSE 0

      END
      `
    );

    rankingParams.push(
      regexp
    );

  }


  const rankingSql =
    rankingParts.length > 0
      ? rankingParts.join(
          " + "
        )
      : "0";


  /**
   * ==========================================================
   * PRODUCTS
   * ==========================================================
   */

  const [
    productRows,
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
         * RELEVANCE
         * ----------------------------------------------------
         */

        (
          ${rankingSql}
        ) AS relevance


      FROM products p


      WHERE

        p.available = 1

        AND

        (
          ${searchWhere}
        )


      ORDER BY

        relevance DESC,

        p.id DESC


      LIMIT ?

      OFFSET ?
      `,
      [

        /*
         * ----------------------------------------------------
         * RANKING PARAMS
         * ----------------------------------------------------
         */

        ...rankingParams,


        /*
         * ----------------------------------------------------
         * SEARCH PARAMS
         * ----------------------------------------------------
         */

        ...conditionParams,


        /*
         * ----------------------------------------------------
         * LIMIT
         * ----------------------------------------------------
         */

        PRODUCTS_PER_PAGE,


        /*
         * ----------------------------------------------------
         * OFFSET
         * ----------------------------------------------------
         */

        offset,

      ]
    );


  /**
   * ==========================================================
   * TYPE
   * ==========================================================
   */

  const rows =
    productRows as Array<{

      id: number;

      name: string;

      slug: string;

      price:
        | number
        | string;

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
   * MAP
   * ==========================================================
   */

  const products: SearchProduct[] =
    rows.map(
      (
        row
      ) => ({

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