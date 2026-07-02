export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold text-white">
              Хітмаркет
            </h3>

            <p className="mt-4 max-w-lg leading-7 text-zinc-400">
              Якісні товари з доставкою по всій Україні. Оплата після отримання,
              швидка відправка та гарантія якості.
            </p>
          </div>

          <div>
            <h4 className="mb-5 font-semibold text-white">
              Переваги
            </h4>

            <ul className="space-y-3 text-sm">
              <li>🚚 Доставка Новою Поштою та Укрпоштою</li>
              <li>💳 Оплата при отриманні</li>
              <li>📦 Відправка протягом 1–2 робочих днів</li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-zinc-800" />

        <div className="flex flex-col gap-4 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Всі права захищені.</p>

          <div className="flex-wrap gap-6 hidden">
            <a href="/privacy" className="hover:text-white transition">
              Політика конфіденційності
            </a>

            <a href="/delivery" className="hover:text-white transition">
              Доставка та оплата
            </a>

            <a href="/returns" className="hover:text-white transition">
              Повернення товару
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}