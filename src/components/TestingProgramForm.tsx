"use client";

import { useState, type FormEvent } from "react";
import { GMAIL_REQUIRED_MESSAGE, isGmailAddress } from "@/lib/early-access";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; message: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

export function TestingProgramForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const sending = status.state === "sending";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    // Checked before sending so a typo does not use up the one-per-minute rate limit.
    const email = String(data.get("email") ?? "");
    if (!isGmailAddress(email)) {
      setStatus({ state: "error", message: GMAIL_REQUIRED_MESSAGE });
      return;
    }

    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), company: data.get("company") }),
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        setStatus({ state: "error", message: body?.error ?? GENERIC_ERROR });
        return;
      }
      form.reset();
      setStatus({ state: "success" });
    } catch {
      setStatus({ state: "error", message: GENERIC_ERROR });
    }
  }

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-3">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          aria-label="Email address"
          placeholder="you@gmail.com"
          disabled={sending}
          className="h-14 min-w-0 sm:flex-[2] rounded-xl border border-neutral-700 bg-transparent px-6 text-base text-white placeholder:text-neutral-500 focus-visible:border-white focus-visible:outline-none disabled:opacity-60"
        />
        {/* Honeypot: hidden from people and assistive tech, filled in by bots. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={sending}
          className="h-14 min-w-0 sm:flex-1 rounded-xl bg-white px-4 text-base font-medium text-neutral-950 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:opacity-60"
        >
          {sending ? "Joining, please wait" : "Join Early Access"}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm mt-3 ${status.state === "error" ? "text-red-400" : "text-neutral-400"}`}
      >
        {status.state === "success" && "You're on the list. We'll be in touch soon."}
        {status.state === "error" && status.message}
      </p>
    </div>
  );
}
