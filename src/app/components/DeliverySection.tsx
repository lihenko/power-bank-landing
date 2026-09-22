"use client";

import { useEffect } from "react";
import {
  Control,
  Controller,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { OrderFormData } from "@/app/lib/order-schema";

import NovaPoshtaSelect from "./NovaPoshtaSelect";
import UkrPoshtaFields from "./UkrPoshtaFields";

interface Props {
  control: Control<OrderFormData>;
  categoryId?: number;
}

const carriers = [
  { id: "nova-poshta", label: "Нова Пошта" },
  { id: "ukrposhta", label: "Укрпошта" },
] as const;

const NO_UKRPOSHTA_CATEGORIES = [61, 62, 63, 64, 65, 66, 67, 68, 69];

export default function DeliverySection({
  control,
  categoryId,
}: Props) {
  const { setValue } = useFormContext<OrderFormData>();

  const delivery = useWatch({
    control,
    name: "delivery",
  });

  const isUkrPoshtaDisabled =
    categoryId !== undefined &&
    NO_UKRPOSHTA_CATEGORIES.includes(categoryId);

  const availableCarriers = carriers.filter(
    (carrier) =>
      !(carrier.id === "ukrposhta" && isUkrPoshtaDisabled)
  );

  // Якщо категорія не дозволяє Укрпошту,
  // автоматично перемикаємо доставку на Нову Пошту.
  useEffect(() => {
    if (isUkrPoshtaDisabled && delivery === "ukrposhta") {
      setValue("delivery", "nova-poshta");

      setValue("ukrCity", undefined);
      setValue("ukrBranch", undefined);
    }
  }, [
    isUkrPoshtaDisabled,
    delivery,
    setValue,
  ]);

  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name="delivery"
        render={({ field }) => (
          <div
            className={cn(
              "grid gap-2 rounded-lg bg-muted p-1",
              availableCarriers.length === 1
                ? "grid-cols-1"
                : "grid-cols-2"
            )}
          >
            {availableCarriers.map((carrier) => (
              <button
                key={carrier.id}
                type="button"
                onClick={() => {
                  field.onChange(carrier.id);

                  // Нова Пошта
                  if (carrier.id === "nova-poshta") {
                    setValue("ukrCity", undefined);
                    setValue("ukrBranch", undefined);
                  }

                  // Укрпошта
                  if (carrier.id === "ukrposhta") {
                    setValue("novaCity", undefined);
                    setValue("novaWarehouse", undefined);
                  }
                }}
                className={cn(
                  "rounded-md py-2 text-sm font-medium transition-colors",
                  field.value === carrier.id
                    ? "bg-white shadow text-black"
                    : "text-muted-foreground hover:text-black"
                )}
              >
                {carrier.label}
              </button>
            ))}
          </div>
        )}
      />

      {delivery === "nova-poshta" && (
        <NovaPoshtaSelect control={control} />
      )}

      {delivery === "ukrposhta" && !isUkrPoshtaDisabled && (
        <UkrPoshtaFields control={control} />
      )}
    </div>
  );
}