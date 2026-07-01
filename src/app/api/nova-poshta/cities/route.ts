import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
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
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: query,
        Limit: 10,
      },
    }),
    cache: "no-store",
  });

  const json = await response.json();

  const cities =
    json.data?.[0]?.Addresses?.map((city: any) => ({
      ref: city.DeliveryCity,
      name: city.Present,
    })) ?? [];

  return NextResponse.json(cities);
}