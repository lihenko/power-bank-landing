import { Metadata } from "next";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Контакти | HitMarket",
  description: "Зв'яжіться з HitMarket через Telegram або Viber.",
};

export default function ContactsPage() {
  return (
    <>
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Контакти</h1>

      <section className="mb-8">
        <p>
          Маєте питання щодо замовлення, доставки чи товару? Напишіть нам у
          зручний спосіб — ми відповідаємо якнайшвидше.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <a
          href="https://t.me/lihenko"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg border p-5 transition hover:border-gray-400"
        >
          <span className="text-2xl">✈️</span>
          <div>
            <h2 className="font-semibold">Telegram</h2>
            <p className="text-sm text-gray-500">Напишіть нам у Telegram</p>
          </div>
        </a>
        <a
        
          href="viber://chat?number=%2B380672520550"
          className="flex items-center gap-3 rounded-lg border p-5 transition hover:border-gray-400"
        >
          <span className="text-2xl">💬</span>
          <div>
            <h2 className="font-semibold">Viber</h2>
            <p className="text-sm text-gray-500">Напишіть нам у Viber</p>
          </div>
        </a>
      </section>
    </main>
    <Footer />
    </>
  );
}