import Image from "next/image";
import { Check, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:py-16">

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Фото */}

          <div className="relative">

            <div className="absolute inset-0 rounded-[40px] bg-blue-50 blur-3xl" />

            <div className="relative rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl">

              <Image
                src="/power-bank-lenyes.webp"
                alt="Power Bank Lenyes PX163"
                width={500}
                height={500}
                priority
                className="mx-auto"
              />

            </div>

          </div>

          {/* Контент */}

          <div>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-orange-600">
              ⚡ Готовий до можливих відключень світла
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 lg:text-6xl">
              Power Bank
              <br />
              Lenyes PX163
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Компактний зовнішній акумулятор на <strong>10000 mAh</strong>,
              який допоможе залишатися на зв'язку під час відключень світла,
              у дорозі або в подорожах.
            </p>

            <div className="mt-6 flex items-center gap-2">

              {[1,2,3,4,5].map((i)=>(
                <Star
                  key={i}
                  size={18}
                  fill="currentColor"
                  className="text-amber-400"
                />
              ))}

              <span className="ml-2 text-sm text-slate-500">
                Надійний помічник на кожен день
              </span>

            </div>

            <div className="mt-8 flex items-end gap-4">

              <span className="text-5xl font-black text-slate-900">
                530₴
              </span>

              <span className="text-2xl text-slate-400 line-through">
                699₴
              </span>

            </div>

            <a
              href="#order"
              className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white transition hover:bg-slate-800 lg:w-fit lg:px-10"
            >
              Замовити зараз
            </a>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">
                <Check className="text-green-600" size={20} />
                <span>До двох зарядок більшості смартфонів*</span>
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-600" size={20} />
                <span>Два USB-порти для одночасної зарядки</span>
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-600" size={20} />
                <span>Оплата при отриманні</span>
              </div>

              <div className="flex items-center gap-3">
                <Check className="text-green-600" size={20} />
                <span>Швидка відправка Новою Поштою</span>
              </div>

            </div>

            <p className="mt-6 text-xs text-slate-400">
              *Кількість зарядок залежить від моделі смартфона та ємності його акумулятора.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}