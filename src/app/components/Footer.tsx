import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Link href="/">
              <img
                src="/hitmarket-white.webp"
                alt="HitMarket"
                width={220}
                height={70}
              />
            </Link>

            <p className="mt-4 max-w-lg leading-7 text-zinc-400">
              Популярні товари з доставкою по всій Україні. Оплата після
              отримання, швидка відправка та гарантія якості.
            </p>
          </div>

          <div>
            <h4 className="mb-5 font-semibold text-white">
              Переваги
            </h4>

            <ul className="space-y-3 text-sm">
              <li>🚚 Доставка Новою Поштою та Укрпоштою</li>
              <li>
                💳 Передплата за замовлення 50грн, замовлення до 400 грн
                відправляються за повною передплатою
              </li>
              <li>📦 Відправка протягом 1–2 робочих днів</li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-zinc-800" />

        <div className="flex flex-col gap-4 text-sm text-zinc-500 lg:flex-row md:items-center md:justify-between">
          <p className="order-2 text-center lg:order-1">© {new Date().getFullYear()} Всі права захищені.</p>

          <div className="flex flex-wrap gap-6 mb-6 order-1 justify-center lg:order-2 lg:mb-0 lg:justify-end">
            <Link
              href="/blog"
              className="transition hover:text-white"
            >
              Блог
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Політика конфіденційності
            </Link>

            <Link
              href="/delivery"
              className="transition hover:text-white"
            >
              Доставка та оплата
            </Link>

            <Link
              href="/returns"
              className="transition hover:text-white"
            >
              Повернення товару
            </Link>

            <Link
              href="/contacts"
              className="transition hover:text-white"
            >
              Контакти
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}