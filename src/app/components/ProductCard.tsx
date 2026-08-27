import Link from "next/link";
import Image from "next/image";
import { ProductConfig } from "@/app/lib/product-config";

interface ProductCardProps {
  product: ProductConfig;
}

export function ProductCard({
  product,
}: ProductCardProps) {

  console.log("PRODUCT CARD:", {
  name: product.productName,
  category_id: product.category_id,
  type: typeof product.category_id,
});

  const isDiscounted = product.category_id === 47;
  const isCheap = product.price < 200 && !isDiscounted;
  const displayPrice = isCheap ? Math.round(product.price * 1.2) : product.price;
  const displayOldPrice = product.oldPrice
    ? isCheap
      ? Math.round(product.oldPrice * 1.2)
      : product.oldPrice
    : undefined;

  return (
    

    <Link
      href={`/product/${product.productSlug}`}
      className="
        group
        block
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        transition-shadow
        hover:shadow-lg
      "
    >

      <div
        className="
          relative
          aspect-square
          bg-gray-50
        "
      >

        <img
          src={
            product.hero.image ||
            "/products/placeholder.webp"
          }

          alt={
            product.hero.imageAlt ||
            product.productName
          }

          className="
            object-contain
            p-4
            transition-transform
            group-hover:scale-105
          "

          sizes="
            (max-width: 768px) 50vw,
            25vw
          "
        />

      </div>

      <div className="p-4">

        <h3
          className="
            line-clamp-2
            text-sm
            font-medium
          "
        >
          {product.productName}
        </h3>

        <div
          className="
            mt-2
            flex
            items-center
            gap-2
          "
        >

          <span
            className="
              text-lg
              font-bold
            "
          >
            {displayPrice} ₴
          </span>

          {displayOldPrice !== undefined && (
            <span
              className="
                text-sm
                text-gray-400
                line-through
              "
            >
              {displayOldPrice} ₴
            </span>
          )}

        </div>

      </div>

    </Link>

  );
}