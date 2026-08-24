"use client";

import { useMemo, useState } from "react";
import BundlesSection from "./BundlesSection";
import OrderPage from "./OrderPage";
import { BundlesConfig } from "@/app/lib/product-config";

interface Props {
  productName: string;
  price: number;
  stockCount?: number;
  bundles?: BundlesConfig;
}

export default function ProductPurchaseFlow({
  productName,
  price,
  stockCount,
  bundles,
}: Props) {
  const [selected, setSelected] = useState<{
    index: number;
    quantity: number;
    discountPercent?: number;
  } | null>(null);

  const totalPrice = useMemo(() => {
    if (!selected) return price;
    return selected.discountPercent
      ? Math.round(selected.quantity * price * (1 - selected.discountPercent / 100))
      : selected.quantity * price;
  }, [selected, price]);

  return (
    <>
      {bundles && (
        <BundlesSection
          {...bundles}
          price={price}
          selectedIndex={selected?.index ?? null}
          onSelect={(index, quantity, discountPercent) =>
            setSelected({ index, quantity, discountPercent })
          }
        />
      )}

      <OrderPage
        productName={productName}
        price={totalPrice}
        stockCount={stockCount}
        quantity={selected?.quantity ?? 1}
      />
    </>
  );
}