import Image from "next/image";
import { Check } from "lucide-react";

export default function PackageSection() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2">

        <div className="order-2 lg:order-1">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Комплектація
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Готовий до використання
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Ви отримуєте повербанк у фірмовій упаковці разом із кабелем для
            заряджання. Достатньо зарядити пристрій — і він готовий допомогти
            вам у будь-який момент.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <Check className="text-green-600" />
              <span>Power Bank Lenyes PX163</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="text-green-600" />
              <span>Кабель для заряджання</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="text-green-600" />
              <span>Фірмова заводська упаковка</span>
            </div>

          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <Image
              src="/power-bank-lenyes-packed-1024x1024.webp"
              alt="Комплектація Power Bank Lenyes PX163"
              width={1024}
              height={1024}
              className="mx-auto"
            />
          </div>
        </div>

      </div>
    </section>
  );
}