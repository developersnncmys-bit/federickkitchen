"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import { Field, Input } from "@/components/ui/Field";

export default function LoginGate() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");

    const password = new FormData(e.currentTarget).get("password");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't sign in.");
        setState("idle");
        return;
      }
      // The page is a Server Component — refresh so it re-reads the cookie.
      router.refresh();
    } catch {
      setError("Couldn't reach the server.");
      setState("idle");
    }
  }

  return (
    <div className="flex min-h-[100svh] items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl border border-cream/10 bg-ink-soft p-8 md:p-10">
          <span className="eyebrow text-gold/70">Frederick&rsquo;s Kitchen</span>
          <h1 className="mt-4 font-display text-3xl text-cream">The house panel</h1>
          <p className="mt-3 text-sm leading-relaxed text-cream-dim">
            Bookings, reservations, and enquiries. Staff only.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <Field label="Password" htmlFor="password">
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
              />
            </Field>

            {error && (
              <p className="flex items-start gap-2 text-sm text-red-400">
                <TriangleAlert size={15} className="mt-0.5 shrink-0" /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "sending"}
              className="w-full rounded-full bg-gold px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-soft disabled:opacity-60"
            >
              <span className="inline-flex items-center gap-2">
                {state === "sending" && <LoaderCircle size={15} className="animate-spin" />}
                {state === "sending" ? "Signing in…" : "Sign in"}
              </span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
