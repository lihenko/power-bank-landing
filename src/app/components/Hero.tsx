import Image from "next/image";
import { Check, Star } from "lucide-react";
import { HeroConfig } from "@/app/lib/product-config";

interface Props extends HeroConfig {
  price: number;
  oldPrice?: number;
}

export default function Hero({
  badgeText,
  title,
  description,
  image,
  imageAlt,
  price,
  oldPrice,
  checklist,
  ratingSubtext,
  ctaText = "Замовити зараз",
  ctaHref = "#order",
  disclaimer,
}: Props) {
  return (
    <section className="bg-linear-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-[40px] bg-blue-50 blur-3xl" />
            <div className="relative rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">
              <Image src={image} alt={imageAlt} width={500} height={500} priority className="mx-auto" />
            </div>
          </div>

          <div>
            {badgeText && (
              <div className="inline-flex items-center gap-2 text-sm font-medium text-orange-600">
                {badgeText}
              </div>
            )}

            <h1 className="mt-6 whitespace-pre-line text-4xl font-black leading-tight text-slate-900 lg:text-6xl">
              {title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">{description}</p>

            <div className="mt-6 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} fill="currentColor" className="text-amber-400" />
              ))}
              {ratingSubtext && (
                <span className="ml-2 text-sm text-slate-500">{ratingSubtext}</span>
              )}
            </div>

            <div className="mt-8 flex items-end gap-4">
              <span className="text-5xl font-black text-slate-900">{price}₴</span>
              {oldPrice && (
                <span className="text-2xl text-slate-400 line-through">{oldPrice}₴</span>
              )}
            </div>

            <a
              href={ctaHref}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white transition hover:bg-slate-800 lg:w-fit lg:px-10"
            >
              {ctaText}
            </a>

            {checklist && checklist.length > 0 && (
              <div className="mt-10 space-y-4">
                {checklist.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check className="text-green-600" size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {disclaimer && <p className="mt-6 text-xs text-slate-400">{disclaimer}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}