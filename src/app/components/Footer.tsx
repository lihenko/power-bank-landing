export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Інтернет-магазин</h3>
            <p className="mt-3 text-sm text-gray-600">
              Якісні товари за доступними цінами з доставкою по всій Україні.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Інформація</h3>

            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Доставка Новою Поштою</li>
              <li>Доставка Укрпоштою</li>
              <li>Оплата при отриманні</li>
              <li>Відправка протягом 1–2 днів</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Режим роботи</h3>

            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p>Працюємо щодня 09:00–18:00</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Інтернет-магазин. Всі права захищені.
        </div>
      </div>
    </footer>
  );
}