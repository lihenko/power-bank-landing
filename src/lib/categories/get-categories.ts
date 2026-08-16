import { db } from "@/lib/db";

import {
  categorySlugs,
} from "@/app/lib/category-slugs";


/*
 * ============================================================
 * CATEGORY
 * ============================================================
 */

export interface Category {
  id: number;
  name: string;
  slug: string;
}


/*
 * ============================================================
 * GET CATEGORIES
 * ============================================================
 *
 * Беремо тільки категорії,
 * для яких заданий SEO slug
 * у category-slugs.ts.
 *
 * Назву категорії беремо з БД.
 *
 * ============================================================
 */

export async function getCategories(): Promise<Category[]> {

  const categoryIds =
    Object.keys(categorySlugs)
      .map(Number);


  /*
   * Якщо категорій немає —
   * не виконуємо SQL.
   */

  if (categoryIds.length === 0) {
    return [];
  }


  /*
   * ----------------------------------------------------------
   * SQL placeholders
   * ----------------------------------------------------------
   */

  const placeholders =
    categoryIds
      .map(() => "?")
      .join(",");


  /*
   * ----------------------------------------------------------
   * Отримуємо категорії
   * ----------------------------------------------------------
   *
   * FIELD() зберігає порядок,
   * який заданий у category-slugs.ts.
   *
   */

  const [rows] =
    await db.query(
      `
      SELECT
        id,
        name
      FROM categories
      WHERE id IN (${placeholders})
      ORDER BY FIELD(
        id,
        ${placeholders}
      )
      `,
      [
        ...categoryIds,
        ...categoryIds,
      ]
    );


  const categories =
    rows as Array<{
      id: number;
      name: string;
    }>;


  /*
   * ----------------------------------------------------------
   * Формуємо результат
   * ----------------------------------------------------------
   */

  return categories
    .map((category) => {

      const slug =
        categorySlugs[
          category.id
        ];


      /*
       * Теоретично цього бути не може,
       * оскільки SQL бере тільки ID
       * з categorySlugs.
       */

      if (!slug) {
        return null;
      }


      return {
        id:
          category.id,

        name:
          category.name,

        slug,
      };

    })
    .filter(
      (
        category
      ): category is Category =>
        category !== null
    );
}