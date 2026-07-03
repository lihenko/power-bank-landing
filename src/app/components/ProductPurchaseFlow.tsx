"use client";

import { useState } from "react";
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
  const [selectedBundle, setSelectedBundle] = useState<{
    index: number;
    quantity: number;
    totalPrice: number;
  } | null>(null);

  return (
    <>
      {bundles && (
        <BundlesSection
          {...bundles}
          price={price}
          selectedIndex={selectedBundle?.index ?? null}
          onSelect={(index, quantity, totalPrice) =>
            setSelectedBundle({ index, quantity, totalPrice })
          }
        />
      )}

      <OrderPage
        productName={productName}
        price={selectedBundle?.totalPrice ?? price}
        stockCount={stockCount}
        quantity={selectedBundle?.quantity ?? 1}
      />
    </>
  );
}