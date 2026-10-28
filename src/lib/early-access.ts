// Shared by the signup form (client) and the API route (server).
export const GMAIL_REQUIRED_MESSAGE =
  "Early Access testing needs a Gmail address. Please enter your @gmail.com email (the one you use on the Play Store).";

export function isGmailAddress(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return normalized.endsWith("@gmail.com") || normalized.endsWith("@googlemail.com");
}
