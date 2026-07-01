"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
  {
    question: "Скільки разів можна зарядити смартфон?",
    answer:
      "Це залежить від ємності акумулятора смартфона. Для більшості сучасних телефонів повербанк 10000 mAh забезпечує приблизно 1–2 повних зарядки.",
  },
  {
    question: "Чи можна заряджати два пристрої одночасно?",
    answer:
      "Так. Power Bank Lenyes PX163 оснащений двома USB-виходами, тому можна одночасно заряджати два сумісні пристрої.",
  },
  {
    question: "Як швидко відправляється замовлення?",
    answer:
      "Після підтвердження замовлення ми передаємо його до служби доставки у найкоротший можливий термін. Зазвичай відправка в день замовлення або наступного дня.",
  },
  {
    question: "Як здійснюється оплата?",
    answer:
      "Оплата проводиться при отриманні у відділенні Нової Пошти або Укрпошти.",
  },
  {
    question: "Що входить до комплекту?",
    answer:
      "Power Bank Lenyes PX163, кабель для заряджання та заводська упаковка.",
  },
];

export default function Faq() {
  const [opened, setOpened] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-4">

          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
              FAQ
            </span>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              Часті запитання
            </h2>

            <p className="mt-5 text-lg text-slate-600">
              Відповіді на найпоширеніші запитання перед оформленням замовлення.
            </p>
          </div>

          <div className="mt-12 space-y-4">

            {questions.map((item, index) => {
              const active = opened === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <button
                    onClick={() => setOpened(active ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-slate-900">
                      {item.question}
                    </span>

                    <ChevronDown
                      className={`transition ${
                        active ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      active
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 leading-7 text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>
    </>
  );
}