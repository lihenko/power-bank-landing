import Link from "next/link";

interface OutOfStockActionsProps {
  categoryHref: string;
}

export default function OutOfStockActions({
  categoryHref,
}: OutOfStockActionsProps) {
  return (
    <section className="mx-auto max-w-xl px-4 py-10 flex flex-col gap-3">
      <button
        type="button"
        disabled
        className="w-full rounded-xl bg-neutral-200 text-neutral-500 font-semibold py-4 cursor-not-allowed"
      >
        Немає в наявності
      </button>

      <Link
        href={categoryHref}
        className="w-full text-center rounded-xl bg-neutral-900 text-white font-semibold py-4"
      >
        Дивитись інші товари категорії
      </Link>
    </section>
  );
}