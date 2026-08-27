export default function DiscountNotice() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xl">
            !
          </div>

          <div>
            <h2 className="text-lg font-bold text-amber-950 sm:text-xl">
              Уцінений товар
            </h2>

            <p className="mt-2 text-sm leading-6 text-amber-900 sm:text-base">
              Цей товар продається за зниженою ціною через наявність
              зовнішнього або іншого дефекту. Будь ласка, уважно перегляньте
              фотографії та опис товару перед оформленням замовлення.
            </p>

            <p className="mt-2 text-sm font-semibold text-amber-950">
              Уцінка вже врахована у вартості товару.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}