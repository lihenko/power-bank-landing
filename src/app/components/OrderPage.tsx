"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Truck, PackageCheck } from "lucide-react";

import { orderSchema, OrderFormData } from "@/app/lib/order-schema";
import { Button } from "@/components/ui/button";

import PersonalInfoSection from "./PersonalInfoSection";
import DeliverySection from "./DeliverySection";

interface Props {
  productName: string;
  price: number;
  stockCount?: number;
  quantity?: number;
}

export default function OrderPage({
  productName,
  price,
  stockCount,
  quantity = 1,
}: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productName,
      productPrice: String(price),
      quantity,
      delivery: "nova-poshta",
      lastName: "",
      firstName: "",
      middleName: "",
      phone: "",
      novaCity: undefined,
      novaWarehouse: undefined,
      ukrCity: "",
      ukrBranch: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = methods;

  // синхронізує форму, якщо price/quantity змінюються після монтування
  // (наприклад людина обрала інший бандл)
  useEffect(() => {
    setValue("productPrice", String(price));
    setValue("quantity", quantity);
  }, [price, quantity, setValue]);

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Помилка відправки замовлення");
      }
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead')
      }
      router.push("/success");
    } catch (error) {
      console.error(error);
      alert("Не вдалося оформити замовлення. Спробуйте ще раз.");
      setIsSubmitting(false);
    }
  };

  const onError = (formErrors: typeof errors) => {
    console.log("VALIDATION ERRORS:", formErrors);
  };

  return (
    <FormProvider {...methods}>
      <div id="order" className="mx-auto max-w-lg py-10 px-6">
        <h2 className="text-2xl font-semibold mb-6">Оформлення замовлення</h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          <input type="hidden" {...register("productName")} />
          <input type="hidden" {...register("productPrice")} />
          <input type="hidden" {...register("quantity")} />

          <section className="space-y-4">
            <h3 className="text-lg font-medium">Доставка</h3>
            <DeliverySection control={control} />
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium">Контактні дані</h3>
            <PersonalInfoSection />
          </section>

          {Object.keys(errors).length > 0 && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-600">
              <p className="font-medium mb-1">Перевірте заповнення полів:</p>
              <ul className="list-disc pl-5">
                {Object.entries(errors).map(([field, err]) => (
                  <li key={field}>
                    {field}: {err?.message?.toString()}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 space-y-3">
            {quantity > 1 && (
              <p className="text-center text-sm text-slate-500">
                Обрано: {quantity} шт · До сплати: {price}₴
              </p>
            )}

            {typeof stockCount === "number" && (
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-orange-600">
                <PackageCheck className="h-4 w-4" />
                <span>Залишилось на складі: {stockCount} шт</span>
              </div>
            )}

            <Button
              type="submit"
              className="cursor-pointer mx-auto flex h-14 w-full items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white transition hover:bg-slate-800 lg:w-fit lg:px-10"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Відправка..." : "Оформити замовлення"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
              <Truck className="h-4 w-4 text-green-600" />
              <span>Оплата при отриманні — нічого платити зараз не потрібно</span>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}