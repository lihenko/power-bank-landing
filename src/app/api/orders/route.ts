import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

import { orderSchema } from "@/app/lib/order-schema";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Невірні дані форми", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const deliveryText =
    data.delivery === "nova-poshta"
      ? `Нова Пошта: ${data.novaCity?.name ?? "-"}, відділення ${data.novaWarehouse?.name ?? "-"}`
      : `Укрпошта: ${data.ukrCity ?? "-"}, індекс ${data.ukrBranch ?? "-"}`;

  const fullName = [data.lastName, data.firstName, data.middleName]
    .filter(Boolean)
    .join(" ");

  // Відправляємо в Telegram і Google Sheets НЕЗАЛЕЖНО одне від одного.
  // Якщо один впаде — інший все одно спрацює, і замовлення не загубиться.
  const [telegramResult, sheetResult] = await Promise.allSettled([
    sendToTelegram(
      fullName,
      data.phone,
      deliveryText,
      data.productName,
      data.productPrice,
      data.quantity
    ),
    appendToSheet(data, fullName, deliveryText),
  ]);

  if (telegramResult.status === "rejected") {
    console.error("Telegram failed:", telegramResult.reason);
  }

  if (sheetResult.status === "rejected") {
    console.error("Google Sheets failed:", sheetResult.reason);
  }

  // Замовлення вважаємо успішним, якщо хоча б Telegram спрацював —
  // це основний канал, таблиця другорядна і не повинна блокувати юзера.
  if (telegramResult.status === "rejected") {
    return NextResponse.json(
      { error: "Не вдалося надіслати замовлення" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    sheetSynced: sheetResult.status === "fulfilled",
  });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function normalizePhone(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");

  if (digits.length === 10 && digits.startsWith("0")) {
    return `+38${digits}`;
  }

  if (digits.startsWith("380")) return `+${digits}`;

  return digits.startsWith("+") ? raw : `+${digits}`;
}

async function sendToTelegram(
  fullName: string,
  phone: string,
  deliveryText: string,
  productName: string,
  productPrice: string,
  quantity: number
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram env vars are not set");
  }

  const phoneHref = normalizePhone(phone);

  const text = [
    "🛒 Нове замовлення",
    "",
    `📦 ${escapeHtml(productName)}`,
    `🔢 Кількість: ${quantity} шт`,
    `💰 ${escapeHtml(productPrice)} грн`,
    `👤 ${escapeHtml(fullName)}`,
    `📞 <a href="tel:${phoneHref}">${escapeHtml(phone)}</a>`,
    `🚚 ${escapeHtml(deliveryText)}`,
  ].join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Telegram error: ${errText}`);
  }
}

async function appendToSheet(
  data: ReturnType<typeof orderSchema.parse>,
  fullName: string,
  deliveryText: string
) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!sheetId || !clientEmail || !privateKey) {
    throw new Error("Google Sheets env vars are not set");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Sheet1!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" }),
          data.productName,
          data.quantity,
          data.productPrice,
          fullName,
          data.phone,
          data.delivery === "nova-poshta" ? "Нова Пошта" : "Укрпошта",
          deliveryText,
        ],
      ],
    },
  });
}