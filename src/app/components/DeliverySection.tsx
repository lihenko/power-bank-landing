"use client";

import { Control, Controller, useFormContext, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";
import { OrderFormData } from "@/app/lib/order-schema";

import NovaPoshtaSelect from "./NovaPoshtaSelect";
import UkrPoshtaFields from "./UkrPoshtaFields";

interface Props {
  control: Control<OrderFormData>;
}

const carriers = [
  { id: "nova-poshta", label: "Нова Пошта" },
  { id: "ukrposhta", label: "Укрпошта" },
] as const;

export default function DeliverySection({ control }: Props) {
  const { setValue } = useFormContext<OrderFormData>();
  const delivery = useWatch({ control, name: "delivery" });

  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name="delivery"
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
            {carriers.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  field.onChange(c.id);

                  // чистимо поля іншого перевізника, щоб не летіли в submit і не валідувались
                  if (c.id === "nova-poshta") {
                    setValue("ukrCity", undefined);
                    setValue("ukrBranch", undefined);
                  } else {
                    setValue("novaCity", undefined);
                    setValue("novaWarehouse", undefined);
                  }
                }}
                className={cn(
                  "rounded-md py-2 text-sm font-medium transition-colors",
                  field.value === c.id
                    ? "bg-white shadow text-black"
                    : "text-muted-foreground hover:text-black"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      />

      {delivery === "nova-poshta" && <NovaPoshtaSelect control={control} />}
      {delivery === "ukrposhta" && <UkrPoshtaFields control={control} />}
    </div>
  );
}