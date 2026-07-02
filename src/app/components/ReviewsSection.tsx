import { Star } from "lucide-react";
import { Review } from "@/app/lib/product-config";

interface Props {
  title?: string;
  reviews: Review[];
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("");
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
      {initials}
    </div>
  );
}

export default function ReviewsSection({ title = "Відгуки покупців", reviews }: Props) {
  return (
    <section className="space-y-4">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-medium mb-3">{title}</h2>
        <div className="space-y-3">
          {reviews.map((review, i) => (
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