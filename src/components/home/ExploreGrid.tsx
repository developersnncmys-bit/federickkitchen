"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const items = [
  {
    label: "Dining",
    sub: "Malnad kitchen",
    img: "/images/restaurant-tree.jpg",
    href: "/dining",
    span: "sm:col-span-2 lg:row-span-2",
    big: true,
  },
  {
    label: "Rooms",
    sub: "Four premium rooms",
    img: "/images/room-executive.jpg",
    href: "/rooms",
    span: "",
  },
  {
    label: "Experiences",
    sub: "Ridge & estate",
    img: "/images/restaurant-garden.jpg",
    href: "/experiences",
    span: "",
  },
  {
    label: "Gallery",
    sub: "The whole house",
    img: "/images/lounge-brick.jpg",
    href: "/gallery",
    span: "",
  },
  {
    label: "The Estate",
    sub: "Our story",
    img: "/images/exterior-tower.jpg",
    href: "/about",
    span: "sm:col-span-2",
  },
];

export default function ExploreGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <span className="eyebrow text-gold/80">Explore</span>
          </Reveal>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.04] tracking-[-0.01em] text-cream">
            <RevealWords text="Step into every part of the house." />
          </h2>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="mt-10 grid auto-rows-[210px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[240px] lg:grid-cols-3"
      >
        {items.map((it) => (
          <motion.div
            key={it.label}
            variants={{
              hidden: { opacity: 0, y: 44, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
            }}
            className={it.span}
          >
            <Link
              href={it.href}
              data-cursor
              className="group relative flex h-full w-full overflow-hidden rounded-[1.5rem] border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.img}
                alt={it.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-115"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25 transition-opacity duration-500 group-hover:from-black/90" />
              {/* Sweeping highlight on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />

              <span className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition-all duration-300 group-hover:border-gold-soft group-hover:bg-gold-soft group-hover:text-black">
                <ArrowUpRight size={17} />
              </span>

              <div className="relative mt-auto p-6 md:p-7">
                <span className="eyebrow text-gold-soft">{it.sub}</span>
                <h3
                  className={`mt-2 font-display font-light leading-none text-white ${
                    it.big ? "text-[clamp(2.25rem,4vw,3.5rem)]" : "text-2xl md:text-3xl"
                  }`}
                >
                  {it.label}
                </h3>
                <span className="mt-3 block h-px w-0 bg-gold-soft transition-all duration-500 group-hover:w-14" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
