import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cityRef = req.nextUrl.searchParams.get("cityRef");

  if (!cityRef) {
    return NextResponse.json([]);
  }

  const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: process.env.NOVA_POSHTA_API_KEY,
      modelName: "Address",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: cityRef,
      },
    }),
    cache: "no-store",
  });

  const json = await response.json();

  const warehouses =
    json.data?.map((item: any) => ({
      ref: item.Ref,
      name: item.Description,
    })) ?? [];

  return NextResponse.json(warehouses);
}