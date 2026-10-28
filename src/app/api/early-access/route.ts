import { NextResponse } from "next/server";
import { getClientIp, isJsonRequest, isSameOrigin } from "@/lib/form-security";
import { checkRateLimit } from "@/lib/rate-limit";

// Hidden field that real visitors never fill in. Keep in sync with TestingProgramForm.
const HONEYPOT_FIELD = "company";
const EMAIL_MAX = 254;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Keep in sync with the RATE_LIMITER binding in wrangler.toml.
const RATE_LIMIT = { maxRequests: 1, windowMs: 60_000 };
const NO_STORE = { "Cache-Control": "no-store" };

// Read per call, not at import: runtime secrets are absent while the app builds.
function readTelegramEnv() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables");
  }
  return {
    token,
    chatIds: chatId
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  };
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function sendToTelegram(email: string): Promise<void> {
  const { token, chatIds } = readTelegramEnv();
  const text = [
    "🚀 <b>New Early Access Signup - Kinwoo</b>",
    "",
    `📧 <b>Email:</b> ${escapeHtml(email)}`,
  ].join("\n");

  await Promise.all(
    chatIds.map(async (chatId) => {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        throw new Error(`Telegram API error for chat ${chatId}: ${await response.text()}`);
      }
    }),
  );
}

function cleanEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim();
  return email.length <= EMAIL_MAX && EMAIL.test(email) ? email : null;
}

// Public on purpose: it is the signup form on the landing page.
export async function POST(request: Request) {
  // Cheap checks first so cross-site and junk requests do not use up the rate-limit quota.
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403, headers: NO_STORE });
  }
  if (!isJsonRequest(request)) {
    return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
  }

  const { allowed, retryAfterMs } = await checkRateLimit(
    `early-access:${getClientIp(request)}`,
    RATE_LIMIT,
  );
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      {
        status: 429,
        headers: { ...NO_STORE, "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400, headers: NO_STORE });
  }
  const input = body as Record<string, unknown>;

  // Pretend success so bots do not learn they were filtered.
  const trap = input[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim() !== "") {
    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  }

  const email = cleanEmail(input.email);
  if (!email) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400, headers: NO_STORE },
    );
  }

  try {
    await sendToTelegram(email);
  } catch (error) {
    console.error("Early access signup failed:", error);
    return NextResponse.json(
      { error: "Could not sign you up. Please try again." },
      { status: 503, headers: NO_STORE },
    );
  }
  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
