"use client";

import { motion } from "framer-motion";

/**
 * Decorative motion-graphics layer: morphing blobs, a rotating dashed ring,
 * drawing line-art, and floating sparkles. Purely ambient and non-interactive.
 * Render with `fixed` for a site-wide layer, or drop inside any `relative`
 * container as a section accent.
 */
export default function MotionShapes({
  fixed = false,
  tone = "gold",
}: {
  fixed?: boolean;
  tone?: "gold" | "moss";
}) {
  const accent = tone === "moss" ? "text-moss" : "text-gold";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${
        fixed ? "fixed inset-0 z-30" : "absolute inset-0"
      }`}
    >
      {/* Morphing blob — top left */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 70, 0],
          borderRadius: [
            "42% 58% 60% 40%",
            "60% 40% 42% 58%",
            "42% 58% 60% 40%",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-16 top-[8%] h-56 w-56 bg-gold/[0.09] blur-2xl md:h-72 md:w-72"
      />
      {/* Morphing blob — bottom right */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 bottom-[10%] h-64 w-64 rounded-full bg-moss/[0.08] blur-3xl"
      />

      {/* Rotating dashed ring — top right */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
        viewBox="0 0 100 100"
        fill="none"
        className={`absolute right-[6%] top-[16%] h-28 w-28 ${accent} opacity-25 md:h-40 md:w-40`}
      >
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 7" />
        <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.4" />
      </motion.svg>

      {/* Counter-rotating small ring — left mid */}
      <motion.svg
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        viewBox="0 0 100 100"
        fill="none"
        className="absolute left-[7%] top-[52%] hidden h-20 w-20 text-gold opacity-20 lg:block"
      >
        <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
      </motion.svg>

      {/* Drawing wavy line — bottom left */}
      <motion.svg
        viewBox="0 0 240 60"
        fill="none"
        className={`absolute bottom-[14%] left-[8%] hidden h-16 w-64 ${accent} opacity-30 md:block`}
      >
        <motion.path
          d="M2 40 C 50 4, 92 56, 140 24 S 208 26, 238 34"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Floating sparkles / dots */}
      <Sparkle className="left-[24%] top-[28%]" d={6} />
      <Sparkle className="right-[28%] top-[62%]" d={7.5} moss />
      <Sparkle className="left-[46%] bottom-[16%]" d={5.5} />
      <motion.span
        animate={{ y: [0, -16, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute right-[16%] top-[34%] text-xl ${accent} opacity-40`}
      >
        ✦
      </motion.span>
    </div>
  );
}

function Sparkle({ className, d, moss }: { className: string; d: number; moss?: boolean }) {
  return (
    <motion.span
      animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: d, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute h-1.5 w-1.5 rounded-full ${moss ? "bg-moss/50" : "bg-gold/50"} ${className}`}
    />
  );
}
