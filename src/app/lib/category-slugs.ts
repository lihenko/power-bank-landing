/**
 * ============================================================
 * CATEGORY SLUGS
 * ============================================================
 *
 * Тут вручну задаємо SEO-friendly slug для кожної категорії.
 *
 * Ключ:
 *   ID категорії з таблиці categories
 *
 * Значення:
 *   slug, який буде використовуватися в URL
 *
 * Наприклад:
 *
 *   738 → lialky-ta-ihrashky
 *
 * URL:
 *
 *   /category/lialky-ta-ihrashky
 *
 *
 * ВАЖЛИВО:
 *
 * Slug-и задаються вручну.
 *
 * Не змінюй існуючий slug без необхідності,
 * якщо URL вже індексується пошуковими системами.
 * ============================================================
 */


/**
 * ============================================================
 * CATEGORY SLUGS
 * ============================================================
 */

export const categorySlugs: Record<
  number,
  string
> = {

  /*
   * ----------------------------------------------------------
   * Приклади.
   *
   * Заміни / видали їх та внеси реальні категорії
   * з твоєї таблиці categories.
   * ----------------------------------------------------------
   */

  29:
    "dom-sad",

  30:
    "lialky-ta-ihrashky",

  31:
    "vse-dla-kuhni",

  33:
    "elektronika",

  32:
    "tovary-dlya-avto",

  34:
    "valizy-sumky",

  35:
    "krasa-i-zdovjya",

  36:
    "lihtari-projectory-svitylnyky",

  37:
    "sport-turyzm",

  38:
    "tovary-dla-tvaryn",

  39:
    "novorichni-tovary",

  40:
    "podarunky-suveniry",

};


/**
 * ============================================================
 * SLUG → CATEGORY ID
 * ============================================================
 *
 * Створюємо зворотну карту автоматично.
 *
 * Наприклад:
 *
 * "lialky-ta-ihrashky"
 *          ↓
 *        738
 *
 * Вона використовується на сторінці:
 *
 * /category/[slug]
 *
 * ============================================================
 */

export const categoryIdsBySlug:
  Record<string, number> =
    Object.fromEntries(

      Object.entries(
        categorySlugs
      ).map(
        ([id, slug]) => [

          slug,

          Number(id),

        ]
      )

    );


/**
 * ============================================================
 * GET CATEGORY SLUG
 * ============================================================
 *
 * Отримати slug за ID категорії.
 *
 * Приклад:
 *
 * getCategorySlug(738)
 *
 * → "lialky-ta-ihrashky"
 *
 * Якщо категорія не знайдена:
 *
 * → null
 *
 * ============================================================
 */

export function getCategorySlug(
  categoryId: number
): string | null {

  return (
    categorySlugs[
      categoryId
    ] ?? null
  );

}


/**
 * ============================================================
 * GET CATEGORY ID
 * ============================================================
 *
 * Отримати ID категорії за slug.
 *
 * Приклад:
 *
 * getCategoryIdBySlug(
 *   "lialky-ta-ihrashky"
 * )
 *
 * → 738
 *
 * Якщо slug не знайдений:
 *
 * → null
 *
 * ============================================================
 */

export function getCategoryIdBySlug(
  slug: string
): number | null {

  return (
    categoryIdsBySlug[
      slug
    ] ?? null
  );

}


/**
 * ============================================================
 * CHECK CATEGORY SLUG
 * ============================================================
 *
 * Перевіряє, чи існує такий slug.
 *
 * Приклад:
 *
 * hasCategorySlug(
 *   "elektronika"
 * )
 *
 * → true
 *
 * ============================================================
 */

export function hasCategorySlug(
  slug: string
): boolean {

  return (
    categoryIdsBySlug[
      slug
    ] !== undefined
  );

}