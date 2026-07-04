import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, Search, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-green-200/30 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl" />
      </div>

      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
              Помилка 404
            </div>

            <h1 className="mt-6 text-5xl font-black leading-none text-slate-900 lg:text-7xl">
              Сторінку
              <br />
              не знайдено
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              Схоже, що посилання застаріло або сторінка була переміщена.
              Не хвилюйтеся — у HitMarket ще багато цікавих товарів.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 font-semibold text-white transition hover:bg-slate-800"
              >
                <Home size={20} />
                На головну
              </Link>

            </div>

          </div>

          {/* Right */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-300/20 blur-3xl" />

              <Image
                src="/404.webp"
                alt="404"
                width={650}
                height={650}
                priority
                className="relative drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}