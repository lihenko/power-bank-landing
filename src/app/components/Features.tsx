import {
  BatteryCharging,
  Smartphone,
  Usb,
  Briefcase,
} from "lucide-react";

const items = [
  {
    icon: BatteryCharging,
    title: "10000 mAh",
    text: "Оптимальна ємність для повсякденного використання. Допоможе залишатися на зв'язку вдома, у дорозі та під час можливих перебоїв з електропостачанням.",
    large: true,
  },
  {
    icon: Usb,
    title: "2 USB-виходи",
    text: "Заряджайте два пристрої одночасно.",
    large: true,
  },
  {
    icon: Smartphone,
    title: "Широка сумісність",
    text: "Смартфони, навушники, планшети та інші USB-пристрої.",
    large: false,
  },
  {
    icon: Briefcase,
    title: "Компактний корпус",
    text: "Легко поміщається у сумку або рюкзак.",
    large: false,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-slate-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-4">

        <div className="max-w-3xl">

          <p className="mb-3 text-sm text-slate-500">
            ⚡ Резервне живлення для смартфона
          </p>

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            Не залишайтеся без зв'язку
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Планові та аварійні відключення електроенергії можуть трапитися будь-коли.
            Компактний Power Bank допоможе зарядити телефон у потрібний момент та
            залишатися на зв'язку з рідними.
          </p>

        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">

          {items.map(({ icon: Icon, title, text, large }) => (
            <div
              key={title}
              className={`group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl ${
                large ? "min-h-[260px]" : "min-h-[200px]"
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition group-hover:bg-green-100">
                <Icon size={28} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900">
                {title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {text}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}