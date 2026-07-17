"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/motion";

const items = [
  { label: "Dining", sub: "Malnad kitchen", img: "/images/restaurant-tree.jpg", href: "/dining" },
  { label: "Rooms", sub: "Four premium rooms", img: "/images/room-executive.jpg", href: "/rooms" },
  { label: "Experiences", sub: "Ridge & estate", img: "/images/restaurant-garden.jpg", href: "/experiences" },
  { label: "Gallery", sub: "The whole house", img: "/images/lounge-brick.jpg", href: "/gallery" },
  { label: "The Estate", sub: "Our story", img: "/images/exterior-tower.jpg", href: "/about" },
];

export default function HoverReveal() {
  const [active, setActive] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.5 });

  return (
    <section
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      className="relative mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24"
    >
      <Reveal>
        <span className="eyebrow text-gold/80">Explore</span>
      </Reveal>
      <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.04] tracking-[-0.01em] text-cream">
        <RevealWords text="Move across to step into each part of the house." />
      </h2>

      <ul className="mt-10 border-t border-cream/10">
        {items.map((it, i) => (
          <li
            key={it.label}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <Link
              href={it.href}
              data-cursor
              className="group flex items-center justify-between gap-6 border-b border-cream/10 py-7 md:py-9"
            >
              <div className="flex items-baseline gap-5">
                <span
                  className={`font-display text-sm transition-colors duration-300 ${
                    active === i ? "text-gold" : "text-cream-dim/40"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-none transition-all duration-500 ${
                    active === i
                      ? "translate-x-3 text-cream"
                      : "text-cream-dim/55"
                  }`}
                >
                  {it.label}
                </span>
              </div>

              <div className="flex items-center gap-6">
                <span className="eyebrow hidden text-cream-dim/60 sm:block">{it.sub}</span>
                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    active === i
                      ? "border-gold bg-gold text-white"
                      : "border-cream/20 text-cream-dim"
                  }`}
                >
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Preview image that follows the cursor */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
      >
        <AnimatePresence mode="popLayout">
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 4 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-[320px] w-[250px] overflow-hidden rounded-2xl border border-white/15 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={items[active].img}
                alt={items[active].label}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
