import Image from "next/image";
import { Check } from "lucide-react";

export default function PortsSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 lg:grid-cols-2">

        <div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <Image
              src="/power-bank-lenyes-socets-500x500.webp"
              alt="Роз'єми Power Bank Lenyes PX163"
              width={500}
              height={500}
              className="mx-auto"
            />
          </div>
        </div>

        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Усе необхідне під рукою
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Заряджайте два пристрої одночасно
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Power Bank Lenyes PX163 оснащений двома USB-виходами, що дозволяє
            одночасно заряджати смартфон, навушники, смартгодинник або інші
            сумісні USB-пристрої.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <Check className="text-green-600" />
              <span>2 USB-виходи для одночасної зарядки</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="text-green-600" />
              <span>Вхід Type-C та Micro USB</span>
            </div>

            <div className="flex items-center gap-3">
              <Check className="text-green-600" />
              <span>Сумісний із більшістю сучасних смартфонів</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}