const STEPS = [
  {
    title: "Заповніть форму",
    description: "Вкажіть ім'я, телефон та місто — це займе менше хвилини.",
  },
  {
    title: "Ми зателефонуємо для підтвердження",
    description: "Менеджер зв'яжеться з вами, щоб уточнити деталі доставки.",
  },
  {
    title: "Відправимо",
    description: "Замовлення передається в службу доставки в день замовлення або наступного дня.",
  },
  {
    title: "Оплатіть при отриманні",
    description: "Огляньте товар у відділенні та оплатіть тільки якщо все влаштовує.",
  },
];

export default function HowToOrder() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Просто і без ризику
          </span>
          <h2 className="mt-3 text-4xl font-bold text-slate-900">Як зробити замовлення</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Оформлення займає менше хвилини, оплата тільки при отриманні.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
                {index + 1}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">{step.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{step.description}</p>

              {index < STEPS.length - 1 && (
                <div className="absolute right-[-16px] top-6 hidden h-px w-8 bg-slate-200 lg:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#order"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-slate-900 px-10 text-lg font-semibold text-white transition hover:bg-slate-800"
          >
            Замовити зараз
          </a>
        </div>
      </div>
    </section>
  );
}