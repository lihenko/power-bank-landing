"use client";

import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { OrderFormData } from "@/app/lib/order-schema";
import { Input } from "@/components/ui/input";

export default function PersonalInfoSection() {
  const { control, setValue } = useFormContext<OrderFormData>();
  const delivery = useWatch({ control, name: "delivery" });
  const isUkrPoshta = delivery === "ukrposhta";

  useEffect(() => {
    if (!isUkrPoshta) {
      setValue("middleName", "");
    }
  }, [isUkrPoshta, setValue]);

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

      {isUkrPoshta && (
        <Controller
          control={control}
          name="middleName"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <label className="font-medium">
                По батькові
                <span className="text-red-500"> *</span>
              </label>
              <Input {...field} value={field.value ?? ""} placeholder="Наприклад: Григорович" />
              {fieldState.error && (
                <p className="text-sm text-red-500">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      )}

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