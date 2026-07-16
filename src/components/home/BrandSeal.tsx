"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealWords } from "@/components/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Closing brand moment. Three layers move at different rates against the scroll
 * so the seal reads as floating in depth: a soft glow drifts up slowly, an
 * oversized watermark of the emblem sinks behind it, and the crisp seal rises
 * fastest while bobbing gently on its own.
 */
export default function BrandSeal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const watermarkScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const sealY = useTransform(scrollYProgress, [0, 1], ["22%", "-22%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["40%", "-24%"]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden border-y border-cream/10 bg-ink"
    >
      {/* Back layer — a wide gold glow drifting up through the band */}
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[90vh] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[130px]"
      />

      {/* Mid layer — an oversized watermark of the seal, sinking behind */}
      <motion.div
        style={{ y: watermarkY, scale: watermarkScale }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.png"
          alt=""
          aria-hidden="true"
          className="h-auto w-[135vw] max-w-none opacity-[0.05] blur-[2px] md:w-[80vw]"
        />
      </motion.div>

      {/* Front layer — copy and the crisp, bobbing seal */}
      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="eyebrow text-gold/70"
        >
          Est. on the estate · Chikmagaluru
        </motion.p>

        {/* scroll parallax → entrance reveal → continuous bob, one concern each */}
        <motion.div style={{ y: sealY }} className="my-9 md:my-11">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Frederick's Kitchen"
                className="h-auto w-56 drop-shadow-[0_25px_60px_rgba(200,164,92,0.25)] md:w-72"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.01em] text-cream">
          <RevealWords text="Grown, cooked, and poured under one roof." />
        </h2>

        <motion.div
          style={{ y: copyY }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/book?type=room"
            className="group relative overflow-hidden rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink"
          >
            <span className="relative z-10">Book a Room</span>
            <span className="absolute inset-0 bg-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          <Link
            href="/dining"
            className="rounded-full border border-cream/25 px-7 py-3.5 text-sm text-cream transition-colors hover:border-gold/50 hover:text-gold"
          >
            See the Kitchen
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
