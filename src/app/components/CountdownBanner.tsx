"use client";

import { useEffect, useState } from "react";
import { Flame } from "lucide-react";

function getTimeLeftUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diff = midnight.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownBanner() {
  const [time, setTime] = useState<{ hours: number; minutes: number; seconds: number } | null>(
    null
  );

  useEffect(() => {
    setTime(getTimeLeftUntilMidnight());

    const interval = setInterval(() => {
      setTime(getTimeLeftUntilMidnight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <section className="bg-slate-900 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <Flame className="h-6 w-6 text-orange-400" />
          <p className="text-lg font-semibold text-white">
            Знижка діє сьогодні — встигніть замовити
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center rounded-xl bg-white/10 px-4 py-2 min-w-[64px]">
            <span className="text-2xl font-black text-white tabular-nums">{pad(time.hours)}</span>
            <span className="text-xs text-slate-300">год</span>
          </div>
          <span className="text-2xl font-black text-white">:</span>
          <div className="flex flex-col items-center rounded-xl bg-white/10 px-4 py-2 min-w-[64px]">
            <span className="text-2xl font-black text-white tabular-nums">{pad(time.minutes)}</span>
            <span className="text-xs text-slate-300">хв</span>
          </div>
          <span className="text-2xl font-black text-white">:</span>
          <div className="flex flex-col items-center rounded-xl bg-white/10 px-4 py-2 min-w-[64px]">
            <span className="text-2xl font-black text-white tabular-nums">{pad(time.seconds)}</span>
            <span className="text-xs text-slate-300">сек</span>
          </div>
        </div>
      </div>
    </section>
  );
}