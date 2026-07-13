// app/components/ProductSchema.tsx
import { ProductConfig } from "@/app/lib/product-config";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hitmarket.pp.ua";

interface ProductSchemaProps {
  config: ProductConfig;
}

export function ProductSchema({ config }: ProductSchemaProps) {
  const reviews = config.reviews ?? [];
  const hasReviews = reviews.length > 0;
  const avgRating = hasReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: config.productName,
    description: config.seo.description,
    image: `${SITE_URL}${config.hero.image}`,
    sku: config.productSlug,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}${config.seo.canonicalPath}`,
      priceCurrency: "UAH",
      price: config.price,
      availability:
        config.stockCount === undefined || config.stockCount > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(hasReviews && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating!.toFixed(1),
        reviewCount: reviews.length,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}