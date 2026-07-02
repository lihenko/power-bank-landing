"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function LiveViewersBadge() {
  const [count, setCount] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // початкове значення
    const initial = Math.floor(Math.random() * (14 - 6 + 1)) + 6;
    setCount(initial);

    // з'являється через 2 секунди після завантаження
    const showTimer = setTimeout(() => setVisible(true), 2000);

    // періодично трохи змінює число, щоб виглядало живим
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === null) return prev;
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        const next = prev + delta;
        return Math.min(Math.max(next, 5), 18); // тримає в межах 5-18
      });
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  if (!visible || count === null) return null;

  return (
    <div
      className="fixed right-1 top-8 z-40 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-lg animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      <Eye className="h-4 w-4 text-slate-500" />
      <span className="text-sm font-medium text-slate-700">
        {count} переглядають зараз
      </span>
    </div>
  );
}