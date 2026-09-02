import { wpDb } from "@/lib/wp-db";
import type { RowDataPacket } from "mysql2";

export interface BlogPost extends RowDataPacket {
  id: number;
  date: Date;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  post_thumbnail: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

export interface BlogPostsResult {
  posts: BlogPost[];
  total: number;
  totalPages: number;
}

export async function getBlogPosts(
  page = 1,
  perPage = 6
): Promise<BlogPostsResult> {
  const prefix = process.env.WORDPRESS_DB_PREFIX || "wp_";

  const offset = (page - 1) * perPage;

  const [countRows] = await wpDb.query<RowDataPacket[]>(
    `
      SELECT COUNT(*) AS total
      FROM ${prefix}posts
      WHERE post_type = 'post'
        AND post_status = 'publish'
    `
  );

  const total = Number(countRows[0]?.total || 0);
  const totalPages = Math.ceil(total / perPage);

  const [posts] = await wpDb.query<BlogPost[]>(
    `
      SELECT
        p.ID AS id,
        p.post_date AS date,
        p.post_name AS slug,
        p.post_title AS title,
        p.post_excerpt AS excerpt,
        p.post_content AS content,

        MAX(
          CASE
            WHEN pm.meta_key = '_post_thumbnail'
            THEN pm.meta_value
          END
        ) AS post_thumbnail,

        MAX(
          CASE
            WHEN pm.meta_key = '_yoast_wpseo_title'
            THEN pm.meta_value
          END
        ) AS seo_title,

        MAX(
          CASE
            WHEN pm.meta_key = '_yoast_wpseo_metadesc'
            THEN pm.meta_value
          END
        ) AS seo_description

      FROM ${prefix}posts p

      LEFT JOIN ${prefix}postmeta pm
        ON pm.post_id = p.ID

      WHERE p.post_type = 'post'
        AND p.post_status = 'publish'

      GROUP BY
        p.ID,
        p.post_date,
        p.post_name,
        p.post_title,
        p.post_excerpt,
        p.post_content

      ORDER BY p.post_date DESC

      LIMIT ? OFFSET ?
    `,
    [perPage, offset]
  );

  return {
    posts,
    total,
    totalPages,
  };
}

export async function getBlogPost(
  slug: string
): Promise<BlogPost | null> {
  const prefix = process.env.WORDPRESS_DB_PREFIX || "wp_";

  const [rows] = await wpDb.query<BlogPost[]>(
    `
      SELECT
        p.ID AS id,
        p.post_date AS date,
        p.post_name AS slug,
        p.post_title AS title,
        p.post_excerpt AS excerpt,
        p.post_content AS content,

        MAX(
          CASE
            WHEN pm.meta_key = '_post_thumbnail'
            THEN pm.meta_value
          END
        ) AS post_thumbnail,

        MAX(
          CASE
            WHEN pm.meta_key = '_yoast_wpseo_title'
            THEN pm.meta_value
          END
        ) AS seo_title,

        MAX(
          CASE
            WHEN pm.meta_key = '_yoast_wpseo_metadesc'
            THEN pm.meta_value
          END
        ) AS seo_description

      FROM ${prefix}posts p

      LEFT JOIN ${prefix}postmeta pm
        ON pm.post_id = p.ID

      WHERE p.post_type = 'post'
        AND p.post_status = 'publish'
        AND p.post_name = ?

      GROUP BY
        p.ID,
        p.post_date,
        p.post_name,
        p.post_title,
        p.post_excerpt,
        p.post_content

      LIMIT 1
    `,
    [slug]
  );

  return rows[0] || null;
}