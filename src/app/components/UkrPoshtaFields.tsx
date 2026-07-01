"use client";

import { Control, Controller } from "react-hook-form";

import { OrderFormData } from "@/app/lib/order-schema";
import { Input } from "@/components/ui/input";

interface Props {
  control: Control<OrderFormData>;
}

export default function UkrPoshtaFields({ control }: Props) {
  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name="ukrCity"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <label className="font-medium">Місто</label>
            <Input
              {...field}
              value={field.value ?? ""}
              placeholder="Наприклад: Київ"
            />
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="ukrBranch"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <label className="font-medium">Індекс відділення</label>
            <Input
              {...field}
              value={field.value ?? ""}
              inputMode="numeric"
              placeholder="Наприклад: 10001"
            />
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}