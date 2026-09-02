import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";

const BASE_URL = "https://hitmarket.pp.ua";

export const revalidate = 86400;

interface ProductRow extends RowDataPacket {
  slug: string;
  updated_at: Date | string;
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
  const [rows] = await db.query<ProductRow[]>(`
    SELECT
      slug,
      updated_at
    FROM products
    WHERE available = 1
    ORDER BY id ASC
  `);

  const urls = rows
    .map(
      (row) => `
  <url>
    <loc>${BASE_URL}/product/${escapeXml(row.slug)}</loc>
    <lastmod>${new Date(row.updated_at).toISOString()}</lastmod>
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
        "public, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}