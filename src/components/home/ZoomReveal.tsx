"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Signature scroll-zoom: a framed photograph pinned to the viewport that scales
 * from a small card up to full-bleed as you scroll through the tall track,
 * while an intro line fades out and the real headline resolves inside it.
 */
export default function ZoomReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.42, 1.02]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  const introOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.9]);
  const cardOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.45, 0.75], [40, 0]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-ink">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Framed image that grows to fill the screen */}
        <motion.div
          style={{ scale, borderRadius: radius }}
          className="relative aspect-[16/10] w-[92vw] max-w-[1500px] overflow-hidden will-change-transform"
        >
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/restaurant-garden.jpg"
              alt="The estate at Frederick's Kitchen"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

          {/* Headline that resolves once the image has filled the frame */}
          <motion.div
            style={{ opacity: cardOpacity, y: cardY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <span className="eyebrow text-gold-soft">A working estate</span>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(2.25rem,6vw,5.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-white">
              Grown, cooked, and poured
              <br />
              within a kilometre.
            </h2>
            <Link
              href="/about"
              data-cursor
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 text-sm text-white backdrop-blur-sm transition-colors hover:border-white"
            >
              Our story
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Big intro line, sitting over the small card, fading as you scroll in */}
        <motion.h2
          style={{ opacity: introOpacity, scale: introScale }}
          className="pointer-events-none absolute z-10 px-6 text-center font-display text-[clamp(2.5rem,9vw,8rem)] font-light leading-[0.95] tracking-[-0.03em] text-white mix-blend-difference"
        >
          Come up
          <br />
          the hill.
        </motion.h2>
      </div>
    </section>
  );
}
