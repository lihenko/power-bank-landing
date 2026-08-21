"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImage {
  local_path: string | null;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const validImages = images.filter(
    (image) => image.local_path
  );

  const [activeIndex, setActiveIndex] = useState(0);

  if (validImages.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-50">
        <img
          src="/products/placeholder.webp"
          alt={productName}
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    );
  }

  const activeImage =
    validImages[activeIndex]?.local_path ??
    validImages[0].local_path!;

  return (
    <section className="py-16">
      <div className="max-w-200 mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-center mb-10">Галерея зображень</h2>
            <div className="w-full">
            {/* Головне зображення */}
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-50">
                <Image
                src={activeImage}
                alt={`${productName} — зображення ${activeIndex + 1}`}
                fill
                priority
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {/* Мініатюри */}
            {validImages.length > 1 && (
                <div className="mt-4 overflow-x-auto">
                <div className="flex gap-3 pb-2">
                    {validImages.map((image, index) => {
                    const isActive =
                        index === activeIndex;

                    return (
                        <button
                        key={`${image.local_path}-${index}`}
                        type="button"
                        onClick={() =>
                            setActiveIndex(index)
                        }
                        aria-label={`Зображення ${index + 1}`}
                        aria-current={
                            isActive
                            ? "true"
                            : undefined
                        }
                        className={`
                            relative
                            h-20
                            w-20
                            shrink-0
                            overflow-hidden
                            rounded-xl
                            border-2
                            bg-white
                            transition
                            ${
                            isActive
                                ? "border-green-500"
                                : "border-slate-200 hover:border-slate-400"
                            }
                        `}
                        >
                        <Image
                            src={image.local_path!}
                            alt={`${productName} — ${index + 1}`}
                            fill
                            className="object-contain p-1"
                            sizes="80px"
                        />
                        </button>
                    );
                    })}
                </div>
                </div>
            )}

            {/* Лічильник */}
            {validImages.length > 1 && (
                <div className="mt-2 text-center text-sm text-slate-500">
                {activeIndex + 1} / {validImages.length}
                </div>
            )}
            </div>
        </div>
    </section>
  );
}