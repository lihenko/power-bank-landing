import Image from "next/image";
import { Check } from "lucide-react";
import { PackageConfig } from "@/app/lib/product-config";

export default function PackageSection({
  eyebrow,
  title,
  description,
  items,
  image,
  imageAlt,
}: PackageConfig) {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          {eyebrow && (
            <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-3 text-4xl font-bold text-slate-900">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">{description}</p>

          {items && items.length > 0 && (
            <div className="mt-8 space-y-4">
              {items.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check className="text-green-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="order-1 lg:order-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <Image src={image} alt={imageAlt} width={1024} height={1024} className="mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}