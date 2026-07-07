import Link from 'next/link';
import Image from 'next/image';
import { ProductConfig } from '@/app/lib/product-config';

interface ProductCardProps {
  product: ProductConfig;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/${product.productSlug}`}
      className="group block rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={product.hero.image}
          alt={product.hero.imageAlt}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2">{product.productName}</h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold">{product.price} ₴</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {product.oldPrice} ₴
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}