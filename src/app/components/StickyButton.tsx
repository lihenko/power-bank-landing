"use client";

import { useEffect, useState } from "react";

export default function StickyButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white p-4 shadow-2xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between">
        <div>
          <p className="text-2xl font-bold">530₴</p>
          <p className="text-sm text-green-600">
            Є в наявності
          </p>
        </div>

        <button
          onClick={() =>
            document
              .getElementById("order")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white"
        >
          Замовити
        </button>
      </div>
    </div>
  );
}