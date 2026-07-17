"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Pinned full-bleed "walk into the hotel": the photograph fills the screen the
 * moment the section is reached, then keeps zooming in as you scroll — the intro
 * line zooms with it and dissolves, and the real headline resolves inside.
 */
export default function ZoomReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Full-bleed from the start, then zoom deeper into the scene.
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.6]);

  // Intro zooms with the image and dissolves as you push in.
  const introOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.35]);
  const introBlur = useTransform(scrollYProgress, [0, 0.32], ["0px", "12px"]);

  // Inner headline resolves once you're "inside".
  const innerOpacity = useTransform(scrollYProgress, [0.45, 0.8], [0, 1]);
  const innerY = useTransform(scrollYProgress, [0.45, 0.85], [50, 0]);

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Full-bleed image that zooms in */}
        <motion.div style={{ scale: imgScale }} className="absolute inset-0 will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/restaurant-garden.jpg"
            alt="Inside Frederick's Kitchen"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Scrims for legibility + depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5))]" />

        {/* Intro line — zooms with the image, then dissolves */}
        <motion.div
          style={{ opacity: introOpacity, scale: introScale, filter: introBlur }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="eyebrow text-gold-soft">Welcome up</span>
          <h2 className="mt-4 font-display text-[clamp(3rem,10vw,9rem)] font-light leading-[0.9] tracking-[-0.03em] text-white">
            Come up
            <br />
            the hill.
          </h2>
        </motion.div>

        {/* Inner headline — resolves once you're inside */}
        <motion.div
          style={{ opacity: innerOpacity, y: innerY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <span className="eyebrow text-gold-soft">A working estate</span>
          <h2 className="mt-5 max-w-4xl font-display text-[clamp(2rem,5.5vw,4.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-white">
            Grown, cooked, and poured
            <br />
            within a kilometre.
          </h2>
          <Link
            href="/about"
            data-cursor
            className="group mt-9 inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            Our story
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
