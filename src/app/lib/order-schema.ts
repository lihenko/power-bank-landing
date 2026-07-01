import { z } from "zod";

const novaOptionSchema = z.object({
  ref: z.string(),
  name: z.string(),
});

export const orderSchema = z
  .object({
    productName: z.string().trim().min(1, "Назва товару обов'язкова"),

    productPrice: z.string().trim().min(1, "Ціна товару обов'язкова"),

    delivery: z.enum(["nova-poshta", "ukrposhta"]),

    lastName: z.string().trim().min(2, "Вкажіть прізвище"),

    firstName: z.string().trim().min(2, "Вкажіть ім'я"),

    middleName: z.string().trim().optional(),

    phone: z
      .string()
      .trim()
      .regex(/^(\+?380|0)\d{9}$/, "Невірний номер телефону"),

    novaCity: novaOptionSchema.optional(),

    novaWarehouse: novaOptionSchema.optional(),

    ukrCity: z.string().trim().optional(),

    ukrBranch: z
      .string()
      .trim()
      .optional()
      .refine((val) => !val || /^\d{5}$/.test(val), {
        message: "Індекс відділення — 5 цифр",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.delivery === "nova-poshta") {
      if (!data.novaCity) {
        ctx.addIssue({
          code: "custom",
          path: ["novaCity"],
          message: "Оберіть місто",
        });
      }

      if (!data.novaWarehouse) {
        ctx.addIssue({
          code: "custom",
          path: ["novaWarehouse"],
          message: "Оберіть відділення",
        });
      }
    }

    if (data.delivery === "ukrposhta") {
      if (!data.middleName?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["middleName"],
          message: "Вкажіть по батькові",
        });
      }

      if (!data.ukrCity?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["ukrCity"],
          message: "Вкажіть місто",
        });
      }

      if (!data.ukrBranch?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["ukrBranch"],
          message: "Вкажіть індекс відділення",
        });
      }
    }
  });

export type OrderFormData = z.infer<typeof orderSchema>;