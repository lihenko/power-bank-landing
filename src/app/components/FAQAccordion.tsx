"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "Чи можна оглянути товар перед оплатою?",
    answer:
      "Так, у відділенні «Нової Пошти» ви можете оглянути товар, після чого доплачуєте залишок суми.",
  },
  {
    question: "Що як я відмовлюсь від замовлення?",
    answer:
      "Передплата не повертається — вона покриває витрати на пересилку товару.",
  },
  {
    question: "Скільки чекати відправку?",
    answer:
      "Замовлення відправляється протягом 1–2 робочих днів після підтвердження.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="divide-y divide-gray-200">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between py-4 text-left cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-sm">{item.question}</span>
              <span
                className={`text-lg transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="pb-4 text-sm text-gray-200">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}