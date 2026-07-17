"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Star, CalendarDays, Users, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const SLIDES = [
  "/images/restaurant-hall.jpg",
  "/images/restaurant-wide.jpg",
  "/images/lounge-brick.jpg",
  "/images/exterior-tower.jpg",
  "/images/restaurant-garden.jpg",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Backdrop sinks and keeps zooming in as you scroll away — dramatic depth.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Auto-advancing image slideshow behind the copy.
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Full-bleed sliding slideshow: images cross-slide with a slow Ken-Burns
          zoom; the whole layer also zooms in with scroll. */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: "8%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "-8%" }}
            transition={{ duration: 1.5, ease: EASE }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1.18 }}
              animate={{ scale: 1.02 }}
              transition={{ duration: 6.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SLIDES[slide]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
        <div className="absolute inset-0 bg-black/15" />
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Show slide ${i + 1}`}
            className="group flex h-3 items-center"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                slide === i ? "h-8 w-1 bg-gold-soft" : "h-1.5 w-1 bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Centred hero copy */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span className="flex gap-1 text-gold-soft">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="fill-current" />
            ))}
          </span>
          <span className="eyebrow text-white/70">
            {site.location} · 1,120 m
          </span>
        </motion.div>

        <h1 className="mt-7 font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.98] tracking-[-0.02em] text-white">
          {["An estate retreat", "high in the coffee hills"].map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "118%", scale: 1.06 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.14, ease: EASE }}
                className="block origin-bottom"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: EASE }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
        >
          Four rooms, a Malnad kitchen, and the ridge roads riders come back for —
          on a working coffee estate in the Western Ghats.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/book?type=room"
            className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-medium text-white"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              Book Your Stay
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
            <span className="absolute inset-0 bg-gold-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          <Link
            href="/experiences"
            className="rounded-full border border-white/30 px-8 py-4 text-sm text-white backdrop-blur-sm transition-colors hover:border-white/70"
          >
            Explore the Estate
          </Link>
        </motion.div>
      </motion.div>

      {/* Booking bar, overlapping the base of the hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.25, ease: EASE }}
        className="relative z-10 mt-12 w-full max-w-3xl px-6"
      >
        <div className="flex flex-col gap-3 rounded-2xl border border-white/60 bg-paper/90 p-3 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-0">
          <BookingField icon={<CalendarDays size={16} />} label="Check in" value="Add date" />
          <span className="hidden h-10 w-px bg-cream/15 sm:block" />
          <BookingField icon={<CalendarDays size={16} />} label="Check out" value="Add date" />
          <span className="hidden h-10 w-px bg-cream/15 sm:block" />
          <BookingField icon={<Users size={16} />} label="Guests" value="2 adults" />
          <Link
            href="/book?type=room"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-gold-soft"
          >
            Find a room
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </motion.div>

      <ScrollCue />
    </section>
  );
}

function BookingField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-cream/5">
      <span className="text-gold">{icon}</span>
      <span className="text-left">
        <span className="eyebrow block text-[0.6rem] text-cream-dim/70">{label}</span>
        <span className="text-sm text-cream">{value}</span>
      </span>
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
      className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
    >
      <span className="eyebrow text-white/45">Scroll</span>
      <div className="h-12 w-px overflow-hidden bg-white/20">
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full bg-gold-soft"
        />
      </div>
    </motion.div>
  );
}
