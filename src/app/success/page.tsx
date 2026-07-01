import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  return (
    <div className="mx-auto max-w-lg py-20 text-center space-y-6">
      <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />

      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Дякуємо за замовлення!</h1>
        <p className="text-muted-foreground">
          Ми зв&apos;яжемося з вами найближчим часом для підтвердження деталей.
        </p>
      </div>

      <Button render={<Link href="/">На головну</Link>} />
    </div>
  );
}