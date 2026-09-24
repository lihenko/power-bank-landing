import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Доставка",
  description:
    "Умови доставки HitMarket: Нова Пошта та Укрпошта, передоплата, строки відправки.",
};

export default function DeliveryPage() {
  return (
    <>
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Доставка</h1>

      <section className="mb-8">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">🚚</span>
          <div>
            <h2 className="text-lg font-semibold mb-1">
              Доставка Новою Поштою та Укрпоштою
            </h2>
            <p>
              Ми відправляємо замовлення по всій Україні службами «Нова
              Пошта» та «Укрпошта» — у відділення, поштомат або з доставкою
              за адресою, залежно від обраного способу при оформленні
              замовлення.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl">💳</span>
          <div>
            <h2 className="text-lg font-semibold mb-1">Умови оплати</h2>
            <p className="mb-2">
              Передплата за замовлення складає 50 грн.
            </p>
            <p className="mb-2">
              Для великогабаритних товарів (мангали, барбекю тощо)
              передплата складає 400 грн.
            </p>
            <p className="mb-2">
              Замовлення на суму до 400 грн відправляються за умови повної
              передплати.
            </p>
            <p>
              Передплата не повертається у разі відмови від замовлення.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-2xl">📦</span>
          <div>
            <h2 className="text-lg font-semibold mb-1">Строки відправки</h2>
            <p>
              Ми відправляємо замовлення протягом 1–2 робочих днів після
              підтвердження та оплати.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Маєте питання?</h2>
        <p className="mb-4">
          Якщо у вас виникли запитання щодо доставки вашого замовлення,
          зв'яжіться з нами — ми відповімо якнайшвидше.
        </p>
        <Link
          href="https://hitmarket.pp.ua/contacts"
          className="inline-block rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white"
        >
          Перейти до контактів
        </Link>
      </section>
    </main>
    <Footer />
    </>
  );
}