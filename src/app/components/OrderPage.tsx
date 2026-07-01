"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { orderSchema, OrderFormData } from "@/app/lib/order-schema";
import { Button } from "@/components/ui/button";

import PersonalInfoSection from "./PersonalInfoSection";
import DeliverySection from "./DeliverySection";

export default function OrderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productName: "Power Bank Lenyes PX163",
      productPrice: process.env.NEXT_PUBLIC_PRICE,
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
    formState: { errors },
  } = methods;

  const onSubmit = async (data: OrderFormData) => {
    console.log("SUBMIT DATA:", data);

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
        <h1 className="text-2xl font-semibold mb-6">Оформлення замовлення</h1>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-8"
        >
          <input type="hidden" {...register("productName")} />

          <input type="hidden" {...register("productPrice")} />

          <section className="space-y-4">
            <h2 className="text-lg font-medium">Контактні дані</h2>
            <PersonalInfoSection control={control} />
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-medium">Доставка</h2>
            <DeliverySection control={control} />
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

          <Button
            type="submit"
            className="mt-8 cursor-pointer flex h-14 w-full items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white transition hover:bg-slate-800 lg:w-fit lg:px-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Відправка..." : "Оформити замовлення"}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}