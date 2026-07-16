"use client";

import { motion } from "framer-motion";

const words = [
  "Estate-grown Arabica",
  "Malnad kitchen",
  "Ridge routes mapped",
  "Covered secure parking",
  "Plantation walks",
  "Valley-facing rooms",
];

export default function Marquee() {
  const track = [...words, ...words];

  return (
    <div className="relative overflow-hidden border-y border-cream/10 bg-ink-soft py-5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-10 whitespace-nowrap"
      >
        {track.map((word, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="eyebrow text-cream-dim/70">{word}</span>
            <span className="h-1 w-1 rounded-full bg-gold/50" />
          </span>
        ))}
      </motion.div>

      {/* Feather the ends so the loop never shows a hard cut */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-soft to-transparent" />
    </div>
  );
}
