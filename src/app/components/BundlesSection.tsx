"use client";

import { Gift, Check } from "lucide-react";
import { BundlesConfig } from "@/app/lib/product-config";

interface Props extends BundlesConfig {
  price: number;
  selectedIndex: number | null;
  onSelect: (index: number, quantity: number, totalPrice: number) => void;
}

export default function BundlesSection({
  eyebrow = "Вигідна пропозиція",
  title = "Заощаджуйте на комплекті",
  unitLabel = "шт",
  options,
  price,
  selectedIndex,
  onSelect,
}: Props) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
            {eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">{title}</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {options.map((option, index) => {
            const totalUnits = option.quantity + option.bonus;
            const payAmount = option.quantity * price;
            const regularAmount = totalUnits * price;
            const savings = regularAmount - payAmount;
            const isSelected = selectedIndex === index;

            return (
              <button
                key={`${option.quantity}-${option.bonus}`}
                type="button"
                onClick={() => onSelect(index, option.quantity, payAmount)}
                className={`relative rounded-2xl border-2 bg-white p-6 text-left transition hover:shadow-lg ${
                  isSelected
                    ? "border-green-600 shadow-lg ring-2 ring-green-200"
                    : "border-slate-200 hover:border-green-400"
                }`}
              >
                {option.label && (
                  <span className="absolute -top-3 left-6 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                    {option.label}
                  </span>
                )}

                {isSelected && (
                  <span className="absolute -top-3 right-6 flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-white">
                    <Check size={16} />
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <Gift size={22} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      {option.quantity} + {option.bonus} у подарунок
                    </p>
                    <p className="text-sm text-slate-500">
                      {totalUnits} {unitLabel} за ціною {option.quantity}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-end gap-3">
                  <span className="text-2xl font-black text-slate-900">{payAmount}₴</span>
                  <span className="text-base text-slate-400 line-through">{regularAmount}₴</span>
                </div>

                <p className="mt-1 text-sm font-medium text-green-600">
                  Заощаджуєте {savings}₴
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}