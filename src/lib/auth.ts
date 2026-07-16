import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";

/**
 * Single shared password for the house, carried in a signed HttpOnly cookie.
 * The admin panel manages a handful of bookings for one property — full user
 * accounts would be scaffolding nobody asked for. The signature is what stops a
 * guest from simply setting the cookie themselves.
 */

export const SESSION_COOKIE = "frk_session";
const MAX_AGE = 60 * 60 * 12; // 12 hours

function secret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s) {
    // A generated fallback keeps `npm run dev` working before .env exists;
    // it rotates per boot, so sessions simply don't survive a restart.
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_SECRET must be set in production.");
    }
    return devSecret;
  }
  return s;
}
const devSecret = randomBytes(32).toString("hex");

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  // timingSafeEqual throws on length mismatch, so gate on it first.
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

/** Token is `expiry.signature` — no session store needed. */
function issue(): string {
  const expiry = String(Date.now() + MAX_AGE * 1000);
  return `${expiry}.${sign(expiry)}`;
}

function verify(token: string | undefined): boolean {
  if (!token) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;
  if (!safeEqual(signature, sign(expiry))) return false;
  return Number(expiry) > Date.now();
}

export function passwordMatches(candidate: string): boolean {
  const actual = process.env.ADMIN_PASSWORD;
  if (!actual) return false;
  return safeEqual(candidate, actual);
}

/** Route Handlers and Server Actions only — Server Components can't set cookies. */
export async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, issue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verify(store.get(SESSION_COOKIE)?.value);
}
