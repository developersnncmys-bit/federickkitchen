"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { site } from "@/lib/site";

export default function Confirmation({
  reference,
  lines,
  onReset,
}: {
  reference: string;
  lines: { label: string; value: string }[];
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-2xl"
    >
      <div className="grain relative overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-[#2a2114] via-[#191510] to-[#0e0d0b] p-8 text-center md:p-14">
        <div className="absolute -top-20 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-[70px]" />

        <div className="relative">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10"
          >
            <Check size={26} className="text-gold" />
          </motion.span>

          <h2 className="mt-7 font-display text-[clamp(2rem,4vw,3rem)] font-light leading-tight text-cream">
            We have your booking.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream-dim">
            It&rsquo;s <span className="text-gold">pending confirmation</span> — the
            house will call or email to confirm, normally within 24 hours. A copy is
            already in your inbox. Nothing to pay now.
          </p>

          <div className="mt-9 rounded-xl border border-cream/10 bg-ink/50 p-6 text-left">
            <div className="flex items-baseline justify-between border-b border-cream/10 pb-4">
              <span className="eyebrow text-cream-dim/50">Reference</span>
              <span className="font-display text-2xl tracking-wider text-gold">
                {reference}
              </span>
            </div>
            <dl className="mt-4 space-y-3">
              {lines.map((l) => (
                <div key={l.label} className="flex items-baseline justify-between gap-6">
                  <dt className="eyebrow text-cream-dim/50">{l.label}</dt>
                  <dd className="text-right text-sm text-cream">{l.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-soft"
            >
              Back to the estate
            </Link>
            <button
              onClick={onReset}
              className="rounded-full border border-cream/25 px-7 py-3.5 text-sm text-cream transition-colors hover:border-gold/50 hover:text-gold"
            >
              Make another booking
            </button>
          </div>

          <p className="mt-8 text-xs text-cream-dim/50">
            Need to change something? Call{" "}
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="text-gold/80 underline-offset-4 hover:underline"
            >
              {site.phone}
            </a>{" "}
            and quote your reference.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
