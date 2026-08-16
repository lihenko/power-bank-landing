import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { FeaturesConfig } from "@/app/lib/product-config";

function getLucideIcon(
  iconName?: string
): LucideIcon {
  if (!iconName) {
    return Icons.CircleCheck;
  }

  const icon =
    (Icons as unknown as Record<string, unknown>)[iconName];

  if (
    typeof icon === "object" &&
    icon !== null &&
    "$$typeof" in icon
  ) {
    return icon as LucideIcon;
  }

  return Icons.CircleCheck;
}

export default function Features({
  eyebrow,
  title,
  description,
  items,
}: FeaturesConfig) {
  return (
    <section
      id="features"
      className="bg-slate-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-4">

        <div className="max-w-3xl">

          {eyebrow && (
            <p className="mb-3 text-sm text-slate-500">
              {eyebrow}
            </p>
          )}

          <h2 className="mt-6 text-4xl font-black text-slate-900">
            {title}
          </h2>

          {description && (
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {description}
            </p>
          )}

        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">

          {items.map(
            ({
              icon,
              title,
              text,
              large,
            }) => {

              const Icon =
                getLucideIcon(icon);

              return (
                <div
                  key={title}
                  className={`
                    group
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-8
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-green-300
                    hover:shadow-xl
                    ${
                      large
                        ? "min-h-[260px]"
                        : "min-h-[200px]"
                    }
                  `}
                >

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-green-50
                      text-green-600
                      transition
                      group-hover:bg-green-100
                    "
                  >
                    <Icon size={28} />
                  </div>

                  <h3
                    className="
                      mt-8
                      text-2xl
                      font-bold
                      text-slate-900
                    "
                  >
                    {title}
                  </h3>

                  <p
                    className="
                      mt-4
                      leading-7
                      text-slate-600
                    "
                  >
                    {text}
                  </p>

                </div>
              );
            }
          )}

        </div>

      </div>
    </section>
  );
}