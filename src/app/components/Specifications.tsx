interface SpecificationItem {
  name: string;
  value: string;
}

interface SpecificationsProps {
  title: string;
  items: SpecificationItem[];
}

export default function Specifications({
  title,
  items,
}: SpecificationsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          {items.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="grid grid-cols-1 gap-2 border-b border-slate-200 px-5 py-4 last:border-b-0 sm:grid-cols-2 sm:gap-6"
            >
              <div className="font-medium text-slate-500">
                {item.name}
              </div>

              <div className="font-semibold text-slate-900 sm:text-right">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}