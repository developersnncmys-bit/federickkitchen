"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The scene sinks and dims as you leave it; the copy leaves faster than the
  // backdrop, which is what sells the depth.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Backdrop: real photograph, drifting and slowly zooming as you scroll */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="grain absolute inset-0 bg-ink"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/restaurant-hall.jpg"
          alt="Frederick's Kitchen — the garden dining hall"
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        {/* Legibility scrim: dark at the edges and bottom, clear-ish in the middle */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
        <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[120px]" />
      </motion.div>

      {/* Copy — pt clears the fixed nav so the eyebrow never rides under it
          on short (laptop-height) viewports. */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 pt-28 md:px-10 md:pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="eyebrow text-gold"
        >
          {site.location} · 1,120 m
        </motion.p>

        <h1 className="mt-7 max-w-5xl font-display text-[clamp(2.75rem,8.5vw,7.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-cream">
          {["Coffee grown", "on the slope", "below your table."].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.12, ease: EASE }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-cream-dim md:text-lg"
        >
          A working estate high in the Western Ghats — four rooms, a Malnad
          kitchen, and the ridge roads riders come back for.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease: EASE }}
          className="mt-11 flex flex-wrap gap-3"
        >
          <Cta href="/experiences" primary>
            Explore the Experience
          </Cta>
          <Cta href="/book?type=room">Book a Room</Cta>
          <Cta href="/book?type=table">Book a Table</Cta>
        </motion.div>
      </motion.div>

      <ScrollCue />
    </section>
  );
}

function Cta({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        primary
          ? "group relative overflow-hidden rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink"
          : "group relative overflow-hidden rounded-full border border-cream/25 px-7 py-3.5 text-sm text-cream transition-colors hover:text-ink"
      }
    >
      <span className="relative z-10">{children}</span>
      {primary ? (
        <span className="absolute inset-0 bg-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      ) : (
        <span className="absolute inset-0 -translate-y-full bg-cream transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      )}
    </Link>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
      className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
    >
      <span className="eyebrow text-cream/35">Scroll</span>
      <div className="h-14 w-px overflow-hidden bg-cream/15">
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full bg-gold"
        />
      </div>
    </motion.div>
  );
}
