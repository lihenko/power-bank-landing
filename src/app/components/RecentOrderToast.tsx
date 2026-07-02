"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, X } from "lucide-react";

const CITIES = [
  "Києва",
  "Дніпра",
  "Харкова",
  "Одеси",
  "Львова",
  "Запоріжжя",
  "Кам'янського",
  "Кривого Рогу",
  "Вінниці",
  "Полтави",
  "Конотопа",
  "Хмельницького",
  "Житомира",
  "Олександрії",
  "Кропивницького",
];

const NAMES = [
  "Олександр",
  "Марія",
  "Іван",
  "Тетяна",
  "Андрій",
  "Наталія",
  "Сергій",
  "Юлія",
  "Дмитро",
  "Оксана",
  "Олена",
  "Владислав",
  "Костянтин",
  "Михайло",
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMinutesAgo() {
  return Math.floor(Math.random() * 27) + 2; // 2-28 хвилин тому
}

export default function RecentOrderToast() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<{ name: string; city: string; minutes: number } | null>(null);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;

    const showToast = () => {
      setData({
        name: randomFrom(NAMES),
        city: randomFrom(CITIES),
        minutes: randomMinutesAgo(),
      });
      setVisible(true);

      hideTimer = setTimeout(() => setVisible(false), 6000);
    };

    // перший показ через 5 секунд після завантаження
    const firstTimer = setTimeout(showToast, 5000);

    // далі показує кожні 18-30 секунд
    const interval = setInterval(() => {
      showToast();
    }, Math.floor(Math.random() * (30000 - 18000)) + 18000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible || !data) return null;

  return (
    <div className="fixed bottom-24 lg:bottom-4 left-4 z-40 max-w-xs animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 pr-8 shadow-lg">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
          <ShoppingBag className="h-4 w-4 text-green-600" />
        </div>
        <div className="text-sm">
          <p className="font-medium text-slate-800">
            {data.name} з {data.city}
          </p>
          <p className="text-slate-500">
            щойно замовив · {data.minutes} хв тому
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
          aria-label="Закрити"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}