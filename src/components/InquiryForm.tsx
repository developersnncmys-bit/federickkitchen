"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, LoaderCircle, TriangleAlert } from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/Field";

export default function InquiryForm({
  subject,
  heading = "Send an enquiry",
  blurb,
  placeholder = "Tell us what you have in mind — dates, group size, anything the kitchen should know.",
}: {
  subject: string;
  heading?: string;
  blurb?: string;
  placeholder?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  return (
    <div className="rounded-2xl border border-cream/10 bg-ink-soft p-7 md:p-10">
      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
              <Check size={22} className="text-gold" />
            </span>
            <h3 className="mt-6 font-display text-3xl text-cream">
              Enquiry received.
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-dim">
              We&rsquo;ll come back to you within 24 hours — usually much sooner.
              If it&rsquo;s urgent, call the house directly.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            <div>
              <h3 className="font-display text-3xl text-cream">{heading}</h3>
              {blurb && (
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {blurb}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" htmlFor="name">
                <Input id="name" name="name" required autoComplete="name" />
              </Field>
              <Field label="Phone" htmlFor="phone">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91"
                />
              </Field>
            </div>

            <Field label="Email" htmlFor="email">
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </Field>

            <Field label="Message" htmlFor="message">
              <Textarea id="message" name="message" rows={4} required placeholder={placeholder} />
            </Field>

            {state === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <TriangleAlert size={15} /> {error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "sending"}
              className="group relative w-full overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-medium text-ink disabled:opacity-60"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {state === "sending" && (
                  <LoaderCircle size={15} className="animate-spin" />
                )}
                {state === "sending" ? "Sending…" : "Send enquiry"}
              </span>
              <span className="absolute inset-0 bg-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
