"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/app/lib/product-config";

interface Props {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
}

export default function Faq({
  eyebrow = "FAQ",
  title = "Часті запитання",
  description,
  items,
}: Props) {
  const [opened, setOpened] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-600">
              {eyebrow}
            </span>
            <h2 className="mt-3 text-4xl font-bold text-slate-900">{title}</h2>
            {description && <p className="mt-5 text-lg text-slate-600">{description}</p>}
          </div>

          <div className="mt-12 space-y-4">
            {items.map((item, index) => {
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
                    <span className="font-semibold text-slate-900">{item.question}</span>
                    <ChevronDown className={`transition ${active ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 leading-7 text-slate-600">{item.answer}</p>
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