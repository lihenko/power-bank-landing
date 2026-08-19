import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { categorySlugs } from "@/app/lib/category-slugs";

const BASE_URL = "https://hitmarket.pp.ua";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: "daily", priority: 1 },
  { url: `${BASE_URL}/delivery`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/returns`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE_URL}/contacts`, changeFrequency: "monthly", priority: 0.5 },
];

interface ProductRow {
  slug: string;
  updated_at: Date | string;
}

export const revalidate = 86400; // раз на день

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Категорії — статичні, задаються вручну в categorySlugs
  const categoryRoutes: MetadataRoute.Sitemap = Object.values(
    categorySlugs
  ).map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Товари — з БД
  const [rows] = await db.query<any[]>(
    `SELECT slug, updated_at
     FROM products
     WHERE available = 1`
  );

  const productRoutes: MetadataRoute.Sitemap = (rows as ProductRow[]).map(
    (row) => ({
      url: `${BASE_URL}/products/${row.slug}`,
      lastModified: new Date(row.updated_at),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [...STATIC_ROUTES, ...categoryRoutes, ...productRoutes];
}