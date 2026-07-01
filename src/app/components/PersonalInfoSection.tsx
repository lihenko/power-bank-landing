"use client";

import { Control, Controller, useWatch } from "react-hook-form";

import { OrderFormData } from "@/app/lib/order-schema";
import { Input } from "@/components/ui/input";

interface Props {
  control: Control<OrderFormData>;
}

export default function PersonalInfoSection({ control }: Props) {
  const delivery = useWatch({ control, name: "delivery" });
  const isUkrPoshta = delivery === "ukrposhta";

  return (
    <div className="space-y-4">
      <Controller
        control={control}
        name="lastName"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <label className="font-medium">Прізвище</label>
            <Input {...field} placeholder="Наприклад: Шевченко" />
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="firstName"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <label className="font-medium">Ім&apos;я</label>
            <Input {...field} placeholder="Наприклад: Тарас" />
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="middleName"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <label className="font-medium">
              По батькові
              {isUkrPoshta && <span className="text-red-500"> *</span>}
              {!isUkrPoshta && (
                <span className="text-muted-foreground font-normal"> (необов&apos;язково)</span>
              )}
            </label>
            <Input {...field} value={field.value ?? ""} placeholder="Наприклад: Григорович" />
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <label className="font-medium">Телефон</label>
            <Input {...field} placeholder="Наприклад: 0991234567" />
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}