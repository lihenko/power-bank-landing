import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Олена К.",
    city: "Дніпро",
    rating: 5,
    date: "2 тижні тому",
    text: "Купувала в подорож, дуже виручив. Заряджає телефон повністю разів 3-4, не важкий, влазить в сумку без проблем.",
  },
  {
    name: "Максим Т.",
    city: "Кам'янське",
    rating: 4,
    date: "3 тижні тому",
    text: "Загалом задоволений. Заряджає швидко, але хотілось би трохи менший розмір. За ціну — норм.",
  },
  {
    name: "Ірина В.",
    city: "Кривий Ріг",
    rating: 5,
    date: "1 місяць тому",
    text: "Замовляла на подарунок чоловіку, каже дуже зручний, тримає заряд довго. Доставка швидка, оплата при отриманні як обіцяли.",
  },
  {
    name: "Богдан С.",
    city: "Запоріжжя",
    rating: 5,
    date: "1 місяць тому",
    text: "Все ок, працює як треба.",
  },
];

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
      {initials}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="space-y-4">
      <div className="container mx-auto px-4">
      <h2 className="text-lg font-medium mb-3">Відгуки покупців</h2>
      <div className="space-y-3">
        {REVIEWS.map((review, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <InitialsAvatar name={review.name} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-800">
                    {review.name} · {review.city}
                  </p>
                  <span className="text-xs text-slate-400">{review.date}</span>
                </div>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-3.5 w-3.5 ${
                        idx < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-slate-600">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}