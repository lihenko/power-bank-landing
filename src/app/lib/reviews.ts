import { Review } from "@/app/lib/product-config";

export default function getAverageRating(reviews: Review[]): number {
  if (!reviews.length) return 5;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
}