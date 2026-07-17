"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { Star } from "lucide-react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const phrases = [
  "Coffee-estate table",
  "Ridge routes, mapped",
  "Four premium rooms",
  "A Malnad kitchen",
  "Plantation walks",
];

/**
 * Kinetic banner: the words scroll continuously, and your own scrolling speeds
 * them up and flips their direction — a bit of playful motion between sections.
 */
export default function MarqueeBanner() {
  const baseVelocity = -2.4;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velFactor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    const vf = velFactor.get();
    if (vf < 0) dir.current = -1;
    else if (vf > 0) dir.current = 1;
    moveBy += dir.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="grain relative overflow-hidden border-y border-cream/10 bg-ink-soft py-8 md:py-12">
      <motion.div className="flex whitespace-nowrap will-change-transform" style={{ x }}>
        {Array.from({ length: 4 }).map((_, copy) => (
          <span key={copy} className="flex items-center">
            {phrases.map((p) => (
              <span key={p} className="flex items-center">
                <span className="px-6 font-display text-[clamp(1.75rem,4vw,3.5rem)] font-light tracking-tight text-cream md:px-9">
                  {p}
                </span>
                <Star size={16} className="shrink-0 fill-gold text-gold" />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
