interface ProductParam {
  name: string;
  value: string | null;
  unit?: string | null;
}

interface ProductParamsProps {
  params: ProductParam[];
  title?: string;
}

export default function ProductParams({
  params,
  title = "Характеристики",
}: ProductParamsProps) {
  if (!params || params.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>

      <dl className="divide-y divide-slate-200 rounded-xl border border-slate-200 overflow-hidden">
        {params.map((param) => (
          <div
            key={param.name}
            className="flex items-center justify-between gap-4 px-4 py-3 odd:bg-slate-50"
          >
            <dt className="text-sm text-slate-500">{param.name}</dt>
            <dd className="text-sm font-medium text-slate-900 text-right">
              {param.value}
              {param.unit ? ` ${param.unit}` : ""}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}