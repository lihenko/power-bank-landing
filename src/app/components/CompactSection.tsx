import Image from "next/image";
import { Check } from "lucide-react";

export default function CompactSection() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2">

        <div className="order-2 lg:order-1">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Компактний дизайн
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Беріть із собою щодня
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Завдяки компактним розмірам повербанк легко поміщається
            у сумку, рюкзак або кишеню куртки. Він не займає багато місця,
            тому завжди буде поруч, коли потрібна додаткова зарядка.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <Check className="text-green-600" />
              <span>Товщина всього 15,6 мм</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="text-green-600" />
              <span>Зручно носити щодня</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="text-green-600" />
              <span>Міцний корпус</span>
            </div>

          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <Image
              src="/power-bank-lenyes-side-500x500.webp"
              alt="Power Bank Lenyes PX163"
              width={500}
              height={500}
              className="mx-auto"
            />
          </div>
        </div>

      </div>
    </section>
  );
}