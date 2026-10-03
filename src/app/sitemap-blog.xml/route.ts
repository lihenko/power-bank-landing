import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { wpDb } from "@/lib/wp-db";

const BASE_URL = "https://hitmarket.pp.ua";

export const revalidate = 3600;

interface BlogPostRow extends RowDataPacket {
  slug: string;
  modified: Date | string;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const prefix = process.env.WORDPRESS_DB_PREFIX || "wp_";

  const [rows] = await wpDb.query<BlogPostRow[]>(
    `
      SELECT
        post_name AS slug,
        post_modified AS modified
      FROM ${prefix}posts
      WHERE post_type = 'post'
        AND post_status = 'publish'
        AND post_name <> ''
      ORDER BY post_modified DESC
    `
  );

  const urls = rows
    .map(
      (post) => `
  <url>
    <loc>${BASE_URL}/blog/${escapeXml(post.slug)}</loc>
    <lastmod>${new Date(post.modified).toISOString()}</lastmod>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=3600",
    },
  });
}