import { NextResponse } from "next/server";

const BASE_URL = "https://hitmarket.pp.ua";

export const revalidate = 86400;

const PAGES = [
  "/",
  "/blog",
  "/delivery",
  "/returns",
  "/privacy",
  "/contacts",
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const urls = PAGES.map(
    (path) => `
  <url>
    <loc>${BASE_URL}${escapeXml(path)}</loc>
  </url>`
  ).join("");

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