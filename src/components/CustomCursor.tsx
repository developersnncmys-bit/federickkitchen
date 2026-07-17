"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A creative-agency style cursor: a small dot that tracks the pointer exactly,
 * and a ring that lags behind on a spring and swells over interactive elements.
 * Uses mix-blend so it reads against any background. Disabled on touch devices
 * and when the visitor asks for reduced motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || still) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      setHovering(
        !!t?.closest?.("a, button, [data-cursor], input, textarea, select, label"),
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden mix-blend-difference lg:block">
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center"
      >
        <motion.span
          animate={{ scale: hovering ? 1.9 : 1, opacity: hovering ? 0.5 : 1 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="h-10 w-10 rounded-full border border-white"
        />
      </motion.div>
      <motion.div
        style={{ x, y }}
        className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-white"
      />
    </div>
  );
}
