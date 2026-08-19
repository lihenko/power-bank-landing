import { Metadata } from "next";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Політика конфіденційності",
  description:
    "Політика конфіденційності HitMarket: які дані ми збираємо, як їх використовуємо та як ви можете керувати своїми правами.",
};

export default function PrivacyPage() {
  return (
    <>
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Політика конфіденційності</h1>
      <p className="text-sm text-gray-500 mb-8">Останнє оновлення: 19 серпня 2026 р.</p>

      <section className="mb-8">
        <p>
          HitMarket (hitmarket.pp.ua) поважає вашу приватність. Ця Політика
          конфіденційності пояснює, які персональні дані ми збираємо, з якою
          метою їх використовуємо та які права ви маєте відповідно до Закону
          України «Про захист персональних даних».
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Які дані ми збираємо</h2>
        <p className="mb-2">Під час оформлення замовлення ми збираємо:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Ім'я та прізвище</li>
          <li>Номер телефону</li>
          <li>Місто</li>
          <li>Відділення Нової Пошти</li>
        </ul>
        <p className="mt-2">
          Крім того, під час перегляду сайту автоматично збираються технічні
          дані: IP-адреса, тип браузера, сторінки, які ви переглядаєте, та
          дані про взаємодію з рекламою.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. Мета обробки даних</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Оформлення та доставка замовлення через Нову Пошту</li>
          <li>Зв'язок з вами щодо статусу замовлення</li>
          <li>Покращення роботи сайту та асортименту</li>
          <li>Показ релевантної реклами (Meta Ads)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Файли cookie та піксель Meta</h2>
        <p>
          Наш сайт використовує Meta Pixel для аналітики реклами та
          персоналізації рекламних оголошень у Facebook та Instagram. Це
          означає, що деяка інформація про ваші дії на сайті може передаватись
          компанії Meta. Ви можете керувати параметрами реклами у своєму
          обліковому записі Meta або обмежити збір cookie у налаштуваннях
          браузера.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Передача даних третім сторонам</h2>
        <p>
          Дані про замовлення передаються службі доставки «Нова Пошта» для
          виконання доставки. Ми не продаємо та не передаємо ваші персональні
          дані третім особам з маркетинговою метою без вашої згоди.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. Зберігання даних</h2>
        <p>
          Дані про замовлення зберігаються протягом строку, необхідного для
          виконання замовлення та вирішення можливих спорів, а також для
          ведення бухгалтерського обліку відповідно до законодавства України.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Ваші права</h2>
        <p className="mb-2">Ви маєте право:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Отримати інформацію про те, які дані ми про вас зберігаємо</li>
          <li>Вимагати виправлення неточних даних</li>
          <li>Вимагати видалення ваших персональних даних</li>
          <li>Відкликати згоду на обробку даних</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">7. Контакти</h2>
        <p>
          З питань щодо цієї Політики конфіденційності ви можете звернутися до
          нас через контактну форму на сайті або вказаний контактний канал.
        </p>
      </section>
    </main>
    <Footer />
    </>
  );
}